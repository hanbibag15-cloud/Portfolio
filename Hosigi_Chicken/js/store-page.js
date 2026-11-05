/* Store locator for the Hosigi renewal portfolio.
   Only sample branches with publicly listed street addresses are included.
   Map coordinates are geocoded at runtime instead of being invented. */
(() => {
  "use strict";
  const stores = [
    {id:"expand-20261105-1",name:"풍무점",address:"경기도 김포시 풍무2로 59",phone:""}, // turn865450search9
    {id:"expand-20261105-2",name:"청라1호점",address:"인천광역시 서구 청라에메랄드로 99",phone:"032-623-4343"}, // turn865450search1
    {id:"expand-20261105-3",name:"성서2호점",address:"대구광역시 달서구 성지로18길 10-4",phone:"053-586-9982"}, // turn202210search2
    {id:"expand-20261105-4",name:"본리점",address:"대구광역시 달서구 대명천로42길 22",phone:""}, // turn202210search0
    {id:"expand-20261105-5",name:"명촌점",address:"울산광역시 북구 명촌20길 33",phone:""}, // turn865450search2
    {id:"expand-20261105-6",name:"김해율하점",address:"경상남도 김해시 율하3로8번길 8-24",phone:"055-724-2223"}, // turn189625search3
    {id:"expand-20261105-7",name:"건입점",address:"제주특별자치도 제주시 동문로 101",phone:"0508-9591-3319"}, // turn189625search9
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
  ,
    // Additional locations provided in the 2026-11-05 checked-store spreadsheet.
    {id:"import-20261105-01",name:"광안점",address:"부산광역시 수영구 광안4동",phone:"051-752-9282",addressNeedsReview:true},
    {id:"import-20261105-02",name:"당감점",address:"부산광역시 부산진구 부암3동",phone:"051-894-0012",addressNeedsReview:true},
    {id:"import-20261105-03",name:"수정점",address:"부산광역시 동구 수정동",phone:"051-462-2510",addressNeedsReview:true},
    {id:"import-20261105-04",name:"사직점",address:"부산광역시 동래구 사직동",phone:"051-504-3999",addressNeedsReview:true},
    {id:"import-20261105-05",name:"번동점",address:"서울 강북구 오현로 156",phone:"02-985-2334",addressNeedsReview:false},
    {id:"import-20261105-06",name:"서초1호점",address:"서울 서초구 반포대로9길 75",phone:"02-522-9931",addressNeedsReview:false},
    {id:"import-20261105-07",name:"노량진점",address:"서울 동작구 노량진로8길 70",phone:"02-821-9922",addressNeedsReview:false},
    {id:"import-20261105-08",name:"청량리점",address:"서울 동대문구 왕산로 43",phone:"02-957-2614",addressNeedsReview:false},
    {id:"import-20261105-09",name:"독산1호점",address:"서울 금천구 남부순환로128길 14",phone:"02-868-5592",addressNeedsReview:false},
    {id:"import-20261105-10",name:"가산점",address:"서울 금천구 가산동 149-25",phone:"02-859-9969",addressNeedsReview:false},
    {id:"import-20261105-11",name:"반송점",address:"부산광역시 해운대구 반송동",phone:"051-545-9933",addressNeedsReview:true},
    {id:"import-20261105-12",name:"개금점",address:"부산광역시 부산진구 개금본동로22번길 29",phone:"051-893-8292",addressNeedsReview:false},
    {id:"import-20261105-13",name:"가야점",address:"부산광역시 부산진구 가야공원로52번길 4",phone:"051-892-9292",addressNeedsReview:false},
    {id:"import-20261105-14",name:"덕포점",address:"부산 사상구 백양대로768번길 8",phone:"051-305-9995",addressNeedsReview:false},
    {id:"import-20261105-15",name:"구포점",address:"부산 북구 시랑로 47",phone:"051-333-1997",addressNeedsReview:false},
    {id:"import-20261105-16",name:"금곡점",address:"부산 북구 효열로 69",phone:"051-361-9993",addressNeedsReview:false},
    {id:"import-20261105-17",name:"호식이주례점",address:"부산 사상구 냉정로 132",phone:"051-315-8292",addressNeedsReview:false},
    {id:"import-20261105-18",name:"덕천점",address:"부산 북구 만덕대로 102번길",phone:"051-341-9919",addressNeedsReview:true},
    {id:"import-20261105-19",name:"만덕점",address:"부산 북구 만덕3로48번나길 18-1",phone:"051-335-6667",addressNeedsReview:false},
    {id:"import-20261105-20",name:"엄궁점",address:"부산 사상구 엄궁로179번길 50",phone:"051-313-8293",addressNeedsReview:false},
    {id:"import-20261105-21",name:"당리점",address:"부산 사하구 낙동대로356번길 56",phone:"051-293-9996",addressNeedsReview:false},
    {id:"import-20261105-22",name:"정관점",address:"부산광역시 기장군 정관읍 방곡로 39",phone:"051-727-3198",addressNeedsReview:false},
    {id:"import-20261105-23",name:"명지점",address:"부산광역시 강서구 명지오션시티8로12번길 9",phone:"051-291-9282",addressNeedsReview:false},
    {id:"import-20261105-24",name:"대연점",address:"부산광역시 남구 대연동 대연동",phone:"051-626-5592",addressNeedsReview:true},
    {id:"import-20261105-25",name:"장전점",address:"부산광역시 금정구 금정로119번길 13",phone:"051-518-9229",addressNeedsReview:false},
    {id:"import-20261105-26",name:"영주점",address:"부산 중구 샘길 20",phone:"051-466-9911",addressNeedsReview:false},
    {id:"import-20261105-27",name:"부산대신점",address:"부산 서구 보수대로 173(동대신동1가)",phone:"051-242-9958",addressNeedsReview:false},
    {id:"import-20261105-28",name:"망미점",address:"부산 수영구 연수로296번길 9",phone:"051-755-8255",addressNeedsReview:false},
    {id:"import-20261105-29",name:"신내점",address:"서울 중랑구 신내동 563-2",phone:"02-491-9979",addressNeedsReview:false},
    {id:"import-20261105-30",name:"반여점",address:"부산 해운대구 반여로155번길 42",phone:"051-524-9909",addressNeedsReview:false},
    {id:"import-20261105-31",name:"장산점",address:"부산 해운대구 양운로 182(좌동)",phone:"051-704-8892",addressNeedsReview:false}
  ];

  // Province/district classification from actual store addresses; no guessed locations.
  const regionNames={"서울":"서울","부산":"부산","서울특별시":"서울","부산광역시":"부산","대구광역시":"대구","인천광역시":"인천","광주광역시":"광주","대전광역시":"대전","울산광역시":"울산","세종특별자치시":"세종","경기도":"경기","강원특별자치도":"강원","충청북도":"충북","충청남도":"충남","전북특별자치도":"전북","전라북도":"전북","전라남도":"전남","경상북도":"경북","경상남도":"경남","제주특별자치도":"제주"};
  const seenBranches=new Set();
  for(const store of stores){
    const parts=store.address.trim().split(/\s+/);
    store.province=regionNames[parts[0]]||"";
    store.district=parts[1]||store.district;
    // Format check only; this does not certify that a branch is currently open.
    const hasStreetNumber=/(?:로|길)\S*\s+\d+(?:-\d+)?(?:\([^)]*\))?$/.test(store.address);
    const hasLotNumber=/[가-힣]+(?:동|리)\s+\d+(?:-\d+)?$/.test(store.address);
    store.addressValid=Boolean(!store.addressNeedsReview && store.province &&
      /(?:구|군|시)$/.test(store.district) && parts.length>=4 &&
      (hasStreetNumber||hasLotNumber));
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
  const regionOptions=[["all","전체"]];
  // Keep the dropdown compact: city-level choices only, not individual districts.
  for(const province of regions){
    regionOptions.push(["province:"+province,province]);
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
      text.textContent=district.selectedOptions[0]?.textContent||"전체";
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
  let activeClusterKey=null;
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
    const mapped=filtered.filter(store=>coords.has(store.id)).map(store=>({...store,point:coords.get(store.id)}));
    const groups=window.hosigiClusterStores?window.hosigiClusterStores(mapped,map.getZoom()):mapped.map(store=>({items:[store],point:store.point}));
    for(const group of groups){
      if(group.items.length>1){
        const count=group.items.length;
        const clusterKey=group.items.map(item=>item.id).sort().join("|");
        const active=clusterKey===activeClusterKey;
        const icon=L.divIcon({
          className:"store-cluster-wrapper",
          html:'<span class="store-cluster-count'+(active?' is-selected':'')+'" aria-label="'+count+'개 매장">'+count+'</span>',
          iconSize:[46,46],iconAnchor:[23,23]
        });
        const clustered=L.marker(group.point,{icon,title:count+"개 매장 확대해서 보기"});
        clustered.on("click",()=>{
          activeClusterKey=clusterKey;
          clustered.getElement()?.querySelector(".store-cluster-count")?.classList.add("is-selected");
          const points=group.items.map(item=>item.point);
          const bounds=L.latLngBounds(points);
          const nextZoom=Math.min(18,map.getZoom()+2);
          // A single animated flight avoids the jump caused by fitting bounds
          // and then immediately calling setZoom.
          if(bounds.getNorthEast().equals(bounds.getSouthWest())){
            map.flyTo(bounds.getCenter(),nextZoom,{animate:!reduceMotion(),duration:0.9});
          }else{
            map.flyToBounds(bounds,{
              padding:[65,65],maxZoom:nextZoom,
              animate:!reduceMotion(),duration:0.9
            });
          }
        });
        clustered.addTo(markerLayer);
        continue;
      }
      const store=group.items[0];
      const point=store.point;
      const marker=L.marker(point,{icon:markerIcon(store.id===selected),title:"호식이두마리치킨 "+store.name});
      const popup=document.createElement("div");
      const heading=document.createElement("strong");
      heading.className="store-popup-title";heading.textContent="호식이두마리치킨 "+store.name;
      const address=document.createElement("p");
      address.className="store-popup-address";address.textContent=store.address;
      popup.append(heading,address);
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
    // Recalculate after flyTo so the selected store is available as an individual pin.
    map.once("moveend",()=>{refreshMarkers();markers.get(id)?.openPopup();});
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
        (region.startsWith("province:")&&store.province===region.slice(9));
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
  map.on("zoomend",refreshMarkers);
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
        // Only the position marker and accuracy circle are displayed; no popup.
        userAccuracyCircle=L.circle(point,{
          radius:Math.min(Math.max(position.coords.accuracy,10),2000),
          color:"#E60012",fillColor:"#E60012",fillOpacity:.09,weight:2
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
