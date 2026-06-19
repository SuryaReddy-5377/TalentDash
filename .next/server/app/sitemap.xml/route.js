"use strict";(()=>{var e={};e.id=475,e.ids=[475],e.modules={846:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4870:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},9294:e=>{e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},2845:(e,t,r)=>{r.r(t),r.d(t,{patchFetch:()=>m,routeModule:()=>p,serverHooks:()=>c,workAsyncStorage:()=>u,workUnitAsyncStorage:()=>d});var a={};r.r(a),r.d(a,{GET:()=>l});var s=r(2706),o=r(8203),i=r(5994),n=r(9187);async function l(){let e="https://talentdash.vercel.app",t=`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${e}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${e}/salaries</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${e}/companies</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;return new n.NextResponse(t,{headers:{"Content-Type":"application/xml","Cache-Control":"public, max-age=86400, stale-while-revalidate=86400"}})}let p=new s.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/sitemap.xml/route",pathname:"/sitemap.xml",filename:"route",bundlePath:"app/sitemap.xml/route"},resolvedPagePath:"C:\\INTERNSHIP\\Unstop\\newtask\\talentdash\\app\\sitemap.xml\\route.ts",nextConfigOutput:"",userland:a}),{workAsyncStorage:u,workUnitAsyncStorage:d,serverHooks:c}=p;function m(){return(0,i.patchFetch)({workAsyncStorage:u,workUnitAsyncStorage:d})}}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[989,452],()=>r(2845));module.exports=a})();