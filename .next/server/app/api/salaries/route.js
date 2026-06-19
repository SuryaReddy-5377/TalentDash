/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/salaries/route";
exports.ids = ["app/api/salaries/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsalaries%2Froute&page=%2Fapi%2Fsalaries%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsalaries%2Froute.ts&appDir=C%3A%5CINTERNSHIP%5CUnstop%5Cnewtask%5Ctalentdash%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CINTERNSHIP%5CUnstop%5Cnewtask%5Ctalentdash&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsalaries%2Froute&page=%2Fapi%2Fsalaries%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsalaries%2Froute.ts&appDir=C%3A%5CINTERNSHIP%5CUnstop%5Cnewtask%5Ctalentdash%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CINTERNSHIP%5CUnstop%5Cnewtask%5Ctalentdash&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_INTERNSHIP_Unstop_newtask_talentdash_app_api_salaries_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/salaries/route.ts */ \"(rsc)/./app/api/salaries/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/salaries/route\",\n        pathname: \"/api/salaries\",\n        filename: \"route\",\n        bundlePath: \"app/api/salaries/route\"\n    },\n    resolvedPagePath: \"C:\\\\INTERNSHIP\\\\Unstop\\\\newtask\\\\talentdash\\\\app\\\\api\\\\salaries\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_INTERNSHIP_Unstop_newtask_talentdash_app_api_salaries_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzYWxhcmllcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGc2FsYXJpZXMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZzYWxhcmllcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDSU5URVJOU0hJUCU1Q1Vuc3RvcCU1Q25ld3Rhc2slNUN0YWxlbnRkYXNoJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDSU5URVJOU0hJUCU1Q1Vuc3RvcCU1Q25ld3Rhc2slNUN0YWxlbnRkYXNoJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN5QjtBQUN0RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcSU5URVJOU0hJUFxcXFxVbnN0b3BcXFxcbmV3dGFza1xcXFx0YWxlbnRkYXNoXFxcXGFwcFxcXFxhcGlcXFxcc2FsYXJpZXNcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3NhbGFyaWVzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvc2FsYXJpZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3NhbGFyaWVzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcSU5URVJOU0hJUFxcXFxVbnN0b3BcXFxcbmV3dGFza1xcXFx0YWxlbnRkYXNoXFxcXGFwcFxcXFxhcGlcXFxcc2FsYXJpZXNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsalaries%2Froute&page=%2Fapi%2Fsalaries%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsalaries%2Froute.ts&appDir=C%3A%5CINTERNSHIP%5CUnstop%5Cnewtask%5Ctalentdash%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CINTERNSHIP%5CUnstop%5Cnewtask%5Ctalentdash&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/salaries/route.ts":
/*!***********************************!*\
  !*** ./app/api/salaries/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\nasync function GET() {\n    try {\n        const salaries = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.salary.findMany({\n            include: {\n                company: true\n            },\n            orderBy: {\n                totalCompensation: 'desc'\n            },\n            take: 100\n        });\n        // Convert BigInt to Number\n        const serializedSalaries = salaries.map((salary)=>({\n                ...salary,\n                baseSalary: Number(salary.baseSalary),\n                bonus: Number(salary.bonus),\n                stock: Number(salary.stock),\n                totalCompensation: Number(salary.totalCompensation),\n                confidenceScore: Number(salary.confidenceScore)\n            }));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            data: serializedSalaries\n        });\n    } catch (error) {\n        console.error('Error fetching salaries:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            data: []\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3NhbGFyaWVzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUNFO0FBRXRDLGVBQWVFO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxXQUFXLE1BQU1GLCtDQUFNQSxDQUFDRyxNQUFNLENBQUNDLFFBQVEsQ0FBQztZQUM1Q0MsU0FBUztnQkFDUEMsU0FBUztZQUNYO1lBQ0FDLFNBQVM7Z0JBQ1BDLG1CQUFtQjtZQUNyQjtZQUNBQyxNQUFNO1FBQ1I7UUFFQSwyQkFBMkI7UUFDM0IsTUFBTUMscUJBQXFCUixTQUFTUyxHQUFHLENBQUMsQ0FBQ1IsU0FBWTtnQkFDbkQsR0FBR0EsTUFBTTtnQkFDVFMsWUFBWUMsT0FBT1YsT0FBT1MsVUFBVTtnQkFDcENFLE9BQU9ELE9BQU9WLE9BQU9XLEtBQUs7Z0JBQzFCQyxPQUFPRixPQUFPVixPQUFPWSxLQUFLO2dCQUMxQlAsbUJBQW1CSyxPQUFPVixPQUFPSyxpQkFBaUI7Z0JBQ2xEUSxpQkFBaUJILE9BQU9WLE9BQU9hLGVBQWU7WUFDaEQ7UUFFQSxPQUFPakIscURBQVlBLENBQUNrQixJQUFJLENBQUM7WUFBRUMsTUFBTVI7UUFBbUI7SUFDdEQsRUFBRSxPQUFPUyxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQyw0QkFBNEJBO1FBQzFDLE9BQU9wQixxREFBWUEsQ0FBQ2tCLElBQUksQ0FBQztZQUFFQyxNQUFNLEVBQUU7UUFBQztJQUN0QztBQUNGIiwic291cmNlcyI6WyJDOlxcSU5URVJOU0hJUFxcVW5zdG9wXFxuZXd0YXNrXFx0YWxlbnRkYXNoXFxhcHBcXGFwaVxcc2FsYXJpZXNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnLi4vLi4vLi4vbGliL3ByaXNtYSc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzYWxhcmllcyA9IGF3YWl0IHByaXNtYS5zYWxhcnkuZmluZE1hbnkoe1xyXG4gICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgY29tcGFueTogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgIHRvdGFsQ29tcGVuc2F0aW9uOiAnZGVzYycsXHJcbiAgICAgIH0sXHJcbiAgICAgIHRha2U6IDEwMCxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENvbnZlcnQgQmlnSW50IHRvIE51bWJlclxyXG4gICAgY29uc3Qgc2VyaWFsaXplZFNhbGFyaWVzID0gc2FsYXJpZXMubWFwKChzYWxhcnkpID0+ICh7XHJcbiAgICAgIC4uLnNhbGFyeSxcclxuICAgICAgYmFzZVNhbGFyeTogTnVtYmVyKHNhbGFyeS5iYXNlU2FsYXJ5KSxcclxuICAgICAgYm9udXM6IE51bWJlcihzYWxhcnkuYm9udXMpLFxyXG4gICAgICBzdG9jazogTnVtYmVyKHNhbGFyeS5zdG9jayksXHJcbiAgICAgIHRvdGFsQ29tcGVuc2F0aW9uOiBOdW1iZXIoc2FsYXJ5LnRvdGFsQ29tcGVuc2F0aW9uKSxcclxuICAgICAgY29uZmlkZW5jZVNjb3JlOiBOdW1iZXIoc2FsYXJ5LmNvbmZpZGVuY2VTY29yZSksXHJcbiAgICB9KSk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZGF0YTogc2VyaWFsaXplZFNhbGFyaWVzIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBzYWxhcmllczonLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBkYXRhOiBbXSB9KTtcclxuICB9XHJcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicHJpc21hIiwiR0VUIiwic2FsYXJpZXMiLCJzYWxhcnkiLCJmaW5kTWFueSIsImluY2x1ZGUiLCJjb21wYW55Iiwib3JkZXJCeSIsInRvdGFsQ29tcGVuc2F0aW9uIiwidGFrZSIsInNlcmlhbGl6ZWRTYWxhcmllcyIsIm1hcCIsImJhc2VTYWxhcnkiLCJOdW1iZXIiLCJib251cyIsInN0b2NrIiwiY29uZmlkZW5jZVNjb3JlIiwianNvbiIsImRhdGEiLCJlcnJvciIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/salaries/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) {\n    globalForPrisma.prisma = prisma;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxHQUFHO0FBRW5FLElBQUlJLElBQXFDLEVBQUU7SUFDekNILGdCQUFnQkUsTUFBTSxHQUFHQTtBQUMzQiIsInNvdXJjZXMiOlsiQzpcXElOVEVSTlNISVBcXFVuc3RvcFxcbmV3dGFza1xcdGFsZW50ZGFzaFxcbGliXFxwcmlzbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xyXG5cclxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHtcclxuICBwcmlzbWE6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/IG5ldyBQcmlzbWFDbGllbnQoKTtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYTtcclxufSJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsalaries%2Froute&page=%2Fapi%2Fsalaries%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsalaries%2Froute.ts&appDir=C%3A%5CINTERNSHIP%5CUnstop%5Cnewtask%5Ctalentdash%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CINTERNSHIP%5CUnstop%5Cnewtask%5Ctalentdash&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();