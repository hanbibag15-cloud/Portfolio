/* Screen-distance clustering for both Leaflet and NAVER maps.
   No extra CDN or API key is required. Zooming in separates the grouped stores. */
(() => {
  "use strict";
  const toPixel=(point,zoom)=>{
    const lat=Math.max(-85.0511,Math.min(85.0511,point[0]))*Math.PI/180;
    const scale=256*Math.pow(2,zoom);
    return [
      (point[1]+180)/360*scale,
      (1-Math.log(Math.tan(lat)+1/Math.cos(lat))/Math.PI)/2*scale
    ];
  };
  window.hosigiClusterStores=(items,zoom)=>{
    if(zoom>=14)return items.map(item=>({items:[item],point:item.point}));
    const threshold=64;
    const pixels=items.map(item=>toPixel(item.point,zoom));
    const visited=new Set(), groups=[];
    for(let i=0;i<items.length;i++){
      if(visited.has(i))continue;
      const queue=[i],members=[];
      visited.add(i);
      while(queue.length){
        const index=queue.shift();
        members.push(items[index]);
        for(let j=0;j<items.length;j++){
          if(visited.has(j))continue;
          const dx=pixels[j][0]-pixels[index][0],dy=pixels[j][1]-pixels[index][1];
          if(dx*dx+dy*dy<=threshold*threshold){visited.add(j);queue.push(j);}
        }
      }
      const point=[
        members.reduce((sum,m)=>sum+m.point[0],0)/members.length,
        members.reduce((sum,m)=>sum+m.point[1],0)/members.length
      ];
      groups.push({items:members,point});
    }
    return groups;
  };
})();
