!function r(t,e,o){function i(u,l){if(!e[u]){if(!t[u]){var a="function"==typeof require&&require;if(!l&&a)return a(u,!0);if(n)return n(u,!0);var c=new Error("Cannot find module '"+u+"'");throw c.code="MODULE_NOT_FOUND",c}var f=e[u]={exports:{}};t[u][0].call(f.exports,function(r){var e=t[u][1][r];return i(e?e:r)},f,f.exports,r,t,e,o)}return e[u].exports}for(var n="function"==typeof require&&require,u=0;u<o.length;u++)i(o[u]);return i}({1:[function(r,t,e){var o=r("angular");o.module("blog",[r("angular-ui-router")]).config(r("./config")).controller("priviewListCtrl",r("./priview_list/ctrl")),o.element(function(){o.bootstrap(document,["blog"])})},{"./config":2,"./priview_list/ctrl":3,angular:"angular","angular-ui-router":"angular-ui-router"}],2:[function(r,t,e){t.exports=["$stateProvider","$urlRouterProvider",function(r,t){r.state("home",{url:"/",templateUrl:"/views/priview_list/index.html",controller:"priviewListCtrl"}),t.otherwise("/")}]},{}],3:[function(r,t,e){t.exports=["$scope",function(r){}]},{}]},{},[1]);
//# sourceMappingURL=maps/bundle.js.map
