
(function(){
  function qs(s,r){return (r||document).querySelector(s)}
  function qsa(s,r){return Array.from((r||document).querySelectorAll(s))}
  function appUrl(campaign){
    return 'https://www.lingroo.de/?utm_source=lingroo_app&utm_medium=seo&utm_campaign=' + encodeURIComponent(campaign || 'longtail') + '&utm_content=de#training';
  }
  function confetti(){
    const box=document.createElement('div'); box.className='lt-confetti';
    for(let i=0;i<38;i++){const p=document.createElement('i');p.style.left=(Math.random()*100)+'%';p.style.animationDelay=(Math.random()*180)+'ms';box.appendChild(p)}
    document.body.appendChild(box); setTimeout(()=>box.remove(),1500);
  }
  function initQuiz(){
    const root=qs('[data-lt-quiz]');
    if(!root) return;
    const tasks=JSON.parse(root.getAttribute('data-lt-quiz') || '[]');
    const campaign=root.getAttribute('data-campaign') || 'longtail';
    let idx=0, score=0, answered=0;
    const q=qs('[data-question]', root), opts=qs('[data-options]', root), fb=qs('[data-feedback]', root);
    const bar=qs('[data-progress]', root), scoreEl=qs('[data-score]', root), xpEl=qs('[data-xp]', root);
    const next=qs('[data-next]', root), cta=qsa('[data-app-cta]');
    cta.forEach(a=>a.href=appUrl(campaign));
    function render(){
      const t=tasks[idx];
      q.innerHTML=t.question.replace('____', '<span class="blank">?</span>');
      opts.innerHTML='';
      fb.className='lt-feedback';
      fb.innerHTML='';
      next.textContent = idx === tasks.length - 1 ? 'Auswertung anzeigen' : 'Nächste Aufgabe';
      next.disabled=true;
      (t.options||[]).forEach(opt=>{
        const b=document.createElement('button');
        b.className='lt-option';
        b.type='button';
        b.textContent=opt;
        b.addEventListener('click',()=>{
          qsa('button',opts).forEach(x=>x.disabled=true);
          const good=String(opt).trim()===String(t.answer).trim();
          b.classList.add(good?'is-good':'is-bad');
          if(!good){
            qsa('button',opts).forEach(x=>{if(x.textContent.trim()===String(t.answer).trim()) x.classList.add('is-good')});
          } else { score++; confetti(); }
          answered++;
          fb.className='lt-feedback show';
          fb.innerHTML=(good?'✅ Stark. ':'💡 Noch nicht. ') + '<strong>Richtig: '+t.answer+'</strong><br>'+ (t.explanation||'');
          next.disabled=false;
          update();
        });
        opts.appendChild(b);
      });
      update();
    }
    function update(){
      const pct=Math.round((answered/Math.max(1,tasks.length))*100);
      if(bar) bar.style.width=pct+'%';
      if(scoreEl) scoreEl.textContent=score+'/'+tasks.length;
      if(xpEl) xpEl.textContent='+'+(score*5)+' XP';
    }
    next.addEventListener('click',()=>{
      if(idx < tasks.length-1){idx++; render();}
      else {
        root.innerHTML='<div class="lt-question-card"><div class="lt-task-kicker">Mini-Check abgeschlossen</div><h2 style="margin:0 0 10px;color:#102033">Du hast '+score+' von '+tasks.length+' richtig.</h2><p style="color:#62708a;line-height:1.6">Genau so fühlt sich Lingroo an: kurze Aufgabe, sofortiges Feedback, nächster Fokus. In der App warten mehr Aufgaben, Fortschritt und SRS.</p><a class="lt-btn lt-btn-primary" href="'+appUrl(campaign)+'">Noch 5 ähnliche Aufgaben kostenlos lösen</a></div>';
        if(score>=Math.ceil(tasks.length/2)) confetti();
      }
    });
    render();
  }
  function initWriting(){
    const root=qs('[data-writing-demo]');
    if(!root) return;
    const items=JSON.parse(root.getAttribute('data-writing-demo') || '[]');
    const campaign=root.getAttribute('data-campaign') || 'c1_schreiben';
    const base=qs('[data-writing-base]', root), out=qs('[data-writing-output]', root), score=qs('[data-writing-score]', root), style=qs('[data-writing-style]', root), struct=qs('[data-writing-structure]', root), opts=qs('[data-writing-options]', root);
    qsa('[data-app-cta]').forEach(a=>a.href=appUrl(campaign));
    items.forEach((it,i)=>{
      const b=document.createElement('button');
      b.type='button';
      b.innerHTML='<strong>'+it.prompt+'</strong><br><span>'+it.base+'</span>';
      b.addEventListener('click',()=>{
        base.textContent=it.base;
        out.innerHTML='<strong>Upgrade:</strong><br>'+it.sample+'<br><br><span style="color:#bcd0ff">Warum?</span> Das ist formeller, strukturierter und näher am C1-Schreibstil.';
        score.textContent=(32+i*2)+'/48';
        style.textContent=i%2?'präziser':'formeller';
        struct.textContent=i%3?'klarer':'stärker';
        qsa('button',opts).forEach(x=>x.classList.remove('is-good'));
        b.classList.add('is-good');
        confetti();
      });
      opts.appendChild(b);
    });
    if(items[0]) {
      base.textContent=items[0].base;
      out.textContent='Klicke auf eine Verbesserung links und sieh den C1-Effekt.';
    }
  }
  document.addEventListener('DOMContentLoaded',()=>{initQuiz();initWriting();});
})();
