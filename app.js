/* ═══════════════════════════════════════════════════════════
   NerdBi app.js — all application logic
═══════════════════════════════════════════════════════════ */

function nav(page, el) {
  document.querySelectorAll('.page-section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));
  const p=document.getElementById('page-'+page);
  if(p) { p.classList.add('active'); p.classList.remove('fade-in'); void p.offsetWidth; p.classList.add('fade-in'); }
  if(el) el.classList.add('active');
  document.getElementById('pageTitle').textContent=PAGE_TITLES[page]||page;
  if(page==='analytics') refreshAnalytics();
  if(page==='heatmap') refreshHeatmap();
  if(page==='routine') { refreshPlannedSessions(); refreshWeekStudyPlan(); }
  if(page==='goals') { refreshGoals(); refreshHabits(); }
  if(page==='planner') { refreshHabits(); refreshMonthCal(); }
  if(page==='badges') refreshBadges();
  if(page==='subjects') refreshSubjects();
  if(page==='squads') { renderSquadPage(); if(_currentUser && !_primarySquad) loadMySquads(); }
  if(page==='settings') { document.getElementById('s_focus').value=pd().settings.customFocus||45; document.getElementById('s_break').value=pd().settings.customBreak||10; updateThemeSelectors(); }
  if(page==='scroll') setTimeout(initScrollPage, 60);
  if(window.innerWidth<=900) document.getElementById('sidebar').classList.remove('open');
  // URL routing disabled — causes 404 on refresh with GitHub Pages
  // try {
  //   if(window.location.protocol !== 'file:') history.pushState({page}, '', '/'+page);
  // } catch(e) {}
}
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); }
document.addEventListener('click',e=>{ const sb=document.getElementById('sidebar'); if(window.innerWidth<=900&&sb.classList.contains('open')&&!sb.contains(e.target)&&!e.target.closest('.hamburger')) sb.classList.remove('open'); });

/* ═══════════════════════════════════════════════════════════════
   IMPORT / EXPORT
═══════════════════════════════════════════════════════════════ */
function exportCSV() {
  const rows=[['Date','Subject','Topic','Type','Duration','Focus','Energy','Productive','Notes']];
  pd().sessions.forEach(s=>rows.push([s.date,s.subject,s.topic,s.type,s.durationMinutes,s.focusRating,s.energyRating,s.productiveMinutes,s.notes]));
  dl('kimetsu-log.csv',rows.map(r=>r.map(c=>'"'+(c||'').toString().replace(/"/g,'""')+'"').join(',')).join('\n'),'text/csv');
}
function exportJSON() {
  dl('kimetsu-data.json',JSON.stringify(profiles,null,2),'application/json');
}
function importJSON(e) {
  const file=e.target.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=ev=>{ try { const d=JSON.parse(ev.target.result); if(d.profiles) { profiles=d.profiles; currentProfile=d.currentProfile||Object.keys(d.profiles)[0]; } else if(d.sessions) profiles[currentProfile]=d; saveState(); refreshAll(); notify('Data imported! Welcome back, Demon Slayer! ⚔','success'); } catch(err) { notify('Import failed. The scroll was corrupted!','info'); } };
  reader.readAsText(file); e.target.value='';
}
function clearAll() {
  if(!confirm('Clear ALL training data for this profile? Even Tanjiro cannot undo this.')) return;
  profiles[currentProfile]=blankProfile(); saveState(); refreshAll();
  notify('Profile cleared. Begin again, like Tanjiro returning to Mt. Sagiri.','info');
}
function dl(name,content,type) {
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([content],{type})); a.download=name; a.click();
}

/* ═══════════════════════════════════════════════════════════════
   EMBED
═══════════════════════════════════════════════════════════════ */
function resolveEmbedUrl(raw) {
  const url = raw.trim();
  const ytWatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (ytWatch) return { src:`https://www.youtube.com/embed/${ytWatch[1]}?autoplay=1&rel=0`, type:'youtube', label:'YouTube', height:220 };
  const ytShort = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (ytShort) return { src:`https://www.youtube.com/embed/${ytShort[1]}?autoplay=1&rel=0`, type:'youtube', label:'YouTube', height:220 };
  const ytLive = url.match(/youtube\.com\/(?:live|shorts)\/([A-Za-z0-9_-]{11})/);
  if (ytLive) return { src:`https://www.youtube.com/embed/${ytLive[1]}?autoplay=1&rel=0`, type:'youtube', label:'YouTube Live', height:220 };
  if (url.includes('youtube.com/embed/')) { const src = url.includes('autoplay') ? url : url+(url.includes('?')?'&':'?')+'autoplay=1'; return { src, type:'youtube', label:'YouTube', height:220 }; }
  const spMatch = url.match(/spotify\.com\/(track|playlist|album|artist|episode|show)\/([A-Za-z0-9]+)/);
  if (spMatch) { const h=(spMatch[1]==='track'||spMatch[1]==='episode')?152:352; return { src:`https://open.spotify.com/embed/${spMatch[1]}/${spMatch[2]}?utm_source=generator&theme=0`, type:'spotify', label:'Spotify', height:h }; }
  if (url.includes('soundcloud.com')) return { src:`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23e8443a&auto_play=true&hide_related=false&show_comments=false&show_user=true&visual=true`, type:'soundcloud', label:'SoundCloud', height:166 };
  if (url.includes('mixcloud.com')) return { src:`https://www.mixcloud.com/widget/iframe/?hide_cover=1&autoplay=1&feed=${encodeURIComponent(url)}`, type:'mixcloud', label:'Mixcloud', height:180 };
  if (url.includes('music.apple.com')) return { src:url.replace('music.apple.com','embed.music.apple.com'), type:'apple', label:'Apple Music', height:175 };
  if (url.match(/\.(mp3|ogg|wav|m4a|aac|flac)(\?.*)?$/i)) return { src:url, type:'audio', label:'Audio File', height:60 };
  return { src:url, type:'generic', label:'Web Player', height:200 };
}
let _zenMusicSrc=null, _zenMusicHeight=80;
function loadEmbed(presetUrl) {
  const raw=presetUrl||document.getElementById('embedUrl').value.trim(); if(!raw) return;
  if(!presetUrl) document.getElementById('embedUrl').value=raw;
  const r=resolveEmbedUrl(raw);
  _zenMusicSrc=r.src; _zenMusicHeight=Math.min(r.height||200,200);
  document.querySelectorAll('.music-preset-btn').forEach(b=>b.classList.remove('active-preset'));
  if(presetUrl) document.querySelectorAll('.music-preset-btn').forEach(b=>{ if(b.getAttribute('onclick')?.includes(presetUrl)) b.classList.add('active-preset'); });
  const box=document.getElementById('embedBox');
  if(r.type==='audio') {
    box.innerHTML=`<div style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius-sm);padding:12px"><audio controls autoplay style="width:100%;accent-color:var(--accent)" src="${esc(r.src)}">Your browser does not support audio.</audio></div>`;
  } else {
    box.innerHTML=`<iframe src="${esc(r.src)}" width="100%" height="${r.height||200}" frameborder="0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen style="border-radius:8px;border:1px solid var(--border);display:block"></iframe><div style="display:flex;justify-content:space-between;align-items:center;margin-top:5px"><span style="font-family:var(--font-mono);font-size:10px;color:var(--text3)">▶ Playing via ${r.label}</span><a href="${esc(raw)}" target="_blank" style="font-family:var(--font-mono);font-size:10px;color:var(--accent);text-decoration:none">↗ Open in tab</a></div>`;
  }
  if(zenActive) syncZenMusic();
}
function clearEmbed() {
  document.getElementById('embedBox').innerHTML='';
  document.getElementById('embedUrl').value='';
  document.querySelectorAll('.music-preset-btn').forEach(b=>b.classList.remove('active-preset'));
  _zenMusicSrc=null;
  const zm=document.getElementById('zenMusicBox'); if(zm){zm.innerHTML='';zm.style.opacity='0';zm.style.pointerEvents='none';}
}
function syncZenMusic() {
  const zm=document.getElementById('zenMusicBox'); if(!zm||!_zenMusicSrc) return;
  zm.innerHTML=`<div style="background:rgba(0,0,0,0.55);border:1px solid rgba(255,255,255,0.07);border-radius:10px;overflow:hidden;backdrop-filter:blur(14px)"><div style="display:flex;align-items:center;justify-content:space-between;padding:5px 10px;border-bottom:1px solid rgba(255,255,255,0.05)"><span style="font-family:var(--font-mono);font-size:9px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:1px">🎵 Now Playing</span><button onclick="clearZenMusic()" style="background:none;border:none;color:rgba(255,255,255,0.25);cursor:pointer;font-size:12px;line-height:1;padding:0 2px">✕</button></div><iframe src="${esc(_zenMusicSrc)}" width="100%" height="${_zenMusicHeight}" frameborder="0" allow="autoplay; encrypted-media; fullscreen" style="display:block"></iframe></div>`;
  zm.style.opacity='1'; zm.style.pointerEvents='auto';
}
function clearZenMusic() {
  const zm=document.getElementById('zenMusicBox'); if(zm){zm.innerHTML='';zm.style.opacity='0';zm.style.pointerEvents='none';}
}

/* ═══════════════════════════════════════════════════════════════
   SUBJECT DROPS
═══════════════════════════════════════════════════════════════ */
function refreshSubjectDrops() {
  ['curSubject','qaSubj','sm_subject','t_subj','ml_subject','note_subj','plan_subject','scroll_subject','generalQSubject'].forEach(id=>{
    const el=document.getElementById(id); if(!el) return;
    const cur=el.value;
    const isLog=id==='sm_subject';
    el.innerHTML=`<option value="">${isLog?'Subject…':'Subject…'}</option>`+
      pd().subjects.map(s=>`<option value="${esc(s.name)}"${s.name===cur?' selected':''}>${esc(s.name)}</option>`).join('');
  });
}

/* ═══════════════════════════════════════════════════════════════
   CLOCK + QUOTES
═══════════════════════════════════════════════════════════════ */
function updateClock() {
  const n=new Date();
  const t=`${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}:${String(n.getSeconds()).padStart(2,'0')}`;
  const el=document.getElementById('topClock'); if(el) el.textContent=t;
}
function getActiveQuotes() {
  const t = localStorage.getItem('kimetsuTheme') || 'dark';
  const mode = THEME_CONFIG[t]?.mode || 'kimetsu';
    if (mode === 'doraemon') return DORA_QUOTES;
  if (mode === 'deathnote') return DN_QUOTES;
  if (mode === 'harrypotter') return HP_QUOTES;
  if (mode === 'breakingbad') return BB_QUOTES;
  return DS_QUOTES;

}
function rotateQuote() {
  const pool = getActiveQuotes();
  quoteIdx=(quoteIdx+1)%pool.length;
  const el=document.getElementById('quoteStrip');
  if(el){ el.style.opacity='0'; setTimeout(()=>{ el.textContent=pool[quoteIdx]; el.style.opacity='1'; },400); }
}
setInterval(updateClock,1000);
setInterval(rotateQuote,30000);
updateClock();

/* Periodic random character popups */
setInterval(()=>{ if(Math.random()<0.7&&!document.querySelector('.modal-ov.active')) showCharPopup('idle'); }, 60000);

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fmtMins(m){ if(m<60) return m+'m'; return Math.floor(m/60)+'h '+(m%60)+'m'; }
function fmtMinsShort(m){ if(m<60) return m+'m'; return Math.floor(m/60)+'h'; }
function fmtDate(s){ if(!s) return ''; try{ const d=new Date(s+'T00:00:00'); return d.toLocaleDateString('en-US',{month:'short',day:'numeric'}); }catch(e){return s;} }
function sEl(id,val){ const e=document.getElementById(id); if(e) e.textContent=val; }
function styleEl(id,css){ const e=document.getElementById(id); if(e) e.style.cssText+=';'+css; }
function openModal(id){ document.getElementById(id).classList.add('active'); }
function closeModal(id){ document.getElementById(id).classList.remove('active'); }
document.querySelectorAll('.modal-ov').forEach(m=>m.addEventListener('click',e=>{ if(e.target===m) m.classList.remove('active'); }));
function onSubjectChange(){ if(pd()&&document.getElementById('curSubject').value) pd().lastSubject=document.getElementById('curSubject').value; }

function notify(msg,type='info'){
  const el=document.getElementById('notif');
  el.textContent=msg; el.className='notif '+type+' show';
  clearTimeout(window._notifT);
  window._notifT=setTimeout(()=>el.classList.remove('show'),3500);
}

/* ═══════════════════════════════════════════════════════════════
   TODAY'S COMMAND CENTER
═══════════════════════════════════════════════════════════════ */
const PRI_COLORS = { high:'var(--red)', medium:'var(--accent)', low:'var(--text3)' };
const PRI_ORDER  = { high:0, medium:1, low:2 };

function switchCmdTab(tab, btn) {
  document.querySelectorAll('.cmd-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.cmd-panel').forEach(p => p.classList.remove('active'));
  if(btn) btn.classList.add('active');
  const panel = document.getElementById('cmdPanel' + tab.charAt(0).toUpperCase() + tab.slice(1));
  if(panel) panel.classList.add('active');
}

function refreshCmdCenter() {
  const today = new Date().toISOString().split('T')[0];
  // Update date label
  const dateEl = document.getElementById('cmdDate');
  if(dateEl) {
    const d = new Date();
    dateEl.textContent = d.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
  }

  // ── SESSIONS panel ──
  const sPanel = document.getElementById('cmdPanelSessions');
  if(sPanel) {
    const sessions = pdPlanned().filter(p => p.date === today)
      .sort((a,b) => (PRI_ORDER[a.priority]||1) - (PRI_ORDER[b.priority]||1));
    if(!sessions.length) {
      sPanel.innerHTML = '<div class="cmd-empty">No sessions planned for today.<br><span style="font-size:11px;font-family:var(--font-mono)">Go to Routine → Plan Session</span></div>';
    } else {
      sPanel.innerHTML = sessions.map(s => {
        const priColor = PRI_COLORS[s.priority] || 'var(--text3)';
        const isDone = s.done || s.status === 'done';
        const timeStr = s.time ? `🕐 ${s.time}` : '';
        const durStr = s.duration ? `⏱ ${s.duration}m` : '';
        return `<div class="cmd-item${isDone?' done-item':''}">
          <div class="cmd-pri-dot" style="background:${priColor}"></div>
          <div class="cmd-item-body">
            ${s.subject ? `<span class="cmd-subj-tag">${esc(s.subject)}</span>` : ''}
            <div class="cmd-item-name">${esc(s.topic || s.subject || 'Study Session')}</div>
            <div class="cmd-item-meta">${[timeStr,durStr,s.priority].filter(Boolean).join(' · ')}</div>
          </div>
          ${!isDone ? `<button class="cmd-start-btn" onclick="cmdStartSession('${s.id}')">▶ Start</button>` : '<span style="font-family:var(--font-mono);font-size:10px;color:var(--green)">✓ Done</span>'}
        </div>`;
      }).join('');
    }
  }

  // ── TASKS panel ──
  const tPanel = document.getElementById('cmdPanelTasks');
  if(tPanel) {
    const allTasks = pdTasksAll ? pdTasksAll() : (pd().tasks || []);
    // Show today-due + high priority pending
    const todayTasks = allTasks.filter(t => !t.done && (t.dueDate === today || t.priority === 'high'))
      .sort((a,b) => (PRI_ORDER[a.priority]||1) - (PRI_ORDER[b.priority]||1))
      .slice(0, 8);
    if(!todayTasks.length) {
      tPanel.innerHTML = '<div class="cmd-empty">No urgent missions today! 🔥</div>';
    } else {
      tPanel.innerHTML = todayTasks.map(t => {
        const priColor = PRI_COLORS[t.priority] || 'var(--text3)';
        return `<div class="cmd-item">
          <div class="cmd-check${t.done?' checked':''}" onclick="toggleTask(${t.id});refreshCmdCenter()"></div>
          <div class="cmd-item-body">
            ${t.subject ? `<span class="cmd-subj-tag">${esc(t.subject)}</span>` : ''}
            <div class="cmd-item-name">${esc(t.text)}</div>
            <div class="cmd-item-meta"><span style="color:${priColor}">● ${t.priority}</span>${t.dueDate ? ` · 📅 ${fmtDate(t.dueDate)}` : ''}</div>
          </div>
          <button class="cmd-start-btn" onclick="cmdStartTask('${esc(t.subject||'')}','${esc(t.text)}')">▶ Start</button>
        </div>`;
      }).join('');
    }
  }

  // ── HABITS panel ──
  const hPanel = document.getElementById('cmdPanelHabits');
  if(hPanel) {
    const habits = pdHabits();
    const logs = pdHabitLogs();
    const todayLogs = logs[today] || [];
    if(!habits.length) {
      hPanel.innerHTML = '<div class="cmd-empty">No habits set up yet.<br><span style="font-size:11px;font-family:var(--font-mono)">Go to Concentration → Habits</span></div>';
    } else {
      hPanel.innerHTML = habits.map(h => {
        const isDone = todayLogs.includes(h.id);
        return `<div class="cmd-item${isDone?' done-item':''}">
          <div class="cmd-habit-icon">${h.icon || '🔥'}</div>
          <div class="cmd-item-body">
            <div class="cmd-item-name">${esc(h.name)}</div>
            <div class="cmd-item-meta">${h.streak||0} day streak · ${h.freq||7}×/week</div>
          </div>
          ${isDone
            ? '<span style="font-family:var(--font-mono);font-size:10px;color:var(--green)">✓ Done</span>'
            : `<button class="cmd-start-btn" onclick="cmdCheckHabit('${h.id}')">✓ Mark</button>`}
        </div>`;
      }).join('');
    }
  }

  // ── Progress bar: sessions done today ──
  const allToday = pdPlanned().filter(p => p.date === today);
  const doneToday = allToday.filter(p => p.done || p.status === 'done');
  const progFill = document.getElementById('cmdProgressFill');
  const progLabel = document.getElementById('cmdProgressLabel');
  const pct = allToday.length ? Math.round(doneToday.length / allToday.length * 100) : 0;
  if(progFill) progFill.style.width = pct + '%';
  if(progLabel) progLabel.textContent = `${doneToday.length} of ${allToday.length} sessions complete · ${pct}%`;
}

function cmdStartSession(id) {
  const s = pdPlanned().find(p => p.id === id); if(!s) return;
  // Auto-fill subject + topic in timer
  const subj = document.getElementById('curSubject');
  const topic = document.getElementById('curTopic');
  if(subj) subj.value = s.subject || '';
  if(topic) { topic.value = s.topic || ''; updateZenTask(); }
  // Set active plan link
  window._activeRoutinePlanId = id;
  // Custom duration if specified
  if(s.duration) {
    pd().settings.customFocus = s.duration;
    const customBtn = document.querySelector('[onclick*="setMode(\'custom\'"]');
    setMode('custom', customBtn);
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    if(customBtn) customBtn.classList.add('active');
  }
  // Scroll to timer
  document.getElementById('page-dashboard')?.scrollIntoView({ behavior:'smooth' });
  notify(`▶ Ready: "${s.topic || s.subject}" — hit Begin Training! ⚔`, 'info');
}

function cmdStartTask(subject, text) {
  const subj = document.getElementById('curSubject');
  const topic = document.getElementById('curTopic');
  if(subj) subj.value = subject || '';
  if(topic) { topic.value = text || ''; updateZenTask(); }
  document.getElementById('page-dashboard')?.scrollIntoView({ behavior:'smooth' });
  notify(`▶ Mission loaded: "${text}" ⚔`, 'info');
}

function cmdCheckHabit(id) {
  // Use existing checkHabit function if available, else do it inline
  if(typeof checkHabitToday === 'function') { checkHabitToday(id); }
  else {
    const today = new Date().toISOString().split('T')[0];
    const logs = pdHabitLogs();
    if(!logs[today]) logs[today] = [];
    if(!logs[today].includes(id)) { logs[today].push(id); saveState(); }
    refreshHabits();
  }
  refreshCmdCenter();
  notify('🔥 Habit marked! Keep the streak alive!', 'success');
}

/* ═══════════════════════════════════════════════════════════════
   REFRESH ALL
═══════════════════════════════════════════════════════════════ */
function refreshAll() {
  refreshSubjectDrops();
  refreshDashboard();
  refreshTasks();
  refreshSubjects();
  refreshExams();
  refreshLinks();
  refreshLog();
  refreshWeekPlanner();
  refreshPlannedSessions();
  refreshWeekStudyPlan();
  refreshHabits();
  refreshCmdCenter();
  renderProfileSelect();
  renderNotes();
  document.getElementById('streakNum').textContent=pd().streak||0;
}

/* ═══════════════════════════════════════════════════════════════
   WELCOME POPUP
═══════════════════════════════════════════════════════════════ */
let _welcomeSelectedTheme = 'dark';
const _universeMap = { basic:'focus-dark', demonslayer:'dark', doraemon:'doraemon', deathnote:'deathnote' };

function selectUniverse(universe, defaultTheme, cardEl) {
  // Mark universe card selected
  document.querySelectorAll('.universe-card').forEach(c => c.classList.remove('selected'));
  cardEl.classList.add('selected');
  // Set theme to the currently active sub-btn within that card, or default
  const activeSub = cardEl.querySelector('.sub-btn.sub-active');
  const t = (activeSub ? activeSub.dataset.t : null) || defaultTheme;
  _universeMap[universe] = t;
  _welcomeSelectedTheme = t;
  document.documentElement.setAttribute('data-theme', t);
  // Update begin button label per theme
  _updateBeginBtn(t);
}

function selectSubTheme(universe, t, btn) {
  // Mark sub-btn active within this card
  const card = btn.closest('.universe-card');
  card.querySelectorAll('.sub-btn').forEach(b => b.classList.remove('sub-active'));
  btn.classList.add('sub-active');
  _universeMap[universe] = t;
  // Also select the parent card
  document.querySelectorAll('.universe-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  _welcomeSelectedTheme = t;
  document.documentElement.setAttribute('data-theme', t);
  _updateBeginBtn(t);
}

function _updateBeginBtn(t) {
  const btn = document.getElementById('welcomeBeginBtn');
  const jpEl = document.getElementById('welcomeJp');
  if (!btn) return;
  const mode = THEME_CONFIG[t]?.mode || 'kimetsu';
  if (mode === 'doraemon') {
    btn.textContent = 'Let\'s Go! 🔵';
    if (jpEl) jpEl.textContent = 'どこでもドア';
  } else if (mode === 'deathnote') {
    btn.textContent = 'Write Your Fate 📓';
    if (jpEl) jpEl.textContent = 'デスノート';
  } else if (mode === 'focus') {
    btn.textContent = 'Begin Focusing ✦';
    if (jpEl) jpEl.textContent = 'NerdBi Focus';
  } else {
    btn.textContent = 'Begin Training ⚔';
    if (jpEl) jpEl.textContent = '鬼滅学院';
  }
}

// Keep old selectWelcomeTheme for any legacy calls
function selectWelcomeTheme(t, el) {
  _welcomeSelectedTheme = t;
  document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
  if (el) el.classList.add('selected');
  document.documentElement.setAttribute('data-theme', t);
}

function dismissWelcome() {
  setTheme(_welcomeSelectedTheme);
  themeIdx = themes.indexOf(_welcomeSelectedTheme);
  if (themeIdx < 0) themeIdx = 0;
  localStorage.setItem('kimetsuFirstVisit', 'done');
  document.getElementById('welcomeOverlay').classList.add('hidden');
  setTimeout(() => showCharPopup('random'), 1000);
}

function showWelcomeIfFirst() {
  if (!localStorage.getItem('kimetsuFirstVisit')) {
    // Pre-select currently saved theme on welcome
    const saved = localStorage.getItem('kimetsuTheme') || 'dark';
    _welcomeSelectedTheme = saved;
    document.querySelectorAll('.theme-card').forEach(c => {
      c.classList.toggle('selected', c.dataset.theme === saved);
    });
    document.getElementById('welcomeOverlay').classList.remove('hidden');
  }
}

/* ═══════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════ */
function init() {
  // Load app immediately from localStorage — no auth wall
  loadState();
  const saved = localStorage.getItem('kimetsuTheme') || 'dark';
  themeIdx = themes.indexOf(saved); if(themeIdx < 0) themeIdx = 0;
  setTheme(saved);
  const qs = document.getElementById('quoteStrip');
  const _iq = getActiveQuotes();
  if(qs) qs.textContent = _iq[quoteIdx % _iq.length];
  const zenQ = document.getElementById('zenQuote');
  if(zenQ) zenQ.textContent = '"' + _iq[Math.floor(Math.random() * _iq.length)] + '"';
  setMode('p25');
  if(pd().lastSubject) setTimeout(()=>{ const s=document.getElementById('curSubject'); if(s) s.value=pd().lastSubject; },100);
  refreshAll();
  checkCrash();
  updateThemeSelectors();
  setTimeout(applyTerminology, 80);
  // Show welcome overlay on first visit (skips character popup until after)
  showWelcomeIfFirst();
  if (localStorage.getItem('kimetsuFirstVisit')) {
    setTimeout(()=>showCharPopup('random'), 3000);
  }
  // Supabase auth listener fires separately — if session exists it upgrades to cloud mode
  // If not, user stays in local/guest mode until they choose to sign in

  // URL routing disabled — causes 404 on refresh with GitHub Pages
  if(typeof initSquads==='function') initSquads();
}

/* ═══════════════════════════════════════════════════════════════
   LIVE CHAT — Supabase Realtime
═══════════════════════════════════════════════════════════════ */
let _chatChannel = null;
let _chatOpen = false;
let _unreadCount = 0;
let _chatInitialized = false;
const CHAT_TABLE = 'chat_messages'; // table: id (int8, auto, not deletable), created_at, user_id, display_name, message

function toggleChat() {
  _chatOpen = !_chatOpen;
  document.getElementById('chatPanel').classList.toggle('open', _chatOpen);
  document.getElementById('chatBubble').classList.toggle('open', _chatOpen);
  document.getElementById('chatBubbleIcon').textContent = _chatOpen ? '✕' : '💬';
  if (_chatOpen) {
    if (!_currentUser) {
      // Show guest lock, hide real chat
      document.getElementById('chatGuestLock').style.display = 'flex';
      document.getElementById('chatMessages').style.display = 'none';
      document.getElementById('chatInputRow').style.display = 'none';
    } else {
      document.getElementById('chatGuestLock').style.display = 'none';
      document.getElementById('chatMessages').style.display = '';
      document.getElementById('chatInputRow').style.display = '';
      _unreadCount = 0;
      updateUnreadBadge();
      scrollChatToBottom();
      document.getElementById('chatInput').focus();
    }
  }
}
function closeChat() {
  _chatOpen = false;
  document.getElementById('chatPanel').classList.remove('open');
  document.getElementById('chatBubble').classList.remove('open');
  document.getElementById('chatBubbleIcon').textContent = '💬';
}

function updateUnreadBadge() {
  const el = document.getElementById('chatUnread');
  if (_unreadCount > 0 && !_chatOpen) {
    el.style.display = 'flex';
    el.textContent = _unreadCount > 99 ? '99+' : _unreadCount;
  } else {
    el.style.display = 'none';
  }
}

function scrollChatToBottom() {
  const el = document.getElementById('chatMessages');
  if (el) setTimeout(() => el.scrollTop = el.scrollHeight, 50);
}

function fmtChatTime(iso) {
  const d = new Date(iso);
  const h = d.getHours(), m = d.getMinutes();
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

function fmtChatDate(iso) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today); yesterday.setDate(today.getDate()-1);
  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month:'short', day:'numeric' });
}

let _lastMsgDate = null;

function appendChatMsg(msg, scroll=true) {
  const el = document.getElementById('chatMessages');
  const isOwn = _currentUser && msg.user_id === _currentUser.id;

  // Date divider
  const msgDate = new Date(msg.created_at).toDateString();
  if (msgDate !== _lastMsgDate) {
    _lastMsgDate = msgDate;
    const div = document.createElement('div');
    div.className = 'chat-date-divider';
    div.textContent = '— ' + fmtChatDate(msg.created_at) + ' —';
    el.appendChild(div);
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'chat-msg' + (isOwn ? ' own' : '');
  wrapper.dataset.msgId = msg.id;
  // Delete button only for own messages
  const delBtn = isOwn
    ? `<button class="chat-del-btn" title="Delete message" onclick="deleteChatMsg(${msg.id},this)">🗑</button>`
    : '';
  wrapper.innerHTML = `
    <div class="chat-msg-meta">
      <span class="chat-msg-name">${esc(msg.display_name || 'Slayer')}</span>
      <span class="chat-msg-time">${fmtChatTime(msg.created_at)}</span>
      ${delBtn}
    </div>
    <div class="chat-bubble-text">${esc(msg.message)}</div>`;
  el.appendChild(wrapper);
  if (scroll) scrollChatToBottom();
}

async function deleteChatMsg(msgId, btn) {
  if (!_currentUser) return;
  const wrapper = btn.closest('.chat-msg');
  wrapper.style.opacity = '0.4';
  const { error } = await _supa.from(CHAT_TABLE).delete().eq('id', msgId).eq('user_id', _currentUser.id);
  if (error) { wrapper.style.opacity = ''; notify('Delete failed: ' + error.message, 'info'); }
  else { wrapper.remove(); }
}

async function loadRecentMessages() {
  const { data, error } = await _supa
    .from(CHAT_TABLE)
    .select('id, created_at, user_id, display_name, message')
    .order('id', { ascending: true })
    .limit(60);
  if (error) { console.warn('Chat load error:', error.message); return; }
  const el = document.getElementById('chatMessages');
  el.innerHTML = '<div class="chat-system-msg">⚔ Welcome to the Corps Chat. Train together, grow stronger.</div>';
  _lastMsgDate = null;
  (data || []).forEach(m => appendChatMsg(m, false));
  scrollChatToBottom();
}

async function sendChatMsg() {
  if (!_currentUser) return;
  const inp = document.getElementById('chatInput');
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';
  const displayName = _myProfile.nickname || _myProfile.username || _currentUser.email?.split('@')[0] || 'Slayer';
  const { error } = await _supa.from(CHAT_TABLE).insert({
    user_id: _currentUser.id,
    display_name: displayName,
    message: text
  });
  if (error) { notify('Send failed: ' + error.message, 'info'); inp.value = text; return; }
}

async function initChat() {
  if (_chatInitialized) return;
  _chatInitialized = true;
  showChatLoggedInUI(true);
  await loadRecentMessages();

  _chatChannel = _supa.channel('corps-chat')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: CHAT_TABLE }, payload => {
      appendChatMsg(payload.new, true);
      if (!_chatOpen) { _unreadCount++; updateUnreadBadge(); }
      document.getElementById('chatOnlineCount').textContent = 'Live • Realtime';
    })
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        document.getElementById('chatOnlineCount').textContent = 'Connected 🟢';
      } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
        document.getElementById('chatOnlineCount').textContent = 'Disconnected 🔴';
      }
    });
}

function destroyChat() {
  if (_chatChannel) { _supa.removeChannel(_chatChannel); _chatChannel = null; }
  _chatInitialized = false;
  _lastMsgDate = null;
  _unreadCount = 0;
  updateUnreadBadge();
  const el = document.getElementById('chatMessages');
  if (el) el.innerHTML = '<div class="chat-system-msg">⚔ Welcome to the Corps Chat. Train together, grow stronger.</div>';
  Object.keys(_dmWindows).forEach(id => closeDM(id));
}

// ── Show/hide New DM button when logged in ───────────────────
function showChatLoggedInUI(show) {
  document.getElementById('newDMBtn').style.display = show ? '' : 'none';
}

/* ═══════════════════════════════════════════════════════════════
   PROFILE EDIT
═══════════════════════════════════════════════════════════════ */
function loadProfileEditForm() {
  document.getElementById('editNickname').value = _myProfile.nickname || '';
  document.getElementById('editUsername').value = _myProfile.username || '';
  document.getElementById('profileEditError').classList.remove('show');
  document.getElementById('profileEditSuccess').classList.remove('show');
}

async function saveProfileEdit() {
  if (!_currentUser) return;
  const nickname = document.getElementById('editNickname').value.trim();
  const username = document.getElementById('editUsername').value.trim().toLowerCase();
  const errEl = document.getElementById('profileEditError');
  const okEl  = document.getElementById('profileEditSuccess');
  errEl.classList.remove('show'); okEl.classList.remove('show');

  if (!nickname) { errEl.textContent='Nickname cannot be empty.'; errEl.classList.add('show'); return; }
  if (!username || username.length < 3) { errEl.textContent='Username must be 3+ characters.'; errEl.classList.add('show'); return; }

  // Check uniqueness only if username changed
  if (username !== _myProfile.username) {
    const { data: existing } = await _supa.from('user_profiles').select('id').eq('username', username).neq('id', _currentUser.id).maybeSingle();
    if (existing) { errEl.textContent='That username is already taken.'; errEl.classList.add('show'); return; }
  }

  const { error } = await _supa.from('user_profiles').upsert({ id: _currentUser.id, username, nickname });
  if (error) { errEl.textContent='Save failed: ' + error.message; errEl.classList.add('show'); return; }

  _myProfile = { username, nickname };
  document.getElementById('userLabel').textContent = '@' + username;
  document.getElementById('userAvatar').textContent = nickname.charAt(0).toUpperCase();
  okEl.textContent = '✅ Profile updated!'; okEl.classList.add('show');
  setTimeout(() => closeModal('profileEditModal'), 1500);
  notify('🌸 Profile updated!', 'success');
}

/* ═══════════════════════════════════════════════════════════════
   NEW DM — Username Search
═══════════════════════════════════════════════════════════════ */
function openNewDM() {
  document.getElementById('dmSearchInput').value = '';
  document.getElementById('dmSearchResult').textContent = '';
  openModal('newDMModal');
  setTimeout(() => document.getElementById('dmSearchInput').focus(), 100);
}

async function startDMFromSearch() {
  const username = document.getElementById('dmSearchInput').value.trim().toLowerCase();
  const resultEl = document.getElementById('dmSearchResult');
  if (!username) { resultEl.textContent = 'Enter a username.'; return; }
  if (username === _myProfile.username) { resultEl.textContent = "That's you! You can't DM yourself."; return; }

  resultEl.textContent = 'Searching…';
  const { data, error } = await _supa.from('user_profiles').select('id,username,nickname').eq('username', username).maybeSingle();
  if (error || !data) { resultEl.textContent = `No slayer found with @${username}`; return; }

  resultEl.textContent = `Found: ${data.nickname} (@${data.username}) — opening chat…`;
  setTimeout(() => {
    closeModal('newDMModal');
    openDM(data.id, data.nickname, data.username);
  }, 600);
}

/* ═══════════════════════════════════════════════════════════════
   PRIVATE DM WINDOWS
═══════════════════════════════════════════════════════════════ */
const DM_TABLE = 'direct_messages';
const _dmWindows = {};
let _dmZIndex = 5000;
let _dmOffset = 0;

function dmConvoId(uid1, uid2) {
  return [uid1, uid2].sort().join('__');
}

async function openDM(otherUserId, otherNickname, otherUsername) {
  if (!_currentUser) return;
  if (otherUserId === _currentUser.id) return;

  if (_dmWindows[otherUserId]) {
    const win = _dmWindows[otherUserId].el;
    win.style.zIndex = ++_dmZIndex;
    win.querySelector('.dm-input').focus();
    return;
  }

  _dmOffset = (_dmOffset + 1) % 6;
  const offsetPx = _dmOffset * 26;
  const winEl = document.createElement('div');
  winEl.className = 'dm-window';
  winEl.id = 'dm-' + otherUserId;
  winEl.style.cssText = `right:${360 + offsetPx}px; bottom:${90 + offsetPx}px; z-index:${++_dmZIndex}`;
  winEl.innerHTML = `
    <div class="dm-header" onmousedown="dmDragStart(event,'${otherUserId}')">
      <div style="display:flex;align-items:center;gap:7px">
        <div class="dm-avatar">${esc((otherNickname||otherUsername||'?').charAt(0).toUpperCase())}</div>
        <div>
          <div class="dm-title">${esc(otherNickname || otherUsername)}</div>
          <div class="dm-subtitle">@${esc(otherUsername || '')}</div>
        </div>
      </div>
      <div style="display:flex;gap:4px">
        <button class="dm-ctrl-btn" onclick="minimizeDM('${otherUserId}')" title="Minimize">—</button>
        <button class="dm-ctrl-btn" onclick="closeDM('${otherUserId}')" title="Close">✕</button>
      </div>
    </div>
    <div class="dm-messages" id="dm-msgs-${otherUserId}">
      <div class="chat-system-msg" style="margin-top:8px">🌸 Private conversation with ${esc(otherNickname||otherUsername)}</div>
    </div>
    <div class="dm-unread-badge" id="dm-unread-${otherUserId}" style="display:none">0</div>
    <div class="dm-input-row" id="dm-input-row-${otherUserId}">
      <input type="text" class="dm-input" id="dm-inp-${otherUserId}"
        placeholder="Message ${esc(otherNickname||otherUsername)}…" maxlength="300"
        onkeydown="if(event.key==='Enter'){event.preventDefault();sendDM('${otherUserId}')}" />
      <button class="chat-send-btn" style="flex-shrink:0" onclick="sendDM('${otherUserId}')">↑</button>
    </div>`;

  document.body.appendChild(winEl);

  const convoId = dmConvoId(_currentUser.id, otherUserId);
  const channel = _supa.channel('dm-' + convoId)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: DM_TABLE,
        filter: `convo_id=eq.${convoId}` }, payload => {
      appendDMMsg(otherUserId, payload.new);
      const w = _dmWindows[otherUserId];
      if (w && w.minimized) {
        w.unread = (w.unread || 0) + 1;
        const badge = document.getElementById('dm-unread-' + otherUserId);
        if (badge) { badge.style.display = 'flex'; badge.textContent = w.unread; }
      }
    })
    .subscribe();

  _dmWindows[otherUserId] = { el: winEl, channel, otherNickname, otherUsername, minimized: false, unread: 0, lastDate: null };
  await loadDMHistory(otherUserId, convoId);
  winEl.querySelector('.dm-input').focus();
}

function appendDMMsg(otherUserId, msg) {
  const el = document.getElementById('dm-msgs-' + otherUserId);
  if (!el) return;
  const w = _dmWindows[otherUserId];
  const isOwn = _currentUser && msg.from_id === _currentUser.id;

  const msgDate = new Date(msg.created_at).toDateString();
  if (msgDate !== w.lastDate) {
    w.lastDate = msgDate;
    const div = document.createElement('div');
    div.className = 'chat-date-divider';
    div.textContent = '— ' + fmtChatDate(msg.created_at) + ' —';
    el.appendChild(div);
  }

  const delBtn = isOwn
    ? `<button class="chat-del-btn" title="Delete" onclick="deleteDMMsg(${msg.id},'${otherUserId}',this)">🗑</button>`
    : '';
  const wrapper = document.createElement('div');
  wrapper.className = 'chat-msg' + (isOwn ? ' own' : '');
  wrapper.innerHTML = `
    <div class="chat-msg-meta">
      <span class="chat-msg-name">${esc(msg.from_name || 'Slayer')}</span>
      <span class="chat-msg-time">${fmtChatTime(msg.created_at)}</span>
      ${delBtn}
    </div>
    <div class="chat-bubble-text">${esc(msg.message)}</div>`;
  el.appendChild(wrapper);
  el.scrollTop = el.scrollHeight;
}

async function deleteDMMsg(msgId, otherUserId, btn) {
  if (!_currentUser) return;
  const wrapper = btn.closest('.chat-msg');
  wrapper.style.opacity = '0.4';
  const { error } = await _supa.from(DM_TABLE).delete().eq('id', msgId).eq('from_id', _currentUser.id);
  if (error) { wrapper.style.opacity=''; notify('Delete failed: ' + error.message, 'info'); }
  else wrapper.remove();
}

async function loadDMHistory(otherUserId, convoId) {
  const { data, error } = await _supa.from(DM_TABLE).select('*').eq('convo_id', convoId).order('id', { ascending: true }).limit(60);
  if (error) { console.warn('DM load error:', error.message); return; }
  const w = _dmWindows[otherUserId]; if (!w) return;
  w.lastDate = null;
  (data || []).forEach(m => appendDMMsg(otherUserId, m));
}

async function sendDM(otherUserId) {
  if (!_currentUser) return;
  const inp = document.getElementById('dm-inp-' + otherUserId);
  if (!inp) return;
  const text = inp.value.trim(); if (!text) return;
  inp.value = '';
  const { error } = await _supa.from(DM_TABLE).insert({
    from_id: _currentUser.id,
    to_id: otherUserId,
    from_name: _myProfile.nickname || _myProfile.username || 'Slayer',
    message: text,
    convo_id: dmConvoId(_currentUser.id, otherUserId)
  });
  if (error) { notify('DM failed: ' + error.message, 'info'); inp.value = text; }
}

function closeDM(otherUserId) {
  const w = _dmWindows[otherUserId]; if (!w) return;
  if (w.channel) _supa.removeChannel(w.channel);
  w.el.remove();
  delete _dmWindows[otherUserId];
}

function minimizeDM(otherUserId) {
  const w = _dmWindows[otherUserId]; if (!w) return;
  w.minimized = !w.minimized;
  const msgs = document.getElementById('dm-msgs-' + otherUserId);
  const inputRow = document.getElementById('dm-input-row-' + otherUserId);
  if (msgs) msgs.style.display = w.minimized ? 'none' : '';
  if (inputRow) inputRow.style.display = w.minimized ? 'none' : '';
  w.el.style.height = w.minimized ? 'auto' : '';
  if (!w.minimized) {
    w.unread = 0;
    const badge = document.getElementById('dm-unread-' + otherUserId);
    if (badge) badge.style.display = 'none';
  }
}

// ── Dragging DM windows ──────────────────────────────────────
let _dmDrag = null;
function dmDragStart(e, uid) {
  if (e.target.closest('button')) return;
  const win = document.getElementById('dm-' + uid);
  win.style.zIndex = ++_dmZIndex;
  const rect = win.getBoundingClientRect();
  _dmDrag = { uid, startX: e.clientX, startY: e.clientY,
    initRight: window.innerWidth - rect.right, initBottom: window.innerHeight - rect.bottom };
  document.addEventListener('mousemove', dmDragMove);
  document.addEventListener('mouseup', dmDragEnd);
  e.preventDefault();
}
function dmDragMove(e) {
  if (!_dmDrag) return;
  const win = document.getElementById('dm-' + _dmDrag.uid); if (!win) return;
  const dx = e.clientX - _dmDrag.startX;
  const dy = e.clientY - _dmDrag.startY;
  win.style.right = Math.max(0, _dmDrag.initRight - dx) + 'px';
  win.style.bottom = Math.max(0, _dmDrag.initBottom - dy) + 'px';
}
function dmDragEnd() {
  _dmDrag = null;
  document.removeEventListener('mousemove', dmDragMove);
  document.removeEventListener('mouseup', dmDragEnd);
}

/* ═══════════════════════════════════════════════════════════════
   PLANNED STUDY SESSIONS
═══════════════════════════════════════════════════════════════ */
function pdPlanned() {
  if (!pd().plannedSessions) pd().plannedSessions = [];
  return pd().plannedSessions;
}

function openPlanModal(editId) {
  const modal = document.getElementById('planModal');
  const today = new Date().toISOString().split('T')[0];
  // Populate subject dropdown
  const sel = document.getElementById('plan_subject');
  sel.innerHTML = '<option value="">— Select —</option>';
  (pd().subjects || []).forEach(s => {
    const opt = document.createElement('option'); opt.value = s.name; opt.textContent = s.name; sel.appendChild(opt);
  });
  if (editId) {
    const item = pdPlanned().find(p => p.id === editId);
    if (item) {
      document.getElementById('planModalTitle').textContent = '✏ Edit Planned Session';
      document.getElementById('planEditId').value = editId;
      sel.value = item.subject || '';
      document.getElementById('plan_topic').value = item.topic || '';
      document.getElementById('plan_date').value = item.date || today;
      document.getElementById('plan_duration').value = item.duration || 60;
      document.getElementById('plan_time').value = item.time || '';
      document.getElementById('plan_priority').value = item.priority || 'medium';
      document.getElementById('plan_notes').value = item.notes || '';
    }
  } else {
    document.getElementById('planModalTitle').textContent = '📅 Plan a Study Session';
    document.getElementById('planEditId').value = '';
    sel.value = '';
    document.getElementById('plan_topic').value = '';
    document.getElementById('plan_date').value = today;
    document.getElementById('plan_duration').value = 60;
    document.getElementById('plan_time').value = '';
    document.getElementById('plan_priority').value = 'medium';
    document.getElementById('plan_notes').value = '';
  }
  modal.classList.add('active');
}
function closePlanModal() { document.getElementById('planModal').classList.remove('active'); }

function savePlannedSession() {
  const subject = document.getElementById('plan_subject').value.trim();
  const topic = document.getElementById('plan_topic').value.trim();
  const date = document.getElementById('plan_date').value;
  const duration = Math.max(1, parseInt(document.getElementById('plan_duration').value) || 60);
  const time = document.getElementById('plan_time').value;
  const priority = document.getElementById('plan_priority').value;
  const notes = document.getElementById('plan_notes').value.trim();
  if (!date) { notify('Please pick a date.', 'info'); return; }
  if (!subject) { notify('Please select a subject.', 'info'); return; }
  const editId = document.getElementById('planEditId').value;
  if (editId) {
    const item = pdPlanned().find(p => p.id === editId);
    if (item) { Object.assign(item, { subject, topic, date, duration, time, priority, notes }); }
  } else {
    pdPlanned().push({ id: Date.now().toString(), subject, topic, date, duration, time, priority, notes, done: false });
  }
  saveState(); closePlanModal(); refreshPlannedSessions(); refreshWeekStudyPlan();
  notify('Session planned! Stay sharp. ⚔', 'success');
}

function togglePlanDone(id) {
  const item = pdPlanned().find(p => p.id === id); if (!item) return;
  item.done = !item.done; saveState(); refreshPlannedSessions();
}
function deletePlan(id) {
  if (!confirm('Delete this planned session?')) return;
  pd().plannedSessions = pdPlanned().filter(p => p.id !== id);
  saveState(); refreshPlannedSessions(); refreshWeekStudyPlan();
}

function refreshPlannedSessions() {
  const el = document.getElementById('plannedSessionList'); if (!el) return;
  const filterDate = document.getElementById('planFilterDate')?.value || '';
  const priColors = { high: 'var(--red)', medium: 'var(--accent)', low: 'var(--text3)' };
  const today = new Date().toISOString().split('T')[0];

  // Auto-roll skipped sessions to today
  pdPlanned().forEach(p => {
    if (p.status === 'skipped' && p.date < today) {
      p.originalDate = p.originalDate || p.date;
      p.date = today;
      p.skipCount = (p.skipCount || 0) + 1;
    }
  });

  let items = [...pdPlanned()].sort((a, b) => {
    // Pending/Later/Skipped first, then done/cancelled at bottom
    const order = { pending: 0, later: 1, skipped: 2, done: 3, cancelled: 4 };
    const ao = order[a.status||'pending'] ?? 0, bo = order[b.status||'pending'] ?? 0;
    if (ao !== bo) return ao - bo;
    if (a.date !== b.date) return a.date < b.date ? -1 : 1;
    if (a.time && b.time) return a.time < b.time ? -1 : 1;
    return 0;
  });

  if (filterDate) items = items.filter(p => p.date === filterDate);
  const badge = document.getElementById('planCountBadge');
  if (badge) {
    const pending = items.filter(p => !p.status || p.status === 'pending' || p.status === 'later' || p.status === 'skipped').length;
    badge.textContent = pending + ' pending · ' + items.length + ' total';
  }

  if (!items.length) {
    el.innerHTML = '<div class="plan-empty">No planned sessions' + (filterDate ? ' for this date' : '') + '.<br>Click <b>+ Plan Session</b> to schedule ahead.</div>';
    return;
  }

  el.innerHTML = items.map(p => {
    const status = p.status || 'pending';
    const isActive = status === 'pending' || status === 'later' || status === 'skipped';
    const isCancelled = status === 'cancelled';
    const isDone = status === 'done';
    const timeStr = p.time ? ' · ' + p.time : '';
    const notesStr = p.notes ? `<div style="font-size:12px;color:var(--text3);margin-top:4px;font-style:italic">${esc(p.notes)}</div>` : '';
    const rolloverBadge = p.originalDate ? `<span style="font-family:var(--font-mono);font-size:9px;color:var(--gold)">↩ from ${p.originalDate}</span>` : '';
    const skipWarn = p.skipCount >= 3 ? `<span style="font-family:var(--font-mono);font-size:9px;color:var(--red)">⚠ skipped ${p.skipCount}×</span>` : '';

    const statusBadge = `<span class="plan-status ${status}">${
      {pending:'● Pending', done:'✓ Done', cancelled:'✕ Cancelled', later:'⏭ Later', skipped:'🔄 Skipped'}[status] || status
    }</span>`;

    const startBtn = isActive
      ? `<button class="plan-start-btn" onclick="startRoutineSession('${p.id}')">▶ Start</button>`
      : '';

    return `<div class="plan-item${isDone?' done-plan':''}${isCancelled?' done-plan':''}" style="${isCancelled?'opacity:.45;text-decoration:line-through':''}">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:7px;margin-bottom:5px;flex-wrap:wrap">
          ${p.subject ? `<span class="plan-subject-tag">${esc(p.subject)}</span>` : ''}
          <span class="plan-topic">${esc(p.topic || 'Study Session')}</span>
          ${statusBadge}
          ${rolloverBadge}
          ${skipWarn}
        </div>
        <div class="plan-meta">
          <span>📅 ${p.date}${timeStr}</span>
          <span>⏱ ${p.remainingDuration!=null&&p.remainingDuration<p.duration
            ? `<span style="color:var(--accent)">${p.remainingDuration}m left</span> of ${p.duration}m`
            : p.duration+'m'}</span>
          <span><span class="plan-priority-dot" style="background:${priColors[p.priority]||'var(--text3)'}"></span>${p.priority}</span>
        </div>
        ${notesStr}
        ${isActive ? `<div class="rupdate-actions" style="margin-top:8px">
          ${startBtn}
          <button class="rupdate-btn done" onclick="updatePlanStatus('${p.id}','done')">✓ Done</button>
          <button class="rupdate-btn later" onclick="updatePlanStatus('${p.id}','later')">⏭ Later</button>
          <button class="rupdate-btn skip" onclick="updatePlanStatus('${p.id}','skipped')">🔄 Skip to Tomorrow</button>
          <button class="rupdate-btn cancel" onclick="updatePlanStatus('${p.id}','cancelled')">✕ Cancel</button>
        </div>` : ''}
      </div>
      <div class="plan-actions">
        <button class="btn-icon" title="Edit" onclick="openPlanModal('${p.id}')">✏</button>
        <button class="btn-icon" title="Delete" onclick="deletePlan('${p.id}')" style="color:var(--red)">🗑</button>
      </div>
    </div>`;
  }).join('');
}

function refreshWeekStudyPlan() {
  const el = document.getElementById('weekStudyPlan'); if (!el) return;
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  let html = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(today); d.setDate(today.getDate() - today.getDay() + i);
    const ds = d.toISOString().split('T')[0];
    const isToday = ds === todayStr;
    const sessions = pdPlanned().filter(p => p.date === ds && !p.done);
    html += `<div class="week-plan-day${isToday?' today-plan':''}">
      <div class="week-plan-day-label">${days[d.getDay()]} ${d.getDate()}</div>
      ${sessions.length
        ? sessions.slice(0,3).map(p => `<div class="week-plan-session" title="${esc(p.subject?p.subject+': ':'')}${esc(p.topic||'Study')}">${p.subject?esc(p.subject)+' · ':''}${p.duration}m</div>`).join('')
        : `<div style="font-size:10px;color:var(--text3);font-style:italic">Free</div>`}
      ${sessions.length > 3 ? `<div style="font-size:9px;color:var(--text3);margin-top:2px">+${sessions.length-3} more</div>` : ''}
    </div>`;
  }
  el.innerHTML = html;
}

/* ═══════════════════════════════════════════════════════════════
   DAILY HABITS
═══════════════════════════════════════════════════════════════ */
// ── HABITS: backed by nerdbi_habits + nerdbi_habit_logs ──────
let _cloudHabits = null;    // null = not loaded; array when loaded
let _cloudHabitLogs = null; // null = not loaded; { date: [id,...] } when loaded

function pdHabits() {
  if (_cloudHabits !== null) return _cloudHabits;
  if (!pd().habits) pd().habits = [];
  return pd().habits;
}
function pdHabitLogs() {
  if (_cloudHabitLogs !== null) return _cloudHabitLogs;
  if (!pd().habitLogs) pd().habitLogs = {};
  return pd().habitLogs;
}

async function loadHabitsCloud() {
  if (!_currentUser) return;
  try {
    const { data: hdata } = await _supa.from('nerdbi_habits')
      .select('*').eq('user_id', _currentUser.id).order('id');
    const { data: ldata } = await _supa.from('nerdbi_habit_logs')
      .select('habit_id, log_date').eq('user_id', _currentUser.id);
    if (hdata) {
      _cloudHabits = hdata.map(h => ({
        id: String(h.id), name: h.name, icon: h.icon,
        freq: h.freq, createdAt: h.created_at
      }));
    }
    if (ldata) {
      _cloudHabitLogs = {};
      ldata.forEach(l => {
        if (!_cloudHabitLogs[l.log_date]) _cloudHabitLogs[l.log_date] = [];
        _cloudHabitLogs[l.log_date].push(String(l.habit_id));
      });
    }
    refreshHabits();
  } catch(e) { console.warn('loadHabitsCloud failed:', e); }
}

function openHabitModal() {
  document.getElementById('h_name').value = '';
  document.getElementById('h_icon').value = '📖';
  document.getElementById('h_freq').value = '7';
  document.getElementById('habitModal').classList.add('active');
  setTimeout(() => document.getElementById('h_name').focus(), 50);
}

async function saveHabit() {
  const name = document.getElementById('h_name').value.trim();
  if (!name) { notify('Enter a habit name.', 'info'); return; }
  const icon = document.getElementById('h_icon').value.trim() || '📖';
  const freq = parseInt(document.getElementById('h_freq').value) || 7;
  if (_currentUser) {
    const { data, error } = await _supa.from('nerdbi_habits')
      .insert([{ user_id: _currentUser.id, name, icon, freq }]).select().single();
    if (!error && data) {
      if (!_cloudHabits) _cloudHabits = [];
      _cloudHabits.push({ id: String(data.id), name, icon, freq, createdAt: data.created_at });
    }
  } else {
    pdHabits().push({ id: Date.now().toString(), name, icon, freq, createdAt: new Date().toISOString().split('T')[0] });
    saveState();
  }
  closeModal('habitModal'); refreshHabits();
  notify('New habit added! Build that streak. 🔥', 'success');
}

function updatePlanStatus(id, status) {
  const item = pdPlanned().find(p => p.id === id); if (!item) return;
  item.status = status;
  if (status === 'skipped') {
    item.originalDate = item.originalDate || item.date;
    const next = new Date(item.date); next.setDate(next.getDate() + 1);
    item.date = next.toISOString().split('T')[0];
    item.skipCount = (item.skipCount || 0) + 1;
    if (item.skipCount >= 3) notify(`⚠ "${item.topic}" has been skipped ${item.skipCount} times. Consider rescheduling it.`, 'info');
  }
  saveState(); refreshPlannedSessions(); refreshWeekStudyPlan();
  // Close the popup if called from there
  const modal = document.getElementById('routineUpdateModal');
  if (modal && modal.classList.contains('active')) {
    // Re-render the popup list
    showRoutineUpdatePopup(false);
  }
}

function startRoutineSession(id) {
  const item = pdPlanned().find(p => p.id === id); if (!item) return;
  const remaining = item.remainingDuration ?? item.duration;
  const options = [25,30,45,50,60,90,120].filter(m => m <= remaining);
  if (!options.includes(remaining)) options.push(remaining);
  options.sort((a,b)=>a-b);

  const existing = document.getElementById('routineStartPicker');
  if (existing) existing.remove();

  const picker = document.createElement('div');
  picker.id = 'routineStartPicker';
  picker.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
    background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);
    padding:24px;z-index:9999;box-shadow:var(--shadow-lg);min-width:300px`;
  picker.innerHTML = `
    <div style="font-family:var(--font-mono);font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:12px">Start Session</div>
    <div style="font-size:14px;color:var(--text);font-weight:600;margin-bottom:4px">${esc(item.topic||item.subject||'Study Session')}</div>
    <div style="font-family:var(--font-mono);font-size:12px;color:var(--accent);margin-bottom:16px">
      ${remaining < item.duration ? `${remaining}m remaining of ${item.duration}m` : `${item.duration}m total`}
    </div>
    <div style="margin-bottom:14px">
      <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:8px">How long this session?</label>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
        ${options.map(m=>`<button onclick="document.getElementById('routinePickerMins').value=${m};document.querySelectorAll('.rpick-opt').forEach(b=>b.classList.remove('rpick-sel'));this.classList.add('rpick-sel')" 
          class="rpick-opt" style="font-family:var(--font-mono);font-size:11px;padding:5px 12px;border-radius:100px;border:1px solid var(--border);background:var(--bg3);color:var(--text2);cursor:pointer;transition:all .15s">
          ${m}m${m===remaining?' ✓':''}
        </button>`).join('')}
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <input type="number" id="routinePickerMins" min="1" max="${remaining}" value="${Math.min(60,remaining)}"
          style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius-sm);color:var(--text);font-family:var(--font-mono);font-size:14px;padding:7px 12px;width:100%;outline:none"
          onkeydown="if(event.key==='Enter')confirmRoutineStart('${id}')">
        <span style="font-family:var(--font-mono);font-size:11px;color:var(--text3);white-space:nowrap">min</span>
      </div>
    </div>
    <div style="display:flex;gap:8px">
      <button onclick="confirmRoutineStart('${id}')" class="btn btn-primary" style="flex:1">▶ Start</button>
      <button onclick="document.getElementById('routineStartPicker').remove()" class="btn btn-secondary">Cancel</button>
    </div>`;
  document.body.appendChild(picker);

  // Clicking a quick option updates the input
  setTimeout(()=>document.getElementById('routinePickerMins')?.focus(), 50);
}

function confirmRoutineStart(id) {
  const item = pdPlanned().find(p => p.id === id); if (!item) return;
  const mins = parseInt(document.getElementById('routinePickerMins')?.value);
  if (!mins || mins < 1) { notify('Enter a valid duration.','info'); return; }
  document.getElementById('routineStartPicker').remove();

  // Store which routine session this belongs to + planned duration
  window._activeRoutinePlanId = id;
  window._activeRoutineSessionMins = mins;

  // Pre-fill timer subject + topic
  const subjectEl = document.getElementById('curSubject');
  const topicEl = document.getElementById('curTopic');
  if (subjectEl) {
    const opts = Array.from(subjectEl.options);
    const match = opts.find(o => o.value === item.subject || o.text === item.subject);
    if (match) subjectEl.value = match.value;
  }
  if (topicEl) topicEl.value = item.topic || '';

  // Set custom timer to chosen duration
  pd().settings._routineDuration = mins;
  const customBtn = document.querySelector('.mode-btn[onclick*="custom"]');
  setMode('custom', customBtn);
  if(customBtn) { document.querySelectorAll('.mode-btn').forEach(b=>b.classList.remove('active')); customBtn.classList.add('active'); }

  // Navigate to dashboard
  const dashBtn = document.querySelector('[onclick*="nav(\'dashboard\'"]');
  if (dashBtn) nav('dashboard', dashBtn);
  notify(`▶ ${mins}m session starting — ${item.topic||item.subject} ⚔`, 'success');
}

function showRoutineUpdatePopup(openModal = true) {
  const today = new Date().toISOString().split('T')[0];
  const todayItems = pdPlanned().filter(p =>
    p.date === today && (!p.status || p.status === 'pending' || p.status === 'later' || p.status === 'skipped')
  );
  if (!todayItems.length) return; // nothing to show
  const el = document.getElementById('routineUpdateList'); if (!el) return;
  el.innerHTML = todayItems.map(p => `
    <div class="rupdate-item" id="rupdate-${p.id}">
      <div class="rupdate-item-top">
        ${p.subject ? `<span class="rupdate-subject">${esc(p.subject)}</span>` : ''}
        <span class="rupdate-topic">${esc(p.topic || 'Study Session')}</span>
      </div>
      <div class="rupdate-meta">📅 ${p.date} · ⏱ ${p.duration}m${p.time?' · '+p.time:''}</div>
      <div class="rupdate-actions">
        <button class="rupdate-btn done" onclick="updatePlanStatus('${p.id}','done')">✓ Done</button>
        <button class="rupdate-btn later" onclick="updatePlanStatus('${p.id}','later')">⏭ Later</button>
        <button class="rupdate-btn skip" onclick="updatePlanStatus('${p.id}','skipped')">🔄 Tomorrow</button>
        <button class="rupdate-btn cancel" onclick="updatePlanStatus('${p.id}','cancelled')">✕ Cancel</button>
      </div>
    </div>`).join('');
  if (openModal) document.getElementById('routineUpdateModal').classList.add('active');
}

async function toggleHabitToday(id) {
  const today = new Date().toISOString().split('T')[0];
  const logs = pdHabitLogs();
  if (!logs[today]) logs[today] = [];
  const idx = logs[today].indexOf(id);
  const wasDone = idx >= 0;
  if (wasDone) logs[today].splice(idx, 1); else logs[today].push(id);
  refreshHabits();
  if (_currentUser) {
    try {
      if (wasDone)
        await _supa.from('nerdbi_habit_logs').delete()
          .eq('user_id', _currentUser.id).eq('habit_id', id).eq('log_date', today);
      else
        await _supa.from('nerdbi_habit_logs')
          .insert([{ user_id: _currentUser.id, habit_id: id, log_date: today }]);
    } catch(e) { console.warn('toggleHabitToday cloud failed:', e); }
  } else { saveState(); }
}

async function deleteHabit(id) {
  if (!confirm('Delete this habit?')) return;
  if (_cloudHabits) _cloudHabits = _cloudHabits.filter(h => h.id !== id);
  else { pd().habits = pdHabits().filter(h => h.id !== id); saveState(); }
  refreshHabits();
  if (_currentUser) {
    try { await _supa.from('nerdbi_habits').delete().eq('id', id).eq('user_id', _currentUser.id); }
    catch(e) { console.warn('deleteHabit cloud failed:', e); }
  }
}

function getHabitStreak(id) {
  const logs = pdHabitLogs();
  let streak = 0;
  const d = new Date();
  // Don't penalise if today not yet checked
  const todayStr = d.toISOString().split('T')[0];
  const todayDone = (logs[todayStr] || []).includes(id);
  if (!todayDone) d.setDate(d.getDate() - 1);
  while (true) {
    const ds = d.toISOString().split('T')[0];
    if ((logs[ds] || []).includes(id)) { streak++; d.setDate(d.getDate() - 1); }
    else break;
  }
  return streak;
}

let _habitView = 7; // 7, 30, or 180

function setHabitView(days) {
  _habitView = days;
  document.querySelectorAll('.hview-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('hview-' + days);
  if (btn) btn.classList.add('active');
  refreshHabits();
}

function refreshHabits() {
  const el = document.getElementById('habitList'); if (!el) return;
  const habits = pdHabits();
  if (!habits.length) {
    el.innerHTML = '<div class="habit-empty">No habits yet. Click <b>+ Add Habit</b> to start building your daily routine.</div>';
    return;
  }
  const logs = pdHabitLogs();
  const today = new Date().toISOString().split('T')[0];
  const todayDone = logs[today] || [];
  const days = _habitView;

  // Build date array for the view window
  const dateArr = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    dateArr.push(d.toISOString().split('T')[0]);
  }

  el.innerHTML = habits.map(h => {
    const streak = getHabitStreak(h.id);
    const isDoneToday = todayDone.includes(h.id);
    const freqLabel = {7:'Daily',6:'6×/wk',5:'5×/wk',3:'3×/wk',1:'1×/wk'}[h.freq]||h.freq+'×/wk';
    const doneCount = dateArr.filter(ds => (logs[ds]||[]).includes(h.id)).length;

    let dotsHtml = '';
    if (days === 7) {
      // 7 circles in a row
      dotsHtml = '<div class="habit-dots" style="margin-top:5px">' +
        dateArr.map((ds, i) => {
          const done = (logs[ds]||[]).includes(h.id);
          const isToday = i === days - 1;
          return `<div class="habit-dot${done?' done':''}${isToday&&!done?' today-dot':''}" title="${ds}"></div>`;
        }).join('') + '</div>';
    } else {
      // 30d or 6mo — small squares in a wrap grid
      // For 6mo, group by week rows with month labels
      const dotSize = days === 30 ? 10 : 8;
      const gap = days === 30 ? 3 : 2;
      dotsHtml = `<div class="habit-month-grid" style="gap:${gap}px;margin-top:6px">`;
      if (days === 180) {
        // Add day-of-week labels + month markers
        let currentMonth = '';
        dateArr.forEach((ds, i) => {
          const done = (logs[ds]||[]).includes(h.id);
          const isToday = ds === today;
          const mo = ds.slice(0,7);
          const label = mo !== currentMonth ? `<span style="font-family:var(--font-mono);font-size:8px;color:var(--text3);width:100%;margin-top:4px;display:block">${new Date(ds+'T00:00:00').toLocaleDateString('en-US',{month:'short'})}</span>` : '';
          currentMonth = mo;
          dotsHtml += label + `<div class="habit-dot-sm${done?' done':''}" title="${ds}" style="width:${dotSize}px;height:${dotSize}px;border-radius:2px${isToday?';box-shadow:0 0 0 1px var(--accent)':''}"></div>`;
        });
      } else {
        dateArr.forEach((ds) => {
          const done = (logs[ds]||[]).includes(h.id);
          const isToday = ds === today;
          dotsHtml += `<div class="habit-dot-sm${done?' done':''}" title="${ds}" style="width:${dotSize}px;height:${dotSize}px${isToday?';box-shadow:0 0 0 1px var(--accent)':''}"></div>`;
        });
      }
      dotsHtml += `<span style="font-family:var(--font-mono);font-size:10px;color:var(--text3);margin-left:4px;align-self:center">${doneCount}/${days}</span></div>`;
    }

    return `<div class="habit-item">
      <div class="habit-icon">${h.icon}</div>
      <div class="habit-info">
        <div class="habit-name">${esc(h.name)}</div>
        <div class="habit-streak-row">
          ${streak>0?`<span class="habit-streak">🔥 ${streak} day streak</span>`:'<span class="habit-streak" style="color:var(--text3)">No streak yet</span>'}
          <span class="habit-freq">· ${freqLabel}</span>
        </div>
        ${dotsHtml}
      </div>
      <button class="habit-check-btn${isDoneToday?' checked-today':''}" onclick="toggleHabitToday('${h.id}')">
        ${isDoneToday ? '✓ Done' : 'Mark Done'}
      </button>
      <button class="habit-del-btn" onclick="deleteHabit('${h.id}')" title="Delete">🗑</button>
    </div>`;
  }).join('');
}

/* ═══════════════════════════════════════════════════════════════
   ROUTINE ASSIGNMENTS — fetch & import from Supabase
═══════════════════════════════════════════════════════════════ */
let _pendingAssignment = null; // holds the assignment + template data

async function checkRoutineAssignments() {
  if (!_currentUser) return;
  try {
    // Fetch unimported assignments for this user
    const { data, error } = await _supa
      .from('routine_assignments')
      .select('id, template_id, imported, routine_templates(title, description, subject, sessions)')
      .eq('user_id', _currentUser.id)
      .eq('imported', false);

    if (error) { console.warn('Routine assignment check failed:', error.message); return; }
    if (!data || !data.length) return;

    // Show banner for the first unimported assignment
    const assignment = data[0];
    const template = assignment.routine_templates;
    if (!template) return;

    _pendingAssignment = { assignmentId: assignment.id, template };

    const banner = document.getElementById('routineAssignBanner');
    document.getElementById('routineBannerTitle').textContent = '📋 A study routine has been assigned to you!';
    document.getElementById('routineBannerDesc').textContent =
      `"${template.title}" — ${template.sessions?.length || 0} sessions · ${template.subject || 'Study'}`;
    banner.style.display = 'flex';
  } catch(e) { console.warn('checkRoutineAssignments error:', e.message); }
}

async function importAssignedRoutine() {
  if (!_pendingAssignment) return;
  const { assignmentId, template } = _pendingAssignment;

  // Add all sessions to plannedSessions
  const sessions = template.sessions || [];
  if (!pd().plannedSessions) pd().plannedSessions = [];
  sessions.forEach(s => {
    pd().plannedSessions.push({
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      subject: template.subject || s.subject || 'Biology',
      topic: s.topic || '',
      date: s.date || '',
      duration: s.duration || 240,
      time: s.time || '',
      priority: s.priority || 'high',
      notes: s.notes || '',
      done: false
    });
  });

  saveState();
  refreshPlannedSessions();
  refreshWeekStudyPlan();

  // Mark as imported in Supabase
  try {
    await _supa.from('routine_assignments').update({ imported: true }).eq('id', assignmentId);
  } catch(e) { console.warn('Could not mark assignment imported:', e.message); }

  dismissRoutineBanner();
  notify(`✅ "${template.title}" imported! ${sessions.length} sessions added to your Routine. ⚔`, 'success');

  // Auto-navigate to Routine page
  setTimeout(() => {
    const routineBtn = document.querySelector('[onclick="nav(\'routine\',this)"]');
    if (routineBtn) nav('routine', routineBtn);
  }, 800);
}

function dismissRoutineBanner() {
  document.getElementById('routineAssignBanner').style.display = 'none';
  _pendingAssignment = null;
}

/* ═══════════════════════════════════════════════════════════════
   PWA — INSTALL PROMPT
═══════════════════════════════════════════════════════════════ */
let _pwaPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  _pwaPrompt = e;
  const btn = document.getElementById('pwaInstallBtn');
  if (btn) btn.style.display = '';
});

async function pwaInstall() {
  if (!_pwaPrompt) {
    // Already installed or browser doesn't support — show guidance
    notify('📲 To install: use your browser menu → "Add to Home Screen" or "Install App"', 'info');
    return;
  }
  _pwaPrompt.prompt();
  const { outcome } = await _pwaPrompt.userChoice;
  if (outcome === 'accepted') {
    notify('✅ NerdBi installed! Find it on your home screen.', 'success');
    document.getElementById('pwaInstallBtn').style.display = 'none';
  }
  _pwaPrompt = null;
}

// Hide install button if already running as installed PWA
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
  const btn = document.getElementById('pwaInstallBtn');
  if (btn) btn.style.display = 'none';
}

window.addEventListener('appinstalled', () => {
  document.getElementById('pwaInstallBtn').style.display = 'none';
  notify('🎉 NerdBi installed successfully!', 'success');
  _pwaPrompt = null;
});

/* ── Register Service Worker ── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // SW not available (local file) — PWA install still works on HTTPS hosts
    });
  });
}


/* ═══ SQUADS ADDON JS ═══ */


/* ═══════════════════════════════════════════════════════════
   GROWTH TREE SYSTEM
═══════════════════════════════════════════════════════════════ */
const TREE_STAGES = [
  { mins: 0,  emoji: '🌱', label: 'Seed Planted',    class: '',        glow: 'rgba(111,207,135,0.15)' },
  { mins: 15, emoji: '🌿', label: 'Sprout Growing',  class: 'growing', glow: 'rgba(111,207,135,0.25)' },
  { mins: 30, emoji: '🌲', label: 'Sapling Rising',  class: 'growing', glow: 'rgba(90,158,232,0.2)'   },
  { mins: 45, emoji: '🌳', label: 'Tree Standing',   class: 'growing', glow: 'rgba(155,89,182,0.25)'  },
  { mins: 60, emoji: '✨',  label: 'Wisteria Bloomed',class: 'bloomed', glow: 'rgba(155,89,182,0.45)'  },
];
const TREE_WITHERED = { emoji: '🥀', label: 'Tree Withered', class: 'withered', glow: 'rgba(232,68,58,0.2)' };

let _currentTreeStage = 0;  // index into TREE_STAGES
let _treeWithered = false;
let _treeBloomedFired = false;

// Called every tick from the existing timer
function updateTree(elapsedSeconds) {
  if (_treeWithered) return;
  const mins = Math.floor(elapsedSeconds / 60);

  // Find correct stage — iterate all stages including the last (bloomed)
  let stageIdx = 0;
  for (let i = TREE_STAGES.length - 1; i >= 0; i--) {
    if (mins >= TREE_STAGES[i].mins) { stageIdx = i; break; }
  }

  // Trigger bloom exactly once when the final stage is first reached
  if (stageIdx === TREE_STAGES.length - 1 && !_treeBloomedFired) {
    bloomTree();
    return;
  }

  if (stageIdx !== _currentTreeStage) {
    _currentTreeStage = stageIdx;
    renderTree(TREE_STAGES[stageIdx]);
    updatePresence({ tree_stage: stageIdx + 1 });
  }
}

function renderTree(stage) {
  const emojiEl  = document.getElementById('treeEmoji');
  const labelEl  = document.getElementById('treeStageLabel');
  const glowEl   = document.getElementById('treeGlow');
  if (!emojiEl) return;

  emojiEl.textContent = stage.emoji;
  emojiEl.className   = 'tree-emoji ' + (stage.class || '');
  if (labelEl) labelEl.textContent = stage.label;
  if (glowEl)  glowEl.style.boxShadow = `0 0 40px 10px ${stage.glow}`;
}

function bloomTree() {
  if (_treeBloomedFired) return;
  _treeBloomedFired = true;
  _currentTreeStage = TREE_STAGES.length - 1;
  const bloomed = { ...TREE_STAGES[TREE_STAGES.length - 1], emoji: '🌸' };
  renderTree(bloomed);
  updatePresence({ tree_stage: 5, status: 'resting' });
  // Petal burst animation
  const wrap = document.getElementById('treePetalBurst');
  if (wrap) {
    const petals = ['🌸','✿','🌺','❀','🌼'];
    const positions = [
      'translate(-60px,-60px)','translate(60px,-60px)',
      'translate(-70px,30px)','translate(70px,30px)',
      'translate(0,-80px)','translate(-40px,60px)','translate(40px,60px)'
    ];
    wrap.innerHTML = positions.map((pos, i) =>
      `<span class="tree-petal-burst" style="--petal-to:${pos};left:50%;top:50%;animation-delay:${i*0.07}s">
        ${petals[i % petals.length]}
      </span>`
    ).join('');
    setTimeout(() => { if (wrap) wrap.innerHTML = ''; }, 1500);
  }
  notify('🌸 Wisteria Bloomed! Perfect concentration form! ⚔', 'success');
}

function witherTree() {
  if (_treeWithered) return;
  _treeWithered = true;
  renderTree(TREE_WITHERED);
  updatePresence({ tree_stage: 6 });
  document.getElementById('witherWarning')?.classList.remove('active');
  notify('🥀 Tree withered. Stay focused next time!', 'info');
}

function resetTree() {
  _currentTreeStage = 0;
  _treeWithered = false;
  _treeBloomedFired = false;
  renderTree(TREE_STAGES[0]);
  document.getElementById('witherWarning')?.classList.remove('active');
  updatePresence({ tree_stage: 0 });
}

// Insert tree into timer hero (called on init)
function injectTreeIntoTimer() {
  // Tree lives in the squad forest only — not in the timer
  // Still create hidden elements so renderTree/updateTree calls don't crash
  if (document.getElementById('treeEmoji')) return;
  const hidden = document.createElement('div');
  hidden.style.display = 'none';
  hidden.innerHTML = `
    <span id="treeEmoji">🌱</span>
    <span id="treeStageLabel"></span>
    <div id="treeGlow"></div>
    <div id="treePetalBurst"></div>
    <div id="witherWarning"></div>`;
  document.body.appendChild(hidden);
}

/* ═══════════════════════════════════════════════════════════
   TAB VISIBILITY — soft warn system
═══════════════════════════════════════════════════════════════ */
let _tabHiddenAt = null;
let _tabWarnTimeout = null;
let _witherEnabled = false; // user toggle (off by default)
const TAB_GRACE_SECS = 30;

function initTabVisibility() {
  document.addEventListener('visibilitychange', () => {
    if (!tmr.running || tmr.paused) return; // only matters when actively studying

    if (document.hidden) {
      _tabHiddenAt = Date.now();
      // Show warning immediately
      showTabWarning();
      // Set wither timer if enabled
      if (_witherEnabled) {
        _tabWarnTimeout = setTimeout(() => {
          if (document.hidden && tmr.running) witherTree();
        }, TAB_GRACE_SECS * 1000);
      }
    } else {
      // Back! How long were they gone?
      const goneMs = Date.now() - (_tabHiddenAt || Date.now());
      hideTabWarning();
      clearTimeout(_tabWarnTimeout);
      _tabHiddenAt = null;
      if (goneMs > 5000) {
        notify(`👀 Welcome back! You were away ${Math.round(goneMs/1000)}s.`, 'info');
      }
    }
  });
}

function showTabWarning() {
  const el = document.getElementById('tabWarningToast'); if (!el) return;
  el.textContent = _witherEnabled
    ? `🌿 Your tree wilts in ${TAB_GRACE_SECS}s — come back!`
    : `🌿 Focus! Your tree misses you…`;
  el.classList.add('show');
}
function hideTabWarning() {
  document.getElementById('tabWarningToast')?.classList.remove('show');
}

function toggleWitherSetting() {
  _witherEnabled = !_witherEnabled;
  localStorage.setItem('nerdbi_wither', _witherEnabled ? '1' : '0');
  const sw = document.getElementById('witherToggle');
  if (sw) sw.classList.toggle('on', _witherEnabled);
  notify(_witherEnabled ? '🥀 Wither mode ON — stay on tab!' : '✅ Wither mode OFF', 'info');
}

/* ═══════════════════════════════════════════════════════════
   SQUAD STATE
═══════════════════════════════════════════════════════════════ */
let _mySquads        = [];   // all squads user is in
let _primarySquad    = null; // the one shown on dashboard
let _squadMembers    = [];   // current squad's members
let _squadPresence   = {};   // user_id → presence row
let _squadChannel    = null; // realtime subscription
let _squadChatChannel= null;
let _presenceHeartbeat = null;
let _pickedSquadEmoji = '⚔';
let _squadChatLastDate = null;

/* ── Presence upsert ── */
async function updatePresence(patch = {}) {
  if (!_currentUser || !_primarySquad) return;
  const base = {
    user_id:   _currentUser.id,
    squad_id:  _primarySquad.id,
    nickname:  _myProfile.nickname || _myProfile.username || 'Slayer',
    last_seen: new Date().toISOString(),
  };
  const row = { ...base, ...patch };
  try {
    await _supa.from('squad_presence').upsert(row, { onConflict: 'user_id' });
  } catch(e) { console.warn('presence update failed:', e); }
}

function startPresenceHeartbeat() {
  clearInterval(_presenceHeartbeat);
  _presenceHeartbeat = setInterval(() => {
    if (!tmr.running || tmr.paused) return;
    updatePresence({
      status: 'studying',
      session_elapsed_mins: Math.floor(tmr.elapsed / 60),
      current_subject: document.getElementById('curSubject')?.value || '',
      current_topic:   document.getElementById('curTopic')?.value   || '',
    });
  }, 60000); // every 60s
}

function stopPresenceHeartbeat() {
  clearInterval(_presenceHeartbeat);
  updatePresence({ status: 'resting', tree_stage: 0 });
}

/* ── elapsed display helper ── */
function fmtElapsed(startIso) {
  if (!startIso) return '';
  const secs = Math.floor((Date.now() - new Date(startIso)) / 1000);
  const m = Math.floor(secs / 60), s = secs % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

/* ═══════════════════════════════════════════════════════════
   LOAD MY SQUADS
═══════════════════════════════════════════════════════════════ */
async function loadMySquads() {
  if (!_currentUser) return;
  try {
    const { data, error } = await _supa
      .from('squad_members')
      .select('squad_id, role, is_primary, squads(id,name,description,avatar_emoji,member_count,is_public,join_code,max_members)')
      .eq('user_id', _currentUser.id);
    if (error) throw error;

    _mySquads = (data || []).map(r => ({
      ...r.squads, role: r.role, is_primary: r.is_primary
    }));
    _primarySquad = _mySquads.find(s => s.is_primary) || _mySquads[0] || null;

    renderSquadPage();
    if (_primarySquad) {
      await loadSquadMembers();
      await subscribeToSquad();
      startPresenceHeartbeat();
    }
  } catch(e) { console.warn('loadMySquads failed:', e); }
}

async function loadSquadMembers() {
  if (!_primarySquad) return;
  try {
    const { data } = await _supa
      .from('squad_members')
      .select('user_id, nickname, role')
      .eq('squad_id', _primarySquad.id);
    _squadMembers = data || [];

    // Load their presence
    const uids = _squadMembers.map(m => m.user_id);
    const { data: pdata } = await _supa
      .from('squad_presence')
      .select('*')
      .in('user_id', uids);

    _squadPresence = {};
    (pdata || []).forEach(p => { _squadPresence[p.user_id] = p; });

    renderLiveBoard();
    renderLeaderboard();
    renderSquadHeatmap();
  } catch(e) { console.warn('loadSquadMembers failed:', e); }
}

/* ── Realtime subscriptions ── */
async function subscribeToSquad() {
  if (!_primarySquad) return;

  // Unsubscribe previous
  if (_squadChannel)     { _supa.removeChannel(_squadChannel); }
  if (_squadChatChannel) { _supa.removeChannel(_squadChatChannel); }

  // Presence changes
  _squadChannel = _supa
    .channel('squad-presence-' + _primarySquad.id)
    .on('postgres_changes', {
      event: '*', schema: 'public', table: 'squad_presence',
      filter: `squad_id=eq.${_primarySquad.id}`
    }, payload => {
      const p = payload.new || payload.old;
      if (p) _squadPresence[p.user_id] = p;
      renderLiveBoard();
      renderLeaderboard();
    })
    .subscribe();

  // Squad chat
  _squadChatChannel = _supa
    .channel('squad-chat-' + _primarySquad.id)
    .on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'squad_messages',
      filter: `squad_id=eq.${_primarySquad.id}`
    }, payload => {
      appendSquadChatMsg(payload.new);
    })
    .subscribe();

  // Load recent chat
  loadSquadChatHistory();
}

/* ═══════════════════════════════════════════════════════════
   RENDER FUNCTIONS
═══════════════════════════════════════════════════════════════ */
function renderSquadPage() {
  const noSquad = document.getElementById('squadNoSquad');
  const main    = document.getElementById('squadMain');
  if (!_primarySquad) {
    if (noSquad) noSquad.style.display = '';
    if (main)    main.style.display = 'none';
    return;
  }
  if (noSquad) noSquad.style.display = 'none';
  if (main)    main.style.display = '';

  document.getElementById('squadAvatarBig').textContent = _primarySquad.avatar_emoji || '⚔';
  document.getElementById('squadNameBig').textContent   = _primarySquad.name;
  document.getElementById('squadDescMeta').textContent  = _primarySquad.description || '';
  const cap = _primarySquad.max_members ? ` / ${_primarySquad.max_members} max` : '';
  document.getElementById('squadMemberCount').textContent = (_primarySquad.member_count || _squadMembers.length) + ' members' + cap;
  // Show code button only for admins
  const myRole = _squadMembers.find(m=>m.user_id===_currentUser?.id)?.role;
  const codeBtn = document.getElementById('squadCodeBtn');
  if (codeBtn) codeBtn.style.display = (myRole==='admin') ? '' : 'none';

  // Secondary squads
  const secondary = _mySquads.filter(s => s.id !== _primarySquad?.id);
  const row = document.getElementById('secondarySquadsRow');
  const chips = document.getElementById('secondarySquadChips');
  if (secondary.length && row && chips) {
    row.style.display = '';
    chips.innerHTML = secondary.map(s =>
      `<span class="secondary-squad-chip" onclick="switchPrimarySquad('${s.id}')">
        <span class="chip-dot" style="background:var(--water)"></span>
        ${s.avatar_emoji} ${esc(s.name)}
      </span>`
    ).join('');
  }
}

/* ── Build sorted member list with status ── */
function _buildMemberList() {
  const now = Date.now();
  return _squadMembers.map(m => {
    const p = _squadPresence[m.user_id] || {};
    const lastSeen = p.last_seen ? new Date(p.last_seen).getTime() : 0;
    const isOffline = !lastSeen || (now - lastSeen) > 3 * 60 * 1000;
    const status = isOffline ? 'offline' : (p.status || 'offline');
    return { ...m, presence: p, status };
  }).sort((a, b) => {
    const order = { studying: 0, resting: 1, offline: 2 };
    return (order[a.status] ?? 2) - (order[b.status] ?? 2);
  });
}

/* ── FOREST RENDER ── */
function renderForest() {
  const el = document.getElementById('squadForest'); if (!el) return;
  const members = _buildMemberList();

  const liveCount = members.filter(m => m.status === 'studying').length;
  const liveEl = document.getElementById('squadLiveCount');
  if (liveEl) liveEl.textContent = liveCount + ' studying now';

  if (!members.length) {
    el.innerHTML = '<div class="empty"><div class="empty-icon">🌱</div>No members yet — invite your squad!</div>';
    return;
  }

  el.innerHTML = '<div class="forest-ground"></div>' + members.map(m => {
    const p = m.presence || {};
    const treeEmoji = getTreeEmoji(p.tree_stage || 0, m.status);
    const isMe = _currentUser && m.user_id === _currentUser.id;
    const elapsedStr = m.status === 'studying' && p.session_start ? fmtElapsed(p.session_start) : '';
    const subject = m.status === 'studying' ? (p.current_subject || 'Studying') : '';
    const slotClass = m.status + (p.tree_stage >= 5 ? ' bloomed' : '') + (p.tree_stage === 6 ? ' withered' : '');
    return `<div class="forest-tree-slot ${slotClass}" onclick="openMemberProfile('${m.user_id}')" title="${esc(m.nickname||'Slayer')}">
      <div class="forest-status-dot ${m.status}"></div>
      <div class="forest-tree-emoji">${treeEmoji}</div>
      <div class="forest-member-name">${esc(m.nickname||'Slayer')}${isMe?' (you)':''}</div>
      <div class="forest-member-subject">${esc(subject)}</div>
      <div class="forest-elapsed">${elapsedStr ? '🕐 '+elapsedStr : ''}</div>
    </div>`;
  }).join('');
}

/* ── MEMBER GRID (Members tab) ── */
function renderLiveBoard() {
  // Render forest (primary Live view)
  renderForest();
  // Also render member grid for Members tab
  const el = document.getElementById('memberGrid'); if (!el) return;
  const members = _buildMemberList();
  if (!members.length) {
    el.innerHTML = '<div class="empty" style="grid-column:1/-1"><div class="empty-icon">👥</div>No members yet.</div>';
    return;
  }
  const amIAdmin = _squadMembers.find(x=>x.user_id===_currentUser?.id)?.role==='admin';
  el.innerHTML = members.map(m => {
    const p = m.presence || {};
    const isMe = _currentUser && m.user_id === _currentUser.id;
    const initial = (m.nickname||'S').charAt(0).toUpperCase();
    const treeEmoji = getTreeEmoji(p.tree_stage||0, m.status);
    const elapsedStr = m.status==='studying' && p.session_start ? fmtElapsed(p.session_start) : '';
    const isAdmin = m.role==='admin';
    return `<div class="member-card ${m.status}" onclick="openMemberProfile('${m.user_id}')" style="cursor:pointer">
      <div class="member-avatar">
        ${initial}
        <div class="member-status-dot ${m.status}"></div>
      </div>
      <div class="member-info">
        <div class="member-name">${esc(m.nickname||'Slayer')}${isAdmin?'<span style="font-size:9px;color:var(--gold);margin-left:4px">★</span>':''} ${isMe?'<span style="font-size:9px;color:var(--text3)">(you)</span>':''}</div>
        <div class="member-detail">
          ${m.status==='studying'
            ? `<span class="member-subject">${esc(p.current_subject||'Studying')}</span>${p.current_topic?`<span>${esc(p.current_topic)}</span>`:''} ${elapsedStr?`<span class="member-elapsed">🕐 ${elapsedStr}</span>`:''}`
            : m.status==='resting'?'<span style="color:var(--gold)">Resting…</span>'
            : '<span>Offline</span>'
          }
        </div>
      </div>
      <div class="member-tree-mini">${treeEmoji}</div>
    </div>`;
  }).join('');
}

/* ── MEMBER PROFILE PANEL ── */
function openMemberProfile(userId) {
  const m = _squadMembers.find(x => x.user_id === userId); if (!m) return;
  const p = _squadPresence[userId] || {};
  const now = Date.now();
  const lastSeen = p.last_seen ? new Date(p.last_seen).getTime() : 0;
  const isOffline = !lastSeen || (now - lastSeen) > 3 * 60 * 1000;
  const status = isOffline ? 'offline' : (p.status || 'offline');
  const isMe = _currentUser && userId === _currentUser.id;
  const amIAdmin = _squadMembers.find(x=>x.user_id===_currentUser?.id)?.role==='admin';
  const isAdmin = m.role === 'admin';
  const treeEmoji = getTreeEmoji(p.tree_stage||0, status);
  const elapsedStr = status==='studying' && p.session_start ? fmtElapsed(p.session_start) : '';

  document.getElementById('mpAvatar').textContent = (m.nickname||'S').charAt(0).toUpperCase();
  document.getElementById('mpName').textContent = m.nickname || 'Slayer';
  document.getElementById('mpRole').textContent = (isAdmin ? '★ Admin' : 'Member') + (isMe ? ' · You' : '');
  const badge = document.getElementById('mpStatusBadge');
  badge.textContent = status.charAt(0).toUpperCase() + status.slice(1);
  badge.className = 'member-profile-status-badge ' + status;
  document.getElementById('mpTree').textContent = treeEmoji;
  document.getElementById('mpTreeLabel').textContent = status==='studying' ? 'Currently studying' : status==='resting' ? 'Resting…' : 'Offline';
  document.getElementById('mpSubject').textContent = status==='studying' ? (p.current_subject||'') : '';
  document.getElementById('mpTopic').textContent = status==='studying' ? (p.current_topic||'') : '';
  document.getElementById('mpElapsed').textContent = elapsedStr ? '🕐 ' + elapsedStr : '';
  document.getElementById('mpSessionMins').textContent = (p.session_elapsed_mins||0) + 'm';
  document.getElementById('mpTreeStage').textContent = treeEmoji;
  document.getElementById('mpStatus').textContent = status==='studying'?'🟢 Active':status==='resting'?'🟡 Rest':'⚫ Away';
  document.getElementById('mpUserId').value = userId;
  document.getElementById('mpUserNick').value = m.nickname || 'Slayer';
  // Admin controls
  const adminDiv = document.getElementById('mpAdminControls');
  if (amIAdmin && !isMe) {
    adminDiv.style.display = '';
    document.getElementById('mpPromoteBtn').style.display = isAdmin ? 'none' : '';
  } else {
    adminDiv.style.display = 'none';
  }
  document.getElementById('memberProfileOverlay').classList.add('active');
}

function closeMemberProfile(e) {
  if (e && e.target !== document.getElementById('memberProfileOverlay')) return;
  document.getElementById('memberProfileOverlay').classList.remove('active');
}

function kickFromProfile() {
  const id = document.getElementById('mpUserId').value;
  const nick = document.getElementById('mpUserNick').value;
  closeMemberProfile();
  openKickModal(id, nick);
}

function promoteFromProfile() {
  const id = document.getElementById('mpUserId').value;
  const nick = document.getElementById('mpUserNick').value;
  document.getElementById('memberProfileOverlay').classList.remove('active');
  promoteToAdmin(id, nick);
}

function getTreeEmoji(stage, status) {
  if (status === 'offline') return '○';
  const emojis = ['🌱','🌿','🌲','🌳','🌸','🥀'];
  return emojis[Math.min(stage, emojis.length - 1)] || '🌱';
}

async function renderLeaderboard() {
  const el = document.getElementById('squadLeaderboard'); if (!el) return;

  // Fetch this week's sessions for all squad members
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekStr = weekStart.toISOString().split('T')[0];

  const uids = _squadMembers.map(m => m.user_id);
  if (!uids.length) { el.innerHTML = '<div class="empty">No members yet.</div>'; return; }

  try {
    // We store aggregate data per-user in user_data → we'll fetch from squad_sessions if available,
    // or fall back to presence data for "this session"
    // For now: show presence-based real-time data + stored weekly totals
    const rows = _squadMembers.map(m => {
      const p = _squadPresence[m.user_id] || {};
      return {
        user_id:  m.user_id,
        nickname: m.nickname || 'Slayer',
        mins:     (p.session_elapsed_mins || 0), // real-time this session
        status:   p.status || 'offline',
      };
    }).sort((a, b) => b.mins - a.mins);

    const maxMins = Math.max(...rows.map(r => r.mins), 1);
    const rankIcons = ['🥇','🥈','🥉'];

    el.innerHTML = rows.map((r, i) => {
      const pct = Math.round(r.mins / maxMins * 100);
      const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
      return `<div class="leaderboard-row">
        <div class="leaderboard-rank ${rankClass}">${rankIcons[i] || (i + 1)}</div>
        <div class="leaderboard-name">${esc(r.nickname)}</div>
        <div class="leaderboard-bar-wrap">
          <div class="leaderboard-bar-fill" style="width:${pct}%"></div>
        </div>
        <div class="leaderboard-mins">${r.mins}m</div>
      </div>`;
    }).join('') || '<div class="empty">No data yet — start a session!</div>';
  } catch(e) {
    el.innerHTML = '<div class="empty">Could not load leaderboard.</div>';
  }
}

function renderSquadHeatmap() {
  const el = document.getElementById('squadHeatmapWeek'); if (!el) return;
  const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());

  // Aggregate presence data we have (limited — full impl needs squad_sessions table)
  // For MVP, show today's live data
  const todayMins = Object.values(_squadPresence)
    .reduce((a, p) => a + (p.session_elapsed_mins || 0), 0);

  let html = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    const ds = d.toISOString().split('T')[0];
    const isToday = ds === todayStr;
    const mins = isToday ? todayMins : 0; // extend with DB query for full history
    const maxMins = 300;
    const pct = Math.min(100, Math.round(mins / maxMins * 100));

    html += `<div class="squad-hm-day${isToday ? ' today' : ''}">
      <div class="squad-hm-label">${DAYS[d.getDay()]}</div>
      <div class="squad-hm-bar-wrap">
        <div class="squad-hm-bar-fill" style="height:${pct}%"></div>
      </div>
      <div class="squad-hm-mins">${mins ? fmtMins(mins) : '—'}</div>
    </div>`;
  }
  el.innerHTML = html;

  // All-time stats (from presence — minimal but live)
  const totalMins = Object.values(_squadPresence).reduce((a,p)=>(a + (p.session_elapsed_mins||0)),0);
  sEl('squadTotalHrs', fmtMinsShort(totalMins));
  sEl('squadTodayHrs', fmtMins(todayMins));
  sEl('squadSessionCount', Object.values(_squadPresence).filter(p=>p.status==='studying').length.toString());
}

/* ═══════════════════════════════════════════════════════════
   SQUAD CHAT
═══════════════════════════════════════════════════════════════ */
async function loadSquadChatHistory() {
  if (!_primarySquad) return;
  const { data } = await _supa
    .from('squad_messages')
    .select('*')
    .eq('squad_id', _primarySquad.id)
    .order('id', { ascending: true })
    .limit(60);
  const el = document.getElementById('squadChatMessages');
  if (!el) return;
  el.innerHTML = '<div class="chat-system-msg">⚔ Squad chat — train together, grow stronger.</div>';
  _squadChatLastDate = null;
  (data || []).forEach(m => appendSquadChatMsg(m, false));
  el.scrollTop = el.scrollHeight;
}

function appendSquadChatMsg(msg, scroll = true) {
  const el = document.getElementById('squadChatMessages'); if (!el) return;
  const isOwn = _currentUser && msg.user_id === _currentUser.id;
  const msgDate = new Date(msg.created_at).toDateString();
  if (msgDate !== _squadChatLastDate) {
    _squadChatLastDate = msgDate;
    const div = document.createElement('div');
    div.className = 'chat-date-divider';
    div.textContent = '— ' + fmtChatDate(msg.created_at) + ' —';
    el.appendChild(div);
  }
  const wrap = document.createElement('div');
  wrap.className = 'chat-msg' + (isOwn ? ' own' : '');
  const delBtn = isOwn
    ? `<button class="chat-del-btn" onclick="deleteSquadMsg(${msg.id},this)">🗑</button>`
    : '';
  wrap.innerHTML = `
    <div class="chat-msg-meta">
      <span class="chat-msg-name">${esc(msg.display_name || 'Slayer')}</span>
      <span class="chat-msg-time">${fmtChatTime(msg.created_at)}</span>
      ${delBtn}
    </div>
    <div class="chat-bubble-text">${esc(msg.message)}</div>`;
  el.appendChild(wrap);
  if (scroll) el.scrollTop = el.scrollHeight;
}

async function sendSquadMsg() {
  if (!_currentUser || !_primarySquad) return;
  const inp = document.getElementById('squadChatInput');
  const text = inp?.value.trim(); if (!text) return;
  inp.value = '';
  await _supa.from('squad_messages').insert({
    squad_id:     _primarySquad.id,
    user_id:      _currentUser.id,
    display_name: _myProfile.nickname || _myProfile.username || 'Slayer',
    message:      text,
  });
}

async function deleteSquadMsg(id, btn) {
  const wrap = btn.closest('.chat-msg');
  wrap.style.opacity = '.4';
  const { error } = await _supa.from('squad_messages')
    .delete().eq('id', id).eq('user_id', _currentUser.id);
  if (error) { wrap.style.opacity = ''; }
  else wrap.remove();
}

/* ═══════════════════════════════════════════════════════════
   CREATE / JOIN / LEAVE
═══════════════════════════════════════════════════════════════ */
let _squadModalMode = 'create';

function openSquadModal(mode = 'create') {
  _squadModalMode = mode;
  document.getElementById('sq_name').value = '';
  document.getElementById('sq_desc').value = '';
  const maxEl = document.getElementById('sq_maxmembers');
  if (maxEl) maxEl.value = '10';
  const pubEl = document.getElementById('sq_priv_public');
  if (pubEl) pubEl.checked = true;
  _pickedSquadEmoji = '⚔';
  document.querySelectorAll('#squadEmojiPicker .color-swatch').forEach((el, i) => el.classList.toggle('sel', i === 0));
  openModal('squadModal');
}

function pickSquadEmoji(emoji, el) {
  _pickedSquadEmoji = emoji;
  document.querySelectorAll('#squadEmojiPicker .color-swatch').forEach(e => e.classList.remove('sel'));
  el.classList.add('sel');
}

/* ── Generate random 6-char join code ── */
function genJoinCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous I,O,0,1
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

async function createSquad() {
  if (!_currentUser) { notify('Sign in to create a squad!', 'info'); return; }
  const name     = document.getElementById('sq_name').value.trim();
  const desc     = document.getElementById('sq_desc').value.trim();
  const maxM     = parseInt(document.getElementById('sq_maxmembers').value) || 10;
  const isPublic = document.getElementById('sq_priv_public').checked;
  if (!name) { notify('Give your squad a name!', 'info'); return; }

  const joinCode = genJoinCode();

  try {
    // Try with new columns first, fall back if columns don't exist yet
    let squad, sqErr;
    ({ data: squad, error: sqErr } = await _supa.from('squads').insert({
      name, description: desc, avatar_emoji: _pickedSquadEmoji,
      created_by: _currentUser.id,
      is_public: isPublic,
      join_code: joinCode,
      max_members: maxM,
    }).select().single());
    if (sqErr && sqErr.message && sqErr.message.includes('column')) {
      // Columns don't exist yet - insert without them
      console.warn('New columns not found, run the SQL migration. Inserting without.');
      ({ data: squad, error: sqErr } = await _supa.from('squads').insert({
        name, description: desc, avatar_emoji: _pickedSquadEmoji,
        created_by: _currentUser.id, is_public: isPublic,
      }).select().single());
    }
    if (sqErr) { console.error('createSquad error:', sqErr); throw sqErr; }

    await _supa.from('squad_members').update({ is_primary: false }).eq('user_id', _currentUser.id);
    await _supa.from('squad_members').insert({
      squad_id: squad.id, user_id: _currentUser.id,
      nickname: _myProfile.nickname || 'Slayer',
      role: 'admin', is_primary: true,
    });

    closeModal('squadModal');
    // Show code immediately
    _pendingCodeDisplay = joinCode;
    notify(`⚔ Squad "${name}" created!`, 'success');
    await loadMySquads();
    // Show code modal after squad loads
    setTimeout(() => showSquadCode(), 600);
  } catch(e) {
    notify('Error: ' + (e.message || 'Could not create squad'), 'info');
  }
}

let _pendingCodeDisplay = null;

async function showSquadCode() {
  if (!_primarySquad) return;
  // Only admins can see/copy the code
  const myMembership = _squadMembers.find(m => m.user_id === _currentUser?.id);
  if (!myMembership || myMembership.role !== 'admin') {
    notify('Only squad admins can view the join code.', 'info'); return;
  }
  // Fetch fresh code from DB
  const { data } = await _supa.from('squads').select('join_code').eq('id', _primarySquad.id).single();
  const code = _pendingCodeDisplay || data?.join_code || '??????';
  _pendingCodeDisplay = null;
  document.getElementById('squadCodeDisplay').textContent = code;
  openModal('squadCodeModal');
}

async function copySquadCode() {
  const code = document.getElementById('squadCodeDisplay').textContent;
  try {
    await navigator.clipboard.writeText(code);
    notify('✓ Code copied! Share it with your squad.', 'success');
  } catch(e) {
    // fallback
    notify('Code: ' + code, 'info');
  }
}

async function regenerateCode() {
  if (!_primarySquad) return;
  if (!confirm('Generate a new join code? The old one will stop working.')) return;
  const newCode = genJoinCode();
  await _supa.from('squads').update({ join_code: newCode }).eq('id', _primarySquad.id);
  document.getElementById('squadCodeDisplay').textContent = newCode;
  notify('🔄 New code generated!', 'success');
}

async function joinByCode() {
  if (!_currentUser) { notify('Sign in first!', 'info'); return; }
  const code = document.getElementById('joinCodeInput').value.trim().toUpperCase();
  const errEl = document.getElementById('joinCodeError');
  const btn   = document.getElementById('joinCodeBtn');
  errEl.style.display = 'none';
  if (code.length !== 6) { errEl.textContent = 'Code must be 6 characters.'; errEl.style.display = ''; return; }

  btn.textContent = 'Checking…'; btn.disabled = true;
  try {
    const { data: squad, error } = await _supa.from('squads')
      .select('id,name,avatar_emoji,member_count,max_members,is_public')
      .eq('join_code', code).maybeSingle();

    if (error) throw error;
    if (!squad) { errEl.textContent = 'Invalid code — double-check and try again.'; errEl.style.display = ''; btn.textContent = 'Join Squad ⚔'; btn.disabled = false; return; }

    // Check member cap
    const cap = squad.max_members || 50;
    if ((squad.member_count || 0) >= cap) {
      errEl.textContent = 'This squad is full (' + cap + ' members max).'; errEl.style.display = ''; btn.textContent = 'Join Squad ⚔'; btn.disabled = false; return;
    }

    // Check already member
    const already = _mySquads.find(s => s.id === squad.id);
    if (already) {
      closeModal('joinCodeModal');
      await switchPrimarySquad(squad.id);
      notify('Already in this squad — switched to primary!', 'info');
      return;
    }

    await joinSquad(squad.id);
    closeModal('joinCodeModal');
  } catch(e) {
    errEl.textContent = e.message || 'Something went wrong. Try again.';
    errEl.style.display = '';
  }
  btn.textContent = 'Join Squad ⚔'; btn.disabled = false;
}

async function joinSquad(squadId) {
  if (!_currentUser) { notify('Sign in to join a squad!', 'info'); return; }
  const already = _mySquads.find(s => s.id === squadId);
  if (already) { await switchPrimarySquad(squadId); closeModal('squadBrowseModal'); return; }
  try {
    const hasPrimary = _mySquads.some(s => s.is_primary);
    await _supa.from('squad_members').insert({
      squad_id: squadId, user_id: _currentUser.id,
      nickname: _myProfile.nickname || 'Slayer',
      role: 'member', is_primary: !hasPrimary,
    });
    // Bump member_count
    await _supa.rpc('increment_squad_member_count', { squad_id: squadId }).catch(()=>{});
    closeModal('squadBrowseModal');
    notify('⚔ Joined squad! Welcome to the Corps.', 'success');
    await loadMySquads();
  } catch(e) {
    notify('Error joining: ' + (e.message || 'Try again'), 'info');
  }
}

async function switchPrimarySquad(squadId) {
  if (!_currentUser) return;
  await _supa.from('squad_members').update({ is_primary: false }).eq('user_id', _currentUser.id);
  await _supa.from('squad_members').update({ is_primary: true })
    .eq('user_id', _currentUser.id).eq('squad_id', squadId);
  await loadMySquads();
  notify('Switched primary squad!', 'info');
}

function openKickModal(userId, nickname) {
  document.getElementById('kickTargetId').value = userId;
  document.getElementById('kickTargetName').textContent = nickname;
  openModal('kickModal');
}

async function confirmKick() {
  const userId = document.getElementById('kickTargetId').value;
  if (!userId || !_primarySquad) return;
  try {
    await _supa.from('squad_members')
      .delete().eq('squad_id', _primarySquad.id).eq('user_id', userId);
    await _supa.from('squad_presence')
      .update({ status: 'offline', squad_id: null }).eq('user_id', userId);
    // Decrement member count
    await _supa.rpc('decrement_squad_member_count', { squad_id: _primarySquad.id }).catch(()=>{});
    closeModal('kickModal');
    notify('Member removed from squad.', 'info');
    await loadSquadMembers();
  } catch(e) {
    notify('Error removing member: ' + (e.message || 'Try again'), 'info');
  }
}

async function promoteToAdmin(userId, nickname) {
  if (!_primarySquad) return;
  if (!confirm(`Promote ${nickname} to admin? They will be able to remove members and see the join code.`)) return;
  try {
    await _supa.from('squad_members')
      .update({ role: 'admin' }).eq('squad_id', _primarySquad.id).eq('user_id', userId);
    notify(`★ ${nickname} is now an admin!`, 'success');
    await loadSquadMembers();
  } catch(e) {
    notify('Error promoting: ' + e.message, 'info');
  }
}

async function leaveSquad() {
  if (!_primarySquad || !_currentUser) return;
  if (!confirm(`Leave "${_primarySquad.name}"? You can rejoin anytime.`)) return;
  await _supa.from('squad_members')
    .delete().eq('squad_id', _primarySquad.id).eq('user_id', _currentUser.id);
  await updatePresence({ status: 'offline', tree_stage: 0 });
  _primarySquad = null;
  _squadMembers = [];
  _squadPresence = {};
  if (_squadChannel)     _supa.removeChannel(_squadChannel);
  if (_squadChatChannel) _supa.removeChannel(_squadChatChannel);
  stopPresenceHeartbeat();
  notify('Left squad. You can rejoin or create a new one.', 'info');
  await loadMySquads();
}

/* ═══════════════════════════════════════════════════════════
   BROWSE SQUADS
═══════════════════════════════════════════════════════════════ */
let _browseResults = [];

async function openSquadBrowse() {
  openModal('squadBrowseModal');
  document.getElementById('squadSearchInput').value = '';
  await searchSquads('');
}

async function searchSquads(query) {
  const el = document.getElementById('squadBrowseList'); if (!el) return;
  el.innerHTML = '<div class="empty">Searching…</div>';
  try {
    let q = _supa.from('squads').select('*').eq('is_public', true).limit(20);
    if (query.trim()) q = q.ilike('name', `%${query.trim()}%`);
    const { data } = await q;
    _browseResults = data || [];
    renderBrowseList();
  } catch(e) {
    el.innerHTML = '<div class="empty">Could not load squads.</div>';
  }
}

function renderBrowseList() {
  const el = document.getElementById('squadBrowseList'); if (!el) return;
  if (!_browseResults.length) {
    el.innerHTML = '<div class="empty"><div class="empty-icon">🔍</div>No squads found.</div>';
    return;
  }
  el.innerHTML = _browseResults.map(s => {
    const isMember = _mySquads.some(m => m.id === s.id);
    const isPrimary = _primarySquad?.id === s.id;
    return `<div class="squad-browse-card">
      <div class="squad-browse-emoji">${s.avatar_emoji || '⚔'}</div>
      <div style="flex:1;min-width:0">
        <div class="squad-browse-name">${esc(s.name)}</div>
        <div class="squad-browse-desc">${esc(s.description || 'No description')}</div>
        <div class="squad-browse-stats">
          <span>👥 ${s.member_count || '?'} members</span>
        </div>
      </div>
      <div class="squad-browse-join">
        ${isPrimary
          ? `<span style="font-family:var(--font-mono);font-size:10px;color:var(--green)">✓ Primary</span>`
          : isMember
            ? `<button class="btn btn-secondary btn-sm" onclick="switchPrimarySquad('${s.id}');closeModal('squadBrowseModal')">Switch</button>`
            : `<button class="btn btn-primary btn-sm" onclick="joinSquad('${s.id}')">Join ⚔</button>`
        }
      </div>
    </div>`;
  }).join('');
}

/* ═══════════════════════════════════════════════════════════
   SQUAD TAB SWITCHING
═══════════════════════════════════════════════════════════════ */
function switchSquadTab(tab, btn) {
  document.querySelectorAll('.squad-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.squad-panel').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const panel = document.getElementById('squadPanel' + tab.charAt(0).toUpperCase() + tab.slice(1));
  if (panel) panel.classList.add('active');
  if (tab === 'forest')      { renderForest(); }
  if (tab === 'members')     { renderLiveBoard(); }
  if (tab === 'leaderboard') renderLeaderboard();
  if (tab === 'heatmap')     renderSquadHeatmap();
  if (tab === 'chat') {
    setTimeout(() => {
      const el = document.getElementById('squadChatMessages');
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
  }
}

/* ═══════════════════════════════════════════════════════════
   SETTINGS TOGGLES INJECTION
   Adds wither toggle to the settings page
═══════════════════════════════════════════════════════════════ */
function injectSettingsToggles() {
  const settingsCard = document.querySelector('#page-settings .card:first-child');
  if (!settingsCard || document.getElementById('witherToggleRow')) return;
  settingsCard.insertAdjacentHTML('beforeend', `
    <div style="margin-top:16px">
      <div class="card-title">🌿 Focus Integrity</div>
      <div class="toggle-row" id="witherToggleRow">
        <div>
          <div class="toggle-label">Wither tree on tab switch</div>
          <div class="toggle-sub">Tree wilts after ${TAB_GRACE_SECS}s if you leave the app</div>
        </div>
        <div class="toggle-switch${_witherEnabled ? ' on' : ''}" id="witherToggle" onclick="toggleWitherSetting()"></div>
      </div>
    </div>
  `);
}

/* ═══════════════════════════════════════════════════════════
   HOOKS INTO EXISTING TIMER FUNCTIONS
   These 3 calls need to be added to your existing code:
   1. In toggleTimer() when starting: call onTimerStart()
   2. In tick():                      call updateTree(tmr.elapsed)
   3. In stopTimer() / resetTimer():  call onTimerStop()
   4. In phaseComplete() on 'focus':  call bloomTree()
═══════════════════════════════════════════════════════════════ */
function onTimerStart() {
  resetTree();
  renderTree(TREE_STAGES[0]);
  updatePresence({
    status:          'studying',
    current_subject: document.getElementById('curSubject')?.value || '',
    current_topic:   document.getElementById('curTopic')?.value   || '',
    session_start:   new Date().toISOString(),
    tree_stage:      1,
  });
}

function onTimerStop() {
  stopPresenceHeartbeat();
  startPresenceHeartbeat(); // restart heartbeat (will now send 'resting')
  updatePresence({ status: 'resting', tree_stage: 0 });
}

/* ═══════════════════════════════════════════════════════════
   PAGE_TITLES extension
═══════════════════════════════════════════════════════════════ */
// Add this to PAGE_TITLES in your init:
// PAGE_TITLES.squads = 'Squad';

/* ═══════════════════════════════════════════════════════════
   INIT SQUADS (called after auth / onUserLoggedIn)
═══════════════════════════════════════════════════════════════ */
async function initSquads() {
  _witherEnabled = localStorage.getItem('nerdbi_wither') === '1';
  injectTreeIntoTimer();
  initTabVisibility();
  injectSettingsToggles();
  if (_currentUser) await loadMySquads();
}

/* ── Auto-refresh live board every 30s ── */
setInterval(() => {
  if (_primarySquad && document.getElementById('squadPanelMembers')?.classList.contains('active')) {
    renderLiveBoard();
  }
}, 30000);



init();

// API key is handled server-side via Cloudflare Worker — never exposed to the browser
const GEMINI_URL = 'https://gemini-nrdbi.ostanmoy.workers.dev/gemini';

/* ── SESSION STATE (memory only, cleared on end) ── */
let _sc = {
  active:false, subject:'', topic:'',
  material:null,  // {type,content,mimeType,fileName,pages}
  qCount:0
};

/* ── Q MODE CONFIGS ── */
const SCROLL_Q_MODES = {
  doubt:   { hint:'Ask a doubt about your uploaded material or notes', prefix:'Answer this doubt. Use the reference material if provided. Be clear and accurate.' },
  explain: { hint:'Ask to explain any concept from your material', prefix:'Explain this concept clearly, like teaching a student. Use simple language. Give a good analogy if helpful.' },
  example: { hint:'Ask for real-world or exam examples of something', prefix:'Give clear, practical examples of this. Include real-world applications and exam-style examples.' },
  compare: { hint:'e.g. "Compare alkenes vs alkanes"', prefix:'Compare and contrast these two things. Use a clear structure. Highlight key similarities and differences.' },
  quiz:    { hint:'Ask to be quizzed on your material or a topic', prefix:'Generate 3-5 quiz questions about this topic based on the material. After each question, give the answer on the next line prefixed with "Answer:"' },
  summary: { hint:'Summarise a section or the whole material', prefix:'Provide a concise, well-structured summary. Use bullet points for key facts. Highlight the most important concepts.' }
};

const GENERAL_Q_MODES = {
  free:      { hint:'Ask anything freely — any subject, any topic', prefix:'You are a knowledgeable study assistant. Answer clearly and helpfully.' },
  explain:   { hint:'e.g. "Explain photosynthesis simply"', prefix:'Explain this concept very simply, as if to a student who has never heard of it. Use an analogy. Be concise.' },
  diff:      { hint:'e.g. "Difference between mitosis and meiosis"', prefix:'Explain the key differences between these two things. Use a structured comparison.' },
  example:   { hint:'e.g. "Real world examples of Newton\'s third law"', prefix:'Give clear real-world examples that are easy to remember. Make them vivid and relatable.' },
  steps:     { hint:'e.g. "Step by step — how to balance chemical equations"', prefix:'Explain this step by step, numbered clearly. Each step should be simple and actionable.' },
  mnemonic:  { hint:'e.g. "Mnemonic for the planets"', prefix:'Create a memorable mnemonic, acronym, or memory trick for this. Explain what each part stands for.' }
};

let _roughAttach = null; // {type, content, mimeType, fileName}

/* ── ROUGH NOTES ATTACHMENT ── */
async function handleRoughFile(file) {
  if (!file) return;
  const isPDF = file.type === 'application/pdf';
  const isImage = file.type.startsWith('image/');
  if (!isPDF && !isImage) { notify('Only image or PDF files.','info'); return; }
  document.getElementById('roughAttachNone').style.display = 'none';
  document.getElementById('roughAttachLoaded').style.display = 'flex';
  document.getElementById('roughAttachIcon').textContent = isPDF ? '📄' : '🖼';
  document.getElementById('roughAttachName').textContent = file.name;
  document.getElementById('roughAttachMeta').textContent = 'Processing…';
  try {
    if (isImage) {
      const b64 = await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=rej;r.readAsDataURL(file);});
      _roughAttach = { type:'image', content:b64, mimeType:file.type, fileName:file.name };
      document.getElementById('roughAttachMeta').textContent = `Image · ${Math.round(file.size/1024)}KB · ready`;
      notify('📎 Image attached to rough notes','success');
    } else {
      if (!window.pdfjsLib) {
        await new Promise((res,rej)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';s.onload=res;s.onerror=rej;document.head.appendChild(s);});
        pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }
      const buf = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({data:buf}).promise;
      const total = pdf.numPages;
      const maxPg = Math.min(total, 10);
      // Try text first
      let text = '';
      for (let i = 1; i <= maxPg; i++) {
        const pg = await pdf.getPage(i);
        const ct = await pg.getTextContent();
        text += ct.items.map(x=>x.str).join(' ') + '\n\n';
      }
      if (text.trim().length >= 80) {
        _roughAttach = { type:'pdf-text', content:text, fileName:file.name, pages:total };
        document.getElementById('roughAttachMeta').textContent = `PDF · ${Math.min(total,10)}${total>10?' of '+total:''} pages · text extracted`;
      } else {
        // Scanned — convert to images
        const imgs = [];
        for (let i = 1; i <= maxPg; i++) {
          document.getElementById('roughAttachMeta').textContent = `Converting page ${i}/${maxPg}…`;
          const pg = await pdf.getPage(i);
          const vp = pg.getViewport({scale:1.0});
          const cv = document.createElement('canvas');
          cv.width=vp.width; cv.height=vp.height;
          await pg.render({canvasContext:cv.getContext('2d'),viewport:vp}).promise;
          imgs.push({b64:cv.toDataURL('image/jpeg',0.7).split(',')[1], mime:'image/jpeg'});
        }
        _roughAttach = { type:'pdf-images', content:imgs, fileName:file.name, pages:total };
        document.getElementById('roughAttachMeta').textContent = `Scanned PDF · ${maxPg}${total>maxPg?' of '+total:''} pages · visual mode`;
      }
      notify(`📎 PDF attached — ${Math.min(total,10)} pages ready`,'success');
    }
  } catch(err) {
    notify('Could not read file: '+err.message,'info');
    clearRoughAttach();
  }
}

function clearRoughAttach() {
  _roughAttach = null;
  document.getElementById('roughAttachNone').style.display = 'flex';
  document.getElementById('roughAttachLoaded').style.display = 'none';
  document.getElementById('roughFileInput').value = '';
}

function buildRoughAttachParts() {
  const a = _roughAttach; if (!a) return [];
  if (a.type === 'image') return [{ inline_data:{ mime_type:a.mimeType, data:a.content } }];
  if (a.type === 'pdf-text') return [{ text:`Attached rough notes (${a.fileName}):\n\n${a.content.slice(0,40000)}` }];
  if (a.type === 'pdf-images') return a.content.map(img => ({ inline_data:{ mime_type:img.mime, data:img.b64 } }));
  return [];
}

let _currentScrollQMode = 'doubt';
let _currentGeneralQMode = 'free';
let _viewedScrollNote = null; // for PDF download from saved viewer

/* ── INIT ── */
function initScrollPage() {
  const subjects = pd().subjects || [];

  // Populate subject selects
  ['scroll_subject','generalQSubject','scrollFilterSubject'].forEach(id => {
    const el = document.getElementById(id); if (!el) return;
    const isFilter = id === 'scrollFilterSubject';
    el.innerHTML = isFilter ? '<option value="">All subjects</option>' : (id === 'generalQSubject' ? '<option value="">No subject context</option>' : '<option value="">— Select —</option>');
    subjects.forEach(s => el.innerHTML += `<option value="${esc(s.name)}">${esc(s.name)}</option>`);
  });

  renderScrollSavedNotes();
  if (_sc.active) restoreScrollSessionUI();
}

/* ── TAB SWITCHING ── */
function switchScrollTab(tab) {
  ['session','general','saved'].forEach(t => {
    document.getElementById('scroll-tab-'+t).style.display = t===tab ? '' : 'none';
    document.getElementById('stab-'+t).classList.toggle('active', t===tab);
  });
  if (tab === 'saved') renderScrollSavedNotes();
}

/* ── Q MODE SWITCHING ── */
function setScrollQMode(mode) {
  _currentScrollQMode = mode;
  document.querySelectorAll('[id^="sqmode-"]').forEach(b => b.classList.remove('active'));
  document.getElementById('sqmode-'+mode)?.classList.add('active');
  document.getElementById('scrollQModeHint').textContent = SCROLL_Q_MODES[mode]?.hint || '';
}

function setGeneralQMode(mode) {
  _currentGeneralQMode = mode;
  document.querySelectorAll('[id^="gqmode-"]').forEach(b => b.classList.remove('active'));
  document.getElementById('gqmode-'+mode)?.classList.add('active');
  document.getElementById('generalQModeHint').textContent = GENERAL_Q_MODES[mode]?.hint || '';
}

/* ── SESSION LIFECYCLE ── */
function beginScrollSession() {
  const subject = document.getElementById('scroll_subject').value;
  const topic = document.getElementById('scroll_topic').value.trim();
  if (!subject) { notify('Pick a subject first.','info'); return; }
  _sc = { active:true, subject, topic, material:null, qCount:0 };
  restoreScrollSessionUI();
  notify(`🐦 Session started — ${subject}${topic?' · '+topic:''}`, 'success');
}

function restoreScrollSessionUI() {
  document.getElementById('scrollSetupCard').style.display = 'none';
  document.getElementById('scrollActiveUI').style.display = '';
  document.getElementById('scrollSessionBadge').style.display = '';
  document.getElementById('scrollEndBtn').style.display = '';
  document.getElementById('scrollInfoSubject').textContent = _sc.subject;
  document.getElementById('scrollInfoTopic').textContent = _sc.topic || '—';
  updateScrollMaterialInfo();
  updateScrollQCount();
}

function endScrollSession() {
  if (!confirm('End session? Uploaded material will be cleared. Saved notes stay.')) return;
  _sc = { active:false, subject:'', topic:'', material:null, qCount:0 };
  document.getElementById('scrollSetupCard').style.display = '';
  document.getElementById('scrollActiveUI').style.display = 'none';
  document.getElementById('scrollSessionBadge').style.display = 'none';
  document.getElementById('scrollEndBtn').style.display = 'none';
  document.getElementById('scrollOutputCard').style.display = 'none';
  document.getElementById('scrollExtrasCard').style.display = 'none';
  document.getElementById('scrollSessionQHistory').innerHTML = '';
  document.getElementById('scrollRoughNotes').value = '';
  clearRoughAttach();
  document.getElementById('scrollFileInput').value = '';
  resetScrollMaterialUI();
  notify('Session ended. Scrolls saved. ⚔','info');
}

function updateScrollMaterialInfo() {
  const m = _sc.material;
  document.getElementById('scrollInfoMaterial').textContent = m ? `${m.fileName} (${m.type})` : 'None loaded';
}
function updateScrollQCount() {
  const el = document.getElementById('scrollInfoQCount');
  if (el) el.textContent = _sc.qCount;
}

/* ── FILE HANDLING ── */
function handleScrollDrop(e) {
  e.preventDefault();
  document.getElementById('scrollDropZone').style.borderColor = 'var(--border)';
  const f = e.dataTransfer.files[0]; if (f) handleScrollFile(f);
}

async function handleScrollFile(file) {
  if (!file) return;
  const isPDF = file.type === 'application/pdf';
  const isImage = file.type.startsWith('image/');
  if (!isPDF && !isImage) { notify('Only PDF or image files.','info'); return; }

  document.getElementById('scrollUploadZone').style.display = 'none';
  document.getElementById('scrollMaterialLoaded').style.display = '';
  document.getElementById('scrollMaterialIcon').textContent = isPDF ? '📄' : '📷';
  document.getElementById('scrollMaterialName').textContent = file.name;
  document.getElementById('scrollMaterialMeta').textContent = 'Processing…';
  document.getElementById('scrollProcessingBar').style.display = '';

  try {
    if (isPDF) await loadScrollPDF(file);
    else await loadScrollImage(file);
    updateScrollMaterialInfo();
  } catch(err) {
    notify('Could not read file: '+err.message,'info');
    clearScrollMaterial();
  }
}

async function loadScrollPDF(file) {
  if (!window.pdfjsLib) {
    await new Promise((res,rej) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      s.onload = res; s.onerror = rej; document.head.appendChild(s);
    });
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({data:buf}).promise;
  const total = pdf.numPages;
  let text = '';
  for (let i = 1; i <= total; i++) {
    document.getElementById('scrollProcessingLabel').textContent = `🐦 Reading page ${i}/${total}…`;
    const pg = await pdf.getPage(i);
    const ct = await pg.getTextContent();
    text += ct.items.map(x=>x.str).join(' ') + '\n\n';
  }
  if (text.trim().length < 80) {
    document.getElementById('scrollProcessingLabel').textContent = '🐦 Scanned PDF — converting to images…';
    await loadScrollPDFAsImages(file, pdf, total);
    return;
  }
  _sc.material = { type:'pdf', content:text, fileName:file.name, pages:total };
  document.getElementById('scrollMaterialMeta').textContent = `${total} pages · text extracted · ready`;
  document.getElementById('scrollProcessingBar').style.display = 'none';
  notify(`📄 ${file.name} — ${total} pages ready`,'success');
}

async function loadScrollPDFAsImages(file, pdf, total) {
  const maxPg = Math.min(total, 40);
  const scale = total > 20 ? 1.0 : 1.2;
  const quality = total > 20 ? 0.65 : 0.75;
  const imgs = [];
  for (let i = 1; i <= maxPg; i++) {
    document.getElementById('scrollProcessingLabel').textContent = `🐦 Converting page ${i}/${maxPg}…`;
    const pg = await pdf.getPage(i);
    const vp = pg.getViewport({scale});
    const cv = document.createElement('canvas');
    cv.width=vp.width; cv.height=vp.height;
    await pg.render({canvasContext:cv.getContext('2d'),viewport:vp}).promise;
    imgs.push(cv.toDataURL('image/jpeg',quality).split(',')[1]);
  }
  _sc.material = { type:'pdf-images', content:imgs, fileName:file.name, pages:total };
  const note = total>maxPg ? ` (first ${maxPg} of ${total} pages)` : ` (all ${total} pages)`;
  document.getElementById('scrollMaterialMeta').textContent = `Scanned PDF · visual mode${note} · ready`;
  document.getElementById('scrollProcessingBar').style.display = 'none';
  notify(`📄 Scanned PDF loaded — ${maxPg} pages ready 🐦`,'success');
}

async function loadScrollImage(file) {
  const b64 = await new Promise((res,rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result.split(',')[1]);
    r.onerror = rej; r.readAsDataURL(file);
  });
  _sc.material = { type:'image', content:b64, mimeType:file.type, fileName:file.name, pages:null };
  document.getElementById('scrollMaterialMeta').textContent = `Image · ${Math.round(file.size/1024)}KB · ready`;
  document.getElementById('scrollProcessingBar').style.display = 'none';
  notify(`📷 Image loaded — crow can see it`,'success');
}

function clearScrollMaterial() {
  _sc.material = null;
  resetScrollMaterialUI();
  updateScrollMaterialInfo();
}
function resetScrollMaterialUI() {
  document.getElementById('scrollUploadZone').style.display = '';
  document.getElementById('scrollMaterialLoaded').style.display = 'none';
  document.getElementById('scrollFileInput').value = '';
}
function skipScrollMaterial() {
  notify('No material — crow answers from general knowledge.','info');
}

/* ── BUILD MATERIAL PARTS FOR GEMINI ── */
function buildMaterialParts() {
  const m = _sc.material; if (!m) return [];
  if (m.type === 'pdf') return [{ text:`Reference material (${m.fileName}, ${m.pages} pages):\n\n${m.content.slice(0,90000)}` }];
  if (m.type === 'image') return [{ inline_data:{ mime_type:m.mimeType, data:m.content } }];
  if (m.type === 'pdf-images') return m.content.map(img => ({ inline_data:{ mime_type:'image/jpeg', data:img } }));
  return [];
}

/* ── CORE GEMINI CALL ── */
async function callGemini(parts) {
  const res = await fetch(GEMINI_URL, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      contents:[{parts}],
      
    })
  });
  if (!res.ok) {
    const err = await res.json().catch(()=>({}));
    throw new Error(err.error?.message || `API error ${res.status}`);
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/* ── APPEND Q&A TO A CONTAINER ── */
/* ── MARKDOWN RENDERER ── */
function mdToHtml(text) {
  if (!text) return '';
  let h = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  h = h.replace(/^### (.+)$/gm,'<strong style="font-size:13px;color:var(--text)">$1</strong>');
  h = h.replace(/^## (.+)$/gm,'<strong style="font-size:14px;color:var(--text)">$1</strong>');
  h = h.replace(/^# (.+)$/gm,'<strong style="font-size:15px;color:var(--text)">$1</strong>');
  h = h.replace(/[*]{3}(.+?)[*]{3}/g,'<strong><em>$1</em></strong>');
  h = h.replace(/[*]{2}(.+?)[*]{2}/g,'<strong>$1</strong>');
  h = h.replace(/[*]([^*]+?)[*]/g,'<em>$1</em>');
  h = h.replace(/`([^`]+)`/g,'<code style="background:var(--bg4);padding:1px 5px;border-radius:3px;font-family:var(--font-mono);font-size:11px">$1</code>');
  h = h.replace(/^[ ]{2,}[*-] (.+)$/gm,'<li class="md-ul-nested" style="margin-left:16px">$1</li>');
  h = h.replace(/^[*-] (.+)$/gm,'<li class="md-ul">$1</li>');
  h = h.replace(/^(\d+)[.] (.+)$/gm,'<li class="md-ol">$2</li>');
  // Wrap unordered items
  h = h.replace(/((?:<li class="md-ul[^"]*"[^>]*>.*?<\/li>[\r\n]*)+)/g,'<ul style="margin:4px 0 4px 16px;padding:0;list-style:disc">$1</ul>');
  // Wrap ordered items
  h = h.replace(/((?:<li class="md-ol"[^>]*>.*?<\/li>[\r\n]*)+)/g,'<ol style="margin:4px 0 4px 16px;padding:0 0 0 16px">$1</ol>');
  h = h.replace(/^---$/gm,'<hr style="border:none;border-top:1px solid var(--border);margin:8px 0">');
  h = h.replace(/\n\n/g,'<br><br>');
  h = h.replace(/\n/g,'<br>');
  return h;
}
function appendQA(containerId, question, modeBadge, answerText, loading=false) {
  const el = document.getElementById(containerId); if (!el) return;
  const id = 'qa-'+Date.now();
  el.innerHTML += `<div class="scroll-qa-item" id="${id}">
    <div class="scroll-qa-q">
      <span class="scroll-qa-badge">${esc(modeBadge)}</span>
      <span>${esc(question)}</span>
    </div>
    <div class="scroll-qa-a">${loading ? '<span style="color:var(--text3);font-style:italic">🐦 Flying…</span>' : DOMPurify.sanitize(mdToHtml(answerText))}</div>
  </div>`;
  el.scrollTop = el.scrollHeight;
  return id;
}

function updateQAAnswer(containerId, itemId, answerText) {
  const el = document.querySelector(`#${containerId} #${itemId} .scroll-qa-a`);
  if (el) el.innerHTML = DOMPurify.sanitize(mdToHtml(answerText));
  document.getElementById(containerId).scrollTop = document.getElementById(containerId).scrollHeight;
}

/* ── SESSION Q&A ── */
async function sendScrollSessionQ() {
  const q = document.getElementById('scrollSessionQ').value.trim(); if (!q) return;
  document.getElementById('scrollSessionQ').value = '';
  const mode = _currentScrollQMode;
  const cfg = SCROLL_Q_MODES[mode];
  const btn = document.getElementById('scrollSessionAskBtn');
  btn.textContent = '…'; btn.disabled = true;

  const itemId = appendQA('scrollSessionQHistory', q, mode, '', true);
  _sc.qCount++; updateScrollQCount();

  try {
    const matParts = buildMaterialParts();
    const rough = document.getElementById('scrollRoughNotes').value.trim();
    const contextText = `${cfg.prefix}\n\nSubject: ${_sc.subject}${_sc.topic?' | Topic: '+_sc.topic:''}\n${rough?'Student notes:\n'+rough+'\n\n':''}Question: ${q}\n\nLanguage note: The student may write in English, Bengali, or Banglish. Respond in the same language they used.`;
    const parts = [...matParts, { text:contextText }];
    const answer = await callGemini(parts);
    updateQAAnswer('scrollSessionQHistory', itemId, answer);
  } catch(err) {
    updateQAAnswer('scrollSessionQHistory', itemId, '❌ '+err.message);
  } finally {
    btn.textContent = 'Ask 🐦'; btn.disabled = false;
  }
}

/* ── FIX ROUGH NOTES ── */
async function fixScrollNotes() {
  const rough = document.getElementById('scrollRoughNotes').value.trim();
  if (!rough) { notify('Write some rough notes first.','info'); return; }
  const btn = document.getElementById('scrollFixBtn');
  btn.textContent = '🐦 Working…'; btn.disabled = true;
  try {
    const matParts = buildMaterialParts();
    const roughAttachParts = buildRoughAttachParts();
    const hasRoughAttach = roughAttachParts.length > 0;
    const prompt = `You are a study note cleaner. The student may write in English, Bengali, Bangla, or a mix (Banglish like "alkene er double bond ache"). Understand all of these.\n\n${matParts.length?'Use the provided reference material as context for accuracy.':'Use your subject knowledge for accuracy.'}\n\nSubject: ${_sc.subject}${_sc.topic?'\nTopic: '+_sc.topic:''}\n\nTask: Clean and restructure these rough notes. Fix errors using the material, fill small gaps, improve structure with headings and bullet points. Keep it concise and accurate. Preserve the student's language choice. Do not add content not in the material or notes.\n\nRough notes:\n${rough}`;
    const parts = [...matParts, ...roughAttachParts, {text:prompt+(hasRoughAttach?'\n\nNote: The student has also attached an image/PDF of their rough notes above. Read it and incorporate that content too.':'')}];
    const cleaned = await callGemini(parts);
    document.getElementById('scrollCleanedNotes').innerHTML = mdToHtml(cleaned);
    document.getElementById('scrollOutputCard').style.display = '';
    document.getElementById('scrollExtrasCard').style.display = '';
    document.getElementById('scrollExtrasOutput').style.display = 'none';
    notify('🐦 Notes cleaned! Save or generate extras below.','success');
  } catch(err) { notify('Crow failed: '+err.message,'info'); }
  finally { btn.textContent = '🐦 Clean & Structure Notes'; btn.disabled = false; }
}

/* ── GENERATE FROM CLEANED NOTES ── */
async function generateFromNotes(type) {
  const cleaned = document.getElementById('scrollCleanedNotes').textContent.trim();
  if (!cleaned) { notify('Clean your notes first.','info'); return; }
  const out = document.getElementById('scrollExtrasOutput');
  out.style.display = '';
  out.textContent = '🐦 Generating…';

  const prompts = {
    flashcards: `From these study notes, create 6-10 flashcard pairs. Format:\nQ: [question]\nA: [answer]\n\nMake questions test understanding, not just recall.\n\nNotes:\n${cleaned}`,
    questions:  `From these study notes, create 5 exam-style practice questions (mix of short answer and application). Number them. After all questions, provide all answers labeled "Answers:"\n\nNotes:\n${cleaned}`,
    mindmap:    `Create a mind map outline from these notes. Use indented bullet points showing main topics and subtopics. Format:\n• Main Topic\n  - Subtopic\n    · Detail\n\nNotes:\n${cleaned}`,
    tldr:       `Summarise these study notes in 5-7 bullet points. Each bullet = one key fact or concept. Be concise and memorable.\n\nNotes:\n${cleaned}`
  };

  try {
    const result = await callGemini([{text: prompts[type]}]);
    out.innerHTML = DOMPurify.sanitize(mdToHtml(result));
  } catch(err) { out.textContent = '❌ '+err.message; }
}

/* ── GENERAL Q&A ── */
async function sendGeneralQ() {
  const q = document.getElementById('generalQInput').value.trim(); if (!q) return;
  document.getElementById('generalQInput').value = '';
  const mode = _currentGeneralQMode;
  const cfg = GENERAL_Q_MODES[mode];
  const subject = document.getElementById('generalQSubject').value;
  const topic = document.getElementById('generalQTopic').value.trim();
  const btn = document.getElementById('generalQBtn');
  btn.textContent = '…'; btn.disabled = true;

  const container = document.getElementById('generalQHistory');
  const itemId = appendQA('generalQHistory', q, mode, '', true);

  try {
    const contextLines = [cfg.prefix];
    if (subject) contextLines.push(`Subject context: ${subject}`);
    if (topic) contextLines.push(`Topic context: ${topic}`);
    contextLines.push(`\nLanguage note: The student may write in English, Bengali, or Banglish. Respond in the same language they used.`);
    contextLines.push(`\nQuestion: ${q}`);
    const answer = await callGemini([{text: contextLines.join('\n')}]);
    updateQAAnswer('generalQHistory', itemId, answer);
  } catch(err) {
    updateQAAnswer('generalQHistory', itemId, '❌ '+err.message);
  } finally {
    btn.textContent = 'Ask 🐦'; btn.disabled = false;
  }
}

function clearGeneralQHistory() {
  document.getElementById('generalQHistory').innerHTML = '';
}

/* ── SAVE NOTE TO SUBJECT ── */
function saveScrollNote() {
  // Read innerHTML to preserve formatting (bold, headings, lists from mdToHtml)
  const el = document.getElementById('scrollCleanedNotes');
  const cleaned = el.textContent.trim();
  if (!cleaned) { notify('Nothing to save.','info'); return; }
  const htmlContent = el.innerHTML.trim();
  const subj = (pd().subjects||[]).find(s=>s.name===_sc.subject);
  if (!subj) { notify('Subject not found.','info'); return; }
  if (!subj.scrollNotes) subj.scrollNotes = [];
  subj.scrollNotes.unshift({
    id: Date.now().toString(),
    topic: _sc.topic || 'Session Notes',
    date: new Date().toISOString().split('T')[0],
    content: htmlContent
  });
  saveState(); renderScrollSavedNotes();
  notify(`📚 Saved to ${_sc.subject}. ⚔`,'success');
  const btn = document.getElementById('scrollSaveBtn');
  btn.textContent = '✓ Saved'; btn.disabled = true;
  setTimeout(()=>{ btn.textContent='💾 Save to Subject'; btn.disabled=false; }, 2500);
}

/* ── RENDER SAVED NOTES ── */
function renderScrollSavedNotes() {
  const el = document.getElementById('scrollSavedList'); if (!el) return;
  const filter = document.getElementById('scrollFilterSubject')?.value || '';
  let all = [];
  (pd().subjects||[]).forEach(s => {
    (s.scrollNotes||[]).forEach(n => all.push({...n, subjectName:s.name, subjectColor:s.color}));
  });
  if (filter) all = all.filter(n=>n.subjectName===filter);
  all.sort((a,b)=>b.date.localeCompare(a.date));
  const countEl = document.getElementById('scrollSavedCount');
  if (countEl) countEl.textContent = `${all.length} scroll${all.length!==1?'s':''}`;
  if (!all.length) { el.innerHTML='<div style="font-size:12px;color:var(--text3);padding:16px;text-align:center">No saved scrolls yet.<br>Complete a session and save your notes.</div>'; return; }
  el.innerHTML = all.map(n=>`
    <div class="scroll-saved-item" onclick="viewScrollNote('${esc(n.subjectName)}','${n.id}')">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div class="scroll-saved-title">${esc(n.topic)}</div>
        <button class="btn-icon" style="color:var(--red);font-size:11px;flex-shrink:0;margin-left:8px" onclick="event.stopPropagation();deleteScrollNote('${esc(n.subjectName)}','${n.id}')">✕</button>
      </div>
      <div class="scroll-saved-meta"><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${n.subjectColor||'var(--accent)'};margin-right:4px;vertical-align:middle"></span>${esc(n.subjectName)} · ${n.date}</div>
      <div class="scroll-saved-preview">${esc(n.content.slice(0,140))}</div>
    </div>`).join('');
}

function viewScrollNote(subjectName, noteId) {
  const subj = (pd().subjects||[]).find(s=>s.name===subjectName); if (!subj) return;
  const note = (subj.scrollNotes||[]).find(n=>n.id===noteId); if (!note) return;
  _viewedScrollNote = {note, subjectName};
  document.getElementById('scrollViewerTitle').textContent = `${note.topic} — ${subjectName}`;
  // Use innerHTML + DOMPurify so saved HTML formatting renders correctly
  document.getElementById('scrollViewerBody').innerHTML = DOMPurify.sanitize(note.content);
  document.getElementById('scrollSavedViewer').style.display = '';
}

function deleteScrollNote(subjectName, noteId) {
  if (!confirm('Delete this scroll?')) return;
  const subj = (pd().subjects||[]).find(s=>s.name===subjectName); if (!subj) return;
  subj.scrollNotes = (subj.scrollNotes||[]).filter(n=>n.id!==noteId);
  saveState(); renderScrollSavedNotes();
  if (_viewedScrollNote?.note?.id === noteId) document.getElementById('scrollSavedViewer').style.display='none';
}


/* ══════════════════════════════════════════
   AI DAILY RECAP
══════════════════════════════════════════ */
function initRecapSettings() {
  const s = pd().settings;
  if (s.recapTime) document.getElementById('s_recapTime').value = s.recapTime;
  if (s.recapEnabled) document.getElementById('s_recapEnabled').checked = true;
}

function saveRecapSettings() {
  const s = pd().settings;
  s.recapTime = document.getElementById('s_recapTime').value;
  s.recapEnabled = document.getElementById('s_recapEnabled').checked;
  saveState();
}

function checkRecapTimer() {
  const s = pd().settings;
  if (!s.recapEnabled || !s.recapTime) return;
  const now = new Date();
  const [h, m] = s.recapTime.split(':').map(Number);
  const recapMs = h * 3600000 + m * 60000;
  const nowMs = now.getHours() * 3600000 + now.getMinutes() * 60000;
  const diff = Math.abs(nowMs - recapMs);
  if (diff > 2 * 60000) return; // only within 2-min window
  const lastKey = 'recapShown_' + now.toDateString();
  if (localStorage.getItem(lastKey)) return;
  localStorage.setItem(lastKey, '1');
  triggerRecapNow();
}

async function triggerRecapNow() {
  const card = document.getElementById('recapCard');
  const body = document.getElementById('recapBody');
  const ts = document.getElementById('recapTimestamp');
  card.style.display = '';
  body.textContent = '🐦 Generating your recap…';
  ts.textContent = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});

  // Build context from localStorage
  const data = pd();
  const sessions = (data.sessions || []).slice(-30);
  const subjects = (data.subjects || []).map(s => ({name:s.name, totalMins:s.totalMinutes||0}));
  const exams = (data.exams || []).map(e => ({name:e.name, date:e.date}));
  const tasks = (data.tasks || []);
  const doneTasks = tasks.filter(t=>t.done).length;
  const totalTasks = tasks.length;
  const planned = (data.plannedSessions || []).filter(p => !p.done);

  const prompt = `You are NerdBi's Crow — a wise, slightly anime-dramatic study companion. Generate a study recap for this student.

Study data (last 30 sessions):
${JSON.stringify(sessions.map(s=>({subject:s.subject,mins:s.durationMinutes,date:s.date})))}

Subjects & total time:
${JSON.stringify(subjects)}

Upcoming exams:
${JSON.stringify(exams)}

Mission progress: ${doneTasks}/${totalTasks} done

Upcoming planned sessions:
${JSON.stringify(planned.slice(0,5))}

Write a recap with:
1. A 2-sentence summary of their study consistency lately
2. Their strongest subject (most time) and one that needs attention
3. A specific, time-blocked study plan for TOMORROW (use realistic 1-2hr blocks)
4. One motivational line in the Demon Slayer spirit

Keep the whole thing under 200 words. Be direct and practical, not fluffy.`;

  try {
    const result = await callGemini([{text: prompt}]);
    body.innerHTML = mdToHtml(result);
    // Store with timestamp for 3hr expiry
    localStorage.setItem('recapContent', result);
    localStorage.setItem('recapTime', Date.now().toString());
  } catch(err) {
    body.textContent = '❌ Crow failed: ' + err.message;
  }
}

function loadRecapIfValid() {
  const content = localStorage.getItem('recapContent');
  const time = parseInt(localStorage.getItem('recapTime') || '0');
  if (!content || !time) return;
  const threeHrs = 3 * 60 * 60 * 1000;
  if (Date.now() - time > threeHrs) return; // expired
  const card = document.getElementById('recapCard');
  const body = document.getElementById('recapBody');
  const ts = document.getElementById('recapTimestamp');
  card.style.display = '';
  body.textContent = content;
  ts.textContent = new Date(time).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
}

function dismissRecapCard() {
  document.getElementById('recapCard').style.display = 'none';
}

/* ══════════════════════════════════════════
   AI ROUTINE GENERATOR
══════════════════════════════════════════ */
let _aiRoutine = {
  fileData: null,       // {type, content, mimeType, fileName}
  history: [],          // [{role, text}]
  generatedPlan: null,  // parsed JSON plan from Gemini
  stage: 'idle'         // idle | reading | chatting | done
};

async function handleAIRoutineFile(file) {
  if (!file) return;
  const isPDF = file.type === 'application/pdf';
  const isImage = file.type.startsWith('image/');
  if (!isPDF && !isImage) { notify('Image or PDF only.','info'); return; }

  document.getElementById('aiRoutineUploadZone').style.display = 'none';
  document.getElementById('aiRoutineProcessing').style.display = '';
  document.getElementById('aiRoutineProcessLabel').textContent = '🐦 Reading your file…';
  _aiRoutine.stage = 'reading';

  try {
    let parts = [];
    if (isImage) {
      const b64 = await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=rej;r.readAsDataURL(file);});
      _aiRoutine.fileData = {type:'image', content:b64, mimeType:file.type, fileName:file.name};
      parts = [{inline_data:{mime_type:file.type, data:b64}}];
    } else {
      // PDF
      if (!window.pdfjsLib) {
        await new Promise((res,rej)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';s.onload=res;s.onerror=rej;document.head.appendChild(s);});
        pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }
      const buf = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({data:buf}).promise;
      const total = pdf.numPages;
      const maxPg = Math.min(total, 8);
      let text = '';
      for (let i=1;i<=maxPg;i++) {
        document.getElementById('aiRoutineProcessLabel').textContent = `🐦 Reading page ${i}/${maxPg}…`;
        const pg = await pdf.getPage(i);
        const ct = await pg.getTextContent();
        text += ct.items.map(x=>x.str).join(' ') + '\n\n';
      }
      if (text.trim().length >= 80) {
        _aiRoutine.fileData = {type:'pdf-text', content:text, fileName:file.name};
        parts = [{text: `File content (${file.name}):\n\n${text.slice(0,30000)}`}];
      } else {
        // Scanned PDF — convert pages to images
        const imgs = [];
        for (let i=1;i<=maxPg;i++) {
          document.getElementById('aiRoutineProcessLabel').textContent = `🐦 Converting page ${i}/${maxPg}…`;
          const pg = await pdf.getPage(i);
          const vp = pg.getViewport({scale:1.1});
          const cv = document.createElement('canvas');
          cv.width=vp.width; cv.height=vp.height;
          await pg.render({canvasContext:cv.getContext('2d'),viewport:vp}).promise;
          imgs.push({b64:cv.toDataURL('image/jpeg',0.7).split(',')[1], mime:'image/jpeg'});
        }
        _aiRoutine.fileData = {type:'pdf-images', content:imgs, fileName:file.name};
        parts = imgs.map(img=>({inline_data:{mime_type:img.mime, data:img.b64}}));
      }
    }

    // First Gemini call — identify the document and ask first follow-up question
    document.getElementById('aiRoutineProcessLabel').textContent = '🐦 Analysing your document…';
    const systemPrompt = `You are NerdBi's Crow - an AI study planner. A student has uploaded a document.

Your job:
1. Identify what it is (syllabus, existing routine, exam timetable, notes, etc.)
2. Extract ALL subjects, topics, chapters, dates, and schedule info directly from the document
3. Use whatever is in the document - do NOT ask for info that is already visible in it
4. Only ask ONE follow-up question if something truly critical is missing (like exam date or daily study hours) and is NOT anywhere in the document

IMPORTANT: If the document already contains chapters, topics, or a full routine - extract and use them all. Do not ask the student to re-enter what you can already read.

Start with a 1-sentence summary of what you see, then either ask your ONE missing question OR say you have enough info and will generate the plan next.

Today's date: ${new Date().toLocaleDateString('en-GB')}
Student's subjects in app: ${(pd().subjects||[]).map(s=>s.name).join(', ') || 'none set'}

Be concise. Do NOT generate the full JSON plan yet.\`;

    const response = await callGemini([...parts, {text: systemPrompt}]);

    document.getElementById('aiRoutineProcessing').style.display = 'none';
    document.getElementById('aiRoutineFileTag').textContent = '📎 ' + file.name;
    document.getElementById('aiRoutineChat').style.display = '';
    _aiRoutine.stage = 'chatting';
    _aiRoutine.history = [{role:'assistant', text:response}];
    renderAIRoutineChat();

  } catch(err) {
    document.getElementById('aiRoutineProcessing').style.display = 'none';
    document.getElementById('aiRoutineUploadZone').style.display = '';
    notify('Crow failed: ' + err.message, 'info');
    _aiRoutine.stage = 'idle';
  }
}

function renderAIRoutineChat() {
  const container = document.getElementById('aiRoutineChatHistory');
  container.innerHTML = _aiRoutine.history.map(m => `
    <div style="display:flex;gap:8px;align-items:flex-start;${m.role==='user'?'flex-direction:row-reverse':''}">
      <span style="font-size:16px;flex-shrink:0">${m.role==='user'?'🧑‍🎓':'🐦'}</span>
      <div style="background:${m.role==='user'?'var(--bg4)':'var(--bg3)'};border:1px solid var(--border);border-radius:var(--radius-sm);padding:9px 12px;font-size:13px;color:var(--text2);line-height:1.65;max-width:88%;white-space:pre-wrap">${esc(m.text)}</div>
    </div>`).join('');
  container.scrollTop = container.scrollHeight;
}

async function sendAIRoutineReply() {
  const inp = document.getElementById('aiRoutineChatInput');
  const userText = inp.value.trim();
  if (!userText) return;
  inp.value = '';
  const btn = document.getElementById('aiRoutineSendBtn');
  btn.disabled = true; btn.textContent = '…';

  _aiRoutine.history.push({role:'user', text:userText});
  renderAIRoutineChat();

  // Build conversation context
  const convo = _aiRoutine.history.map(m => `${m.role==='user'?'Student':'Crow'}: ${m.text}`).join('\n\n');

  // Check if we have enough info to generate the plan
  const decisionPrompt = `You are NerdBi's Crow, building a study schedule for a student.

Conversation so far:
${convo}

File info: ${_aiRoutine.fileData?.fileName || 'uploaded document'}
Today: ${new Date().toLocaleDateString('en-GB')}
Student's available subjects in app: ${(pd().subjects||[]).map(s=>s.name).join(', ') || 'none set'}

Do you have enough information to generate a full weekly study schedule now?

If YES: Generate the schedule as a JSON array (and ONLY JSON, no markdown fences) in this exact format:
[{"date":"YYYY-MM-DD","subject":"Subject Name","topic":"Topic","duration":60,"time":"09:00","notes":"optional"}]
Generate sessions from tomorrow up to the exam date (or 2 weeks if no exam date given). Multiple sessions per day are fine.

If NO: Ask ONE more follow-up question. Keep it short and conversational.

Reply with EITHER the JSON array OR a single follow-up question. Nothing else.`;

  try {
    const response = await callGemini([{text: decisionPrompt}]);

    // Try to parse as JSON
    let parsed = null;
    try {
      const cleaned = response.replace(/\`\`\`json|\`\`\`/g,'').trim();
      if (cleaned.startsWith('[')) parsed = JSON.parse(cleaned);
    } catch(e) {}

    if (parsed && Array.isArray(parsed) && parsed.length > 0) {
      // We have the plan!
      _aiRoutine.generatedPlan = parsed;
      _aiRoutine.stage = 'done';
      _aiRoutine.history.push({role:'assistant', text:`Perfect! I've built your schedule — ${parsed.length} study sessions planned. Review it below and apply when ready.`});
      renderAIRoutineChat();
      document.getElementById('aiRoutinePlanPreview').textContent = parsed.map(s =>
        `📅 ${s.date}${s.time?' at '+s.time:''} — ${s.subject}${s.topic?' · '+s.topic:''} (${s.duration}m)${s.notes?'\n   '+s.notes:''}`
      ).join('\n');
      document.getElementById('aiRoutineApplyZone').style.display = '';
    } else {
      // More questions
      _aiRoutine.history.push({role:'assistant', text:response});
      renderAIRoutineChat();
    }
  } catch(err) {
    _aiRoutine.history.push({role:'assistant', text:'❌ ' + err.message});
    renderAIRoutineChat();
  } finally {
    btn.disabled = false; btn.textContent = 'Send';
  }
}

function applyAIRoutine() {
  const plan = _aiRoutine.generatedPlan;
  if (!plan || !plan.length) return;
  let added = 0;
  let _idSeq = Date.now();
  const subjects = (pd().subjects||[]).map(s=>s.name);
  plan.forEach(item => {
    if (!item.date || !item.subject || !item.duration) return;
    const matchedSubject = subjects.find(s => s.toLowerCase().includes(item.subject.toLowerCase()) || item.subject.toLowerCase().includes(s.toLowerCase())) || item.subject;
    pdPlanned().push({
      id: 'ai_' + (_idSeq++).toString(36) + '_' + added,
      subject: matchedSubject,
      topic: item.topic || '',
      date: item.date,
      duration: parseInt(item.duration) || 60,
      time: item.time || '',
      notes: item.notes || '',
      done: false,
      priority: 'medium'
    });
    added++;
  });
  saveState();
  refreshPlannedSessions();
  refreshWeekStudyPlan && refreshWeekStudyPlan();
  notify(`⚔ ${added} sessions added to your schedule!`, 'success');
  resetAIRoutine();
  // Switch to the planned sessions view
  setTimeout(() => {
    document.getElementById('aiRoutineCard').scrollIntoView({behavior:'smooth'});
  }, 400);
}

function resetAIRoutine() {
  _aiRoutine = {fileData:null, history:[], generatedPlan:null, stage:'idle'};
  document.getElementById('aiRoutineUploadZone').style.display = '';
  document.getElementById('aiRoutineProcessing').style.display = 'none';
  document.getElementById('aiRoutineChat').style.display = 'none';
  document.getElementById('aiRoutineApplyZone').style.display = 'none';
  document.getElementById('aiRoutineChatHistory').innerHTML = '';
  document.getElementById('aiRoutineFileInput').value = '';
}

/* ── PDF DOWNLOAD ── */
async function _downloadPDF(content, subject, topic, date) {
  if (!window.jspdf) {
    await new Promise((res,rej)=>{ const s=document.createElement('script'); s.src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'; s.onload=res; s.onerror=rej; document.head.appendChild(s); });
  }
  const {jsPDF} = window.jspdf;
  const doc = new jsPDF({unit:'mm',format:'a4'});
  doc.setFont('helvetica','bold'); doc.setFontSize(16);
  doc.text('NerdBi Study Scroll', 20, 20);
  doc.setFont('helvetica','normal'); doc.setFontSize(11); doc.setTextColor(120);
  doc.text(`${subject}${topic?' — '+topic:''}`, 20, 29);
  doc.text(`${date} · nerdbi.shop`, 20, 35);
  doc.setTextColor(0); doc.line(20,39,190,39);
  doc.setFontSize(11);
  const lines = doc.splitTextToSize(content, 170);
  let y = 47;
  lines.forEach(line => { if(y>275){doc.addPage();y=20;} doc.text(line,20,y); y+=6; });
  doc.save(`NerdBi_${subject.replace(/\s+/g,'_')}_${date}.pdf`);
}

async function downloadScrollPDF() {
  const content = document.getElementById('scrollCleanedNotes').textContent.trim();
  if (!content) { notify('Nothing to download.','info'); return; }
  const btn = document.getElementById('scrollDownloadBtn');
  btn.textContent='…'; btn.disabled=true;
  try { await _downloadPDF(content, _sc.subject, _sc.topic, new Date().toISOString().split('T')[0]); notify('📄 PDF downloaded!','success'); }
  catch(err) { notify('PDF failed: '+err.message,'info'); }
  finally { btn.textContent='↓ PDF'; btn.disabled=false; }
}

async function downloadViewedScrollPDF() {
  if (!_viewedScrollNote) return;
  const {note, subjectName} = _viewedScrollNote;
  try { await _downloadPDF(note.content, subjectName, note.topic, note.date); notify('📄 PDF downloaded!','success'); }
  catch(err) { notify('PDF failed: '+err.message,'info'); }
}
