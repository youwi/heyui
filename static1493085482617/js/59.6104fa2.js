webpackJsonp([59],{142:function(e,t,n){var o=n(0)(n(683),n(810),null,null);o.options.__file="/Users/alicia/Documents/develop/github/heyui/heyui/src/components/demos/dataview/pagination2.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] pagination2.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},683:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{current:1,total:200}},methods:{currentChange:function(e){this.total=this.total+1,console.log(e.cur,e.size)}}}},810:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("Pagination",{attrs:{cur:e.current,total:e.total,small:!0},on:{change:e.currentChange}})},staticRenderFns:[]},e.exports.render._withStripped=!0}});