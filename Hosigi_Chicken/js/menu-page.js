// 메뉴명/분류: 공식 메뉴안내 조사 기반. 이미지 파일을 추가할 때 카드 이미지 박스를 교체하세요.
const menuItems = [["chicken","딥블랙갈릭 치킨","진한 블랙갈릭 풍미"],["chicken","깐쇼킹 치킨","깐쇼 스타일의 매콤달콤한 치킨"],["chicken","맵시크 치킨","매콤한 풍미를 강조한 치킨"],["chicken","크리스피골드","바삭한 순살 치킨"],["chicken","수라깐풍 치킨","깐풍 소스 풍미의 치킨"],["chicken","요거치즈닝치킨","요거트와 치즈 시즈닝 조합"],["chicken","타코마요 치킨","치폴레와 마요의 조합"],["chicken","레몬크림탕슈","레몬크림 소스를 곁들이는 순살"],["chicken","간장 치킨","달콤짭짤한 간장 소스"],["chicken","매운 간장 치킨","매콤한 간장 소스"],["chicken","후라이드 치킨","기본 후라이드 치킨"],["chicken","양념 치킨","달콤한 양념 치킨"],["chicken","매운 양념 치킨","매콤달콤한 양념"],["chicken","청양고추마요 치킨","청양고추와 마요 소스"],["chicken","뿌라이드 치킨","시즈닝을 선택하는 크리스피 치킨"],["parts","플라윙 세트 (윙+봉)","윙과 봉으로 구성"],["parts","다리 (스틱)","닭다리 중심 구성"],["parts","윙+다리","날개와 다리 조합"],["parts","호식이 안심텐더","부드러운 안심살 텐더"],["parts","닭발 튀김","바삭한 닭발 튀김"],["parts","똥집 튀김","바삭한 닭똥집 튀김"],["side","쉬림프 미니튀김(칠리)","칠리소스와 함께 즐기는 새우튀김"],["side","쉬림프 미니튀김(레몬크림)","레몬크림 소스 새우튀김"],["side","체다마요 감자튀김","체다와 마요 소스를 곁들인 감자튀김"],["side","치폴레 감자튀김","치폴레 소스 감자튀김"],["side","크리스피 치킨넥","바삭한 닭목살 메뉴"],["side","통살가득 텐더킹","안심 통살 튀김"],["side","똥집 미니튀김","작은 크기의 똥집 튀김"],["side","감자볼튀김","한입 크기 감자볼"],["side","치즈볼 2종세트","두 가지 치즈볼 구성"],["side","허니갈릭치즈볼(6개)","허니갈릭 풍미 치즈볼"],["side","트리플 치즈볼(6개)","세 가지 치즈 풍미"],["side","마늘떡볶이","마늘 풍미 떡볶이"],["side","로제비엔나떡볶이","로제 소스 떡볶이"],["side","감자튀김","치킨과 곁들이는 감자튀김"],["side","치킨무","치킨과 함께 곁들이는 무"]];
const categoryNames = {all:"전체 메뉴",chicken:"치킨 메뉴",parts:"부위별 메뉴",side:"사이드 메뉴"};
const categoryHeadings = {
    all: ["ALL MENU", "두 마리의 즐거움, 다양한 맛의 선택", "호식이두마리치킨의 다양한 메뉴를 한곳에서 만나보세요."],
    chicken: ["CHICKEN MENU", "다채로운 맛으로 즐기는 호식이 치킨", "취향에 맞는 다양한 치킨 메뉴를 만나보세요."],
    parts: ["PARTS MENU", "좋아하는 부위만 골라 즐기는 맛", "부위별로 선택할 수 있는 메뉴를 살펴보세요."],
    side: ["SIDE MENU", "치킨과 함께하면 더 맛있는 사이드", "치킨과 잘 어울리는 다양한 사이드 메뉴를 만나보세요."]
};
const heroTitle = document.querySelector("#all-menu-title");
const heroSubtitle = document.querySelector("#all-menu-subtitle");
const tabs = [...document.querySelectorAll(".all-menu-tabs [role=tab]")];
const grid = document.querySelector("#menu-products");
const title = document.querySelector("#menu-category-title");
const count = document.querySelector("#menu-count");
function renderMenu(category) {
    const current = Object.hasOwn(categoryNames, category) ? category : "all";
    const shown = current === "all" ? menuItems : menuItems.filter(item => item[0] === current);
    tabs.forEach(tab => {const active = tab.dataset.filter === current;tab.classList.toggle("is-active",active);tab.setAttribute("aria-selected",String(active));tab.tabIndex = active ? 0 : -1;});
    grid.setAttribute("aria-labelledby","tab-"+current);
    const [heading, subtitle] = categoryHeadings[current];
    heroTitle.textContent = heading;
    heroSubtitle.textContent = subtitle;
    title.textContent = categoryNames[current];
    count.textContent = shown.length + "개의 메뉴";
    grid.replaceChildren(...shown.map(([type,name,description]) => {
        const article = document.createElement("article");article.className="all-menu-card";
        const photo = document.createElement("div");photo.className="all-menu-photo";photo.setAttribute("role","img");photo.setAttribute("aria-label",name+" 이미지 준비 중");
        const placeholder = document.createElement("span");placeholder.textContent="IMAGE";photo.append(placeholder);
        const body = document.createElement("div");body.className="all-menu-card-body";
        const tag = document.createElement("span");tag.className="all-menu-card-category";tag.textContent=categoryNames[type];
        const heading = document.createElement("h4");heading.textContent=name;
        const desc = document.createElement("p");desc.textContent=description;
        body.append(tag,heading,desc);article.append(photo,body);return article;
    }));
}
tabs.forEach((tab,index)=>{tab.addEventListener("click",()=>{const category=tab.dataset.filter;history.replaceState(null,"","#"+category);renderMenu(category);});tab.addEventListener("keydown",e=>{if(!["ArrowRight","ArrowLeft","Home","End"].includes(e.key))return;e.preventDefault();let next=e.key==="Home"?0:e.key==="End"?tabs.length-1:(index+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;tabs[next].click();tabs[next].focus();});});
window.addEventListener("hashchange",()=>renderMenu(location.hash.slice(1)));
renderMenu(location.hash.slice(1));
const toggle=document.querySelector(".header-menu-toggle"),header=document.querySelector(".site-header");
toggle?.addEventListener("click",()=>{const open=header.classList.toggle("menu-open");toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"메뉴 닫기":"메뉴 열기");});
document.querySelectorAll(".header-nav .has-submenu > a").forEach(a=>a.addEventListener("click",()=>{if(window.innerWidth>1024)return;document.querySelectorAll(".has-submenu").forEach(item=>item.classList.remove("submenu-open"));a.parentElement.classList.add("submenu-open");}));

