/* Optional NAVER Maps adapter. When no Client ID is configured or authentication fails,
   the existing Leaflet/OpenStreetMap locator remains available. */
(() => {
  "use strict";
  const clientId=(window.HOSIGI_NAVER_MAP_CLIENT_ID||"").trim();
  if(!clientId || !/^[a-zA-Z0-9_-]+$/.test(clientId))return;
  const host=document.getElementById("store-map");
  if(!host)return;
  const panel=host.closest(".store-map-panel");
  const overlay=document.createElement("div");
  overlay.id="store-naver-map";
  overlay.setAttribute("aria-label","네이버 지도에서 매장 위치 확인");
  overlay.style.cssText="position:absolute;inset:0;z-index:2;display:none";
  panel.insertBefore(overlay,panel.firstChild);
  let map=null,naverMarkers=[],currentMarker=null,accuracyCircle=null,latest=[],coords=null,selected=null;
  function ll(point){return new naver.maps.LatLng(point[0],point[1]);}
  function markerHTML(active) {
    return '<div class="store-naver-pin'+(active?' is-active':'')+'"><svg class="store-pin-symbol" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10V20H20V10"/><path d="M3 10L5.2 4H18.8L21 10"/><path d="M3 10C3 12 6 12 6 10C6 12 9 12 9 10C9 12 12 12 12 10C12 12 15 12 15 10C15 12 18 12 18 10C18 12 21 12 21 10"/><path d="M9 20V14H15V20"/></svg><span class="store-pin-wave" aria-hidden="true"></span><span class="store-pin-wave store-pin-wave--delayed" aria-hidden="true"></span></div>';
  }
  function sync(stores,positions,activeId) {
    latest=stores;coords=positions;selected=activeId;
    if(!map)return;
    naverMarkers.forEach(m=>m.setMap(null));naverMarkers=[];
    const points=[];
    stores.forEach(store=>{
      const pos=positions.get(store.id);
      if(!pos)return;
      points.push(pos);
      const marker=new naver.maps.Marker({
        map,position:ll(pos),title:"호식이두마리치킨 "+store.name,
        icon:{content:markerHTML(store.id===activeId),size:new naver.maps.Size(70,78),anchor:new naver.maps.Point(35,74)}
      });
      naver.maps.Event.addListener(marker,"click",()=>window.hosigiStoreMapState?.selectStore(store.id,false));
      naverMarkers.push(marker);
    });
    if(!points.length){map.setCenter(ll([37.5665,126.978]));map.setZoom(11);return;}
    if(points.length===1){map.setCenter(ll(points[0]));map.setZoom(14);return;}
    const bounds=new naver.maps.LatLngBounds(ll(points[0]),ll(points[0]));
    points.slice(1).forEach(p=>bounds.extend(ll(p)));
    map.fitBounds(bounds,{top:65,right:65,bottom:65,left:65});
  }
  function focus(id){
    if(!map || !coords?.has(id))return;
    map.panTo(ll(coords.get(id)));
    map.setZoom(14);
  }
  function locate(point,accuracy){
    if(!map)return;
    currentMarker?.setMap(null);accuracyCircle?.setMap(null);
    currentMarker=new naver.maps.Marker({
      map,position:ll(point),title:"내 현재 위치",
      icon:{content:'<div class="store-naver-current"></div>',size:new naver.maps.Size(26,26),anchor:new naver.maps.Point(13,13)}
    });
    accuracyCircle=new naver.maps.Circle({map,center:ll(point),radius:Math.min(Math.max(accuracy,10),2000),strokeColor:"#1674db",strokeOpacity:.6,fillColor:"#1674db",fillOpacity:.08});
    map.panTo(ll(point));map.setZoom(14);
  }
  window.hosigiNaverMap={sync,focus,locate};
  window.navermap_authFailure=()=>{overlay.style.display="none";host.style.visibility="visible";window.hosigiNaverMap=null;};
  const script=document.createElement("script");
  script.src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId="+encodeURIComponent(clientId);
  script.async=true;
  script.onload=()=>{
    if(!window.naver?.maps)return;
    try{
      map=new naver.maps.Map(overlay,{center:new naver.maps.LatLng(37.5665,126.978),zoom:11,zoomControl:false,scrollWheel:true});
      overlay.style.display="block";
      host.style.visibility="hidden";
      sync(latest,coords||new Map(),selected);
      window.hosigiStoreMapState?.sync();
      if("ResizeObserver" in window)new ResizeObserver(()=>naver.maps.Event.trigger(map,"resize")).observe(overlay);
    }catch(e){overlay.style.display="none";host.style.visibility="visible";}
  };
  script.onerror=()=>{overlay.style.display="none";host.style.visibility="visible";};
  document.head.append(script);
})();
