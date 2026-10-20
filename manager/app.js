const STORAGE_KEY = 'rp-manager-draft-v1';
const initial = {
  site: { name: 'RP Bookkeeping Consultant (Pty) Ltd', url: 'https://rpbookkeeping.co.za/', description: 'Practical bookkeeping support for South African businesses.' },
  home: { headline: 'Practical bookkeeping support for South African businesses', subheadline: 'Clear, dependable support to help keep your financial records organised and up to date.', primaryButton: 'Book a conversation' },
  about: { heading: 'About RP Bookkeeping', body: 'RP Bookkeeping Consultant (Pty) Ltd provides practical bookkeeping support for businesses in South Africa.' },
  services: { heading: 'Bookkeeping services', summary: 'Practical support tailored to your business needs.' },
  contact: { email: 'patrick@rpbookkeeping.co.za', phone: '+27 83 656 1418', whatsapp: 'https://chat.whatsapp.com/G47AhotCxSDLPO1NYkccWm?s=hd&p=i&mlu=4&ilr=4' }
};
let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || structuredClone(initial);
const get = key => key.split('.').reduce((o,k)=>o?.[k],state);
const set = (key,value) => { const parts=key.split('.'); let o=state; parts.slice(0,-1).forEach(k=>o=o[k] ||= {}); o[parts.at(-1)]=value; };
function bind(){ document.querySelectorAll('[data-key]').forEach(el=>{ el.value=get(el.dataset.key) ?? ''; el.addEventListener('input',()=>set(el.dataset.key,el.value)); }); }
function save(){ localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); const now=new Date().toLocaleString(); localStorage.setItem(STORAGE_KEY+':time',now); document.querySelector('#status').textContent='Draft saved'; document.querySelector('#savedAt').textContent=now; }
function exportContent(){ save(); const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='rp-bookkeeping-site-content.json'; a.click(); URL.revokeObjectURL(a.href); }
document.querySelectorAll('.nav').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.nav').forEach(x=>x.classList.remove('active')); document.querySelectorAll('.section-view').forEach(x=>x.classList.remove('active')); btn.classList.add('active'); document.getElementById(btn.dataset.section).classList.add('active');}));
document.querySelector('#saveBtn').addEventListener('click',save);
document.querySelector('#exportBtn').addEventListener('click',exportContent);
bind();
const previous=localStorage.getItem(STORAGE_KEY+':time'); if(previous){document.querySelector('#status').textContent='Draft available';document.querySelector('#savedAt').textContent=previous;}
