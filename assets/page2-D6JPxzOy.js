import{g as c,I as i,c as o}from"./theme-manager-DbA4SkLg.js";document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".card__wrapper"),r=c();if(e){if(!r.length){e.innerHTML=`
      <div class="no-results">
        <p>You haven’t saved any images yet.</p>
        <a href="index.html" class="back-to-gallery">← Go to Gallery</a>
      </div>
    `;return}e.innerHTML=r.map((a,t)=>`
    <article class="card__item" data-index="${t}">
      <img class="card__img" src="${a.url}" alt="${a.alt||""}">
    </article>
  `).join(""),e.addEventListener("click",a=>{const t=a.target.closest(".card__item");if(!t)return;const n=Number(t.dataset.index);new i(r,n).buildModal()})}});document.querySelector(".clear-favorites")?.addEventListener("click",()=>{confirm("Удалить все изображения из избранного?")&&(o(),location.reload())});
