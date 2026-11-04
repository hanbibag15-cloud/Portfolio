/* Store locator for the Hosigi renewal portfolio.
   Only sample branches with publicly listed street addresses are included.
   Map coordinates are geocoded at runtime instead of being invented. */
(() => {
  "use strict";
  const stores = [
    {id:"nonhyeon",name:"논현1호점", district:"강남구",address:"서울특별시 강남구 언주로 605",phone:"02-511-9987"},
    {id:"sillim",name:"신림점",district:"관악구",address:"서울특별시 관악구 남부순환로153길 53",phone:"02-855-9923"},
    {id:"macheon",name:"마천점",district:"송파구",address:"서울특별시 송파구 마천로51가길 21",phone:""},
    {id:"bangi",name:"방이점",district:"송파구",address:"서울특별시 송파구 가락로 240",phone:"02-417-9992"},
    {id:"seongsan",name:"성산1호점",district:"마포구",address:"서울특별시 마포구 월드컵북로30길 9",phone:"02-307-1237"},
    {id:"gongdeok",name:"공덕점",district:"마포구",address:"서울특별시 마포구 만리재로 74",phone:"02-704-8788"},
    {id:"huam",name:"후암점",district:"용산구",address:"서울특별시 용산구 두텁바위로1길 71",phone:"02-3789-3393"}
  ];
  const form=document.querySelector("#store-search-form");
  const keyword=document.querySelector("#store-keyword");
  const district=document.querySelector("#store-district");
  const list=document.querySelector("#store-results");
  const count=document.querySelector("#store-result-count");
  const mapElement=document.querySelector("#store-map");
  const mapMessage=document.querySelector("#store-map-message");
  const fallback=document.querySelector("#store-map-fallback");
  const gpsButton=document.querySelector("#store-gps-button");
  if(!form || !keyword || !district || !list || !count || !mapElement) return;
  let filtered=stores.slice();
  let selected=null;
  let map=null;
  let markerLayer=null;
  const markers=new Map();
  const coords=new Map();
  const cacheKey="hosigi-store-coordinates-v1";
  const reduceMotion=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  try {
    const saved=JSON.parse(sessionStorage.getItem(cacheKey)||"{}");
    for(const [id,pair] of Object.entries(saved)){
      if(Array.isArray(pair) && pair.length===2 && pair.every(Number.isFinite))coords.set(id,pair);
    }
  }catch(e){ /* Session storage might be blocked. */ }
  const saveCoords=()=>{
    try { sessionStorage.setItem(cacheKey,JSON.stringify(Object.fromEntries(coords))); }catch(e){}
  };
  const showMessage=(message)=>{
    if(!mapMessage)return;
    if(!message){mapMessage.hidden=true;mapMessage.textContent="";return;}
    mapMessage.hidden=false;mapMessage.textContent=message;
  };
  function markerIcon(active) {
    return L.divIcon({className:"store-leaflet-marker",html:'<span class="store-marker-pin'+(active?' is-active':'')+'" aria-hidden="true">호식이</span>',iconSize:[64,78],iconAnchor:[32,76],popupAnchor:[0,-70]});
  }
  function fitPoints() {
    if(!map)return;
    const pts=filtered.map(store=>coords.get(store.id)).filter(Boolean);
    if(pts.length===0) {
      map.setView([37.5665,126.9780],11);
    } else if (pts.length===1) {
      map.setView(pts[0],14,{animate:!reduceMotion()});
    } else {
      map.fitBounds(L.latLngBounds(pts),{padding:[45,45],maxZoom:13,animate:!reduceMotion()});
    }
  }
  function refreshMarkers(){
    if(!map || !markerLayer)return;
    markerLayer.clearLayers();markers.clear();
    for(const store of filtered){
      const point=coords.get(store.id);
      if(!point)continue;
      const marker=L.marker(point,{icon:markerIcon(store.id===selected),title:"호식이두마리치킨 "+store.name});
      const popup=document.createElement("div");
      const h=document.createElement("strong");
      h.className="store-popup-title";h.textContent="호식이두마리치킨 "+store.name;
      const p=document.createElement("p");
      p.className="store-popup-address";p.textContent=store.address;
      popup.append(h,p);
      marker.bindPopup(popup);
      marker.on("click",()=>selectStore(store.id,false));
      marker.addTo(markerLayer);markers.set(store.id,marker);
    }
  }
  function selectStore(id,scrollToCard=true) {
    selected=id;
    for(const card of list.querySelectorAll(".store-card")){
      const active=card.dataset.id===id;
      card.classList.toggle("is-selected",active);
      card.querySelector(".store-card-view")?.setAttribute("aria-pressed",String(active));
      if(active && scrollToCard)card.scrollIntoView({block:"nearest",behavior:reduceMotion()?"auto":"smooth"});
    }
    refreshMarkers();
    const pt=coords.get(id);
    if(!map || !pt)return;
    map.flyTo(pt,14,{animate:!reduceMotion(),duration:.65});
    markers.get(id)?.openPopup();
  }
  function renderCards(){
    list.replaceChildren();
    count.textContent=String(filtered.length);
    if(!filtered.length){
      const empty=document.createElement("div");
      empty.className="store-empty";
      const strong=document.createElement("strong");
      strong.textContent="검색 결과가 없습니다.";
      const p=document.createElement("p");
      p.textContent="다른 지역이나 매장명으로 다시 검색해 보세요.";
      const reset=document.createElement("button");
      reset.type="button";reset.className="store-reset-button";reset.textContent="전체 지점 보기";
      reset.addEventListener("click",()=>{district.value="all";keyword.value="";applySearch();});
      empty.append(strong,p,reset);list.append(empty);return;
    }
    const fragment=document.createDocumentFragment();
    for(const store of filtered){
      const card=document.createElement("article");card.className="store-card";card.dataset.id=store.id;
      if(store.id===selected)card.classList.add("is-selected");
      const tag=document.createElement("span");tag.className="store-card-category";tag.textContent="서울 · "+store.district;
      const title=document.createElement("h4");title.textContent="호식이두마리치킨 "+store.name;
      const address=document.createElement("p");address.className="store-card-address";address.textContent=store.address;
      const actions=document.createElement("div");actions.className="store-card-actions";
      const btn=document.createElement("button");btn.type="button";btn.className="store-card-view";btn.textContent="지도에서 보기";btn.setAttribute("aria-pressed",String(store.id===selected));
      btn.addEventListener("click",()=>selectStore(store.id));
      actions.append(btn);
      if(store.phone){
        const number=document.createElement("a");number.className="store-card-phone-link";number.href="tel:"+store.phone.replace(/[^\d+]/g,"");number.textContent=store.phone;
        number.setAttribute("aria-label",store.name+" 전화 "+store.phone);
        actions.append(number);
      }
      card.append(tag,title,address,actions);fragment.append(card);
    }
    list.append(fragment);
  }
  function applySearch(){
    const term=keyword.value.trim().toLocaleLowerCase("ko");
    const region=district.value;
    filtered=stores.filter(store=>(region==="all"||store.district===region)&&(!term||[store.name,store.address,store.district].some(v=>v.toLocaleLowerCase("ko").includes(term))));
    if(!filtered.some(store=>store.id===selected))selected=null;
    renderCards();refreshMarkers();fitPoints();
  }
  form.addEventListener("submit",event=>{event.preventDefault();applySearch();});
  district.addEventListener("change",applySearch);
  keyword.addEventListener("input",()=>{if(!keyword.value.trim())applySearch();});
  renderCards();

  if(!window.L){
    showMessage("지도를 불러올 수 없습니다. 아래 지점 주소를 확인해 주세요.");
    fallback?.classList.add("is-visible");return;
  }
  map=L.map(mapElement,{zoomControl:true,scrollWheelZoom:false}).setView([37.5665,126.9780],11);
  // OpenStreetMap's public raster tiles need no commercial API key.
  // Keep Leaflet attribution visible and do not use a provider that watermarks
  // tiles with "API KEY REQUIRED".
  const tiles=L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
    maxZoom:19,
    tileSize:256,
    detectRetina:false,
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>'
  }).addTo(map);
  let hasLoadedTiles=false;
  tiles.on("load",()=>{
    hasLoadedTiles=true;
    // Geocoding progress and location status own the message area independently.
  });
  tiles.on("tileerror",()=>{
    if(!hasLoadedTiles)showMessage("지도 타일을 불러올 수 없습니다. 네트워크 연결을 확인하고 다시 새로고침해 주세요.");
  });
  markerLayer=L.layerGroup().addTo(map);
  let userLocationMarker=null;
  let userAccuracyCircle=null;
  if(gpsButton){
    gpsButton.addEventListener("click",()=>{
      if(!navigator.geolocation){
        showMessage("이 브라우저에서는 현재 위치 기능을 사용할 수 없습니다.");
        return;
      }
      gpsButton.disabled=true;
      gpsButton.setAttribute("aria-busy","true");
      showMessage("현재 위치를 확인하는 중입니다.");
      navigator.geolocation.getCurrentPosition(position=>{
        gpsButton.disabled=false;
        gpsButton.removeAttribute("aria-busy");
        const point=[position.coords.latitude,position.coords.longitude];
        if(userLocationMarker)map.removeLayer(userLocationMarker);
        if(userAccuracyCircle)map.removeLayer(userAccuracyCircle);
        const icon=L.divIcon({className:"store-leaflet-marker",html:'<span class="store-current-location" aria-hidden="true"></span>',iconSize:[22,22],iconAnchor:[11,11]});
        userLocationMarker=L.marker(point,{icon,title:"내 현재 위치",zIndexOffset:1000}).addTo(map);
        userLocationMarker.bindPopup("현재 위치").openPopup();
        userAccuracyCircle=L.circle(point,{
          radius:Math.min(Math.max(position.coords.accuracy,10),2000),
          color:"#1674db",fillColor:"#1674db",fillOpacity:.07,weight:1
        }).addTo(map);
        map.flyTo(point,14,{animate:!reduceMotion(),duration:.75});
        showMessage("내 현재 위치를 표시했어요.");
      },error=>{
        gpsButton.disabled=false;
        gpsButton.removeAttribute("aria-busy");
        const msg=error.code===1 ? "위치 권한이 허용되지 않았습니다. 브라우저 위치 설정을 확인해 주세요."
          : error.code===2 ? "현재 위치를 확인할 수 없습니다. 위치 서비스를 확인해 주세요."
          : "위치 확인 시간이 초과됐습니다. 다시 시도해 주세요.";
        showMessage(msg);
      },{enableHighAccuracy:true,timeout:12000,maximumAge:60000});
    });
  }
  const refreshMapSize=()=>{
    if(!mapElement.isConnected || !mapElement.clientWidth || !mapElement.clientHeight)return;
    map.invalidateSize({pan:false,debounceMoveend:true});
  };
  if("ResizeObserver" in window){
    const mapResize=new ResizeObserver(refreshMapSize);
    mapResize.observe(mapElement);
  }
  window.addEventListener("load",refreshMapSize,{once:true});
  window.addEventListener("resize",refreshMapSize,{passive:true});
  // Run again once CSS and map tiles have settled after the initial render.
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    refreshMapSize();
    fitPoints();
  }));
  // Recheck after fonts/layout are settled (especially on GitHub Pages).
  if(document.fonts?.ready)document.fonts.ready.then(()=>{refreshMapSize();fitPoints();});
  refreshMarkers();fitPoints();

  // Public Nominatim requires at most one lookup per second.
  // Keep all results visible even if geocoding or map tiles are unavailable.
  async function geocodeStores(){
    const pending=stores.filter(store=>!coords.has(store.id));
    if(!pending.length){showMessage("");refreshMarkers();fitPoints();return;}
    showMessage("매장 위치를 지도에 표시하는 중입니다.");
    let done=0;
    for(const store of pending){
      try{
        const url="https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=kr&q="+encodeURIComponent(store.address);
        const response=await fetch(url,{headers:{"Accept":"application/json"}});
        if(!response.ok)throw Error("Geocoding unavailable");
        const items=await response.json();
        if(items.length){
          const lat=Number(items[0].lat),lng=Number(items[0].lon);
          if(Number.isFinite(lat)&&Number.isFinite(lng)){
            coords.set(store.id,[lat,lng]);saveCoords();refreshMarkers();
          }
        }
      }catch(e){ /* Keep address list usable when the geocoding service fails. */ }
      done++;
      showMessage("매장 위치를 확인하는 중 · "+done+"/"+pending.length);
      if(done<pending.length)await new Promise(resolve=>setTimeout(resolve,1200));
    }
    refreshMarkers();fitPoints();
    if(coords.size===0){
      showMessage("위치 조회가 제한되어 지도 핀이 표시되지 않습니다. 매장 주소를 확인해 주세요.");
    }else if(coords.size<stores.length){
      showMessage("일부 매장의 위치는 확인 중입니다. 목록의 주소를 참고해 주세요.");
    }else showMessage("");
  }
  geocodeStores();
})();
