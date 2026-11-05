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
const heroTitle = document.querySelector("#all-menu-title");
const heroSubtitle = document.querySelector("#all-menu-subtitle");
const tabs = [...document.querySelectorAll(".all-menu-tabs [role=tab]")];
const grid = document.querySelector("#menu-products");
const title = document.querySelector("#menu-category-title");
const count = document.querySelector("#menu-count");
let lastRenderedCategory = null;
// Deep link from the home-page product carousel.
const requestedProduct = new URLSearchParams(location.search).get("product");
const normalizeProductName = name => (name || "").replace(/\s+/g, "").trim();
let pendingProductFocus = Boolean(requestedProduct);

function renderMenu(category) {
    const current = Object.hasOwn(categoryNames, category) ? category : "all";
    const shouldAnimateContent = lastRenderedCategory !== null && lastRenderedCategory !== current;
    lastRenderedCategory = current;
    const categoryOrder = { chicken: 0, parts: 1, side: 2 };
    const shown = current === "all"
        ? [...menuItems].sort((a, b) => categoryOrder[a[0]] - categoryOrder[b[0]])
        : menuItems.filter(item => item[0] === current);
    tabs.forEach(tab => {const active = tab.dataset.filter === current;tab.classList.toggle("is-active",active);tab.setAttribute("aria-selected",String(active));tab.tabIndex = active ? 0 : -1;});
    grid.setAttribute("aria-labelledby","tab-"+current);
    const [heading, subtitle] = categoryHeadings[current];
    heroTitle.textContent = heading;
    heroSubtitle.textContent = subtitle;
    title.textContent = categoryNames[current];
    count.textContent = shown.length + "개의 메뉴";
    grid.replaceChildren(...shown.map(([type,name,description]) => {
        const article = document.createElement("article");
        article.className = "all-menu-card";
        article.dataset.productName = name;
        const photo = document.createElement("div");
        photo.className = "all-menu-photo";
        // Match by product name, not the position in a filtered tab.
        const filename = menuPhotos[name];
        const src = filename ? "img/" + filename : null;
        const fallback = () => {
            photo.querySelector("img")?.remove();
            if (!photo.querySelector(".all-menu-placeholder")) {
                const span = document.createElement("span");
                span.className = "all-menu-placeholder";
                span.textContent = "IMAGE";
                photo.append(span);
            }
            photo.setAttribute("role", "img");
            photo.setAttribute("aria-label", name + " 이미지 준비 중");
        };
        if (src) {
            const image = document.createElement("img");
            image.src = src;
            image.alt = name + " 메뉴 사진";
            image.loading = "lazy";
            image.decoding = "async";
            image.addEventListener("error", fallback, {once: true});
            photo.append(image);
        } else {
            fallback();
        }
        if (newMenuNames.has(name)) {
            const badge = document.createElement("span");
            badge.className = "all-menu-new-badge";
            badge.textContent = "NEW";
            badge.setAttribute("aria-label", "신메뉴");
            photo.append(badge);
        }
        const body = document.createElement("div");
        body.className = "all-menu-card-body";
        const tag = document.createElement("span");
        tag.className = "all-menu-card-category";
        tag.textContent = categoryNames[type];
        const heading = document.createElement("h4");
        heading.textContent = name;
        body.append(tag, heading);
        if (description) {
            const desc = document.createElement("p");
            desc.textContent = description;
            body.append(desc);
        }
        article.append(photo, body);
        return article;
    }));
    // Highlight only after the linked menu has reached the viewport.
    if (pendingProductFocus && requestedProduct) {
        const aliases = {"크리스피골드":"크리스피골드"};
        const normalize = name => aliases[normalizeProductName(name)] || normalizeProductName(name);
        const matched = [...grid.querySelectorAll(".all-menu-card")].find(card =>
            normalize(card.dataset.productName) === normalize(requestedProduct)
        );
        if (matched) {
            pendingProductFocus = false;
            requestAnimationFrame(() => requestAnimationFrame(() => {
                const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                if(reduced){
                    matched.scrollIntoView({behavior:"auto",block:"center"});
                    return;
                }
                let done=false,observer=null,deadline=null,settle=null;
                const centered=()=>{
                    const rect=matched.getBoundingClientRect();
                    const middle=(rect.top+rect.bottom)/2;
                    return middle>window.innerHeight*.15 && middle<window.innerHeight*.85;
                };
                const highlight=()=>{
                    if(done || !matched.isConnected || !centered())return;
                    done=true;
                    observer?.disconnect();
                    clearTimeout(deadline);clearTimeout(settle);
                    window.removeEventListener("scrollend",onEnd);
                    const photo=matched.querySelector(".all-menu-photo");
                    if(!photo)return;
                    matched.classList.add("is-product-arrival-highlight");
                    photo.addEventListener("animationend",e=>{
                        if(e.animationName==="hosigi-product-arrival")
                            matched.classList.remove("is-product-arrival-highlight");
                    },{once:true});
                };
                const onEnd=()=>highlight();
                window.addEventListener("scrollend",onEnd);
                if("IntersectionObserver" in window){
                    observer=new IntersectionObserver(entries=>{
                        if(entries.some(e=>e.isIntersecting) && centered()){
                            clearTimeout(settle);
                            settle=setTimeout(highlight,180);
                        }
                    },{threshold:[0,.25,.5]});
                    observer.observe(matched);
                }
                matched.scrollIntoView({behavior:"smooth",block:"center"});
                if(centered())settle=setTimeout(highlight,250);
                // Fallback: ensure long scrolls still show the highlight.
                deadline=setTimeout(()=>{
                    if(done)return;
                    if(!centered())matched.scrollIntoView({behavior:"auto",block:"center"});
                    requestAnimationFrame(highlight);
                },2000);
            }));
        }
    }
    // Animate each new card as a unit, including its photo, badge and text.
    const page = document.querySelector(".all-menu-page");
    if (shouldAnimateContent && page) {
        page.classList.remove("is-tab-content-entering");
        void page.offsetWidth; // Restart the card entrance for each category change.
        page.classList.add("is-tab-content-entering");
    }
}
tabs.forEach((tab,index)=>{tab.addEventListener("click",()=>{const category=tab.dataset.filter;history.replaceState(null,"","#"+category);renderMenu(category);});tab.addEventListener("keydown",e=>{if(!["ArrowRight","ArrowLeft","Home","End"].includes(e.key))return;e.preventDefault();let next=e.key==="Home"?0:e.key==="End"?tabs.length-1:(index+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;tabs[next].click();tabs[next].focus();});});
window.addEventListener("hashchange",()=>renderMenu(location.hash.slice(1)));
renderMenu(location.hash.slice(1));
const toggle=document.querySelector(".header-menu-toggle"),header=document.querySelector(".site-header");
toggle?.addEventListener("click",()=>{const open=header.classList.toggle("menu-open");toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"메뉴 닫기":"메뉴 열기");});
// The current-page MENU label is display-only: no navigation or mobile submenu on click.
const menuNavLabel = document.querySelector('.header-nav .has-submenu > a[aria-controls="mobile-submenu"]');
const menuNavItem = menuNavLabel?.closest(".has-submenu");
menuNavLabel?.addEventListener("click", event => {
    event.preventDefault();
    menuNavItem?.classList.remove("submenu-open");
    menuNavItem?.classList.add("menu-dropdown-dismissed");
    menuNavLabel.setAttribute("aria-expanded", "false");
    menuNavLabel.blur();
});
menuNavItem?.addEventListener("mouseleave", () => {
    menuNavItem.classList.remove("menu-dropdown-dismissed");
});
document.querySelectorAll(".header-nav .has-submenu > a").forEach(a=>a.addEventListener("click",event=>{
    if (a === menuNavLabel) return;
    if (window.innerWidth > 1024) return;
    document.querySelectorAll(".has-submenu").forEach(item=>item.classList.remove("submenu-open"));
    a.parentElement.classList.add("submenu-open");
}));

