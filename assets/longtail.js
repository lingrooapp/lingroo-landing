
(function(){
  function qs(s,r){return (r||document).querySelector(s)}
  function qsa(s,r){return Array.from((r||document).querySelectorAll(s))}
  function langCode(){ return document.documentElement.getAttribute('lang') || 'de'; }
  function appUrl(campaign){
    return 'https://www.lingroo.de/?utm_source=lingroo_app&utm_medium=seo&utm_campaign=' + encodeURIComponent(campaign || 'longtail') + '&utm_content=' + encodeURIComponent(langCode()) + '#training';
  }
  const i18n={
    de:{next:'Nächste Aufgabe',result:'Auswertung anzeigen',done:'Mini-Check abgeschlossen',you:'Du hast',of:'von',right:'richtig.',good:'✅ Stark. ',bad:'💡 Noch nicht. ',correct:'Richtig: ',after:'So fühlt sich Lingroo an: kurze Aufgabe, sofortiges Feedback, nächster Fokus. In der App warten mehr Aufgaben, Fortschritt und SRS.',more:'Weitere Aufgaben kostenlos starten',why:'Warum?'},
    pl:{next:'Następne zadanie',result:'Pokaż wynik',done:'Mini-check zakończony',you:'Masz',of:'z',right:'poprawnych.',good:'✅ Dobrze. ',bad:'💡 Jeszcze nie. ',correct:'Poprawnie: ',after:'Tak działa Lingroo: krótkie zadanie, szybki feedback i następny krok. W aplikacji czeka więcej zadań, progres i SRS.',more:'Rozwiąż kolejne zadania za darmo',why:'Dlaczego?'},
    en:{next:'Next task',result:'Show result',done:'Mini-check complete',you:'You got',of:'of',right:'right.',good:'✅ Nice. ',bad:'💡 Not yet. ',correct:'Correct: ',after:'This is how Lingroo feels: short task, instant feedback and the next focus. In the app you get more tasks, progress and SRS.',more:'Start more tasks for free',why:'Why?'},
    uk:{next:'Наступне завдання',result:'Показати результат',done:'Mini-check завершено',you:'У тебе',of:'з',right:'правильно.',good:'✅ Добре. ',bad:'💡 Ще ні. ',correct:'Правильно: ',after:'Так працює Lingroo: коротке завдання, миттєвий feedback і наступний крок. У застосунку є більше завдань, прогрес і SRS.',more:'Почати наступні завдання безкоштовно',why:'Чому?'},
    ru:{next:'Следующее задание',result:'Показать результат',done:'Mini-check завершён',you:'У тебя',of:'из',right:'правильно.',good:'✅ Хорошо. ',bad:'💡 Пока нет. ',correct:'Правильно: ',after:'Так работает Lingroo: короткое задание, мгновенный фидбек и следующий шаг. В приложении есть больше заданий, прогресс и SRS.',more:'Начать следующие задания бесплатно',why:'Почему?'}
  };
  function tr(k){ const L=i18n[langCode()]||i18n.de; return L[k]||i18n.de[k]||k; }
  function writingWhy(){
    const m={
      de:'Das ist formeller, strukturierter und näher am C1-Schreibstil.',
      pl:'To brzmi bardziej formalnie, jest lepiej uporządkowane i bliżej stylu C1.',
      en:'This sounds more formal, better structured and closer to C1 writing style.',
      uk:'Це звучить формальніше, структурованіше і ближче до стилю C1.',
      ru:'Это звучит более формально, структурированно и ближе к стилю C1.'
    };
    return m[langCode()] || m.de;
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
      const task=tasks[idx];
      q.innerHTML=String(task.question || '').replace('____', '<span class="blank">?</span>');
      opts.innerHTML='';
      fb.className='lt-feedback';
      fb.innerHTML='';
      next.textContent = idx === tasks.length - 1 ? tr('result') : tr('next');
      next.disabled=true;
      (task.options||[]).forEach(opt=>{
        const b=document.createElement('button');
        b.className='lt-option';
        b.type='button';
        b.textContent=opt;
        b.addEventListener('click',()=>{
          qsa('button',opts).forEach(x=>x.disabled=true);
          const good=String(opt).trim()===String(task.answer).trim();
          b.classList.add(good?'is-good':'is-bad');
          if(!good){
            qsa('button',opts).forEach(x=>{if(x.textContent.trim()===String(task.answer).trim()) x.classList.add('is-good')});
          } else { score++; confetti(); }
          answered++;
          fb.className='lt-feedback show';
          fb.innerHTML=(good?tr('good'):tr('bad')) + '<strong>'+tr('correct')+task.answer+'</strong><br>'+ (task.explanation||'');
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
        root.innerHTML='<div class="lt-question-card"><div class="lt-task-kicker">'+tr('done')+'</div><h2 style="margin:0 0 10px;color:#102033">'+tr('you')+' '+score+' '+tr('of')+' '+tasks.length+' '+tr('right')+'</h2><p style="color:#62708a;line-height:1.6">'+tr('after')+'</p><a class="lt-btn lt-btn-primary" href="'+appUrl(campaign)+'">'+tr('more')+'</a></div>';
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
        out.innerHTML='<strong>Upgrade:</strong><br>'+it.sample+'<br><br><span style="color:#bcd0ff">'+tr('why')+'</span> '+writingWhy();
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
