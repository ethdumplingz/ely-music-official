(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8581:function(r,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(3678)}])},8418:function(r,t,n){"use strict";function e(r,t){(null==t||t>r.length)&&(t=r.length);for(var n=0,e=new Array(t);n<t;n++)e[n]=r[n];return e}function o(r,t){return function(r){if(Array.isArray(r))return r}(r)||function(r,t){var n=null==r?null:"undefined"!==typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=n){var e,o,u=[],i=!0,a=!1;try{for(n=n.call(r);!(i=(e=n.next()).done)&&(u.push(e.value),!t||u.length!==t);i=!0);}catch(c){a=!0,o=c}finally{try{i||null==n.return||n.return()}finally{if(a)throw o}}return u}}(r,t)||function(r,t){if(!r)return;if("string"===typeof r)return e(r,t);var n=Object.prototype.toString.call(r).slice(8,-1);"Object"===n&&r.constructor&&(n=r.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return e(r,t)}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var u,i=(u=n(7294))&&u.__esModule?u:{default:u},a=n(6273),c=n(387),l=n(7190);var f={};function s(r,t,n,e){if(r&&a.isLocalURL(t)){r.prefetch(t,n,e).catch((function(r){0}));var o=e&&"undefined"!==typeof e.locale?e.locale:r&&r.locale;f[t+"%"+n+(o?"%"+o:"")]=!0}}},7190:function(r,t,n){"use strict";function e(r,t){(null==t||t>r.length)&&(t=r.length);for(var n=0,e=new Array(t);n<t;n++)e[n]=r[n];return e}function o(r,t){return function(r){if(Array.isArray(r))return r}(r)||function(r,t){var n=null==r?null:"undefined"!==typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=n){var e,o,u=[],i=!0,a=!1;try{for(n=n.call(r);!(i=(e=n.next()).done)&&(u.push(e.value),!t||u.length!==t);i=!0);}catch(c){a=!0,o=c}finally{try{i||null==n.return||n.return()}finally{if(a)throw o}}return u}}(r,t)||function(r,t){if(!r)return;if("string"===typeof r)return e(r,t);var n=Object.prototype.toString.call(r).slice(8,-1);"Object"===n&&r.constructor&&(n=r.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return e(r,t)}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(r){var t=r.rootRef,n=r.rootMargin,e=r.disabled||!a,f=u.useRef(),s=o(u.useState(!1),2),d=s[0],v=s[1],y=o(u.useState(t?t.current:null),2),b=y[0],p=y[1],m=u.useCallback((function(r){f.current&&(f.current(),f.current=void 0),e||d||r&&r.tagName&&(f.current=function(r,t,n){var e=function(r){var t,n={root:r.root||null,margin:r.rootMargin||""},e=l.find((function(r){return r.root===n.root&&r.margin===n.margin}));e?t=c.get(e):(t=c.get(n),l.push(n));if(t)return t;var o=new Map,u=new IntersectionObserver((function(r){r.forEach((function(r){var t=o.get(r.target),n=r.isIntersecting||r.intersectionRatio>0;t&&n&&t(n)}))}),r);return c.set(n,t={id:n,observer:u,elements:o}),t}(n),o=e.id,u=e.observer,i=e.elements;return i.set(r,t),u.observe(r),function(){if(i.delete(r),u.unobserve(r),0===i.size){u.disconnect(),c.delete(o);var t=l.findIndex((function(r){return r.root===o.root&&r.margin===o.margin}));t>-1&&l.splice(t,1)}}}(r,(function(r){return r&&v(r)}),{root:b,rootMargin:n}))}),[e,b,n,d]);return u.useEffect((function(){if(!a&&!d){var r=i.requestIdleCallback((function(){return v(!0)}));return function(){return i.cancelIdleCallback(r)}}}),[d]),u.useEffect((function(){t&&p(t.current)}),[t]),[m,d]};var u=n(7294),i=n(9311),a="undefined"!==typeof IntersectionObserver;var c=new Map,l=[]},3678:function(r,t,n){"use strict";n.r(t);var e=n(5893);n(1664);t.default=function(){return(0,e.jsx)("div",{children:"Site coming."})}},1664:function(r,t,n){n(8418)}},function(r){r.O(0,[774,888,179],(function(){return t=8581,r(r.s=t);var t}));var t=r.O();_N_E=t}]);