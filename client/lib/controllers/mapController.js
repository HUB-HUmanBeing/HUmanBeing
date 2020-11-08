import * as L from "leaflet";
import Search from "leaflet-control-geocoder";
import cryptoTools from "../cryptoTools";
import mapParams from "./mapParams";
import MiniMap from 'leaflet-minimap';
import iconMarker from "./markers/iconMarker";
import MapMarker from "../../../imports/classes/MapMarker";
import memberPosition from "./markers/memberPosition";
import {Draw} from 'leaflet-draw';
import polyline from "./markers/polyline";
import shape from "./markers/shape";
import arrow from "./markers/arrow";
import markerText from "./markers/markerText";
import activityMarker from "./markers/activityMarker";
import projectController from "./projectController";
import Activity from "../../../imports/classes/Activity";


!function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){r(1),r(2),t.exports=r(3)},function(t,e){L.Control.BrowserPrint=L.Control.extend({options:{title:"Print map",documentTitle:"",position:"topleft",printLayer:null,printModes:["Portrait","Landscape","Auto","Custom"],closePopupsOnPrint:!0,contentSelector:"[leaflet-browser-print-content]",pagesSelector:"[leaflet-browser-print-pages]",manualMode:!1,customPrintStyle:{color:"gray",dashArray:"5, 10",pane:"customPrintPane"}},onAdd:function(t){this.options.customPrintStyle.pane&&!t.getPane(this.options.customPrintStyle.pane)&&(t.createPane(this.options.customPrintStyle.pane).style.zIndex=9999);var e=L.DomUtil.create("div","leaflet-control-browser-print leaflet-bar leaflet-control");return L.DomEvent.disableClickPropagation(e),this._appendControlStyles(e),this.options.printModes.length>1?(L.DomEvent.addListener(e,"mouseover",this._displayPageSizeButtons,this),L.DomEvent.addListener(e,"mouseout",this._hidePageSizeButtons,this)):e.style.cursor="pointer",this.options.position.indexOf("left")>0?(this._createIcon(e),this._createMenu(e)):(this._createMenu(e),this._createIcon(e)),t.printControl=this,e},_createIcon:function(t){return this.__link__=L.DomUtil.create("a","",t),this.__link__.className="leaflet-browser-print",this.options.title&&(this.__link__.title=this.options.title),this.__link__},_createMenu:function(t){for(var e=[],r=0;r<this.options.printModes.length;r++){var n=this.options.printModes[r];if(n.length){var i=n[0].toUpperCase()+n.substring(1).toLowerCase();n=L.control.browserPrint.mode[n.toLowerCase()](this._getDefaultTitle(i))}else if(!(n instanceof L.Control.BrowserPrint.Mode))throw"Invalid Print Mode. Can't construct logic to print current map.";1==this.options.printModes.length?n.Element=t:(n.Element=L.DomUtil.create("li","browser-print-mode",L.DomUtil.create("ul","browser-print-holder",t)),n.Element.innerHTML=n.Title),L.DomEvent.addListener(n.Element,"click",n.Action(this,n),this),e.push(n)}this.options.printModes=e},_getDefaultTitle:function(t){return this.options.printModesNames&&this.options.printModesNames[t]||t},_displayPageSizeButtons:function(){this.options.position.indexOf("left")>0?(this.__link__.style.borderTopRightRadius="0px",this.__link__.style.borderBottomRightRadius="0px"):(this.__link__.style.borderTopLeftRadius="0px",this.__link__.style.borderBottomLeftRadius="0px"),this.options.printModes.forEach((function(t){t.Element.style.display="inline-block"}))},_hidePageSizeButtons:function(){this.options.position.indexOf("left")>0?(this.__link__.style.borderTopRightRadius="",this.__link__.style.borderBottomRightRadius=""):(this.__link__.style.borderTopLeftRadius="",this.__link__.style.borderBottomLeftRadius=""),this.options.printModes.forEach((function(t){t.Element.style.display=""}))},_getMode:function(t,e){return new L.control.browserPrint.mode(t,e.Title,e.PageSize,e.Action,e.InvalidateBounds)},_printLandscape:function(t){this._addPrintClassToContainer(this._map,"leaflet-browser-print--landscape"),this._print(t)},_printPortrait:function(t){this._addPrintClassToContainer(this._map,"leaflet-browser-print--portrait"),this._print(t)},_printAuto:function(t){this._addPrintClassToContainer(this._map,"leaflet-browser-print--auto");var e=this._getBoundsForAllVisualLayers(),r=this._getPageSizeFromBounds(e);this._print(this._getMode(r,t),e)},_printCustom:function(t){this._addPrintClassToContainer(this._map,"leaflet-browser-print--custom"),this.options.custom={mode:t},this._map.on("mousedown",this._startAutoPoligon,this)},_addPrintClassToContainer:function(t,e){var r=t.getContainer();-1===r.className.indexOf(e)&&(r.className+=" "+e)},_removePrintClassFromContainer:function(t,e){var r=t.getContainer();r.className&&r.className.indexOf(e)>-1&&(r.className=r.className.replace(" "+e,""))},_startAutoPoligon:function(t){t.originalEvent.preventDefault(),t.originalEvent.stopPropagation(),this._map.dragging.disable(),this.options.custom.start=t.latlng,this._map.off("mousedown",this._startAutoPoligon,this),this._map.on("mousemove",this._moveAutoPoligon,this),this._map.on("mouseup",this._endAutoPoligon,this)},_moveAutoPoligon:function(t){this.options.custom&&(t.originalEvent.preventDefault(),t.originalEvent.stopPropagation(),this.options.custom.rectangle?this.options.custom.rectangle.setBounds(L.latLngBounds(this.options.custom.start,t.latlng)):(this.options.custom.rectangle=L.rectangle([this.options.custom.start,t.latlng],this.options.customPrintStyle),this.options.custom.rectangle.addTo(this._map)))},_endAutoPoligon:function(t){if(t.originalEvent.preventDefault(),t.originalEvent.stopPropagation(),this._map.off("mousemove",this._moveAutoPoligon,this),this._map.off("mouseup",this._endAutoPoligon,this),this._map.dragging.enable(),this.options.custom&&this.options.custom.rectangle){var e=this.options.custom.rectangle.getBounds();this._map.removeLayer(this.options.custom.rectangle);var r=this._getPageSizeFromBounds(e);this._print(this._getMode(r,this.options.custom.mode),e),delete this.options.custom}else this._clearPrint()},_getPageSizeFromBounds:function(t){return Math.abs(t.getNorth()-t.getSouth())>Math.abs(t.getEast()-t.getWest())?"Portrait":"Landscape"},_setupPrintPagesWidth:function(t,e,r){t.style.width="Landscape"===r?e.Height:e.Width},_setupPrintMapHeight:function(t,e,r){t.style.height="Landscape"===r?e.Width:e.Height},cancel:function(t){this.cancelNextPrinting=t},print:function(t){t.Action(this,t)()},_print:function(t,e){this._map.fire(L.Control.BrowserPrint.Event.PrintInit,{mode:t}),L.Control.BrowserPrint.Utils.initialize();var r=this,n=this._map.getContainer(),i=t.Mode,o={bounds:e||this._map.getBounds(),width:n.style.width,height:n.style.height,documentTitle:document.title,printLayer:L.Control.BrowserPrint.Utils.cloneLayer(this.options.printLayer),panes:[]},s=this._map.getPanes();for(var a in s)o.panes.push({name:a,container:void 0});if(o.printObjects=this._getPrintObjects(o.printLayer),this._map.fire(L.Control.BrowserPrint.Event.PrePrint,{printLayer:o.printLayer,printObjects:o.printObjects,pageOrientation:i,printMode:t.Mode,pageBounds:o.bounds}),this.cancelNextPrinting)delete this.cancelNextPrinting;else{var l=this._addPrintMapOverlay(t.PageSize,t.getPageMargin("mm"),t.getSize(),i,o);this.options.documentTitle&&(document.title=this.options.documentTitle),this._map.fire(L.Control.BrowserPrint.Event.PrintStart,{printLayer:o.printLayer,printMap:l.map,printObjects:l.objects}),t.InvalidateBounds?(l.map.fitBounds(o.bounds),l.map.invalidateSize({reset:!0,animate:!1,pan:!1})):l.map.setView(this._map.getCenter(),this._map.getZoom());var p=setInterval((function(){r._isTilesLoading(l.map)||(clearInterval(p),r.options.manualMode?r._setupManualPrintButton(l.map,o,l.objects):r._completePrinting(l.map,o,l.objects))}),50)}},_completePrinting:function(t,e,r){var n=this;setTimeout((function(){n._map.fire(L.Control.BrowserPrint.Event.Print,{printLayer:e.printLayer,printMap:t,printObjects:r});var i=window.print();i?Promise.all([i]).then((function(){n._printEnd(e),n._map.fire(L.Control.BrowserPrint.Event.PrintEnd,{printLayer:e.printLayer,printMap:t,printObjects:r})})):(n._printEnd(e),n._map.fire(L.Control.BrowserPrint.Event.PrintEnd,{printLayer:e.printLayer,printMap:t,printObjects:r}))}),1e3)},_getBoundsForAllVisualLayers:function(){var t=null;for(var e in this._map._layers){var r=this._map._layers[e];r._url||r._mutant||(t?r.getBounds?t.extend(r.getBounds()):r.getLatLng&&t.extend(r.getLatLng()):r.getBounds?t=r.getBounds():r.getLatLng&&(t=L.latLngBounds(r.getLatLng(),r.getLatLng())))}return t&&null!=t._southWest||(t=this._map.getBounds()),t},_clearPrint:function(){this._removePrintClassFromContainer(this._map,"leaflet-browser-print--landscape"),this._removePrintClassFromContainer(this._map,"leaflet-browser-print--portrait"),this._removePrintClassFromContainer(this._map,"leaflet-browser-print--auto"),this._removePrintClassFromContainer(this._map,"leaflet-browser-print--custom")},_printEnd:function(t){this._clearPrint(),document.body.removeChild(this.__overlay__),this.__overlay__=null,document.body.className=document.body.className.replace(" leaflet--printing",""),this.options.documentTitle&&(document.title=t.documentTitle),this._map.invalidateSize({reset:!0,animate:!1,pan:!1})},_getPrintObjects:function(t){var e={};for(var r in this._map._layers){var n=this._map._layers[r];if(!t||!n._url||n instanceof L.TileLayer.WMS){var i=L.Control.BrowserPrint.Utils.getType(n);i&&(e[i]||(e[i]=[]),e[i].push(n))}}return e},_addPrintCss:function(t,e,r){var n=document.createElement("style");switch(n.className="leaflet-browser-print-css",n.setAttribute("type","text/css"),n.innerHTML=" @media print { .leaflet-popup-content-wrapper, .leaflet-popup-tip { box-shadow: none; }",n.innerHTML+=" .leaflet-browser-print--manualMode-button { display: none; }",n.innerHTML+=" * { -webkit-print-color-adjust: exact!important; printer-colors: exact!important; color-adjust: exact!important; }",e&&(n.innerHTML+=" @page { margin: "+e+"; }"),n.innerHTML+=" @page :first { page-break-after: always; }",r){case"Landscape":n.innerText+=" @page { size : "+t+" landscape; }";break;default:case"Portrait":n.innerText+=" @page { size : "+t+" portrait; }"}return n},_appendControlStyles:function(t){var e=document.createElement("style");e.setAttribute("type","text/css"),e.innerHTML+=" .leaflet-control-browser-print { display: flex; } .leaflet-control-browser-print a { background: #fff url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gcCCi8Vjp+aNAAAAGhJREFUOMvFksENgDAMA68RC7BBN+Cf/ZU33QAmYAT6BolAGxB+RrrIsg1BpfNBVXcPMLMDI/ytpKozMHWwK7BJJ7yYWQbGdBea9wTIkRDzKy0MT7r2NiJACRgotCzxykFI34QY2Ea7KmtxGJ+uX4wfAAAAAElFTkSuQmCC') no-repeat 5px; background-size: 16px 16px; display: block; border-radius: 2px; }",e.innerHTML+=" .leaflet-control-browser-print a.leaflet-browser-print { background-position: center; }",e.innerHTML+=" .browser-print-holder { background-color: #919187; margin: 0px; padding: 0px; list-style: none; white-space: nowrap; align-items: center; display: flex; } .browser-print-holder-left li:last-child { border-top-right-radius: 2px; border-bottom-right-radius: 2px; } .browser-print-holder-right li:first-child { border-top-left-radius: 2px; border-bottom-left-radius: 2px; }",e.innerHTML+=" .browser-print-mode { display: none; color: #FFF; text-decoration: none; padding: 0 10px; text-align: center; } .browser-print-holder:hover { background-color: #757570; cursor: pointer; }",e.innerHTML+=" .leaflet-browser-print--custom, .leaflet-browser-print--custom path { cursor: crosshair!important; }",e.innerHTML+=" .leaflet-print-overlay { width: 100%; height:auto; min-height: 100%; position: absolute; top: 0; background-color: white!important; left: 0; z-index: 1001; display: block!important; } ",e.innerHTML+=" .leaflet--printing { height:auto; min-height: 100%; margin: 0px!important; padding: 0px!important; } body.leaflet--printing > * { display: none; box-sizing: border-box; }",e.innerHTML+=" .grid-print-container { grid-template: 1fr / 1fr; box-sizing: border-box; } .grid-map-print { grid-row: 1; grid-column: 1; } body.leaflet--printing .grid-print-container [leaflet-browser-print-content]:not(style) { display: unset!important; }",e.innerHTML+=" .pages-print-container { box-sizing: border-box; }",t.appendChild(e)},_setupManualPrintButton:function(t,e,r){var n=document.createElement("button");n.className="leaflet-browser-print--manualMode-button",n.innerHTML="Print",n.style.position="absolute",n.style.top="20px",n.style.right="20px",this.__overlay__.appendChild(n);var i=this;L.DomEvent.addListener(n,"click",(function(){i._completePrinting(t,e,r)}))},_addPrintMapOverlay:function(t,e,r,n,i){this.__overlay__=document.createElement("div"),this.__overlay__.className=this._map.getContainer().className+" leaflet-print-overlay",document.body.appendChild(this.__overlay__),this.__overlay__.appendChild(this._addPrintCss(t,e,n));var o=document.createElement("div");if(o.className="grid-print-container",o.style.width="100%",o.style.display="grid",this._setupPrintMapHeight(o,r,n),this.options.contentSelector){var s=document.querySelectorAll(this.options.contentSelector);if(s&&s.length)for(var a=0;a<s.length;a++){var l=s[a].cloneNode(!0);o.appendChild(l)}}if(this.options.pagesSelector&&document.querySelectorAll(this.options.pagesSelector).length){var p=document.createElement("div");p.className="pages-print-container",p.style.margin="0!important",this._setupPrintPagesWidth(p,r,n),this.__overlay__.appendChild(p),p.appendChild(o);var c=document.querySelectorAll(this.options.pagesSelector);if(c&&c.length)for(a=0;a<c.length;a++){var u=c[a].cloneNode(!0);p.appendChild(u)}}else this._setupPrintPagesWidth(o,r,n),this.__overlay__.appendChild(o);var d=document.createElement("div");d.id=this._map.getContainer().id+"-print",d.className="grid-map-print",d.style.width="100%",d.style.height="100%",o.appendChild(d),document.body.className+=" leaflet--printing";var h=L.Control.BrowserPrint.Utils.cloneBasicOptionsWithoutLayers(this._map.options);return h.maxZoom=this._map.getMaxZoom(),this._setupPrintMap(d.id,h,i.printLayer,i.printObjects,i.panes)},_setupPrintMap:function(t,e,r,n,i){e.zoomControl=!1,e.dragging=!1,e.zoomAnimation=!1,e.fadeAnimation=!1,e.markerZoomAnimation=!1,e.keyboard=!1,e.scrollWheelZoom=!1,e.tap=!1,e.touchZoom=!1;var o=L.map(t,e);r&&r.addTo(o),i.forEach((function(t){o.createPane(t.name,t.container)}));var s={},a=[];for(var l in n){var p=this.options.closePopupsOnPrint;n[l]=n[l].map((function(t){var e=L.Control.BrowserPrint.Utils.cloneLayer(t);if(e){if(t instanceof L.Popup?(t.isOpen||(t.isOpen=function(){return this._isOpen}),t.isOpen()&&!p&&a.push({source:t._source,popup:e})):e.addTo(o),s[t._leaflet_id]=e,t instanceof L.Layer){var r=t.getTooltip();r&&(e.bindTooltip(r.getContent(),r.options),t.isTooltipOpen()&&e.openTooltip(r.getLatLng()))}return e}}))}for(var c=0;c<a.length;c++){var u=a[c];if(u.source){var d=s[u.source._leaflet_id];d&&d.bindPopup&&d.openPopup&&s[u.source._leaflet_id].bindPopup(u.popup).openPopup(u.popup.getLatLng())}}return{map:o,objects:n}},_isTilesLoading:function(t){return parseFloat(L.version)>1?this._getLoadingLayers(t):t._tilesToLoad||t._tileLayersToLoad},_getLoadingLayers:function(t){for(var e in t._layers){var r=t._layers[e];if((r._url||r._mutant)&&r._loading)return!0}return!1}}),L.Control.BrowserPrint.Event={PrintInit:"browser-print-init",PrePrint:"browser-pre-print",PrintStart:"browser-print-start",Print:"browser-print",PrintEnd:"browser-print-end"},L.control.browserPrint=function(t){if(t&&t.printModes||((t=t||{}).printModes=[L.control.browserPrint.mode.portrait(),L.control.browserPrint.mode.landscape(),L.control.browserPrint.mode.auto(),L.control.browserPrint.mode.custom()]),t&&t.printModes&&(!t.printModes.filter||!t.printModes.length))throw"Please specify valid print modes for Print action. Example: printModes: [L.control.browserPrint.mode.portrait(), L.control.browserPrint.mode.auto('Automatico'), 'Custom']";return t.printModesNames&&console.warn("'printModesNames' option is obsolete. Please use 'L.control.browserPrint.mode.*(/*Title*/)' shortcut instead. Please check latest release and documentation."),new L.Control.BrowserPrint(t)}},function(t,e){L.Control.BrowserPrint.Utils={_ignoreArray:[],_cloneFactoryArray:[],_cloneRendererArray:[],_knownRenderers:{},cloneOptions:function(t){var e={};for(var r in t){var n=t[r];n&&n.clone?e[r]=n.clone():n&&n.onAdd?e[r]=this.cloneLayer(n):e[r]=n}return e},cloneBasicOptionsWithoutLayers:function(t){var e={},r=Object.getOwnPropertyNames(t);if(r.length){for(var n=0;n<r.length;n++){var i=r[n];i&&"layers"!=i&&(e[i]=t[i])}return this.cloneOptions(e)}return e},cloneInnerLayers:function(t){var e=this,r=[];return t.eachLayer((function(t){var n=e.cloneLayer(t);n&&r.push(n)})),r},initialize:function(){this._knownRenderers={},this.registerRenderer(L.SVG,"L.SVG"),this.registerRenderer(L.Canvas,"L.Canvas"),this.registerLayer(L.TileLayer.WMS,"L.TileLayer.WMS",(function(t,e){return L.tileLayer.wms(t._url,e.cloneOptions(t.options))})),this.registerLayer(L.TileLayer,"L.TileLayer",(function(t,e){return L.tileLayer(t._url,e.cloneOptions(t.options))})),this.registerLayer(L.GridLayer,"L.GridLayer",(function(t,e){return L.gridLayer(e.cloneOptions(t.options))})),this.registerLayer(L.ImageOverlay,"L.ImageOverlay",(function(t,e){return L.imageOverlay(t._url,t._bounds,e.cloneOptions(t.options))})),this.registerLayer(L.Marker,"L.Marker",(function(t,e){return L.marker(t.getLatLng(),e.cloneOptions(t.options))})),this.registerLayer(L.Popup,"L.Popup",(function(t,e){return L.popup(e.cloneOptions(t.options)).setLatLng(t.getLatLng()).setContent(t.getContent())})),this.registerLayer(L.Circle,"L.Circle",(function(t,e){return L.circle(t.getLatLng(),t.getRadius(),e.cloneOptions(t.options))})),this.registerLayer(L.CircleMarker,"L.CircleMarker",(function(t,e){return L.circleMarker(t.getLatLng(),e.cloneOptions(t.options))})),this.registerLayer(L.Rectangle,"L.Rectangle",(function(t,e){return L.rectangle(t.getBounds(),e.cloneOptions(t.options))})),this.registerLayer(L.Polygon,"L.Polygon",(function(t,e){return L.polygon(t.getLatLngs(),e.cloneOptions(t.options))})),this.registerLayer(L.MultiPolyline,"L.MultiPolyline",(function(t,e){return L.polyline(t.getLatLngs(),e.cloneOptions(t.options))})),this.registerLayer(L.MultiPolygon,"L.MultiPolygon",(function(t,e){return L.multiPolygon(t.getLatLngs(),e.cloneOptions(t.options))})),this.registerLayer(L.Polyline,"L.Polyline",(function(t,e){return L.polyline(t.getLatLngs(),e.cloneOptions(t.options))})),this.registerLayer(L.GeoJSON,"L.GeoJSON",(function(t,e){return L.geoJson(t.toGeoJSON(),e.cloneOptions(t.options))})),this.registerIgnoreLayer(L.FeatureGroup,"L.FeatureGroup"),this.registerIgnoreLayer(L.LayerGroup,"L.LayerGroup"),this.registerLayer(L.Tooltip,"L.Tooltip",(function(){return null}))},_register:function(t,e,r,n){e&&!t.filter((function(t){return t.identifier===r})).length&&t.push({type:e,identifier:r,builder:n||function(t){return new e(t.options)}})},registerLayer:function(t,e,r){this._register(this._cloneFactoryArray,t,e,r)},registerRenderer:function(t,e,r){this._register(this._cloneRendererArray,t,e,r)},registerIgnoreLayer:function(t,e){this._register(this._ignoreArray,t,e)},cloneLayer:function(t){if(!t)return null;var e,r=this.__getRenderer(t);return r||((e=t._group?this.__getFactoryObject(t._group,!0):this.__getFactoryObject(t))&&(e=e.builder(t,this)),e)},getType:function(t){if(!t)return null;var e=this.__getFactoryObject(t);return e&&(e=e.identifier),e},__getRenderer:function(t){var e=this._knownRenderers[t._leaflet_id];if(!e){for(var r=0;r<this._cloneRendererArray.length;r++){var n=this._cloneRendererArray[r];if(t instanceof n.type){this._knownRenderers[t._leaflet_id]=n.builder(t.options);break}}e=this._knownRenderers[t._leaflet_id]}return e},__getFactoryObject:function(t,e){if(!e)for(var r=0;r<this._ignoreArray.length;r++){var n=this._ignoreArray[r];if(n.type&&t instanceof n.type)return null}for(r=0;r<this._cloneFactoryArray.length;r++){if((i=this._cloneFactoryArray[r]).type&&t instanceof i.type)return i}for(r=0;r<this._cloneRendererArray.length;r++){var i;if((i=this._cloneRendererArray[r]).type&&t instanceof i.type)return null}return this.__unknownLayer__(),null},__unknownLayer__:function(){console.warn("Unknown layer, cannot clone this layer. Leaflet version: "+L.version),console.info("For additional information please refer to documentation on: https://github.com/Igor-Vladyka/leaflet.browser.print."),console.info("-------------------------------------------------------------------------------------------------------------------")}}},function(t,e){L.Control.BrowserPrint.Size={A:{Width:840,Height:1188},B:{Width:1e3,Height:1414},C:{Width:916,Height:1296},D:{Width:770,Height:1090},LETTER:{Width:216,Height:279},HALFLETTER:{Width:140,Height:216},LEGAL:{Width:216,Height:356},JUNIORLEGAL:{Width:127,Height:203},TABLOID:{Width:279,Height:432},LEDGER:{Width:432,Height:279}},L.Control.BrowserPrint.Mode=function(t,e,r,n,i){if(!t)throw"Print mode should be specified.";this.Mode=t,this.Title=e||t,this.PageSize=(r||"A4").toUpperCase(),this.PageSeries=-1!=["A","B","C","D"].indexOf(this.PageSize[0])?this.PageSize[0]:"",this.PageSeriesSize=this.PageSize.substring(this.PageSeries.length),this.Action=n||function(t,e){return function(){t["_print"+e.Mode](e)}},this.InvalidateBounds=i},L.Control.BrowserPrint.Mode.Landscape="Landscape",L.Control.BrowserPrint.Mode.Portrait="Portrait",L.Control.BrowserPrint.Mode.Auto="Auto",L.Control.BrowserPrint.Mode.Custom="Custom",L.Control.BrowserPrint.Mode.prototype.getPageMargin=function(t){var e,r=this.getPaperSize(),n=(r.Width+r.Height)/39.9;switch(t){case"mm":e=n.toFixed(2)+"mm";break;case"in":e=(n/25.4).toFixed(2)+"in";break;default:e=n}return e},L.Control.BrowserPrint.Mode.prototype.getPaperSize=function(){if(this.PageSeries){var t=L.Control.BrowserPrint.Size[this.PageSeries],e=t.Width,r=t.Height,n=!1;return this.PageSeriesSize&&(this.PageSeriesSize=+this.PageSeriesSize,(n=this.PageSeriesSize%2==1)?(e/=this.PageSeriesSize-1||1,r/=this.PageSeriesSize+1):(e/=this.PageSeriesSize,r/=this.PageSeriesSize)),{Width:n?r:e,Height:n?e:r}}var i=L.Control.BrowserPrint.Size[this.PageSeriesSize];return{Width:i.Width,Height:i.Height}},L.Control.BrowserPrint.Mode.prototype.getSize=function(){var t=this.getPaperSize(),e=2*this.getPageMargin()*(window.devicePixelRatio||1);return t.Width=Math.floor(t.Width-e)+"mm",t.Height=Math.floor(t.Height-e)+"mm",t},L.control.browserPrint.mode=function(t,e,r,n,i){return new L.Control.BrowserPrint.Mode(t,e,r,n,i)},L.control.browserPrint.mode.portrait=function(t,e,r){return L.control.browserPrint.mode(L.Control.BrowserPrint.Mode.Portrait,t,e,r,!1)},L.control.browserPrint.mode.landscape=function(t,e,r){return L.control.browserPrint.mode(L.Control.BrowserPrint.Mode.Landscape,t,e,r,!1)},L.control.browserPrint.mode.auto=function(t,e,r){return L.control.browserPrint.mode(L.Control.BrowserPrint.Mode.Auto,t,e,r,!0)},L.control.browserPrint.mode.custom=function(t,e,r){return L.control.browserPrint.mode(L.Control.BrowserPrint.Mode.Custom,t,e,r,!0)}}]);

const mapController = {
    map: {},
    minimap: {},
    currentLayer: {},
    drawControl: {},
    initialize(project, instance, callback) {
        let encryptedProjectMapParams = project.private.map
        cryptoTools.decryptObject(encryptedProjectMapParams, {symKey: Session.get("currentProjectSimKey")}, projectMapParams => {
            if (!projectMapParams.symEnc_mapProvider) {
                projectMapParams.symEnc_mapProvider = 0
            }
            if (!projectMapParams.symEnc_center) {
                projectMapParams.symEnc_center = JSON.stringify([47, 2.5])
            }

            this.map = L.map("map").setView(JSON.parse(projectMapParams.symEnc_center), projectMapParams.zoomLevel);

            this.currentLayer = L.tileLayer(
                mapParams.providers[projectMapParams.symEnc_mapProvider].url,
                mapParams.providers[projectMapParams.symEnc_mapProvider].options
            ).addTo(this.map);
            L.control.scale({
                imperial: false,
                maxWidth: 116
            }).addTo(this.map);
            //terminator().addTo(this.map);
            if (!Meteor.Device.isPhone()) {
                let osm2 = new L.TileLayer(mapParams.providers[0].url, {
                    minZoom: 0,
                    maxZoom: 13,
                    attribution: mapParams.providers[projectMapParams.symEnc_mapProvider].options.attribution
                });
                this.minimap = new L.Control.MiniMap(osm2, {
                    position: 'bottomleft',
                    width: 120,
                    height: 120,
                    zoomLevelOffset: -6
                }).addTo(this.map);
            }
            var drawnItems = new L.FeatureGroup();
            this.map.addLayer(drawnItems);
            this.drawControl = new L.Control.Draw({
                edit: {
                    featureGroup: drawnItems
                }
            });
            // Init search tools
            this.search = new L.Control.Geocoder({
                position: 'topleft',
                showResultIcons: true,
                defaultMarkGeocode: false
            })
            .on('markgeocode', (e) => {
                this.map.fitBounds(e.geocode.bbox,this.map.getZoom());
                var popup = L.popup()
                    .setLatLng(e.geocode.center)
                    .setContent(e.geocode.html)
                    .openOn(this.map);

            })
            .addTo(this.map);

            L.control.browserPrint({
                title: '',
                documentTitle: "System-D.org  -  " +project.name,
                printModes: [

                    L.control.browserPrint.mode.landscape(),
                    "Portrait",
                ],
                manualMode: false
            }).addTo(this.map)
            //
            this.map.addControl(this.drawControl);
            this.promptMarkers(project._id, instance)
            this.promptActivityMarkers(project._id, instance)
            if(callback){
                Meteor.setTimeout(()=>{
                    callback()
                },300)
            }
        })
    },
    changeLayer(id) {
        let newLayer = L.tileLayer(
            mapParams.providers[id].url,
            mapParams.providers[id].options
        )

        this.map.addLayer(newLayer);
        window.setTimeout(() => {
            this.map.removeLayer(this.currentLayer);
            this.currentLayer = newLayer
        }, 2000)
    },
    getCenteringParams() {
        let centeringParams = {
            symEnc_center: JSON.stringify(this.map.getCenter()),
            zoomLevel: this.map.getZoom()
        }
        return centeringParams
    },
    iconMarker: iconMarker,
    memberPosition: memberPosition,
    polyline: polyline,
    shape: shape,
    arrow: arrow,
    markerText: markerText,
    activityMarker: activityMarker,
    startMarkerCreator(type, options, mapState) {
        this.offEvents()
        if (this[type].default) {
            this[type].default.initialize(options, mapState)
        } else {
            this[type].initialize(options, mapState)
        }

    },
    moveMarker(marker, mapState) {
        if (this[marker.markerType].default) {
            this[marker.markerType].default.moveMarker(marker, mapState)
        } else {
            this[marker.markerType].moveMarker(marker, mapState)
        }
        mapState.set({currentAction: "creatingIcon", type: 'iconMarker', options: {}, marker: marker})
    },
    stopEtitingMarker(mapState) {
        this[mapState.get().type].default.stopEditing(mapState.get().marker)
    },
    offEvents() {
        this.map.off("draw:created", this.addMarker);
        this.map.off('draw:drawvertex', this.limitPolyline);
    },
    stopMarkerCreator(mapState) {
        this.offEvents()
        if (mapState) {
            if (this[mapState.get().type]) {
                if (this[mapState.get().type].default) {
                    this[mapState.get().type].default.stop()
                } else {
                    this[mapState.get().type].stop()
                }
            }
            mapState.set({})
        }
    },
    addMarker(e) {

    },
    limitPolyline(e) {

    },
    editMarkerCreatorColor(mapState, color) {
        this.stopMarkerCreator(mapState)
        let newOptions = mapState.get().options
        if (newOptions) {
            newOptions.color = color
            this.startMarkerCreator(mapState.get().type, newOptions, mapState)
        }
    },
    markers: {},
    promptMarkers(projectId, instance) {
        instance.autorun(() => {
            let markers = MapMarker.find({projectId: projectId}).fetch()
            let markersIdtoRemove = Object.keys(this.markers)
            markers.forEach((marker) => {
                if (!this.markers[marker._id]) {
                    if (this[marker.markerType].default) {
                        this[marker.markerType].default.showMarker(marker)
                    } else {
                        this[marker.markerType].showMarker(marker)
                    }

                } else if (marker.lastEditAt.getTime() > this.markers[marker._id].lastEditAt.getTime()) {
                    if (this[marker.markerType].default) {
                        this[marker.markerType].default.editMarker(marker)
                    } else {
                        this[marker.markerType].editMarker(marker)
                    }
                }
                markersIdtoRemove.splice(markersIdtoRemove.indexOf(marker._id), 1)
            })
            markersIdtoRemove.forEach(id => {
                this.removeMarker(this.markers[id])
            })
        })

    },
    activities: [],
    promptActivityMarkers(projectId, instance) {

        Meteor.subscribe("mapActivitiesByProject", projectController.getAuthInfo(projectId), projectId, err => {
            if (err) {
                console.log(err)
            } else {
                instance.autorun(() => {
                    let activitiesToShow = Activity.find({projectId: projectId, symEnc_coordinates: {$exists: true}}).fetch()
                    let markersIdtoRemove = Object.keys(this.activities)
                    activitiesToShow.forEach((activity) => {
                        if (!this.activities[activity._id]) {

                            this.activityMarker.default.showMarker(activity)
                        } else if (activity.lastEditAt.getTime() > this.activities[activity._id].lastEditAt.getTime()) {

                            this.activityMarker.default.editMarker(activity)

                        }
                        markersIdtoRemove.splice(markersIdtoRemove.indexOf(activity._id), 1)
                    })
                    markersIdtoRemove.forEach(id => {
                        this.activities[id].markerType='activityMarker'
                        this.removeMarker(this.activities[id])
                    })
                })
            }
        })
    },
    removeMarker(marker) {
        if (marker) {
            if (typeof this[marker.markerType].default !== "undefined") {
                this[marker.markerType].default.removeMarker(marker)
            } else {
                this[marker.markerType].removeMarker(marker)
            }
        }
    },
    reset(){
        this.activities = []
        this.markers = []
        let mapInstance=this.map
        if (mapInstance && mapInstance.remove) {
            mapInstance.off();
            mapInstance.remove();
        }
    }
}
export default mapController
