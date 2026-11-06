// 사용자가 제공한 메뉴 순서, 이름과 소개문을 짧게 편집한 데이터.
const menuItems = [
    ["chicken","딥블랙갈릭 치킨","깊고 진한 블랙갈릭의 매력!"],
    ["chicken","깐쇼킹 치킨","깐쇼새우와 칠리치킨의 매콤달콤한 만남!"],
    ["chicken","맵시크 치킨","리퍼 고추의 강렬한 매운맛과 부드러운 체다마요!"],
    ["chicken","크리스피골드","국내산 순살의 황금빛 겉바속촉!"],
    ["chicken","수라깐풍 치킨","매콤달콤한 깐풍 소스와 알록달록 채소의 조화!"],
    ["chicken","요거치즈닝치킨","딜요거트와 치즈 시즈닝의 단짠 조합!"],
    ["chicken","타코마요 치킨","다채로운 토핑과 매콤새콤 치폴레소스!"],
    ["chicken","레몬크림탕슈","쫀득한 안심 순살과 상큼한 레몬크림소스!"],
    ["chicken","간장 치킨","달콤짭짤한 비법 간장소스의 황금비율!"],
    ["chicken","매운 간장 치킨","달콤짭짤한 간장치킨에 매콤함을 더한 맛!"],
    ["chicken","후라이드 치킨","바삭하게 튀겨낸 정통 후라이드 치킨!"],
    ["chicken","양념 치킨","누구나 좋아하는 달콤한 클래식 양념치킨!"],
    ["chicken","매운 양념 치킨","달콤한 양념에 매콤함을 더한 치킨!"],
    ["chicken","청양고추마요 치킨","부드러운 마요소스에 알싸한 청양고추가 톡톡!"],
    ["parts","플라윙 세트","통통한 윙과 봉을 취향대로 즐기는 세트!"],
    ["parts","똥집 튀김","바삭하고 고소한 닭똥집 튀김!"],
    ["parts","닭발 튀김","먹을수록 당기는 쫄깃한 닭발 튀김!"],
    ["parts","다리","쫄깃한 식감과 풍부한 육즙의 닭다리 치킨!"],
    ["parts","윙+다리","촉촉한 날개와 육즙 가득한 다리의 조합!"],
    ["parts","호식이 안심텐더","국내산 안심살로 만든 부드럽고 촉촉한 텐더!"],
    ["side","쉬림프 미니튀김(칠리)","통통한 깐쇼새우와 매콤달콤한 칠리소스!"],
    ["side","쉬림프 미니튀김(레몬크림)","통통한 새우와 상큼한 레몬크림소스!"],
    ["side","체다마요 감자튀김","고소하고 부드러운 체다마요 감자튀김!"],
    ["side","치폴레 감자튀김","매콤새콤한 치폴레소스 감자튀김!"],
    ["side","크리스피 치킨넥","바삭한 튀김옷과 쫄깃담백한 닭목살!"],
    ["side","통살가득 텐더킹","부드럽고 담백한 안심 통살이 가득!"],
    ["side","똥집 미니튀김","겉은 바삭, 속은 쫄깃한 반전 식감!"],
    ["side","감자볼튀김","한입에 쏙 들어가는 짭짤한 감자볼!"],
    ["side","치즈볼 2종세트","겉바속쫀 치즈볼 두 가지를 한 번에!"],
    ["side","허니갈릭치즈볼","진한 마늘 풍미와 달콤함의 조화!"],
    ["side","트리플치즈볼","크림·모짜렐라·체다치즈의 쫀득한 조화!"],
    ["side","마늘떡볶이","매콤알싸한 마늘 풍미의 떡볶이!"],
    ["side","로제비앤나떡볶이","진한 로제크림과 쫀득한 떡, 비앤나의 조화!"],
    ["side","감자튀김","쌀가루로 더 바삭하게 튀긴 감자튀김!"],
    ["side","치킨무",""]
];
// Product-to-image paths explicitly provided by the project author.
// Side menu images 09, 13, 14 and 15 verified in the repository.
const newMenuNames = new Set(["딥블랙갈릭 치킨", "깐쇼킹 치킨", "맵시크 치킨"]);
const menuPhotos = {
    "딥블랙갈릭 치킨": "chicken_img02.png",
    "깐쇼킹 치킨": "chicken_img01.png",
    "맵시크 치킨": "chicken_img03.png",
    "크리스피골드": "chicken_img04.png",
    "수라깐풍 치킨": "chicken_img05.png",
    "요거치즈닝치킨": "chicken_img07.png",
    "타코마요 치킨": "chicken_img10.png",
    "레몬크림탕슈": "chicken_img14.png",
    "간장 치킨": "chicken_img08.png",
    "매운 간장 치킨": "chicken_img13.png",
    "후라이드 치킨": "chicken_img11.png",
    "양념 치킨": "chicken_img15.png",
    "매운 양념 치킨": "chicken_img12.png",
    "청양고추마요 치킨": "chicken_img09.png",
    "플라윙 세트": "part_img01.png",
    "똥집 튀김": "part_img02.png",
    "닭발 튀김": "part_img03.png",
    "다리": "part_img04.png",
    "윙+다리": "part_img05.png",
    "호식이 안심텐더": "part_img06.png",
    "쉬림프 미니튀김(칠리)": "Side_Menu01.png",
    "쉬림프 미니튀김(레몬크림)": "Side_Menu02.png",
    "체다마요 감자튀김": "Side_Menu03.png",
    "치폴레 감자튀김": "Side_Menu04.png",
    "크리스피 치킨넥": "Side_Menu05.png",
    "통살가득 텐더킹": "Side_Menu06.png",
    "똥집 미니튀김": "Side_Menu07.png",
    "감자볼튀김": "Side_Menu08.png",
    "치즈볼 2종세트": "Side_Menu09.png",
    "허니갈릭치즈볼": "Side_Menu10.png",
    "트리플치즈볼": "Side_Menu13.png",
    "마늘떡볶이": "Side_Menu11.png",
    "로제비앤나떡볶이": "Side_Menu12.png",
    "감자튀김": "Side_Menu14.png",
    "치킨무": "Side_Menu15.png"
};
const categoryNames = {all:"전체 메뉴",chicken:"치킨 메뉴",parts:"부위별 메뉴",side:"사이드 메뉴"};
const categoryHeadings = {
    all: ["ALL MENU", "두 마리의 즐거움, 다양한 맛의 선택", "호식이두마리치킨의 다양한 메뉴를 한곳에서 만나보세요."],
    chicken: ["CHICKEN MENU", "다채로운 맛으로 즐기는 호식이 치킨", "취향에 맞는 다양한 치킨 메뉴를 만나보세요."],
    parts: ["PARTS MENU", "좋아하는 부위만 골라 즐기는 맛", "부위별로 선택할 수 있는 메뉴를 살펴보세요."],
    side: ["SIDE MENU", "치킨과 함께하면 더 맛있는 사이드", "치킨과 잘 어울리는 다양한 사이드 메뉴를 만나보세요."]
};


const allergens={
"딥블랙갈릭 치킨":"밀, 대두, 닭고기",
"깐쇼킹 치킨":"밀, 대두, 토마토, 닭고기, 쇠고기, 새우",
"맵시크 치킨":"밀, 대두, 토마토, 난류, 우유, 닭고기, 쇠고기, 조개류",
"크리스피골드":"밀, 대두, 우유, 닭고기, 쇠고기",
"수라깐풍 치킨":"밀, 대두, 닭고기, 쇠고기",
"요거치즈닝치킨":"밀, 대두, 토마토, 난류, 우유, 닭고기, 쇠고기",
"타코마요 치킨":"밀, 대두, 토마토, 난류, 우유, 닭고기, 쇠고기",
"레몬크림탕슈":"밀, 대두, 토마토, 난류, 우유, 닭고기, 쇠고기",
"후라이드 치킨":"밀, 닭고기",
"간장 치킨":"밀, 대두, 닭고기",
"매운 간장 치킨":"밀, 대두, 닭고기",
"양념 치킨":"계란, 우유, 밀, 땅콩, 대두, 닭고기, 쇠고기, 토마토",
"매운 양념 치킨":"계란, 우유, 밀, 땅콩, 대두, 닭고기, 쇠고기, 토마토",
"청양고추마요 치킨":"밀, 대두, 난류, 닭고기, 쇠고기",
"호식이 안심텐더":"계란, 우유, 밀, 대두, 닭고기, 쇠고기",
"닭발 튀김":"밀, 대두, 토마토, 우유, 닭고기, 쇠고기",
"똥집 튀김":"밀, 대두, 토마토, 우유, 닭고기, 쇠고기",
"체다마요 감자튀김":"밀, 대두, 난류, 우유, 쇠고기",
"치폴레 감자튀김":"밀, 대두, 토마토, 난류, 우유, 쇠고기",
"크리스피 치킨넥":"밀, 대두, 우유, 닭고기, 쇠고기",
"쉬림프 미니튀김(칠리)":"밀, 대두, 토마토, 쇠고기, 새우",
"쉬림프 미니튀김(레몬크림)":"밀, 대두, 토마토, 난류, 우유, 쇠고기, 새우",
"감자볼튀김":"밀, 난류, 우유",
"감자튀김":"밀",
"마늘떡볶이":"우유, 밀, 대두, 토마토, 닭고기, 쇠고기",
"로제비앤나떡볶이":"밀, 대두, 돼지고기, 우유, 닭고기, 쇠고기, 굴, 조개류",
"트리플치즈볼":"대두, 우유, 쇠고기",
"허니갈릭치즈볼":"밀, 대두, 우유",
"치킨무":"페닐알라닌 함유"
};
// Nutrients: kcal, protein g, carbohydrate g, saturated fat g, sugars g, sodium mg, per 100g.
const nutrients={
"맵시크 치킨":[254.38,21.66,13.81,2.18,7.77,482.55],
"크리스피골드":[276.70,21.36,19.24,1.17,.79,633.99],
"수라깐풍 치킨":[228.65,18.17,13.86,1.65,6.86,432.31],
"요거치즈닝치킨":[206.43,16.76,18.76,1.01,1.35,649.92],
"레몬크림탕슈":[633,13.3,58.1,6.8,21,1003.4],
"간장 치킨":[277.16,24.47,13.23,2.28,.59,403.99],
"매운 간장 치킨":[265.13,23.45,11.22,2.57,.49,412.71],
"매운 양념 치킨":[259.88,21.18,18.84,1.84,7.59,340.57],
"후라이드 치킨":[245.61,24.77,9.88,2.17,null,228.42],
"양념 치킨":[286.61,17.64,26.45,2.03,3.85,450.59],
"청양고추마요 치킨":[314.4,16.7,16,3.4,2.5,449.1]
};
(() => {
const name=new URLSearchParams(location.search).get("product");
const found=menuItems.find(item=>item[1]===name);
const back=document.getElementById("detail-back");
const heading=document.getElementById("detail-product-name");
const cat=document.getElementById("detail-category");
const description=document.getElementById("detail-product-summary");
const imageArea=document.getElementById("detail-product-art");
const allergy=document.getElementById("detail-allergens");
const body=document.getElementById("detail-nutrition-body");
const note=document.getElementById("detail-nutrition-note");
const source=document.getElementById("detail-info-source");
const more=document.querySelector(".menu-detail-more");
const productType=document.getElementById("detail-product-type");
const detailDescription=document.getElementById("detail-description");
const panel=document.getElementById("detail-info-panel");
const panelButtons=[...document.querySelectorAll(".menu-detail-buttons button")];
const closePanel=document.querySelector(".menu-detail-panel-close");
const imageFallback=()=>{
 imageArea.replaceChildren();
 const label=document.createElement("span");
 label.className="detail-photo-placeholder";
 label.textContent="IMAGE";
 imageArea.append(label);
};
if(!found){
 heading.textContent="메뉴를 찾을 수 없습니다.";
 cat.textContent="MENU";
 description.textContent="메뉴 목록에서 다시 선택해 주세요.";
 imageFallback();
 panel.hidden=true;
 return;
}
const [type,,text]=found;
const categories={chicken:"치킨 메뉴",parts:"부위별 메뉴",side:"사이드 메뉴"};
cat.textContent=categories[type]||"메뉴";
heading.textContent=name;
document.title=name+" | 호식이두마리치킨";
description.textContent=text||"호식이두마리치킨의 다양한 메뉴를 만나보세요.";
productType.textContent=categories[type]||"메뉴";
detailDescription.textContent=text||"제품별 안내 사항은 주문 매장에서 확인해 주세요.";
back.href="menu.html#"+type;
more.href="menu.html#"+type;
const photo=menuPhotos[name];
if(photo){
 const img=document.createElement("img");
 img.src="img/"+photo;
 img.alt=name+" 제품 사진";
 img.addEventListener("error",imageFallback,{once:true});
 imageArea.append(img);
}else imageFallback();
if(allergens[name])allergy.textContent=allergens[name];
else {allergy.textContent="공식 자료에서 이 메뉴의 알레르기 정보를 확인하지 못했습니다.";allergy.classList.add("is-unverified");}
const entries=[["열량","kcal"],["단백질","g"],["탄수화물","g"],["포화지방","g"],["당류","g"],["나트륨","mg"]];
const values=nutrients[name];
if(values){
 entries.forEach(([label,unit],index)=>{
   const tr=document.createElement("tr"),th=document.createElement("th"),td=document.createElement("td");
   th.scope="row";th.textContent=label;
   td.textContent=values[index]===null?"미표기":values[index]+" "+unit;
   tr.append(th,td);body.append(tr);
 });
 note.textContent="공식 상세페이지의 제품 100g 기준 수치입니다. 구성 및 조리 조건에 따라 달라질 수 있습니다.";
}else{
 const tr=document.createElement("tr"),td=document.createElement("td");
 td.colSpan=2;td.textContent="해당 메뉴의 영양 수치를 공식 자료에서 확인하지 못했습니다.";
 tr.append(td);body.append(tr);
 note.textContent="상세한 영양성분은 공식 사이트 또는 매장에 확인해 주세요.";
}
source.textContent="출처: 호식이 공식 알레르기 유발성분표(2026.03) 및 공식 제품 상세 정보. ";
const url=document.createElement("a");
url.href="https://www.9922.co.kr/allergenic-component";url.target="_blank";url.rel="noopener noreferrer";
url.textContent="알레르기 정보 원문 확인";
source.append(url);
const openPanel=type=>{
  const selected=panelButtons.find(button=>button.dataset.info===type);
  if(!selected)return;
  const wasOpen=!panel.hidden&&selected.getAttribute("aria-pressed")==="true";
  panelButtons.forEach(button=>button.setAttribute("aria-pressed","false"));
  if(wasOpen){panel.hidden=true;return;}
  panel.hidden=false;
  selected.setAttribute("aria-pressed","true");
  panel.querySelectorAll(".menu-detail-fact-content").forEach(section=>{
    section.hidden=section.dataset.panel!==type;
  });
  document.getElementById("detail-facts-title").textContent=selected.textContent;
  panel.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
};
panelButtons.forEach(button=>button.addEventListener("click",()=>openPanel(button.dataset.info)));
closePanel.addEventListener("click",()=>{
  panel.hidden=true;
  panelButtons.forEach(button=>button.setAttribute("aria-pressed","false"));
});
})();
