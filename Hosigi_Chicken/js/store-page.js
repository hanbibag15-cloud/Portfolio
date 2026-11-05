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
    {id:"huam",name:"후암점",district:"용산구",address:"서울특별시 용산구 두텁바위로1길 71",phone:"02-3789-3393"},
    // Branches with complete addresses and phone numbers listed on the official store page.
    {id:"busan-yeonji",name:"연지초읍점",district:"부산진구",address:"부산광역시 부산진구 동평로265번길 69",phone:"051-806-1010"},
    {id:"busan-goejeong",name:"괴정점",district:"사하구",address:"부산광역시 사하구 회화나무길 67",phone:"051-207-9972"},
    {id:"busan-sinpyeong",name:"신평점",district:"사하구",address:"부산광역시 사하구 장평로 311",phone:"051-208-9936"},
    {id:"busan-dadaepo",name:"다대포점",district:"사하구",address:"부산광역시 사하구 다대로 537",phone:"051-262-9986"},
    {id:"busan-beomcheon",name:"범천점",district:"부산진구",address:"부산광역시 부산진구 신암로 74",phone:"051-647-1238"},
    {id:"busan-myeongjang",name:"명장점",district:"동래구",address:"부산광역시 동래구 안락로51번길 9",phone:"051-524-8292"}
  ];

  // Province/district classification from actual store addresses; no guessed locations.
  const regionNames={"서울특별시":"서울","부산광역시":"부산","대구광역시":"대구","인천광역시":"인천","광주광역시":"광주","대전광역시":"대전","울산광역시":"울산","세종특별자치시":"세종","경기도":"경기","강원특별자치도":"강원","충청북도":"충북","충청남도":"충남","전북특별자치도":"전북","전라북도":"전북","전라남도":"전남","경상북도":"경북","경상남도":"경남","제주특별자치도":"제주"};
  const seenBranches=new Set();
  for(const store of stores){
    const parts=store.address.trim().split(/\s+/);
    store.province=regionNames[parts[0]]||"";
    store.district=parts[1]||store.district;
    // Format check only; this does not certify that a branch is currently open.
    store.addressValid=Boolean(store.province && /(?:구|군|시)$/.test(store.district) &&
      parts.length>=4 && /(?:로|길)\S*\s+\d+(?:-\d+)?$/.test(store.address));
    const key=store.name+"|"+store.address;
    if(seenBranches.has(key))console.warn("중복 매장:",store.name);
    seenBranches.add(key);
    if(!store.addressValid)console.warn("상세 주소 확인 필요:",store.name,store.address);
  }

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

  // Build region choices from source records, so new provinces appear automatically.
  const regions=[...new Set(stores.map(x=>x.province).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"ko"));
  const regionOptions=[["all","등록된 매장 전체"]];
  for(const province of regions){
    regionOptions.push(["province:"+province,province]);
    const names=[...new Set(stores.filter(x=>x.province===province).map(x=>x.district))].sort((a,b)=>a.localeCompare(b,"ko"));
    for(const name of names)regionOptions.push(["district:"+province+"|"+name,province+" · "+name]);
  }
  district.replaceChildren(...regionOptions.map(([value,label])=>{
    const option=document.createElement("option");
    option.value=value;option.textContent=label;
    return option;
  }));

  // Match the header submenu visually while retaining the native select as form state.
  const districtField=district.closest(".store-field");
  if(districtField){
    const dropdown=document.createElement("div");
    dropdown.className="store-district-dropdown";
    const trigger=document.createElement("button");
    trigger.type="button";
    trigger.className="store-district-trigger";
    trigger.setAttribute("aria-haspopup","listbox");
    trigger.setAttribute("aria-expanded","false");
    trigger.setAttribute("aria-label","지역 선택");
    const text=document.createElement("span");
    text.className="store-district-current";
    const chevron=document.createElement("span");
    chevron.className="store-district-chevron";
    chevron.setAttribute("aria-hidden","true");
    trigger.append(text,chevron);
    const options=document.createElement("div");
    options.className="store-district-options";
    options.setAttribute("role","listbox");
    options.setAttribute("aria-label","지역 선택 목록");
    options.id="store-district-options";
    trigger.setAttribute("aria-controls",options.id);
    const items=[];
    const close=()=>{
      dropdown.classList.remove("is-open");
      trigger.setAttribute("aria-expanded","false");
    };
    const sync=()=>{
      text.textContent=district.selectedOptions[0]?.textContent||"등록된 매장 전체";
      items.forEach(item=>{
        const chosen=item.dataset.value===district.value;
        item.classList.toggle("is-active",chosen);
        item.setAttribute("aria-selected",String(chosen));
      });
    };
    for(const option of district.options){
      const item=document.createElement("button");
      item.type="button";
      item.className="store-district-option";
      item.setAttribute("role","option");
      item.dataset.value=option.value;
      item.textContent=option.textContent;
      item.addEventListener("click",()=>{
        district.value=option.value;
        district.dispatchEvent(new Event("change",{bubbles:true}));
        close();
        trigger.focus();
      });
      items.push(item);
      options.append(item);
    }
    dropdown.append(trigger,options);
    district.insertAdjacentElement("afterend",dropdown);
    district.classList.add("store-district-native-hidden");
    trigger.addEventListener("click",()=>{
      const opening=!dropdown.classList.contains("is-open");
      dropdown.classList.toggle("is-open",opening);
      trigger.setAttribute("aria-expanded",String(opening));
      if(opening)items.find(item=>item.dataset.value===district.value)?.focus();
    });
    dropdown.addEventListener("keydown",event=>{
      if(event.key==="Escape"){close();trigger.focus();}
      if(event.key==="ArrowDown"||event.key==="ArrowUp"){
        event.preventDefault();
        if(!dropdown.classList.contains("is-open")){trigger.click();return;}
        const current=items.indexOf(document.activeElement);
        items[(current+(event.key==="ArrowDown"?1:-1)+items.length)%items.length].focus();
      }
    });
    document.addEventListener("pointerdown",event=>{
      if(!dropdown.contains(event.target))close();
    });
    district.addEventListener("change",sync);
    sync();
  }
  let filtered=stores.slice();
  let selected=null;
  let map=null;
  let markerLayer=null;
  const markers=new Map();
  const coords=new Map();
  const cacheKey="hosigi-store-geocodes-v2";
  const cacheLifetime=30*24*60*60*1000;
  const reduceMotion=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const validGeo=(store,point)=>{
    if(!store.addressValid||!Array.isArray(point)||point.length!==2||
       !point.every(Number.isFinite))return false;
    const [lat,lng]=point;
    if(lat<33||lat>39||lng<124||lng>132)return false;
    // Regional bounding boxes are a sanity check, not proof of a precise address match.
    if(store.province==="서울")return lat>=37.40&&lat<=37.73&&lng>=126.75&&lng<=127.25;
    if(store.province==="부산")return lat>=34.95&&lat<=35.43&&lng>=128.70&&lng<=129.40;
    return true;
  };
  try{
    const saved=JSON.parse(localStorage.getItem(cacheKey)||"{}");
    for(const store of stores){
      const cached=saved[store.id];
      if(cached&&cached.address===store.address&&
        Date.now()-cached.savedAt<cacheLifetime&&validGeo(store,cached.point)){
        coords.set(store.id,cached.point);
      }
    }
  }catch(e){/* Storage may be unavailable. */}
  const saveCoords=()=>{
    try{
      const data=Object.fromEntries([...coords].map(([id,point])=>{
        const store=stores.find(x=>x.id===id);
        return [id,{point,address:store.address,savedAt:Date.now()}];
      }));
      localStorage.setItem(cacheKey,JSON.stringify(data));
    }catch(e){/* Cache is optional. */}
  };
  const showMessage=(message)=>{
    if(!mapMessage)return;
    if(!message){mapMessage.hidden=true;mapMessage.textContent="";return;}
    mapMessage.hidden=false;mapMessage.textContent=message;
  };
  function markerIcon(active) {
    return L.divIcon({
      className:"store-leaflet-marker",
      html:'<span class="store-marker-pin'+(active?' is-active':'')+'" aria-hidden="true"><svg class="store-location-icon" viewBox="0 0 40 52" width="40" height="52" aria-hidden="true"><path d="M20 1C9.5 1 1 9.5 1 20c0 14 19 31 19 31s19-17 19-31C39 9.5 30.5 1 20 1Z" fill="currentColor"/><circle cx="20" cy="20" r="7.5" fill="#fff"/></svg></span>',
      iconSize:[40,52],
      iconAnchor:[20,51],
      popupAnchor:[0,-46]
    });
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
    window.hosigiNaverMap?.sync?.(filtered,coords,selected);
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
      const tag=document.createElement("span");tag.className="store-card-category";tag.textContent=store.province+" · "+store.district;
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
      if(!store.addressValid){
        const warning=document.createElement("p");
        warning.className="store-card-address-warning";
        warning.textContent="정확한 도로명주소 확인 필요 · 지도 핀 미표시";
        card.append(tag,title,address,warning,actions);
      }else card.append(tag,title,address,actions);
      fragment.append(card);
    }
    list.append(fragment);
  }
  function applySearch(){
    const term=keyword.value.trim().toLocaleLowerCase("ko");
    const region=district.value;
    filtered=stores.filter(store=>{
      const area=region==="all" ||
        (region.startsWith("province:")&&store.province===region.slice(9)) ||
        (region.startsWith("district:")&&store.province+"|"+store.district===region.slice(9));
      return area&&(!term||[store.name,store.address,store.district,store.province].some(v=>v.toLocaleLowerCase("ko").includes(term)));
    });
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
  map=L.map(mapElement,{zoomControl:false,scrollWheelZoom:true}).setView([37.5665,126.9780],11);
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
        window.hosigiNaverMap?.locate?.(point,position.coords.accuracy);
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
    const pending=stores.filter(store=>store.addressValid&&!coords.has(store.id));
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
          if(validGeo(store,[lat,lng])){
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
  window.hosigiStoreMapState={sync:()=>window.hosigiNaverMap?.sync?.(filtered,coords,selected),selectStore};
  geocodeStores();
})();
