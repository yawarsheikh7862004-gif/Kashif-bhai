(()=>{
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
for(const el of document.querySelectorAll('.hero-water,.water-stage')){
 const im=el.querySelector('img'),c=el.querySelector('canvas'); if(!im||!c)continue;
 const g=c.getContext('2d',{alpha:false}); if(!g)continue;
 const base=document.createElement('canvas'),b=base.getContext('2d'); let w=0,h=0,water=0,visible=false,raf=0,last=0;
 function resize(){if(!im.naturalWidth)return;const r=el.getBoundingClientRect();if(!r.width||!r.height)return;w=c.width=base.width=Math.min(1100,Math.round(r.width));h=c.height=base.height=Math.round(w*r.height/r.width);const s=Math.max(w/im.naturalWidth,h/im.naturalHeight),dy=(h-im.naturalHeight*s)/2;b.drawImage(im,(w-im.naturalWidth*s)/2,dy,im.naturalWidth*s,im.naturalHeight*s);water=Math.max(0,dy+im.naturalHeight*s*.55);g.drawImage(base,0,0);c.style.opacity='1';}
 function draw(ms){raf=0;if(!visible||!w)return;raf=requestAnimationFrame(draw);if(ms-last<32)return;last=ms;const t=ms/1000;g.drawImage(base,0,0);for(let y=Math.floor(water);y<h;y+=2){const d=(y-water)/Math.max(1,h-water),a=Math.min(1,d*7);for(let x=0;x<w;x+=24){const dx=a*(Math.sin(y*.15-t*3.1+x*.009)*7+Math.sin(y*.071+t*2.2-x*.015)*5+Math.sin(y*.32-t*4.2+x*.004)*2);const dy=a*(Math.sin(y*.12-t*2.8+x*.018)*2.6+Math.cos(y*.24+t*3.5-x*.009)*1.4);const sw=Math.min(24,w-x),sh=Math.min(2,h-y);g.drawImage(base,Math.max(0,Math.min(w-sw,x+dx)),Math.max(0,Math.min(h-sh,y+dy)),sw,sh,x,y,sw,sh);}}}
 function start(){if(visible&&w&&!raf)raf=requestAnimationFrame(draw)}
 im.addEventListener('load',()=>{resize();start()});new ResizeObserver(()=>{resize();start()}).observe(el);new IntersectionObserver(e=>{visible=e[0].isIntersecting;if(visible){resize();start()}else{cancelAnimationFrame(raf);raf=0}}).observe(el);resize();
}
})();
