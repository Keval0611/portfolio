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
    btn.className = "px-4 py-2.5 text-xs font-orbitron font-bold border border-slate-700 bg-[#0a0f18]/90 text-slate-300 hover:border-[#00f2fe] hover:text-[#00f2fe] whitespace-nowrap transition flex items-center gap-1.5 rounded";
  });

  // Activate selected screen
  const activeScreen = document.getElementById(`screen-${screenId}`);
  if (activeScreen) {
    activeScreen.classList.remove('hidden');
  }

  // Activate selected tab styling
  const activeTab = document.getElementById(`tab-${screenId}`);
  if (activeTab) {
    activeTab.className = "px-4 py-2.5 text-xs font-orbitron font-bold border border-[#00f2fe] bg-[#00f2fe] text-black whitespace-nowrap transition flex items-center gap-1.5 rounded shadow-[0_0_10px_rgba(0,242,254,0.3)]";
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
    hook: "Bridging computer science foundations with business operations to resolve L1/L2 incidents, streamline workflows, and ensure 99.9% endpoint uptime." 
  },
  { 
    role: "Operations & Technical Analyst", 
    hook: "Leveraging dual-discipline expertise in CS and Business Strategy to translate technical telemetry and POS diagnostics into scalable business growth." 
  },
  { 
    role: "Helpdesk & Infrastructure Analyst", 
    hook: "Dedicated to rapid-response incident resolution, automated hardware diagnostics, and delivering white-glove technical support across enterprise environments." 
  }
];

function resetObjectiveDirective() {
  directiveIndex = (directiveIndex + 1) % recruiterDirectives.length;
  const current = recruiterDirectives[directiveIndex];
  
  const roleEl = document.getElementById('target-role-text');
  const commsEl = document.getElementById('comms-text');
  
  if (roleEl) {
    roleEl.innerText = current.role;
    roleEl.style.color = '#fcee0a';
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
    feed.innerText = "Candidate status: Available immediately. Open to on-site, hybrid, and remote IT Support & Operations opportunities in Ottawa and across Ontario.";
  } else if (mode === 'skills') {
    feed.innerText = "Core Toolkit: Python automation, hardware diagnostics, POS infrastructure, TensorFlow CNN pipelines, ticketing workflows, and Active Directory.";
  } else if (mode === 'contact') {
    feed.innerText = "Transmission open: Reach out at kevalp061411@gmail.com or 613-219-6739 for immediate interview scheduling.";
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
      statusEl.className = "font-bold text-slate-400";
    }
    if (indicatorEl) {
      indicatorEl.className = "w-2 h-2 rounded-full bg-slate-500";
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
      statusEl.className = "font-bold text-green-400 animate-pulse";
    }
    if (indicatorEl) {
      indicatorEl.className = "w-2 h-2 rounded-full bg-green-500 animate-ping";
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
    btn.innerText = "RUNNING...";
    btn.disabled = true;
  }
  
  const datasetMap = {
    plane: { top: "Airplane (Class 0)", topPct: 94.2, sub: "Bird (Class 2)", subPct: 4.1 },
    truck: { top: "Automobile/Truck (Class 9)\n[Automobile/Truck]", topPct: 91.8, sub: "Ship (Class 8)\n[Ship / Vessel]", subPct: 5.3 },
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
    commsEl.innerText = `// ATMOSPHERE LOG: Environmental backdrop calibrated successfully to "${bgKey.toUpperCase()}". Grid matrix synced.`;
    commsEl.style.color = "#00ff88";
    setTimeout(() => { commsEl.style.color = ""; }, 3500);
  }
}

// --- GAMIFIED ENVIRONMENTAL LOOT CHEST SYSTEM ---
const lootTable = [
  { 
    name: "SAKURA SANCTUARY", 
    rarity: "item-rare", 
    desc: "Deploys a serene, glowing cyber-cherry blossom canopy.", 
    action: () => changeWebsiteBackground("sakura") 
  },
  { 
    name: "NEON METROPOLIS", 
    rarity: "item-rare", 
    desc: "Shifts UI background to a high-rise rainy cyberpunk city skyline.", 
    action: () => changeWebsiteBackground("cybercity") 
  },
  { 
    name: "MATRIX GRID", 
    rarity: "item-rare", 
    desc: "Loads an active hacking green digital code-rain terminal wall.", 
    action: () => changeWebsiteBackground("matrix") 
  },
  { 
    name: "SYNTHWAVE SUNSET", 
    rarity: "item-rare", 
    desc: "Renders a vintage neon outrun sunset grid landscape.", 
    action: () => changeWebsiteBackground("synthwave") 
  },
  { 
    name: "COSMIC NEBULA", 
    rarity: "item-legendary", 
    desc: "Synchronizes background to a highly detailed deep space nebula starfield.", 
    action: () => changeWebsiteBackground("nebula") 
  },
  { 
    name: "CLASSIFIED RESUME", 
    rarity: "item-legendary", 
    desc: "Ready for high-speed download. Ingressing PDF operator file.", 
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
    desc: "Resets environmental settings to initial neon blue overlay grids.", 
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
    // Generate a random item from loot pool
    const item = lootTable[Math.floor(Math.random() * lootTable.length)];
    generatedCards.push(item);
    
    // Create card element
    const card = document.createElement("div");
    card.style.width = `${CARD_WIDTH}px`;
    card.className = `flex-shrink-0 h-16 border border-slate-800 bg-[#070b12] rounded flex flex-col items-center justify-center p-1 font-orbitron transition ${item.rarity}`;
    
    // Rarity styles inside class definitions
    let rarityColor = "text-slate-400";
    if (item.rarity === 'item-rare') rarityColor = "text-[#00f2fe]";
    if (item.rarity === 'item-legendary') rarityColor = "text-[#fcee0a]";
    
    card.innerHTML = `
      <span class="text-[9px] font-bold ${rarityColor}">${item.rarity.replace('item-', '').toUpperCase()}</span>
      <span class="text-[10px] font-black text-white whitespace-nowrap overflow-hidden text-ellipsis w-full px-1">${item.name}</span>
    `;
    strip.appendChild(card);
  }
}

// Global modal toggle controls
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
      spinBtn.innerText = "SWEEPING GRID...";
      
      if (rewardDisplay) {
        rewardDisplay.classList.add('hidden');
        rewardDisplay.style.opacity = "0";
        rewardDisplay.classList.remove('scale-100');
        rewardDisplay.classList.add('scale-95');
      }
      
      // Determine winning item (index 35 serves as the anchor item)
      const winningIndex = 35;
      const winningItem = lootTable[Math.floor(Math.random() * lootTable.length)];
      generatedCards[winningIndex] = winningItem;
      
      // Render the specific winning item card directly into position 35
      const stripCards = strip.childNodes;
      if (stripCards && stripCards[winningIndex]) {
        let rarityColor = "text-slate-400";
        if (winningItem.rarity === 'item-rare') rarityColor = "text-[#00f2fe]";
        if (winningItem.rarity === 'item-legendary') rarityColor = "text-[#fcee0a]";
        
        stripCards[winningIndex].className = `flex-shrink-0 h-16 border border-[#fcee0a] bg-slate-900 rounded flex flex-col items-center justify-center p-1 font-orbitron shadow-[0_0_12px_rgba(252,238,10,0.3)] ${winningItem.rarity}`;
        stripCards[winningIndex].innerHTML = `
          <span class="text-[9px] font-bold ${rarityColor}">${winningItem.rarity.replace('item-', '').toUpperCase()}</span>
          <span class="text-[10px] font-black text-white whitespace-nowrap overflow-hidden text-ellipsis w-full px-1">${winningItem.name}</span>
        `;
      }
      
      // Smooth animated spin to the winning card
      setTimeout(() => {
        const containerWidth = strip.parentElement.clientWidth;
        const targetOffset = - (winningIndex * CARD_WIDTH) + (containerWidth / 2) - (CARD_WIDTH / 2);
        
        strip.style.transition = "transform 4.5s cubic-bezier(0.1, 0.85, 0.25, 1)";
        strip.style.transform = `translateX(${targetOffset}px)`;
      }, 50);
      
      // Unveil the reward upon spin arrival
      setTimeout(() => {
        spinBtn.disabled = false;
        spinBtn.innerText = "INITIATE MATRIX SWEEP";
        
        // Populate reward description boxes
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
          if (winningItem.rarity === 'item-legendary') rewardRarity.classList.add('text-[#fcee0a]');
        }
        
        if (rewardDisplay) {
          rewardDisplay.classList.remove('hidden');
          // Add border glow matching rarity
          rewardDisplay.className = "w-full hud-card-item p-4 border rounded text-center space-y-1 transition duration-500 scale-95 opacity-0";
          if (winningItem.rarity === 'item-rare') rewardDisplay.classList.add('border-[#00f2fe]/40', 'shadow-[0_0_10px_rgba(0,242,254,0.15)]');
          else if (winningItem.rarity === 'item-legendary') rewardDisplay.classList.add('border-[#fcee0a]/40', 'shadow-[0_0_10px_rgba(252,238,10,0.15)]');
          else rewardDisplay.classList.add('border-slate-800');
          
          setTimeout(() => {
            rewardDisplay.classList.remove('scale-95', 'opacity-0');
            rewardDisplay.classList.add('scale-100', 'opacity-100');
          }, 50);
        }
        
        // Fire reward action
        if (winningItem.action) {
          winningItem.action();
        }
        
      }, 4600);
    };
  }
}

// --- BOOT AND EVENT MOUNTING ---
document.addEventListener("DOMContentLoaded", () => {
  // Enforce Status Screen on launch
  switchScreen('status');
  initLootChestEvents();
  
  // Reload and apply saved environment background settings
  const savedBg = localStorage.getItem("operator_background_theme") || "default";
  document.body.classList.add(`bg-${savedBg}`);
});
