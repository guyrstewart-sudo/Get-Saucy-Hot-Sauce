/* Get Saucy — motion engine (vanilla, no deps) */
(function(){
  "use strict";
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var onReady = function(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); };

  onReady(function(){
    /* year */
    var yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();

    /* mobile nav */
    var tgl=document.querySelector('.nav-toggle');
    if(tgl) tgl.addEventListener('click', function(){ document.getElementById('nav').classList.toggle('open'); });

    if(reduce){
      // show everything, no motion
      document.querySelectorAll('.reveal,.reveal-scale').forEach(function(el){el.classList.add('in');});
      fillHeat(true); countUp(true);
      return;
    }

    /* scroll reveal w/ stagger */
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          var el=e.target;
          var d=el.getAttribute('data-delay'); if(d) el.style.transitionDelay=d+'ms';
          el.classList.add('in');
          io.unobserve(el);
          if(el.hasAttribute('data-heat')) fillOne(el);
          if(el.classList.contains('stats')) countUp(false);
        }
      });
    },{threshold:0.14, rootMargin:'0px 0px -60px 0px'});
    document.querySelectorAll('.reveal,.reveal-scale').forEach(function(el,i){
      if(!el.hasAttribute('data-delay') && el.parentElement && el.parentElement.hasAttribute('data-stagger')){
        el.style.transitionDelay=(i%6*90)+'ms';
      }
      io.observe(el);
    });
    document.querySelectorAll('[data-heat]').forEach(function(el){io.observe(el);});
    var statsEl=document.querySelector('.stats'); if(statsEl) io.observe(statsEl);

    /* hero parallax */
    var heroImg=document.querySelector('.hero__img');
    var hero=document.querySelector('.hero');
    if(heroImg&&hero){
      window.addEventListener('scroll',function(){
        var y=window.pageYOffset;
        if(y<window.innerHeight){ heroImg.style.transform='translateY(calc(-50% + '+(y*0.18)+'px))'; }
      },{passive:true});
    }

    /* cursor glow */
    var glow=document.querySelector('.cursor-glow');
    if(glow && !window.matchMedia('(hover:none)').matches){
      window.addEventListener('mousemove',function(e){
        glow.style.opacity='1';
        glow.style.transform='translate('+e.clientX+'px,'+e.clientY+'px) translate(-50%,-50%)';
      },{passive:true});
    }

    /* magnetic buttons */
    document.querySelectorAll('.btn-magnetic').forEach(function(btn){
      btn.addEventListener('mousemove',function(e){
        var r=btn.getBoundingClientRect();
        var dx=e.clientX-(r.left+r.width/2), dy=e.clientY-(r.top+r.height/2);
        btn.style.transform='translate('+(dx*0.28)+'px,'+(dy*0.34)+'px)';
      });
      btn.addEventListener('mouseleave',function(){ btn.style.transform=''; });
    });

    /* sticky buy bar after hero */
    var bar=document.querySelector('.buybar');
    if(bar){
      var trigger=document.querySelector('.hero')||document.body;
      window.addEventListener('scroll',function(){
        var past=window.pageYOffset>(trigger.offsetHeight*0.9);
        var nearBottom=(window.innerHeight+window.pageYOffset)>(document.body.scrollHeight-260);
        bar.classList.toggle('show', past && !nearBottom);
      },{passive:true});
    }

    /* ember / smoke canvas */
    var cv=document.querySelector('.hero__canvas');
    if(cv){ startEmber(cv); }
  });

  function fillOne(meter){
    var dots=meter.querySelectorAll('.dot');
    var n=parseInt(meter.getAttribute('data-heat'),10)||0;
    dots.forEach(function(d,i){ setTimeout(function(){ if(i<n) d.classList.add('on'); }, i*110); });
  }
  function fillHeat(instant){
    document.querySelectorAll('[data-heat]').forEach(function(m){
      var n=parseInt(m.getAttribute('data-heat'),10)||0;
      m.querySelectorAll('.dot').forEach(function(d,i){ if(i<n) d.classList.add('on'); });
    });
  }
  function countUp(instant){
    document.querySelectorAll('.num[data-to]').forEach(function(el){
      if(el.dataset.done) return; el.dataset.done='1';
      var to=parseFloat(el.getAttribute('data-to')), suf=el.getAttribute('data-suffix')||'';
      if(instant){ el.textContent=fmt(to)+suf; return; }
      var start=null, dur=1300;
      function step(ts){ if(!start)start=ts; var p=Math.min((ts-start)/dur,1);
        var ease=1-Math.pow(1-p,3);
        el.textContent=fmt(Math.floor(to*ease))+suf;
        if(p<1) requestAnimationFrame(step); else el.textContent=fmt(to)+suf; }
      requestAnimationFrame(step);
    });
  }
  function fmt(n){ return n.toLocaleString('en-US'); }

  function startEmber(canvas){
    var ctx=canvas.getContext('2d'), W,H, ps=[], raf;
    function resize(){ var r=canvas.parentElement.getBoundingClientRect(); W=canvas.width=r.width; H=canvas.height=r.height; }
    resize(); window.addEventListener('resize',resize,{passive:true});
    function spawn(){ ps.push({x:Math.random()*W, y:H+10, vx:(Math.random()-0.5)*0.5, vy:-(0.5+Math.random()*1.4), life:1, size:1.5+Math.random()*3.5, ember:Math.random()>0.55}); }
    function tick(){
      ctx.clearRect(0,0,W,H);
      if(ps.length<140 && Math.random()<0.7) spawn();
      for(var i=ps.length-1;i>=0;i--){ var p=ps[i];
        p.x+=p.vx; p.y+=p.vy; p.vx+=(Math.random()-0.5)*0.04; p.life-=0.006;
        if(p.life<=0||p.y< -20){ ps.splice(i,1); continue; }
        ctx.globalAlpha=p.life*(p.ember?0.85:0.35);
        if(p.ember){ ctx.fillStyle='hsl('+(18+Math.random()*22)+',95%,'+(55+p.life*15)+'%)'; }
        else { ctx.fillStyle='rgba(150,120,90,'+(p.life*0.5)+')'; }
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size*p.life,0,6.283); ctx.fill();
      }
      ctx.globalAlpha=1;
      raf=requestAnimationFrame(tick);
    }
    tick();
    document.addEventListener('visibilitychange',function(){ if(document.hidden){ cancelAnimationFrame(raf); } else { tick(); } });
  }
})();
