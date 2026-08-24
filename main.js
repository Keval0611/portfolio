// --- SCREEN NAVIGATION SYSTEM ---
function switchScreen(screenId) {
  const screens = ['status', 'loot', 'missions', 'prototypes', 'contact'];
  
  // Hide all screens
  screens.forEach(s => {
    const el = document.getElementById(`screen-${s}`);
    if (el) el.classList.add('hidden');
  });

  // Reset all navigation tabs to inactive state
  const navButtons = document.querySelectorAll('nav button');
  navButtons.forEach(btn => {
    btn.className = "px-4 py-2 text-xs font-orbitron font-bold border border-slate-700 bg-slate-900/80 text-slate-400 hover:border-[#00f2fe] hover:text-white whitespace-nowrap transition flex items-center gap-1.5 rounded";
  });

  // Activate selected screen
  const activeScreen = document.getElementById(`screen-${screenId}`);
  if (activeScreen) {
    activeScreen.classList.remove('hidden');
  }

  // Activate selected tab styling
  const activeTab = document.getElementById(`tab-${screenId}`);
  if (activeTab) {
    activeTab.className = "px-4 py-2 text-xs font-orbitron font-bold border border-[#00f2fe] bg-[#00f2fe]/10 text-[#00f2fe] whitespace-nowrap transition flex items-center gap-1.5 rounded shadow-[0_0_8px_rgba(0,242,254,0.2)]";
  }

  // Refresh Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

// --- OBJECTIVE DIRECTIVE TOGGLER ---
let directiveIndex = 0;
const recruiterDirectives = [
  { 
    role: "IT Support & Systems Specialist", 
    hook: "Applying computer science principles and business operations expertise to solve L1/L2 incidents, maintain active directory structures, and optimize POS endpoint uptime." 
  },
  { 
    role: "Operations & Technical Analyst", 
    hook: "Translating technical diagnostic records and systems logs into actionable workflows to improve business efficiency, inventory tracking, and retail success." 
  },
  { 
    role: "Helpdesk & Infrastructure Analyst", 
    hook: "Resolving technical hardware tickets, implementing automated diagnostics, and delivering white-glove hardware support to ensure high availability." 
  }
];

function resetObjectiveDirective() {
  directiveIndex = (directiveIndex + 1) % recruiterDirectives.length;
  const current = recruiterDirectives[directiveIndex];
  
  const roleEl = document.getElementById('target-role-text');
  const commsEl = document.getElementById('comms-text');
  
  if (roleEl) {
    roleEl.innerText = current.role;
    roleEl.style.color = '#00f2fe';
    setTimeout(() => { roleEl.style.color = '#ffffff'; }, 400);
  }
  
  if (commsEl) {
    commsEl.innerText = current.hook;
  }
}

// --- INTERACTIVE COMMS PANEL FEED ---
function triggerComms(mode) {
  const feed = document.getElementById('comms-text');
  if (!feed) return;
  
  if (mode === 'deploy') {
    feed.innerText = "Candidate Status: Available immediately. Actively seeking IT Support, Helpdesk Analyst, and Technical Operations opportunities in Ottawa and across Ontario.";
  } else if (mode === 'skills') {
    feed.innerText = "Tech Core: Python automation, hardware diagnostics, POS terminal management, network latency testing, and TensorFlow model validation pipelines.";
  } else if (mode === 'contact') {
    feed.innerText = "Direct Line: Reach out at kevalp061411@gmail.com or call 613-219-6739 to coordinate an interview or reference check.";
  }
}

// --- LATENCY PROBE SIMULATOR ---
let simInterval = null;
let lastSimRTT = 0;

function toggleWebSimulation() {
  const btn = document.getElementById('sim-btn');
  const rttEl = document.getElementById('sim-rtt');
  const jitterEl = document.getElementById('sim-jitter');
  const statusEl = document.getElementById('sim-status');
  const indicatorEl = document.getElementById('sim-indicator');
  const target = document.getElementById('sim-target') ? document.getElementById('sim-target').value : 'val';
  
  if (simInterval) {
    clearInterval(simInterval);
    simInterval = null;
    if (btn) btn.innerText = "RUN PROBE ENGINE";
    if (statusEl) {
      statusEl.innerText = "IDLE";
      statusEl.className = "font-bold text-slate-500";
    }
    if (indicatorEl) {
      indicatorEl.className = "w-2 h-2 rounded-full bg-slate-600";
    }
    return;
  }
  
  if (btn) btn.innerText = "STOP PROBE ENGINE";
  const baseLatencies = { val: 24, cf: 12, ggl: 18 };
  
  simInterval = setInterval(() => {
    const base = baseLatencies[target] || 20;
    const isSpike = Math.random() < 0.12;
    const variance = isSpike ? Math.floor(Math.random() * 45) + 30 : Math.floor(Math.random() * 6) - 3;
    const currentRTT = Math.max(8, base + variance);
    const jitter = lastSimRTT > 0 ? Math.abs(currentRTT - lastSimRTT) : 1;
    lastSimRTT = currentRTT;
    
    if (rttEl) rttEl.innerText = `${currentRTT} ms`;
    if (jitterEl) jitterEl.innerText = `${jitter} ms`;
    if (statusEl) {
      statusEl.innerText = "ACTIVE";
      statusEl.className = "font-bold text-emerald-400";
    }
    if (indicatorEl) {
      indicatorEl.className = "w-2 h-2 rounded-full bg-emerald-500 animate-ping";
    }
  }, 600);
}

// --- CNN IMAGE CLASSIFICATION INFERENCE ---
function runVisionInference() {
  const btn = document.getElementById('vision-btn');
  const target = document.getElementById('vision-sample') ? document.getElementById('vision-sample').value : 'plane';
  const labelTop = document.getElementById('label-top');
  const confTop = document.getElementById('conf-top');
  const barTop = document.getElementById('bar-top');
  const labelSub = document.getElementById('label-sub');
  const confSub = document.getElementById('conf-sub');
  const barSub = document.getElementById('bar-sub');
  
  if (btn) {
    btn.innerText = "RUNNING INFERENCE...";
    btn.disabled = true;
  }
  
  const datasetMap = {
    plane: { top: "Airplane (Class 0)", topPct: 94.2, sub: "Bird (Class 2)", subPct: 4.1 },
    truck: { top: "Automobile/Truck (Class 9)", topPct: 91.8, sub: "Ship (Class 8)\n[Ship / Vessel]", subPct: 5.3 },
    dog:   { top: "Dog / Canine (Class 5)\n[Dog / Canine]", topPct: 88.6, sub: "Cat / Feline (Class 3)\n[Cat / Feline]", subPct: 8.4 },
    ship:  { top: "Ship / Vessel (Class 8)\n[Ship / Vessel]", topPct: 96.1, sub: "Airplane (Class 0)", subPct: 2.7 }
  };
  
  setTimeout(() => {
    const res = datasetMap[target];
    if (labelTop) labelTop.innerText = `Identified: ${res.top}`;
    if (confTop) confTop.innerText = `${res.topPct}%`;
    if (barTop) barTop.style.width = `${res.topPct}%`;
    
    if (labelSub) labelSub.innerText = `Secondary: ${res.sub}`;
    if (confSub) confSub.innerText = `${res.subPct}%`;
    if (barSub) barSub.style.width = `${res.subPct}%`;
    
    if (btn) {
      btn.innerText = "RUN INFERENCE";
      btn.disabled = false;
    }
  }, 800);
}

// --- DYNAMIC BACKGROUND SWITCHING ENGINE ---
function changeWebsiteBackground(bgKey) {
  // Remove existing background classes
  document.body.classList.remove('bg-default', 'bg-sakura', 'bg-cybercity', 'bg-matrix', 'bg-synthwave', 'bg-nebula');
  
  // Add new background class
  document.body.classList.add(`bg-${bgKey}`);
  
  // Persist background selection across page reloads
  localStorage.setItem("operator_background_theme", bgKey);
  
  // Announce background change to user in real-time
  const commsEl = document.getElementById("comms-text");
  if (commsEl) {
    commsEl.innerText = `// BACKGROUND MANIFEST: Website environmental background synced to "${bgKey.toUpperCase()}". High contrast overlay applied.`;
    commsEl.style.color = "#00ff88";
    setTimeout(() => { commsEl.style.color = ""; }, 3000);
  }
}

// --- GAMIFIED ENVIRONMENTAL LOOT CHEST SYSTEM ---
const lootTable = [
  { 
    name: "SAKURA SANCTUARY", 
    rarity: "item-rare", 
    desc: "Loads a serene cherry blossom background.", 
    action: () => changeWebsiteBackground("sakura") 
  },
  { 
    name: "NEON METROPOLIS", 
    rarity: "item-rare", 
    desc: "Applies a misty cyberpunk city skyline backdrop.", 
    action: () => changeWebsiteBackground("cybercity") 
  },
  { 
    name: "MATRIX GRID", 
    rarity: "item-rare", 
    desc: "Injects an active green machine-code cascade wall.", 
    action: () => changeWebsiteBackground("matrix") 
  },
  { 
    name: "SYNTHWAVE SUNSET", 
    rarity: "item-rare", 
    desc: "Sets a vintage sunset wireframe wiregrid horizon.", 
    action: () => changeWebsiteBackground("synthwave") 
  },
  { 
    name: "COSMIC NEBULA", 
    rarity: "item-legendary", 
    desc: "Fuses interface with a deep-space colorful starfield.", 
    action: () => changeWebsiteBackground("nebula") 
  },
  { 
    name: "OFFICIAL RESUME", 
    rarity: "item-legendary", 
    desc: "Triggers immediate download of Keval's printable PDF resume.", 
    action: () => {
      const link = document.createElement("a");
      link.href = "./resume.pdf";
      link.download = "Keval_Patel_Resume.pdf";
      link.click();
    } 
  },
  { 
    name: "TACTICAL DEFAULT", 
    rarity: "item-common", 
    desc: "Restores standard high-readability digital interface matrix.", 
    action: () => changeWebsiteBackground("default") 
  }
];

const CARD_WIDTH = 130;
const TOTAL_CARDS = 40;
let generatedCards = [];

function populateStrip() {
  const strip = document.getElementById("roulette-strip");
  if (!strip) return;
  strip.innerHTML = "";
  strip.style.transition = "none";
  strip.style.transform = "translateX(0px)";
  generatedCards = [];
  
  for (let i = 0; i < TOTAL_CARDS; i++) {
    const item = lootTable[Math.floor(Math.random() * lootTable.length)];
    generatedCards.push(item);
    
    const card = document.createElement("div");
    card.style.width = `${CARD_WIDTH}px`;
    card.className = `flex-shrink-0 h-16 border border-slate-800 bg-[#070b12] rounded flex flex-col items-center justify-center p-1 font-orbitron transition ${item.rarity}`;
    
    let rarityColor = "text-slate-400";
    if (item.rarity === 'item-rare') rarityColor = "text-[#00f2fe]";
    if (item.rarity === 'item-legendary') rarityColor = "text-amber-400";
    
    card.innerHTML = `
      <span class="text-[9px] font-bold ${rarityColor}">${item.rarity.replace('item-', '').toUpperCase()}</span>
      <span class="text-[10px] font-black text-white whitespace-nowrap overflow-hidden text-ellipsis w-full px-1">${item.name}</span>
    `;
    strip.appendChild(card);
  }
}

window.openLootModal = function() {
  const modal = document.getElementById("loot-modal");
  if (modal) {
    modal.classList.remove("hidden");
    populateStrip();
  }
};

window.closeLootModal = function() {
  const modal = document.getElementById("loot-modal");
  if (modal) modal.classList.add("hidden");
};

function initLootChestEvents() {
  const closeBtn = document.getElementById("close-btn");
  const spinBtn = document.getElementById("spin-btn");
  const strip = document.getElementById("roulette-strip");
  const rewardDisplay = document.getElementById("reward-display");
  
  if (closeBtn) {
    closeBtn.onclick = window.closeLootModal;
  }
  
  if (spinBtn) {
    spinBtn.onclick = function() {
      populateStrip();
      spinBtn.disabled = true;
      spinBtn.innerText = "ROULETTE ACTIVE...";
      
      if (rewardDisplay) {
        rewardDisplay.classList.add('hidden');
        rewardDisplay.style.opacity = "0";
        rewardDisplay.classList.remove('scale-100');
        rewardDisplay.classList.add('scale-95');
      }
      
      const winningIndex = 35;
      const winningItem = lootTable[Math.floor(Math.random() * lootTable.length)];
      generatedCards[winningIndex] = winningItem;
      
      const stripCards = strip.childNodes;
      if (stripCards && stripCards[winningIndex]) {
        let rarityColor = "text-slate-400";
        if (winningItem.rarity === 'item-rare') rarityColor = "text-[#00f2fe]";
        if (winningItem.rarity === 'item-legendary') rarityColor = "text-amber-400";
        
        stripCards[winningIndex].className = `flex-shrink-0 h-16 border border-amber-400 bg-slate-900 rounded flex flex-col items-center justify-center p-1 font-orbitron shadow-[0_0_8px_rgba(251,191,36,0.3)] ${winningItem.rarity}`;
        stripCards[winningIndex].innerHTML = `
          <span class="text-[9px] font-bold ${rarityColor}">${winningItem.rarity.replace('item-', '').toUpperCase()}</span>
          <span class="text-[10px] font-black text-white whitespace-nowrap overflow-hidden text-ellipsis w-full px-1">${winningItem.name}</span>
        `;
      }
      
      setTimeout(() => {
        const containerWidth = strip.parentElement.clientWidth;
        const targetOffset = - (winningIndex * CARD_WIDTH) + (containerWidth / 2) - (CARD_WIDTH / 2);
        
        strip.style.transition = "transform 4s cubic-bezier(0.15, 0.85, 0.3, 1)";
        strip.style.transform = `translateX(${targetOffset}px)`;
      }, 50);
      
      setTimeout(() => {
        spinBtn.disabled = false;
        spinBtn.innerText = "INITIATE SPIN";
        
        const rewardName = document.getElementById("reward-name");
        const rewardRarity = document.getElementById("reward-rarity");
        const rewardDesc = document.getElementById("reward-desc");
        
        if (rewardName) rewardName.innerText = winningItem.name;
        if (rewardDesc) rewardDesc.innerText = winningItem.desc;
        if (rewardRarity) {
          rewardRarity.innerText = winningItem.rarity.replace('item-', '').toUpperCase();
          rewardRarity.className = "text-[9px] font-mono font-bold uppercase tracking-widest ";
          if (winningItem.rarity === 'item-common') rewardRarity.classList.add('text-slate-400');
          if (winningItem.rarity === 'item-rare') rewardRarity.classList.add('text-[#00f2fe]');
          if (winningItem.rarity === 'item-legendary') rewardRarity.classList.add('text-amber-400');
        }
        
        if (rewardDisplay) {
          rewardDisplay.classList.remove('hidden');
          rewardDisplay.className = "w-full p-4 border border-slate-800 bg-slate-900/60 rounded text-center space-y-1 transition duration-500 scale-95 opacity-0";
          if (winningItem.rarity === 'item-rare') rewardDisplay.classList.add('border-[#00f2fe]/30', 'bg-[#00f2fe]/5');
          else if (winningItem.rarity === 'item-legendary') rewardDisplay.classList.add('border-amber-400/30', 'bg-amber-400/5');
          else rewardDisplay.classList.add('border-slate-800', 'bg-slate-900/40');
          
          setTimeout(() => {
            rewardDisplay.classList.remove('scale-95', 'opacity-0');
            rewardDisplay.classList.add('scale-100', 'opacity-100');
          }, 50);
        }
        
        if (winningItem.action) {
          winningItem.action();
        }
        
      }, 4200);
    };
  }
}

// --- BOOT AND EVENT MOUNTING ---
document.addEventListener("DOMContentLoaded", () => {
  switchScreen('status');
  initLootChestEvents();
  
  const savedBg = localStorage.getItem("operator_background_theme") || "default";
  document.body.classList.add(`bg-${savedBg}`);
});
