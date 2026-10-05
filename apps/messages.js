function talkApp(){
 if(!S.sub){
  const rows=CHATS.map((c,i)=>{
   const last=c.msgs.filter(g=>!g.d&&!g.sys).slice(-1)[0]||{};
   const date=i<6?'금요일':i===6?'목요일':'수요일';
   return `<button class="talk-row" data-act="chat" data-id="${c.id}"><div class="avatar ${c.id==='tax'?'green':''}">${c.id==='tax'?'':c.n[0]}</div><div class="t"><b>${c.n}</b><span>${c.pre||last.x||''}</span></div><span class="date">${date}</span><span class="arrow">›</span></button>`;}).join('');
  return `<div class="scr app talkapp">${status()}<div class="appbar"><button class="appbar-back" data-act="home" aria-label="홈으로">←</button><div class="appbar-title">메시지</div></div><div class="talk-list">${rows}</div></div>`;
 }
 const c=CHATS.find(x=>x.id===S.sub);
 const m=c.msgs.map(g=>{
  if(g.d)return`<div class="daysep">${g.d}</div>`;
  if(g.sys)return`<div class="sysline">${g.sys}</div>`;
  if(g.del)return S.rec?`<div class="bub">${DELETED_TEXT}<span class="tm">${g.tm} · 복구됨</span></div>`:`<button class="bub del" data-act="recover">삭제된 메시지입니다<span class="tm">${g.tm} · 탭하여 복구 시도</span></button>`;
  return`<div class="bub ${g.w==='m'?'me':''}">${g.x}<span class="tm">${g.tm}${g.rd?' · 읽음':''}</span></div>`}).join('');
 return `<div class="scr app talkapp">${status()}<div class="detail-head"><button class="back" data-act="back">›</button><div class="name">${c.n}</div><span class="contact">⌕</span></div><div class="talk-detail"><div class="detail-chat">${m}</div></div></div>`;
}

