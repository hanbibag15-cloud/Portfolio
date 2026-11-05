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
  let activeClusterKey=null;
  function ll(point){return new naver.maps.LatLng(point[0],point[1]);}
  function markerHTML(active) {
    return '<div class="store-naver-pin'+(active?' is-active':'')+'"><svg class="store-location-icon" viewBox="0 0 40 52" width="40" height="52" aria-hidden="true"><path d="M20 1C9.5 1 1 9.5 1 20c0 14 19 31 19 31s19-17 19-31C39 9.5 30.5 1 20 1Z" fill="currentColor"/><circle cx="20" cy="20" r="7.5" fill="#fff"/></svg></div>';
  }
  function renderMarkers(){
    if(!map || !coords)return;
    naverMarkers.forEach(marker=>marker.setMap(null));naverMarkers=[];
    const entries=latest.filter(store=>coords.has(store.id)).map(store=>({...store,point:coords.get(store.id)}));
    const groups=window.hosigiClusterStores?window.hosigiClusterStores(entries,map.getZoom()):entries.map(store=>({items:[store],point:store.point}));
    for(const group of groups){
      const clustered=group.items.length>1;
      const count=group.items.length;
      const clusterKey=group.items.map(item=>item.id).sort().join("|");
      const active=clustered&&clusterKey===activeClusterKey;
      const marker=new naver.maps.Marker({
        map,position:ll(group.point),
        title:clustered?count+"개 매장 확대해서 보기":"호식이두마리치킨 "+group.items[0].name,
        icon:clustered?{
          content:'<div class="store-cluster-count'+(active?' is-selected':'')+'" aria-label="'+count+'개 매장">'+count+'</div>',
          size:new naver.maps.Size(46,46),anchor:new naver.maps.Point(23,23)
        }:{
          content:markerHTML(group.items[0].id===selected),
          size:new naver.maps.Size(40,52),anchor:new naver.maps.Point(20,51)
        }
      });
      naver.maps.Event.addListener(marker,"click",()=>{
        if(clustered){
          activeClusterKey=clusterKey;
          renderMarkers(); // Immediately show selected red cluster.
          const bounds=new naver.maps.LatLngBounds(ll(group.items[0].point),ll(group.items[0].point));
          group.items.slice(1).forEach(item=>bounds.extend(ll(item.point)));
          const next=Math.min(18,map.getZoom()+2);
          // morph changes center and zoom in one continuous transition.
          map.morph(bounds.getCenter(),next,{duration:900,easing:"easeOutCubic"});
        }else window.hosigiStoreMapState?.selectStore(group.items[0].id,false);
      });
      naverMarkers.push(marker);
    }
  }
  function sync(stores,positions,activeId) {
    latest=stores;coords=positions;selected=activeId;
    if(!map)return;
    renderMarkers();
    // An active GPS request must not be overridden by automatic store bounds.
    if(window.hosigiStoreMapState?.isGpsNavigationActive?.())return;
    // Only reset map bounds when the searched set changes; do not reset on
    // each zoom or marker refresh.
    const key=stores.map(store=>store.id).join("|");
    if(key===sync.lastKey)return;
    sync.lastKey=key;
    const points=stores.map(store=>positions.get(store.id)).filter(Boolean);
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
    const displayAccuracy=()=>{
      accuracyCircle?.setMap(null);
      accuracyCircle=null;
      if(!Number.isFinite(accuracy)||accuracy<0||accuracy>500)return;
      accuracyCircle=new naver.maps.Circle({
        map,center:ll(point),radius:Math.max(accuracy,10),
        strokeColor:"#E60012",strokeOpacity:.8,strokeWeight:2,
        fillColor:"#E60012",fillOpacity:.035,clickable:false
      });
    };
    // Defer circle drawing until navigation/zoom finishes.
    naver.maps.Event.addListenerOnce(map,"idle",displayAccuracy);
    map.setZoom(14);
    map.panTo(ll(point));
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
      naver.maps.Event.addListener(map,"zoom_changed",renderMarkers);
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
