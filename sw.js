const C="hayot-os-v1",A=["./","index.html","manifest.json","icon-180.png","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
const put=(r,res)=>{if(res&&(res.ok||res.type=="opaque")){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res};
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!="GET")return;
 if(r.mode=="navigate"){e.respondWith(fetch(r).then(res=>put("index.html",res)).catch(()=>caches.match("index.html")));return}
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>put(r,res))))});
