"""Conservative public official event sync. Never bypass access restrictions."""
import datetime as dt
import json
import re
import sys
import time
from pathlib import Path
from urllib.parse import urljoin, urlsplit, parse_qs, urlencode
from urllib.robotparser import RobotFileParser
from urllib.request import Request, build_opener, HTTPRedirectHandler
from bs4 import BeautifulSoup
from zoneinfo import ZoneInfo

ROOT = "https://www.9922.co.kr/"
AGENT = "HosigiPortfolioEventSync"
OUT = Path("Hosigi_Chicken/data/official-events.json")
HOSTS = {"www.9922.co.kr", "9922.co.kr"}
class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None
opener = build_opener(NoRedirect())
def official(url):
    u = urlsplit(url)
    return u.scheme == "https" and u.hostname in HOSTS and not u.username and not u.password and u.port in (None,443)
def fetch(url, robots=None):
    if not official(url):
        raise ValueError("non-official URL")
    if robots is not None and not robots.can_fetch(AGENT, url):
        raise PermissionError("robots disallows " + url)
    time.sleep(1)
    with opener.open(Request(url, headers={"User-Agent": AGENT, "Accept": "text/html,text/plain"}), timeout=20) as res:
        raw = res.read(2_000_001)
        if len(raw)>2_000_000:
            raise ValueError("oversized response")
        return raw.decode(res.headers.get_content_charset() or "utf-8", errors="strict")
def soup(url, robots):
    return BeautifulSoup(fetch(url, robots), "html.parser")
def clean(value):
    return " ".join(value.split())
def iso(y,m,d):
    return dt.date(int(y),int(m),int(d)).isoformat()
def period(text):
    # Require an explicit event period and two dates; never use posting date as start.
    for match in re.finditer(r"(?:이벤트\s*기간|행사\s*기간|프로모션\s*기간|진행\s*기간|응모\s*기간)\s*[:：]?\s*(20\d{2})[.년/\-]\s*(\d{1,2})[.월/\-]\s*(\d{1,2})\s*(?:일|\.)?\s*[~〜～–—\-]\s*(?:(20\d{2})[.년/\-]\s*)?(\d{1,2})[.월/\-]\s*(\d{1,2})", text):
        y,m,d,y2,m2,d2=match.groups()
        try:
            start,end=iso(y,m,d),iso(y2 or y,m2,d2)
            if start<=end: return start,end
        except ValueError: pass
    return None
def post_links(doc, board):
    found={}
    for a in doc.select("a[href]"):
        url=urljoin(board,a["href"])
        u=urlsplit(url); q=parse_qs(u.query)
        if not official(url) or u.path.rstrip("/")!=urlsplit(board).path.rstrip("/") or q.get("bmode")!=["view"]: continue
        idx=q.get("idx",[""])[0]
        if not idx.isdigit(): continue
        found[idx]=ROOT.rstrip("/")+u.path+"?"+urlencode({"bmode":"view","idx":idx})
    return found
def parse_post(idx,url,doc,ended):
    title=doc.select_one(".board_view .title, .board-title, .board_view .view_tit, .board_view h1, .board_view h2, .board_view header .title")
    body=doc.select_one(".board_view .board_txt_area, .board_txt_area, .board_view .view_content, .board_view .board_content")
    if not title or not body: return None
    title=clean(title.get_text(" ",strip=True))
    if not title or len(title)>240: return None
    text=clean(body.get_text(" ",strip=True))
    dates=period(text)
    # Image-only dates cannot be verified; omit rather than guess.
    if not dates: return None
    start,end=dates
    today=dt.datetime.now(ZoneInfo("Asia/Seoul")).date().isoformat()
    if ended and end>=today: return None
    # Thumbnail must be publicly accessible from official origin and robots-allowed.
    image=""
    for img in body.select("img"):
        candidate=urljoin(url,img.get("data-src") or img.get("src") or "")
        if official(candidate) and candidate!=url and ROBOTS.can_fetch(AGENT,candidate):
            image=candidate; break
    # Keep only a short factual period summary; direct visitors to original for full content.
    return {"id":"official-"+idx,"type":"promo","category":"공식 이벤트","title":title,"date":start.replace("-",".")+" – "+end.replace("-","."),"startDate":start,"endDate":end,"state":"unknown","description":"공식 게시물에 안내된 이벤트 기간: "+start+" ~ "+end+". 참여 방법 및 세부 조건은 원본 게시물을 확인해 주세요.","source":"호식이두마리치킨 공식 홈페이지","sourceUrl":url,**({"image":image} if image else {})}
def run():
    global ROBOTS
    robots_text=fetch(urljoin(ROOT,"robots.txt"))
    if "<html" in robots_text.lower() or not re.search(r"(?im)^\s*user-agent\s*:",robots_text):
        raise ValueError("robots policy unavailable")
    ROBOTS=RobotFileParser(); ROBOTS.parse(robots_text.splitlines())
    home=soup(ROOT,ROBOTS)
    boards={urljoin(ROOT,"over"):True}
    for a in home.select("a[href]"):
        label=clean(a.get_text(" ",strip=True))
        if label not in {"이벤트","진행중 이벤트","진행 중 이벤트","진행중인 이벤트","종료 이벤트","종료된 이벤트"}: continue
        url=urljoin(ROOT,a["href"]); u=urlsplit(url)
        if official(url) and not u.query and u.path not in ("","/"):
            boards[url]="종료" in label
    old=json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else []
    if not isinstance(old,list): raise ValueError("invalid previous data")
    merged={e["id"]:e for e in old}
    found=0
    for board,ended in boards.items():
        links=post_links(soup(board,ROBOTS),board)
        if not links: raise ValueError("no recognizable public posts: "+board)
        for idx,url in list(links.items())[:12]:
            event=parse_post(idx,url,soup(url,ROBOTS),ended)
            if event:
                merged[event["id"]]=event; found+=1
    if not found:
        print("No fully verified event records; preserving existing data."); return
    result=sorted(merged.values(),key=lambda e:(e["startDate"],e["id"]),reverse=True)
    OUT.parent.mkdir(parents=True,exist_ok=True)
    temp=OUT.with_suffix(".tmp")
    temp.write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    temp.replace(OUT)
    print("Verified",found,"records")
if __name__=="__main__":
    try: run()
    except Exception as exc:
        print("Sync stopped; existing event data preserved:",exc,file=sys.stderr)
        sys.exit(1)
