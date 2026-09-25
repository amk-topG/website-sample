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