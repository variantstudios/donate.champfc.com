var Instafeed;(function(){var t;t=function(){function i(t,e){var o,i;if(this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1},"object"==typeof t)for(o in t)i=t[o],this.options[o]=i;this.context=null!=e?e:this,this.unique=this._genKey()}return i.prototype.hasNext=function(){return"string"==typeof this.context.nextUrl&&0<this.context.nextUrl.length},i.prototype.next=function(){return!!this.hasNext()&&this.run(this.context.nextUrl)},i.prototype.run=function(t){var e,o;if("string"!=typeof this.options.clientId&&"string"!=typeof this.options.accessToken)throw new Error("Missing clientId or accessToken.");if("string"!=typeof this.options.accessToken&&"string"!=typeof this.options.clientId)throw new Error("Missing clientId or accessToken.");return null!=this.options.before&&"function"==typeof this.options.before&&this.options.before.call(this),"undefined"!=typeof document&&null!==document&&((o=document.createElement("script")).id="instafeed-fetcher",o.src=t||this._buildUrl(),document.getElementsByTagName("head")[0].appendChild(o),e="instafeedCache"+this.unique,window[e]=new i(this.options,this),window[e].unique=this.unique),!0},i.prototype.parse=function(t){var e,o,i,n,s,r,a,p,c,l,h,u,d,f,m,g,y,w,k;if("object"!=typeof t){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(200!==t.meta.code){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,t.meta.error_message),!1;throw new Error("Error from Instagram: "+t.meta.error_message)}if(0===t.data.length){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}if(null!=this.options.success&&"function"==typeof this.options.success&&this.options.success.call(this,t),this.context.nextUrl="",null!=t.pagination&&(this.context.nextUrl=t.pagination.next_url),"none"!==this.options.sortBy)switch(l="least"===(h="random"===this.options.sortBy?["","random"]:this.options.sortBy.split("-"))[0],h[1]){case"random":t.data.sort(function(){return.5-Math.random()});break;case"recent":t.data=this._sortBy(t.data,"created_time",l);break;case"liked":t.data=this._sortBy(t.data,"likes.count",l);break;case"commented":t.data=this._sortBy(t.data,"comments.count",l);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}if("undefined"!=typeof document&&null!==document&&!1===this.options.mock){if(r=t.data,null!=this.options.limit&&r.length>this.options.limit&&(r=r.slice(0,this.options.limit+1||9e9)),o=document.createDocumentFragment(),null!=this.options.filter&&"function"==typeof this.options.filter&&(r=this._filter(r,this.options.filter)),null!=this.options.template&&"string"==typeof this.options.template){for(i="",u=document.createElement("div"),d=0,g=r.length;d<g;d++)s=(n=r[d]).images[this.options.resolution].url,this.options.useHttp||(s=s.replace("http://","//")),i+=this._makeTemplate(this.options.template,{model:n,id:n.id,link:n.link,image:s,caption:this._getObjectProperty(n,"caption.text"),likes:n.likes.count,comments:n.comments.count,location:this._getObjectProperty(n,"location.name")});for(u.innerHTML=i,f=0,y=(k=[].slice.call(u.childNodes)).length;f<y;f++)c=k[f],o.appendChild(c)}else for(m=0,w=r.length;m<w;m++)n=r[m],a=document.createElement("img"),s=n.images[this.options.resolution].url,this.options.useHttp||(s=s.replace("http://","//")),a.src=s,!0===this.options.links?((e=document.createElement("a")).href=n.link,e.appendChild(a),o.appendChild(e)):o.appendChild(a);document.getElementById(this.options.target).appendChild(o),document.getElementsByTagName("head")[0].removeChild(document.getElementById("instafeed-fetcher")),p="instafeedCache"+this.unique,window[p]=void 0;try{delete window[p]}catch(t){}}return null!=this.options.after&&"function"==typeof this.options.after&&this.options.after.call(this),!0},i.prototype._buildUrl=function(){var t,e;switch("https://api.instagram.com/v1",this.options.get){case"popular":t="media/popular";break;case"tagged":if("string"!=typeof this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");t="tags/"+this.options.tagName+"/media/recent";break;case"location":if("number"!=typeof this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");t="locations/"+this.options.locationId+"/media/recent";break;case"user":if("number"!=typeof this.options.userId)throw new Error("No user specified. Use the 'userId' option.");if("string"!=typeof this.options.accessToken)throw new Error("No access token. Use the 'accessToken' option.");t="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return e="https://api.instagram.com/v1/"+t,null!=this.options.accessToken?e+="?access_token="+this.options.accessToken:e+="?client_id="+this.options.clientId,null!=this.options.limit&&(e+="&count="+this.options.limit),e+="&callback=instafeedCache"+this.unique+".parse"},i.prototype._genKey=function(){var t;return""+(t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)})()+t()+t()+t()},i.prototype._makeTemplate=function(t,e){var o,i,n,s,r;for(i=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,o=t;i.test(o);)n=o.match(i)[1],s=null!=(r=this._getObjectProperty(e,n))?r:"",o=o.replace(i,""+s);return o},i.prototype._getObjectProperty=function(t,e){var o,i;for(i=(e=e.replace(/\[(\w+)\]/g,".$1")).split(".");i.length;){if(o=i.shift(),!(null!=t&&o in t))return null;t=t[o]}return t},i.prototype._sortBy=function(t,n,s){var e;return e=function(t,e){var o,i;return o=this._getObjectProperty(t,n),i=this._getObjectProperty(e,n),s?i<o?1:-1:o<i?1:-1},t.sort(e.bind(this)),t},i.prototype._filter=function(t,e){var o,i,n,s;for(o=[],i=function(t){if(e(t))return o.push(t)},n=0,s=t.length;n<s;n++)i(t[n]);return o},i}(),("undefined"!=typeof exports&&null!==exports?exports:window).Instafeed=t}).call(this);var feed=new Instafeed({get:"user",userId:7195032456,clientId:"0ed61e6a80684ff896bf5096448b2068",accessToken:"7195032456.1677ed0.1c1ab01070ca40fdb46999ad07d8b74f",resolution:"low_resolution",limit:3,useHttp:!0,sortBy:"most-recent",template:'<a href="{{link}}" class="social-post" target="_blank"><span class="social-tag instagram"></span><img src="{{image}}" alt="instagram"><div class="social-text"><p>{{caption}}</p></div></a>'});feed.run();