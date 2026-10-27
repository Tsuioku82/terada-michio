const sizeKey='terada-font-size';
const sizes=['normal','large','xlarge'];
let initialSize='normal';
try{initialSize=localStorage.getItem(sizeKey)||'normal';}catch{}
const querySize=new URLSearchParams(location.search).get('text');
if(sizes.includes(querySize))initialSize=querySize;
function applySize(value){
 const size=sizes.includes(value)?value:'normal';
 document.body.classList.remove('large','xlarge');
 if(size!=='normal')document.body.classList.add(size);
 document.querySelectorAll('[data-font]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.font===size)));
 try{localStorage.setItem(sizeKey,size);}catch{}
 try{const url=new URL(location.href);url.searchParams.set('text',size);history.replaceState(null,'',url);}catch{}
 document.querySelectorAll('a[href]').forEach(a=>{const url=new URL(a.getAttribute('href'),location.href);if(url.origin===location.origin&&/\/(?:index|memories|message)\.html$/.test(url.pathname)){url.searchParams.set('text',size);a.href=url.pathname+url.search+url.hash;}});
}
applySize(initialSize);
document.querySelectorAll('[data-font]').forEach(b=>b.addEventListener('click',()=>{applySize(b.dataset.font);const status=document.querySelector('[data-size-status]');if(status)status.textContent='文字の大きさを「'+({normal:'標準',large:'大',xlarge:'特大'}[b.dataset.font])+'」に変更しました。';}));
document.querySelectorAll('[data-zoom]').forEach(img=>img.addEventListener('click',()=>{const dlg=document.getElementById('image-dialog'),large=dlg.querySelector('img');large.src=img.src;large.alt=img.alt;dlg.showModal();}));
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
