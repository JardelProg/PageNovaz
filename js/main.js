const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
$('#yr').textContent=new Date().getFullYear();

// Edit this list to add/change products and categories
const PRODUCTS=[
 {n:'Smart Home Devices',c:'Technology',d:'Plugs, sensors and hubs, ready for your app.',a:['#1d4dff','#071a66']},
 {n:'Audio & Wearables',c:'Technology',d:'Earbuds, speakers and smart bands.',a:['#2a63ff','#0a1f7a']},
 {n:'Power & Charging',c:'Technology',d:'Chargers, power banks and cables.',a:['#1747d6','#06143f']},
 {n:'Kitchen Essentials',c:'Home & Living',d:'Cookware and tools built for daily use.',a:['#3a7bff','#0b2a8f']},
 {n:'Decor & Lighting',c:'Home & Living',d:'Lamps and accents in your brand palette.',a:['#2457e8','#081c57']},
 {n:'Skincare Line',c:'Beauty',d:'Serums and creams under your label.',a:['#4aa8ff','#12308f']},
 {n:'Hair & Body Care',c:'Beauty',d:'Shampoos, oils and body products.',a:['#3c8dff','#0c2570']},
 {n:'Supplements',c:'Wellness',d:'Capsules, powders and gummies.',a:['#1d6bff','#07205e']},
 {n:'Fitness Gear',c:'Wellness',d:'Bands, bottles and recovery tools.',a:['#2f5bff','#0a1a6b']},
 {n:'Activewear',c:'Fashion',d:'Technical apparel with custom labels.',a:['#4b6fff','#101e78']},
 {n:'Bags & Accessories',c:'Fashion',d:'Backpacks, wallets and travel gear.',a:['#2a4fd9','#081650']},
 {n:'Functional Beverages',c:'Food & Beverage',d:'Drinks and snacks, formulated for you.',a:['#3f9bff','#0d2c85']},
 {n:'Pet Care',c:'Pet',d:'Toys, feeders and grooming.',a:['#2d73ff','#09246e']},
 {n:'Custom Packaging',c:'Packaging',d:'Boxes and unboxing built around your brand.',a:['#1f56f0','#061548']}
];
const cats=['All',...new Set(PRODUCTS.map(p=>p.c))];
const fEl=$('#filters'),pEl=$('#products');
function render(cat){
  pEl.innerHTML=PRODUCTS.filter(p=>cat==='All'||p.c===cat).map((p,i)=>
   `<article class="pcard" data-i="${String(i+1).padStart(2,'0')}" style="--c1:${p.a[0]};--c2:${p.a[1]};animation-delay:${i*50}ms"><small>${p.c}</small><h3>${p.n}</h3><p>${p.d}</p></article>`).join('');
  $$('.pcard').forEach(tilt);
}
cats.forEach((c,i)=>{const b=document.createElement('button');b.className='chip'+(i?'':' on');b.textContent=c;
  b.onclick=()=>{$$('.chip').forEach(x=>x.classList.remove('on'));b.classList.add('on');render(c)};fEl.append(b)});
function tilt(el){
  el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    el.style.transform=`perspective(800px) rotateY(${x*12}deg) rotateX(${-y*12}deg) translateY(-4px)`});
  el.addEventListener('mouseleave',()=>el.style.transform='');
}
render('All');

// Scroll reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.reveal').forEach(el=>io.observe(el));

// Counters
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);
  const end=+e.target.dataset.count,t0=performance.now();
  (function f(t){const p=Math.min((t-t0)/1800,1);e.target.textContent=Math.round(end*(1-Math.pow(1-p,4)));if(p<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});
$$('[data-count]').forEach(el=>co.observe(el));

// Scroll effects: progress bar, nav hide, stacked cards shrink, orb parallax
let last=0;
function onScroll(){
  const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
  $('#progress').style.width=(y/h*100)+'%';
  $('#nav').classList.toggle('hide',y>last&&y>200);last=y;
  const cards=$$('.scard');
  cards.forEach((c,i)=>{const n=cards[i+1];if(!n)return;
    const d=Math.max(0,Math.min(1,1-(n.getBoundingClientRect().top-c.getBoundingClientRect().top)/innerHeight*1.4));
    c.style.transform=`scale(${1-d*.06})`;c.style.filter=`brightness(${1-d*.35})`});
  $$('.hero .orb').forEach((o,i)=>o.style.translate=`0 ${y*(.12+i*.08)}px`);
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

// Mouse parallax on hero orbs
$('.hero').addEventListener('mousemove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
  $$('.hero .orb').forEach((o,i)=>o.style.marginLeft=`${x*(40+i*30)}px`)});
