/* empty css                      */import{a as b,S as L,i}from"./assets/vendor-BCVp9CTC.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&e(u)}).observe(document,{childList:!0,subtree:!0});function a(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(s){if(s.ep)return;s.ep=!0;const o=a(s);fetch(s.href,o)}})();async function h(t,r=1,a){const e={key:"41061573-024b7cbeabeac3d17174d6333",q:String(t),image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:a},s=new URLSearchParams(e);return(await b.get(`https://pixabay.com/api/?${s}`)).data}function w(t,r){const a=r.map(e=>`
      <a class="gallery__item" href="${e.largeImageURL}">
        <div class="photo-card">
          <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
          <div class="info">
            <p><b>Likes:</b> ${e.likes}</p>
            <p><b>Views:</b> ${e.views}</p>
            <p><b>Comments:</b> ${e.comments}</p>
            <p><b>Downloads:</b> ${e.downloads}</p>
          </div>
        </div>
      </a>`).join("");t.innerHTML=a}function v(t,r){const a=r.map(e=>`
      <a class="gallery__item" href="${e.largeImageURL}">
        <div class="photo-card">
          <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
          <div class="info">
            <p><b>Likes:</b> ${e.likes}</p>
            <p><b>Views:</b> ${e.views}</p>
            <p><b>Comments:</b> ${e.comments}</p>
            <p><b>Downloads:</b> ${e.downloads}</p>
          </div>
        </div>
      </a>`).join("");t.insertAdjacentHTML("beforeend",a)}function $(t){t.innerHTML=""}function m(t){t.classList.remove("is-hidden")}function p(t){t.classList.add("is-hidden")}function S(t){t.classList.remove("is-hidden")}function g(t){t.classList.add("is-hidden")}const q=document.querySelector("#search-form"),P=document.querySelector("#search-input"),f=document.querySelector(".gallery"),c=document.querySelector("#loader"),n=document.querySelector(".load-more-btn");let l=null,d=1;const R=async()=>{const t=d+=1,r=15;m(c),n.disabled=!0;const{hits:a,totalHits:e}=await h(l,t,r);p(c),n.disabled=!1,v(f,a),y.refresh();const s=document.querySelector(".gallery").firstElementChild;if(s){const{height:o}=s.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}r*d>=e&&(g(n),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))};n.addEventListener("click",R);const y=new L(".gallery a",{captionsData:"alt",captionDelay:250});q.addEventListener("submit",async t=>{if(t.preventDefault(),l=P.value.trim(),d=1,!l){i.warning({message:"Input text to search!"});return}$(f),m(c);try{const r=await h(l,1,15);if(d===1&&r.hits.length>0&&S(n),!r.hits.length){i.info({message:"Sorry, there are no images matching your search query. Please try again!"}),g(n);return}w(f,r.hits),i.success({message:`We found ${r.totalHits} results`,position:"topRight"}),y.refresh()}catch{p(c),i.error({message:"Error during loading!"})}finally{p(c)}});
//# sourceMappingURL=index.js.map
