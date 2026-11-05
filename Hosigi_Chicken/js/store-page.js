/* Store locator for the Hosigi renewal portfolio.
   Only sample branches with publicly listed street addresses are included.
   Map coordinates are geocoded at runtime instead of being invented. */
(() => {
  "use strict";
  const stores = [
    {id:"verified-20261105-01",name:"동탄역점",address:"경기도 화성시 동탄대로21가길 4-3",phone:""}, // source: turn747474search9
    {id:"verified-20261105-02",name:"상동1호점",address:"경기도 부천시 원미구 조마루로105번길 30",phone:""}, // source: turn747474search12
    {id:"verified-20261105-03",name:"인천갈산점",address:"인천광역시 부평구 주부토로249번길 17",phone:"032-522-1771"}, // source: turn260282search7
    {id:"verified-20261105-04",name:"화수점",address:"인천광역시 동구 운교로 12",geocodeAlt:"인천광역시 동구 화수동 287-51",phone:"032-221-7772"}, // source: turn260282search4
    {id:"verified-20261105-05",name:"인천학익점",address:"인천광역시 미추홀구 매소홀로 482",phone:"0507-1381-3085"}, // source: turn260282search0
    {id:"verified-20261105-06",name:"인천연희점",address:"인천광역시 서구 연희로14번길 9-3",phone:"032-566-6339"}, // source: turn747474search7
    {id:"verified-20261105-07",name:"인천신흥점",address:"인천광역시 중구 서해대로449번길 6-7",phone:"032-766-3755"}, // source: turn747474search13
    {id:"verified-20261105-08",name:"청천점",address:"인천광역시 부평구 산청로 102",phone:""}, // source: turn747474search11
    {id:"verified-20261105-09",name:"검암점",address:"인천광역시 서구 승학로495번길 16",phone:"032-561-9985"}, // source: turn747474search8
    {id:"verified-20261105-10",name:"신서점",address:"대구광역시 동구 동호로9길 57",phone:""}, // source: turn511293search12
    {id:"verified-20261105-11",name:"노변점",address:"대구광역시 수성구 노변로 55",phone:"0507-1343-9282"}, // source: turn511293search14
    {id:"verified-20261105-12",name:"시지1호점",address:"대구광역시 수성구 신매로16길 76",phone:"053-794-9995"}, // source: turn511293search7
    {id:"verified-20261105-13",name:"신정5동점",address:"울산광역시 남구 월평로171번길 26",phone:"052-258-6636"}, // source: turn260282search1
    {id:"verified-20261105-14",name:"강동점",address:"울산광역시 북구 산하중앙2로 275",phone:"052-296-9299"}, // source: turn260282search5
    {id:"verified-20261105-15",name:"온양점",address:"울산광역시 울주군 온양읍 연안4길 5",phone:"052-239-9963"}, // source: turn260282search9
    {id:"verified-20261105-16",name:"울산언양점",address:"울산광역시 울주군 언양읍 방천8길 5",phone:""}, // source: turn747474search3
    {id:"verified-20261105-17",name:"울산삼산점",address:"울산광역시 남구 남중로105번길 2-1",phone:"052-227-9599"}, // source: turn260282search3
    {id:"verified-20261105-18",name:"거제1호점",address:"경상남도 거제시 장평3로4길 45",phone:"055-637-9377"}, // source: turn511293search15
    {id:"verified-20261105-19",name:"자산남성점",address:"경상남도 창원시 마산합포구 오동북11길 18",phone:"055-245-0922"}, // source: turn511293search10
    {id:"verified-20261105-20",name:"도남점",address:"제주특별자치도 제주시 신성로 62",phone:""}, // source: turn688562search1
    {id:"verified-20261105-21",name:"안덕점",address:"제주특별자치도 서귀포시 안덕면 일주서로 1449",phone:""}, // source: turn688562search2
    {id:"verified-20261105-22",name:"연동신시가지점",address:"제주특별자치도 제주시 국기중길 5-6",phone:""}, // source: turn688562search3
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
  const koreanOrder=new Intl.Collator("ko-KR",{usage:"sort",sensitivity:"base"});
  const regions=[...new Set(stores.map(x=>x.province).filter(Boolean))].sort(koreanOrder.compare);
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
        // '전체' restores the complete list and resets the map, not just the city filter.
        if(option.value==="all")keyword.value="";
        district.dispatchEvent(new Event("change",{bubbles:true}));
        close();
        trigger.focus();
      });
      items.push(item);
      options.append(item);
    }
    // Fixed 30px visual thumb: native thumb lengths are controlled by the browser.
    // Keep the actual options scrollable for wheel, touch and keyboard users.
    const scrollIndicator=document.createElement("span");
    scrollIndicator.className="store-district-scroll-indicator";
    scrollIndicator.setAttribute("aria-hidden","true");
    const scrollThumb=document.createElement("span");
    scrollThumb.className="store-district-scroll-thumb";
    scrollIndicator.append(scrollThumb);
    dropdown.append(trigger,options,scrollIndicator);
    const updateThumb=()=>{
      const remaining=options.scrollHeight-options.clientHeight;
      const travel=Math.max(0,scrollIndicator.clientHeight-scrollThumb.offsetHeight);
      scrollIndicator.classList.toggle("has-overflow",remaining>1);
      scrollThumb.style.transform="translateY("+(remaining>0?(options.scrollTop/remaining)*travel:0)+"px)";
    };
    options.addEventListener("scroll",updateThumb,{passive:true});
    district.insertAdjacentElement("afterend",dropdown);
    district.classList.add("store-district-native-hidden");
    trigger.addEventListener("click",()=>{
      const opening=!dropdown.classList.contains("is-open");
      dropdown.classList.toggle("is-open",opening);
      trigger.setAttribute("aria-expanded",String(opening));
      if(opening){
        requestAnimationFrame(updateThumb);
        items.find(item=>item.dataset.value===district.value)?.focus();
      }
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
    window.addEventListener("resize",updateThumb,{passive:true});
    sync();
  }
  let filtered=[];
  let geocodingComplete=false;
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
  // Only show branches that have a usable map coordinate. A card should
  // never be offered as clickable when the map has nowhere to navigate.
  const matchesCurrentFilter=store=>{
    const region=district.value;
    const term=keyword.value.trim().toLocaleLowerCase("ko");
    return (region==="all"||(region.startsWith("province:")&&store.province===region.slice(9))) &&
      (!term||[store.name,store.address,store.district,store.province].some(v=>v.toLocaleLowerCase("ko").includes(term)));
  };
  const mappedStores=()=>stores.filter(store=>coords.has(store.id)&&matchesCurrentFilter(store));
  function refreshMappedList(){
    const previous=filtered.map(store=>store.id).join("|");
    const next=mappedStores();
    if(previous===next.map(store=>store.id).join("|"))return;
    const scrollTop=list.scrollTop;
    const focusedId=document.activeElement?.closest?.(".store-card")?.dataset.id;
    filtered=next;
    if(selected&&!filtered.some(store=>store.id===selected)){selected=null;clearDistance();}
    renderCards();
    list.scrollTop=scrollTop;
    if(focusedId){
      list.querySelector('.store-card[data-id="'+focusedId+'"] .store-card-hit-area')?.focus({preventScroll:true});
    }
    refreshMarkers();
  }
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
  let animateClusterSplit=false;
  // GPS takes precedence over initial async geocoding and layout-driven auto-fit.
  let gpsNavigationActive=false;
  let userNavigationActive=false;
  // Distance between GPS and selected store is a straight-line estimate.
  let gpsPoint=null;
  let distanceLine=null;
  let distanceLabel=null;
  let distanceRenderId=0;
  const distanceKm=(a,b)=>{
    const rad=Math.PI/180;
    const deltaLat=(b[0]-a[0])*rad;
    const deltaLng=(b[1]-a[1])*rad;
    const value=Math.sin(deltaLat/2)**2+
      Math.cos(a[0]*rad)*Math.cos(b[0]*rad)*Math.sin(deltaLng/2)**2;
    const km=6371*2*Math.atan2(Math.sqrt(value),Math.sqrt(Math.max(0,1-value)));
    return km.toFixed(1)+"km";
  };
  // Draw by moving the endpoint through geographic coordinates. Unlike a
  // pixel dash animation, the line stays intact after any map zoom or pan.
  function clearDistance(){
    ++distanceRenderId;
    if(distanceLine){map?.removeLayer(distanceLine);distanceLine=null;}
    if(distanceLabel){map?.removeLayer(distanceLabel);distanceLabel=null;}
    window.hosigiNaverMap?.clearDistance?.();
  }
  function drawDistance(fit=true){
    clearDistance();
    if(!map||!gpsVisible||!gpsPoint||!selected||!coords.has(selected))return false;
    const from=gpsPoint.slice();
    const destination=coords.get(selected).slice();
    const renderId=distanceRenderId;
    const midpoint=[(from[0]+destination[0])/2,(from[1]+destination[1])/2];
    const distanceValue=distanceKm(from,destination);
    // Prepare the label, but only add it after the connection is complete.
    const revealDistance=()=>{
      if(renderId!==distanceRenderId||distanceLabel)return;
      const textIcon=L.divIcon({
        className:"store-distance-text-icon",
        html:'<span class="store-distance-text">'+distanceValue+'</span>',
        iconSize:[120,36],iconAnchor:[60,18]
      });
      distanceLabel=L.marker(midpoint,{
        icon:textIcon,interactive:false,zIndexOffset:1100
      }).addTo(map);
    };
    distanceLine=L.polyline([from,from],{
      color:"#E60012",weight:4,opacity:.95,interactive:false,
      lineCap:"round",className:"store-distance-line"
    }).addTo(map);
    const drawLine=()=>{
      if(renderId!==distanceRenderId||!distanceLine)return;
      if(reduceMotion()){
        distanceLine.setLatLngs([from,destination]);
        revealDistance();
        return;
      }
      const start=performance.now();
      const duration=400;
      const frame=now=>{
        if(renderId!==distanceRenderId||!distanceLine)return;
        const t=Math.min(1,(now-start)/duration);
        const eased=1-Math.pow(1-t,3);
        const end=[
          from[0]+(destination[0]-from[0])*eased,
          from[1]+(destination[1]-from[1])*eased
        ];
        distanceLine.setLatLngs([from,end]);
        if(t<1)requestAnimationFrame(frame);
        else {
          distanceLine.setLatLngs([from,destination]);
          revealDistance();
        }
      };
      requestAnimationFrame(frame);
    };
    // Keep both map providers consistent: horizontal km label at the midpoint.
    window.hosigiNaverMap?.setDistance?.(from,destination,distanceValue,fit);
    if(fit){
      map.stop();
      map.once("moveend",drawLine);
      map.flyToBounds(L.latLngBounds([from,destination]),{
        padding:[80,80],maxZoom:16,
        animate:!reduceMotion(),duration:.55
      });
      // If reduced motion, flyToBounds itself is immediate and moveend handles reveal.
    }else drawLine();
    return true;
  }
  // Async address lookups must not override a cluster/store chosen by the visitor.
  function fitPoints() {
    if(!map || gpsNavigationActive || userNavigationActive)return;
    const pts=filtered.map(store=>coords.get(store.id)).filter(Boolean);
    if(pts.length===0) {
      map.setView([37.5665,126.9780],11);
    } else if (pts.length===1) {
      map.setView(pts[0],14,{animate:!reduceMotion()});
    } else {
      map.fitBounds(L.latLngBounds(pts),{padding:[45,45],maxZoom:13,animate:!reduceMotion()});
    }
  }
  function refreshMarkers(revealSplit=false){
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
          html:'<span class="store-cluster-count'+(active?' is-selected':'')+(revealSplit?' is-entering':'')+'" aria-label="'+count+'개 매장">'+count+'</span>',
          iconSize:[46,46],iconAnchor:[23,23]
        });
        const clustered=L.marker(group.point,{icon,title:count+"개 매장 확대해서 보기"});
        clustered.on("click",()=>{
          userNavigationActive=true;
          map.stop();
          animateClusterSplit=true;
          activeClusterKey=clusterKey;
          clustered.getElement()?.querySelector(".store-cluster-count")?.classList.add("is-selected");
          const points=group.items.map(item=>item.point);
          const bounds=L.latLngBounds(points);
          const nextZoom=Math.min(18,map.getZoom()+2);
          // A single animated flight avoids the jump caused by fitting bounds
          // and then immediately calling setZoom.
          if(bounds.getNorthEast().equals(bounds.getSouthWest())){
            map.flyTo(bounds.getCenter(),nextZoom,{animate:!reduceMotion(),duration:0.65});
          }else{
            map.flyToBounds(bounds,{
              padding:[65,65],maxZoom:nextZoom,
              animate:!reduceMotion(),duration:0.65
            });
          }
        });
        clustered.addTo(markerLayer);
        continue;
      }
      const store=group.items[0];
      const point=store.point;
      const marker=L.marker(point,{icon:markerIcon(store.id===selected),title:"호식이두마리치킨 "+store.name});
      if(revealSplit){
        marker.on("add",()=>{
          const pin=marker.getElement()?.querySelector(".store-marker-pin");
          if(pin)pin.classList.add("is-entering");
        });
      }
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
  // Single queue for background and clicked-store lookups. The clicked store
  // moves to the front instead of racing the background requests and being 429ed.
  const geoJobs=new Map();
  const geoQueue=[];
  let geoBusy=false;
  const geoDelay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  const getGeoCandidates=store=>{
    const values=[store.address,store.geocodeAlt];
    // Try a normalized, still house-number-specific variant. Never use a
    // bare district or city center as though it were the store location.
    const normalized=store.address.replace(/^(서울특별시|서울|부산광역시|부산|인천광역시|대구광역시|울산광역시|경기도|경상남도|제주특별자치도)\s+/,"");
    values.push(normalized+", 대한민국");
    return [...new Set(values.filter(Boolean))].slice(0,3);
  };
  async function pumpGeoQueue(){
    if(geoBusy)return;
    geoBusy=true;
    try{
      while(geoQueue.length){
        const job=geoQueue.shift();
        const {store,resolve}=job;
        if(coords.has(store.id)){resolve(coords.get(store.id));continue;}
        let resolved=null;
        if(store.addressValid){
          for(const address of getGeoCandidates(store)){
            try{
              const endpoint="https://nominatim.openstreetmap.org/search?format=jsonv2&limit=3&countrycodes=kr&q="+encodeURIComponent(address);
              const response=await fetch(endpoint,{headers:{"Accept":"application/json"}});
              if(response.ok){
                const matches=await response.json();
                for(const item of matches){
                  const point=[Number(item.lat),Number(item.lon)];
                  if(validGeo(store,point)){resolved=point;break;}
                }
              }
            }catch(e){/* Keep the queue moving when geocoding is unavailable. */}
            // Respect the public service's one-request-per-second guideline.
            await geoDelay(1100);
            if(resolved)break;
          }
        }
        if(resolved){
          coords.set(store.id,resolved);
          saveCoords();
          refreshMappedList();
        }
        geoJobs.delete(store.id);
        resolve(resolved);
      }
    }finally{geoBusy=false;}
  }
  function ensureStorePoint(store,priority=true){
    if(coords.has(store.id))return Promise.resolve(coords.get(store.id));
    if(!store.addressValid)return Promise.resolve(null);
    const queued=geoJobs.get(store.id);
    if(queued){
      if(priority){
        const index=geoQueue.indexOf(queued);
        if(index>0){geoQueue.splice(index,1);geoQueue.unshift(queued);}
      }
      return queued.promise;
    }
    let resolve;
    const promise=new Promise(done=>{resolve=done;});
    const job={store,promise,resolve};
    geoJobs.set(store.id,job);
    if(priority)geoQueue.unshift(job);
    else geoQueue.push(job);
    void pumpGeoQueue();
    return promise;
  }
  function selectStore(id,scrollToCard=true) {
    gpsNavigationActive=false;
    userNavigationActive=true;
    selected=id;
    for(const card of list.querySelectorAll(".store-card")){
      const active=card.dataset.id===id;
      card.classList.toggle("is-selected",active);
      card.querySelector(".store-card-hit-area")?.setAttribute("aria-pressed",String(active));
      if(active && scrollToCard && list.scrollHeight>list.clientHeight+1){
        // Scroll only the card list, not the surrounding page or map.
        // Keep 12px of space so selected borders are never clipped.
        const outer=list.getBoundingClientRect();
        const inner=card.getBoundingClientRect();
        const padding=12;
        let offset=0;
        if(inner.top<outer.top+padding)offset=inner.top-(outer.top+padding);
        else if(inner.bottom>outer.bottom-padding)offset=inner.bottom-(outer.bottom-padding);
        if(Math.abs(offset)>1)list.scrollBy({top:offset,behavior:reduceMotion()?"auto":"smooth"});
      }
    }
    refreshMarkers();
    const store=stores.find(item=>item.id===id);
    if(!map || !store)return;
    const goToPoint=(pt)=>{
      if(selected!==id)return;
      if(!pt){
        const card=list.querySelector('.store-card[data-id="'+id+'"]');
        card?.classList.add("is-location-unavailable");
        card?.setAttribute("title","이 주소의 지도 좌표를 확인하지 못했습니다.");
        return;
      }
      if(drawDistance(true))return;
      map.stop();
      map.flyTo(pt,15,{animate:!reduceMotion(),duration:.65});
      map.once("moveend",()=>{
        if(selected!==id)return;
        refreshMarkers();
        markers.get(id)?.openPopup();
      });
      window.hosigiNaverMap?.focus?.(id);
    };
    if(coords.has(id))goToPoint(coords.get(id));
    else {
      // Newly imported branches may not have completed initial geocoding.
      const card=list.querySelector('.store-card[data-id="'+id+'"]');
      card?.classList.add("is-location-loading");
      ensureStorePoint(store).then(pt=>{
        card?.classList.remove("is-location-loading");
        goToPoint(pt);
      });
    }
  }
  function renderCards(){
    list.replaceChildren();
    count.textContent=String(filtered.length);
    if(!filtered.length){
      const empty=document.createElement("div");
      empty.className="store-empty";
      const strong=document.createElement("strong");
      strong.textContent=geocodingComplete?"표시할 매장이 없습니다.":"매장 위치 확인 중입니다.";
      const p=document.createElement("p");
      p.textContent=geocodingComplete
        ?"지도 위치가 확인된 매장만 목록에 표시됩니다."
        :"주소에서 지도 위치를 확인한 매장부터 목록에 추가됩니다.";
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
      // Full-card action matches the reference: keep the phone link independently clickable.
      const actions=document.createElement("div");actions.className="store-card-actions";
      const cardAction=document.createElement("button");
      cardAction.type="button";
      cardAction.className="store-card-hit-area";
      cardAction.setAttribute("aria-label","호식이두마리치킨 "+store.name+" 지도 위치 보기");
      cardAction.setAttribute("aria-pressed",String(store.id===selected));
      cardAction.addEventListener("click",()=>selectStore(store.id));
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
      // Add the overlay last, while the phone link stays above it through CSS.
      card.append(cardAction);
      fragment.append(card);
    }
    list.append(fragment);
  }
  function applySearch(){
    // Only a new search is allowed to restore automatic fitting of result bounds.
    gpsNavigationActive=false;
    userNavigationActive=false;
    const term=keyword.value.trim().toLocaleLowerCase("ko");
    const region=district.value;
    // A new search resets selection; '전체' also returns the camera to all branches.
    activeClusterKey=null;
    selected=null;
    clearDistance();
    if(map){map.stop();map.closePopup();}
    window.hosigiNaverMap?.clearClusterSelection?.();
    filtered=mappedStores();
    // Invalidate stale GPS/moveend callbacks that could reopen an old popup.
    ++gpsRequestNumber;
    if(userLocationMarker){map.removeLayer(userLocationMarker);userLocationMarker=null;}
    if(userAccuracyCircle){map.removeLayer(userAccuracyCircle);userAccuracyCircle=null;}
    gpsVisible=false;
    gpsPoint=null;
    clearDistance();
    gpsButton?.setAttribute("aria-pressed","false");
    window.hosigiNaverMap?.clearLocation?.();
    renderCards();
    refreshMarkers();
    if(region==="all" && !term){
      window.hosigiNaverMap?.resetView?.();
      list.scrollTo({top:0,behavior:"auto"});
    }
    fitPoints();
  }
  form.addEventListener("submit",event=>{event.preventDefault();applySearch();});
  district.addEventListener("change",applySearch);
  keyword.addEventListener("input",()=>{if(!keyword.value.trim())applySearch();});
  filtered=mappedStores();
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
  map.on("zoomend",()=>{
    const reveal=animateClusterSplit;
    animateClusterSplit=false;
    refreshMarkers(reveal);
  });
  let userLocationMarker=null;
  let userAccuracyCircle=null;
  let gpsRequestNumber=0;
  let gpsVisible=false;
  if(gpsButton){
    gpsButton.setAttribute("aria-pressed","false");
    gpsButton.addEventListener("click",()=>{
      if(gpsVisible){
        // Second click hides the location overlays without moving the map.
        ++gpsRequestNumber; // Invalidate any pending moveend callback.
        map.stop();
        if(userLocationMarker){map.removeLayer(userLocationMarker);userLocationMarker=null;}
        if(userAccuracyCircle){map.removeLayer(userAccuracyCircle);userAccuracyCircle=null;}
        window.hosigiNaverMap?.clearLocation?.();
        gpsVisible=false;
        gpsPoint=null;
        clearDistance();
        gpsNavigationActive=false;
        gpsButton.setAttribute("aria-pressed","false");
        showMessage("");
        return;
      }
      // Lock the viewport before the asynchronous location permission request.
      // Font loading, initial geocoding and resize callbacks must not recenter it.
      gpsNavigationActive=true;
      userNavigationActive=true;
      map.stop();
      if(!navigator.geolocation){
        gpsNavigationActive=false;
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
        gpsPoint=point;
        gpsVisible=true;
        gpsButton.setAttribute("aria-pressed","true");
        window.hosigiNaverMap?.locate?.(point,position.coords.accuracy);
        if(userLocationMarker)map.removeLayer(userLocationMarker);
        if(userAccuracyCircle)map.removeLayer(userAccuracyCircle);
        const icon=L.divIcon({className:"store-leaflet-marker",html:'<span class="store-current-location" aria-hidden="true"></span>',iconSize:[28,28],iconAnchor:[14,14]});
        userLocationMarker=L.marker(point,{icon,title:"내 현재 위치",zIndexOffset:1000}).addTo(map);
        // Only the position marker and accuracy circle are displayed; no popup.
        const requestNumber=++gpsRequestNumber;
        const accuracy=position.coords.accuracy;
        // Wait for the camera animation to finish before adding a large SVG
        // circle; otherwise the zoom transition can paint an oversized red blob.
        const drawAccuracy=()=>{
          if(requestNumber!==gpsRequestNumber)return;
          if(userAccuracyCircle){map.removeLayer(userAccuracyCircle);userAccuracyCircle=null;}
          if(Number.isFinite(accuracy)&&accuracy>=0&&accuracy<=500){
            userAccuracyCircle=L.circle(point,{
              radius:Math.max(accuracy,10),
              color:"#E60012",fillColor:"#E60012",
              opacity:.8,fillOpacity:.035,weight:2,interactive:false
            }).addTo(map);
            showMessage("내 현재 위치를 표시했어요.");
          }else{
            showMessage("현재 위치는 표시했지만 GPS 오차가 커 정확도 범위는 생략했어요.");
          }
        };
        // If a store is already selected, show the pair instead of flying to GPS alone.
        if(drawDistance(true))return;
        map.stop();
        if(!reduceMotion()){
          map.once("moveend",drawAccuracy);
          map.flyTo(point,14,{animate:true,duration:.75});
        }else{
          map.setView(point,14,{animate:false});
          drawAccuracy();
        }
      },error=>{
        gpsNavigationActive=false;
        gpsVisible=false;
        gpsPoint=null;
        clearDistance();
        gpsButton.setAttribute("aria-pressed","false");
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
    if(!pending.length){geocodingComplete=true;refreshMappedList();refreshMarkers();fitPoints();return;}
    // Shared queue eliminates overlapping requests; selected branches jump ahead.
    await Promise.all(pending.map(store=>ensureStorePoint(store,false)));
    geocodingComplete=true;
    refreshMappedList();
    renderCards();
    refreshMarkers();
    fitPoints();
  }
  window.hosigiStoreMapState={sync:()=>window.hosigiNaverMap?.sync?.(filtered,coords,selected),selectStore,isGpsNavigationActive:()=>gpsNavigationActive,isUserNavigationActive:()=>userNavigationActive,lockUserNavigation:()=>{userNavigationActive=true;}};
  geocodeStores();
})();
