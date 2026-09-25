"use strict";

const products = [
  {id:1,title:"دفتر ۱۰۰ برگ جلد سخت",cat:"دفتر و کاغذ",brand:"پاپکو",price:89000,oldPrice:112000,image:"assets/products/notebook.svg",rating:4.8,badge:"پرفروش",desc:"دفتر ساده و محکم برای مدرسه و دانشگاه.",specs:[["نوع جلد","سخت"],["تعداد برگ","۱۰۰ برگ"],["اندازه","A5"],["نوع کاغذ","خط‌دار"]]},
  {id:2,title:"ست خودکار رنگی ۳ عددی",cat:"نوشت افزار",brand:"پنتر",price:76000,oldPrice:95000,image:"assets/products/pens.svg",rating:4.7,badge:"تخفیف",desc:"روان، خوش‌دست و مناسب استفاده روزانه.",specs:[["تعداد","۳ عدد"],["نوک","۰.۷ میلی‌متر"],["رنگ","چند رنگ"],["کاربرد","روزانه"]]},
  {id:3,title:"مداد رنگی ۲۴ رنگ",cat:"لوازم نقاشی",brand:"فابرکاستل",price:245000,oldPrice:290000,image:"assets/products/pencils.svg",rating:4.9,badge:"محبوب",desc:"رنگ‌های زنده برای نقاشی و طراحی.",specs:[["تعداد","۲۴ رنگ"],["جنس","چوبی"],["مناسب","طراحی"],["بسته‌بندی","مقوایی"]]},
  {id:4,title:"جامدادی پارچه‌ای فانتزی",cat:"جامدادی و کیف",brand:"آریا",price:128000,oldPrice:149000,image:"assets/products/case.svg",rating:4.6,badge:"جدید",desc:"سبک، جادار و مناسب کیف مدرسه.",specs:[["جنس","پارچه‌ای"],["تعداد زیپ","یک عدد"],["ابعاد","متوسط"],["طرح","فانتزی"]]},
  {id:5,title:"هایلایتر پاستلی ۴ رنگ",cat:"نوشت افزار",brand:"پنتر",price:118000,oldPrice:140000,image:"assets/products/highlighters.svg",rating:4.8,badge:"پرفروش",desc:"چهار رنگ ملایم برای یادداشت و مطالعه.",specs:[["تعداد","۴ عدد"],["نوع","پاستلی"],["نوک","تخت"],["کاربرد","مطالعه"]]},
  {id:6,title:"کوله پشتی سبک دانش‌آموزی",cat:"جامدادی و کیف",brand:"پاپکو",price:690000,oldPrice:790000,image:"assets/products/backpack.svg",rating:4.7,badge:"ویژه",desc:"کوله سبک با فضای کافی برای کتاب و دفتر.",specs:[["جنس","ضد آب"],["تعداد جیب","۴ عدد"],["بند","قابل تنظیم"],["مناسب","مدرسه"]]},
  {id:7,title:"ست نقاشی و طراحی",cat:"لوازم نقاشی",brand:"آریا",price:385000,oldPrice:430000,image:"assets/products/artset.svg",rating:4.9,badge:"محبوب",desc:"یک ست جمع‌وجور برای شروع نقاشی.",specs:[["نوع","ست هنری"],["اقلام","۱۲ تکه"],["مناسب","نوجوان"],["بسته‌بندی","کیفی"]]},
  {id:8,title:"ست رومیزی ساده و کاربردی",cat:"لوازم اداری",brand:"پاپکو",price:310000,oldPrice:350000,image:"assets/products/desk.svg",rating:4.5,badge:"جدید",desc:"برای مرتب نگه داشتن میز کار و مطالعه.",specs:[["تعداد","۵ تکه"],["جنس","پلاستیک فشرده"],["رنگ","بنفش"],["کاربرد","میز کار"]]}
];

const store = {
  cart: readStore("gharaati_cart", []),
  wishes: readStore("gharaati_wishes", []),
  compare: readStore("gharaati_compare", [])
};

function readStore(key, fallback){
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
}
function saveStore(key, value){
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}
const fa = value => Number(value).toLocaleString("fa-IR");
const byId = id => products.find(p => p.id === Number(id));
const qs = (sel, root=document) => root.querySelector(sel);
const qsa = (sel, root=document) => [...root.querySelectorAll(sel)];

function productCard(p){
  const discount = p.oldPrice ? Math.round((1-p.price/p.oldPrice)*100) : 0;
  return `<article class="product-card reveal">
    <a class="product-media" href="product.html?id=${p.id}" aria-label="${p.title}">
      <img src="${p.image}" alt="${p.title}" width="600" height="600" loading="lazy" decoding="async">
      <span class="product-badges">
        ${discount ? `<span class="badge badge-sale">${fa(discount)}٪</span>` : ""}
        ${p.badge ? `<span class="badge badge-popular">${p.badge}</span>` : ""}
      </span>
      <span class="product-tools">
        <button type="button" data-wish="${p.id}" aria-label="افزودن به علاقه‌مندی">♡</button>
        <button type="button" data-compare="${p.id}" aria-label="مقایسه">⇄</button>
      </span>
    </a>
    <div class="product-body">
      <span class="product-cat">${p.cat}</span>
      <a href="product.html?id=${p.id}" class="product-title">${p.title}</a>
      <div class="product-meta"><span>${p.brand}</span><span class="stars">★ ${p.rating.toLocaleString("fa-IR")}</span></div>
      <div class="price-row">
        <div class="price"><b>${fa(p.price)}</b> <small>تومان</small>${p.oldPrice ? `<span class="old-price">${fa(p.oldPrice)}</span>` : ""}</div>
        <button class="add-btn" type="button" data-add="${p.id}" aria-label="افزودن ${p.title} به سبد">＋</button>
      </div>
    </div>
  </article>`;
}

function renderProducts(target, list){
  const el = typeof target === "string" ? document.getElementById(target) : target;
  if(!el) return;
  el.innerHTML = list.map(productCard).join("");
  observeReveals(el);
}

function addToCart(id, qty=1){
  const item = store.cart.find(x => x.id === Number(id));
  if(item) item.qty += qty;
  else store.cart.push({id:Number(id), qty});
  saveStore("gharaati_cart", store.cart);
  updateCartUI();
  showToast("به سبد خرید اضافه شد");
  const cartButton = qs("[data-drawer='cart']");
  if(cartButton){ cartButton.classList.remove("cart-pop"); requestAnimationFrame(()=>cartButton.classList.add("cart-pop")); }
}
function removeFromCart(id){
  store.cart = store.cart.filter(x => x.id !== Number(id));
  saveStore("gharaati_cart", store.cart);
  updateCartUI();
  renderCartPage();
}
function changeQty(id, amount){
  const item = store.cart.find(x => x.id === Number(id));
  if(!item) return;
  item.qty += Number(amount);
  if(item.qty <= 0) store.cart = store.cart.filter(x => x.id !== item.id);
  saveStore("gharaati_cart", store.cart);
  updateCartUI();
  renderCartPage();
}
function cartTotals(){
  return store.cart.reduce((sum,item)=>{
    const p=byId(item.id); if(!p) return sum;
    sum.total += p.price*item.qty;
    sum.old += (p.oldPrice || p.price)*item.qty;
    sum.count += item.qty;
    return sum;
  },{total:0,old:0,count:0});
}
function updateCartUI(){
  const totals = cartTotals();
  qsa("[data-cart-count]").forEach(el=>{
    el.textContent=fa(totals.count);
    if(el.classList.contains("count")) el.style.display = totals.count ? "grid" : "none";
  });
  qsa("[data-wish-count]").forEach(el=>{
    el.textContent=fa(store.wishes.length);
    el.style.display = store.wishes.length ? "grid" : "none";
  });
  renderCartDrawer();
}
function renderCartDrawer(){
  const body=qs("#cart-drawer-body");
  if(!body) return;
  if(!store.cart.length){
    body.innerHTML='<div class="empty-state"><span>🛒</span><b>سبد خرید خالی است</b><p style="font-size:11px;color:var(--muted);margin-top:5px">یک محصول انتخاب کنید.</p></div>';
  } else {
    body.innerHTML=store.cart.map(item=>{
      const p=byId(item.id); if(!p) return "";
      return `<div class="drawer-cart-item"><img src="${p.image}" width="64" height="64" alt=""><div style="flex:1"><h4>${p.title}</h4><p>${fa(item.qty)} عدد · ${fa(p.price*item.qty)} تومان</p></div><button data-remove="${p.id}" aria-label="حذف">✕</button></div>`;
    }).join("");
  }
  const t=cartTotals();
  const total=qs("#drawer-total"); if(total) total.textContent=fa(t.total)+" تومان";
}

function toggleWish(id){
  id=Number(id);
  const exists=store.wishes.includes(id);
  store.wishes=exists?store.wishes.filter(x=>x!==id):[...store.wishes,id];
  saveStore("gharaati_wishes",store.wishes);
  updateCartUI();
  showToast(exists?"از علاقه‌مندی حذف شد":"به علاقه‌مندی اضافه شد");
}
function toggleCompare(id){
  id=Number(id);
  if(store.compare.includes(id)) store.compare=store.compare.filter(x=>x!==id);
  else if(store.compare.length<3) store.compare.push(id);
  else return showToast("حداکثر ۳ محصول را مقایسه کنید");
  saveStore("gharaati_compare",store.compare);
  showToast(`${fa(store.compare.length)} محصول برای مقایسه`);
}

function openDrawer(name){
  const el=qs(`#${name}-drawer`); if(!el) return;
  el.classList.add("active"); document.body.style.overflow="hidden";
}
function closeDrawers(){ qsa(".drawer.active").forEach(x=>x.classList.remove("active")); document.body.style.overflow=""; }
let toastTimer;
function showToast(text){
  const el=qs("#toast"); if(!el) return;
  el.textContent=text; el.classList.add("active"); clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove("active"),2200);
}

function initSearch(){
  qsa("[data-search]").forEach(input=>{
    const wrap=input.closest(".search-wrap");
    const panel=qs(".search-suggest",wrap);
    if(!panel) return;
    const update=()=>{
      const term=input.value.trim();
      if(term.length<2){panel.classList.remove("active");return;}
      const result=products.filter(p=>(p.title+p.cat+p.brand).includes(term)).slice(0,4);
      panel.innerHTML=result.length?result.map(p=>`<a class="suggest-item" href="product.html?id=${p.id}"><img src="${p.image}" alt="" width="48" height="48"><span><b>${p.title}</b><span>${fa(p.price)} تومان</span></span></a>`).join(""):'<div style="padding:12px;font-size:12px;color:var(--muted)">محصولی پیدا نشد.</div>';
      panel.classList.add("active");
    };
    input.addEventListener("input",update);
    input.addEventListener("focus",update);
  });
  document.addEventListener("click",e=>{if(!e.target.closest(".search-wrap")) qsa(".search-suggest").forEach(x=>x.classList.remove("active"));});
}

let revealObserver;
function initReveal(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){qsa(".reveal").forEach(x=>x.classList.add("in-view"));return;}
  revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("in-view");revealObserver.unobserve(entry.target);}
  }),{threshold:.08,rootMargin:"0px 0px -25px"});
  observeReveals(document);
}
function observeReveals(root){
  if(!revealObserver) return;
  qsa(".reveal:not(.in-view)",root).forEach(el=>revealObserver.observe(el));
}
function initScrollProgress(){
  const bar=qs("#scroll-progress"); if(!bar) return;
  const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=(max>0?(scrollY/max)*100:0)+"%";};
  addEventListener("scroll",update,{passive:true}); update();
}
function initCountdown(){
  const box=qs("#countdown"); if(!box) return;
  const tick=()=>{
    const now=new Date(); const end=new Date(); end.setHours(23,59,59,999);
    let seconds=Math.max(0,Math.floor((end-now)/1000));
    const h=Math.floor(seconds/3600); seconds%=3600; const m=Math.floor(seconds/60); const s=seconds%60;
    box.innerHTML=`<div><b>${String(h).padStart(2,"0")}</b><span>ساعت</span></div><div><b>${String(m).padStart(2,"0")}</b><span>دقیقه</span></div><div><b>${String(s).padStart(2,"0")}</b><span>ثانیه</span></div>`;
  }; tick(); setInterval(tick,1000);
}

function initHome(){
  renderProducts("products-featured",products.slice(0,8));
  renderProducts("products-offer",products.filter(p=>p.oldPrice).slice(0,4));
  qsa("[data-product-filter]").forEach(btn=>btn.addEventListener("click",()=>{
    qsa("[data-product-filter]").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
    const val=btn.dataset.productFilter;
    renderProducts("products-featured",val==="all"?products:products.filter(p=>p.cat===val));
  }));
}
function initCategory(){
  const target=qs("#products-category"); if(!target) return;
  const params=new URLSearchParams(location.search); const cat=params.get("cat");
  const title=qs("#category-title"); if(title&&cat) title.textContent=cat;
  let list=(cat&&cat!=="همه محصولات"&&cat!=="شگفت انگیزها")?products.filter(p=>p.cat===cat||p.title.includes(cat)):products.slice();
  if(cat==="شگفت انگیزها") list=products.filter(p=>p.oldPrice);
  let current=list.slice(); renderProducts(target,current);
  const count=qs("#catalog-count"); const setCount=()=>{if(count)count.textContent=fa(current.length)+" کالا";}; setCount();
  qsa("[data-sort]").forEach(btn=>btn.addEventListener("click",()=>{
    qsa("[data-sort]").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
    const type=btn.dataset.sort;
    current=[...current].sort((a,b)=>type==="cheap"?a.price-b.price:type==="expensive"?b.price-a.price:b.rating-a.rating);
    renderProducts(target,current);
  }));
  qsa("[data-cat-check]").forEach(input=>input.addEventListener("change",()=>{
    const selected=qsa("[data-cat-check]:checked").map(x=>x.value);
    current=selected.length?products.filter(p=>selected.includes(p.cat)):list.slice();renderProducts(target,current);setCount();
  }));
}
function initProduct(){
  const root=qs("#product-page"); if(!root) return;
  const id=Number(new URLSearchParams(location.search).get("id"))||1; const p=byId(id)||products[0];
  document.title=`${p.title} | کافی نت و لوازم تحریری قرائتی`;
  const set=(sel,text)=>{const el=qs(sel);if(el)el.textContent=text;};
  set("#product-title",p.title);set("#product-short",p.title);set("#product-cat",p.cat);set("#product-brand",p.brand);set("#product-rating",p.rating.toLocaleString("fa-IR"));set("#product-desc",p.desc);set("#product-price",fa(p.price));set("#product-old",p.oldPrice?fa(p.oldPrice)+" تومان":"");
  const image=qs("#product-image"); if(image){image.src=p.image;image.alt=p.title;}
  qsa("[data-main-product]").forEach(x=>x.dataset.add=String(p.id));
  const currentWish=qs("[data-current-wish]"); if(currentWish) currentWish.dataset.wish=String(p.id);
  const specs=qs("#product-specs");if(specs)specs.innerHTML=p.specs.map(x=>`<li><span>${x[0]}</span><b>${x[1]}</b></li>`).join("");
  const thumbs=qs("#product-thumbs");if(thumbs)thumbs.innerHTML=[p,...products.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,3)].map((x,i)=>`<button class="${i===0?"active":""}" data-thumb="${x.image}"><img src="${x.image}" alt="" width="68" height="68"></button>`).join("");
  renderProducts("products-related",products.filter(x=>x.id!==p.id&&(x.cat===p.cat||x.brand===p.brand)).slice(0,3));
}
function renderCartPage(){
  const wrap=qs("#cart-page-items"); if(!wrap) return;
  if(!store.cart.length){wrap.innerHTML='<div class="empty-state"><span>🛒</span><h2>سبد خرید خالی است</h2><p style="font-size:11px;color:var(--muted);margin:5px 0 15px">محصول دلخواه خود را انتخاب کنید.</p><a class="btn btn-primary" href="index.html#products">مشاهده محصولات</a></div>';}
  else wrap.innerHTML=store.cart.map(item=>{const p=byId(item.id);if(!p)return"";return `<article class="cart-item"><img src="${p.image}" alt="${p.title}" width="104" height="104"><div class="cart-item-info"><h3>${p.title}</h3><p>${p.brand} · موجود</p><div class="cart-item-row"><div class="qty" style="margin:0"><button data-qty="-1" data-id="${p.id}">−</button><b>${fa(item.qty)}</b><button data-qty="1" data-id="${p.id}">+</button></div><b>${fa(p.price*item.qty)} تومان</b></div></div><button data-remove="${p.id}" aria-label="حذف">✕</button></article>`;}).join("");
  const t=cartTotals();
  const values={"#cart-old":t.old,"#cart-discount":t.old-t.total,"#cart-total":t.total};
  Object.entries(values).forEach(([sel,val])=>{const el=qs(sel);if(el)el.textContent=fa(val)+" تومان";});
}

function handleClick(e){
  const add=e.target.closest("[data-add]"); if(add){e.preventDefault();addToCart(add.dataset.add);return;}
  const remove=e.target.closest("[data-remove]"); if(remove){removeFromCart(remove.dataset.remove);return;}
  const qty=e.target.closest("[data-qty]"); if(qty){changeQty(qty.dataset.id,qty.dataset.qty);return;}
  const wish=e.target.closest("[data-wish]"); if(wish){e.preventDefault();toggleWish(wish.dataset.wish);return;}
  const compare=e.target.closest("[data-compare]"); if(compare){e.preventDefault();toggleCompare(compare.dataset.compare);return;}
  const drawer=e.target.closest("[data-drawer]"); if(drawer){e.preventDefault();openDrawer(drawer.dataset.drawer);return;}
  if(e.target.closest("[data-close-drawer]")){closeDrawers();return;}
  if(e.target.closest("[data-dark]")){document.documentElement.classList.toggle("dark");try{localStorage.setItem("gharaati_dark",document.documentElement.classList.contains("dark")?"1":"0");}catch{}return;}
  const filter=e.target.closest("[data-filter-toggle]");if(filter){qs("#filters")?.classList.toggle("active");return;}
  const thumb=e.target.closest("[data-thumb]");if(thumb){qsa("[data-thumb]").forEach(x=>x.classList.remove("active"));thumb.classList.add("active");const img=qs("#product-image");if(img)img.src=thumb.dataset.thumb;return;}
  const checkout=e.target.closest("[data-checkout]");if(checkout){qs("#checkout-form")?.classList.add("active");qs("#checkout-form")?.scrollIntoView({behavior:"smooth",block:"center"});return;}
  const submit=e.target.closest("[data-demo-submit]");if(submit){showToast("این بخش در نسخه نهایی فعال می‌شود");return;}
}

function boot(){
  document.documentElement.classList.toggle("dark",localStorage.getItem("gharaati_dark")==="1");

  function updateThemeIcon() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    btn.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
  }
  updateThemeIcon();

  // Also update icon when theme changes
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-dark]')) {
      setTimeout(updateThemeIcon, 10);
    }
  });

  document.addEventListener("click",handleClick);
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeDrawers();});
  initReveal();initScrollProgress();initSearch();initCountdown();initHome();initCategory();initProduct();renderCartPage();updateCartUI();
  requestAnimationFrame(()=>requestAnimationFrame(()=>document.documentElement.classList.add("ready")));
}

document.addEventListener("DOMContentLoaded",boot);

// Tiny global API for simple demo buttons.
window.addToCart=addToCart;
window.renderProducts=renderProducts;
window.products=products;
