webpackJsonp([117],{109:function(e,t,o){var n=o(0)(o(698),o(870),null,null);n.options.__file="/Users/alicia/Documents/develop/github/heyui/src/components/demos/dataplugins/autocomplete1.vue",n.esModule&&Object.keys(n.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),n.options.functional&&console.error("[vue-loader] autocomplete1.vue: functional components are not supported with templates, they should use render functions."),e.exports=n.exports},698:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{value:"1",show:"选择1"}},methods:{onChange:function(t){e(t)},update:function(){this.value="2",this.show="选择2"}}}}).call(t,o(7))},870:function(e,t,o){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("p",[e._v("value:"+e._s(e.value)+"\n    "),o("button",{staticClass:"h-btn h-btn-text",on:{click:e.update}},[e._v("修改值")])]),e._v(" "),o("AutoComplete",{attrs:{dict:"simple",show:e.show},on:{change:e.onChange},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});