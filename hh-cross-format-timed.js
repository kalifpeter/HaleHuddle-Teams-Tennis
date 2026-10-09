(function(){'use strict';
const KEY='hh-teams-saved-match-lineups-v38',routes={single:'single-set.html',two:'two-sets-games.html',timed:'timed-junior.html'};
function init(){const host=document.getElementById('loadTimedLineup');if(!host||document.getElementById('hhAllMatchPicker'))return;
let matches=[];try{matches=JSON.parse(localStorage.getItem(KEY)||'[]').filter(x=>x.id&&x.date&&x.teamId)}catch(e){}
const wrapper=document.createElement('div');wrapper.style.cssText='margin:12px 0;padding:12px;border:1px solid #71849c;border-radius:12px';
const label=document.createElement('label');label.htmlFor='hhAllMatchPicker';label.textContent='Switch to another saved match (all formats)';label.style.cssText='display:block;margin-bottom:8px;font-weight:700';
const select=document.createElement('select');select.id='hhAllMatchPicker';select.style.cssText='width:100%;max-width:100%;padding:12px;background:#172335;color:white;border:1px solid #71849c;border-radius:9px;font-size:16px';
select.add(new Option('Select another match',''));matches.forEach(m=>select.add(new Option(`${m.date} · ${m.teamName} vs ${m.opponent||'Opponent'} · ${m.format==='timed'?'Timed':m.format==='two'?'2 Sets':'Single Set'}`,m.id)));
select.addEventListener('change',()=>{const m=matches.find(x=>x.id===select.value);if(!m)return;if(m.format==='timed'){const old=document.querySelector('#timedLineupSelect, #savedTimedLineup');if(old){const options=[...old.options];const ix=matches.filter(x=>x.format==='timed').findIndex(x=>x.id===m.id);if(ix>=0){old.value=String(ix);host.click();return;}}location.href='timed-junior.html?match='+encodeURIComponent(m.id);return;}const dest=routes[m.format];if(dest)location.href=dest+'?match='+encodeURIComponent(m.id);});
wrapper.append(label,select);const section=host.closest('.card')||host.parentElement;section.insertBefore(wrapper,section.firstChild);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();