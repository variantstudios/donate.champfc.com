$(document).ready(function(){for(var t=0;t<document.images.length;t++)(!(e=document.images[t]).complete||void 0!==e.naturalWidth&&0==e.naturalWidth)&&(console.log(document.images[t]),document.images[t].attributes["data-img"]&&(document.images[t].src=document.images[t].attributes["data-img"].value),document.images[t].attributes["data-width"]&&(document.images[t].width=document.images[t].attributes["data-width"].value),document.images[t].attributes["data-height"]&&(document.images[t].height=document.images[t].attributes["data-height"].value));var e});