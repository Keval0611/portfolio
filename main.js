// Screen Navigation Switching Logic
function switchScreen(screenId) {
  const screens = ['status', 'loot', 'missions', 'prototypes'];
  const tabs = ['tab-status', 'tab-loot', 'tab-missions', 'tab-prototypes'];
  
  // Hide all screens
  screens.forEach(s => {
    const el = document.getElementById(`screen-${s}`);
    if (el) el.classList.add('hidden');
  });

  // Reset all tabs to inactive state
  tabs.forEach(t => {
    const tabEl = document.getElementById(t);
    if (tabEl) {
      tabEl.className = "px-3 py-2 text-xs font-orbitron font-bold border border-slate-700 bg-[#0a0f18] text-slate-300 hover:border-[#00f2fe] hover:text-[#00f2fe] whitespace-nowrap transition";
    }
  });

  // Activate chosen screen
  const activeScreen = document.getElementById(`screen-${screenId}`);
  if (activeScreen) {
    activeScreen.classList.remove('hidden');
  }

  // Activate chosen tab
  const activeTab = document.getElementById(`tab-${screenId}`);
  if (activeTab) {
    activeTab.className = "px-3 py-2 text-xs font-orbitron font-bold border border-[#00f2fe] bg-[#00f2fe] text-black whitespace-nowrap transition";
  }

  // Refresh Lucide Icons on DOM updates
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Recruiter-Focused Objective Directive Switcher
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
    commsEl.innerText = `"${current.hook}"`;
  }
}

// Interactive Comms Dialogue Feeds
function triggerComms(mode) {
  const feed = document.getElementById('comms-text');
  if (!feed) return;

  if (mode === 'deploy') {
    feed.innerText = "\"Candidate status: Available immediately. Open to on-site, hybrid, and remote IT Support & Operations opportunities in Ottawa and across Ontario.\"";
  } else if (mode === 'skills') {
    feed.innerText = "\"Core Toolkit: Python automation, hardware diagnostics, POS infrastructure, TensorFlow CNN pipelines, ticketing workflows, and Active Directory.\"";
  } else if (mode === 'contact') {
    feed.innerText = "\"Transmission open: Reach out at kevalp061411@gmail.com or 613-219-6739 for immediate interview scheduling.\"";
  }
}

// 1. Interactive In-Browser Ping Probe Simulation
let simInterval = null;
let lastSimRTT = 0;

function toggleWebSimulation() {
  const btn = document.getElementById('sim-btn');
  const rttEl = document.getElementById('sim-rtt');
  const jitterEl = document.getElementById('sim-jitter');
  const statusEl = document.getElementById('sim-status');
  const target = document.getElementById('sim-target') ? document.getElementById('sim-target').value : 'val';

  if (simInterval) {
    clearInterval(simInterval);
    simInterval = null;
    if (btn) btn.innerText = "Run Demo";
    if (statusEl) {
      statusEl.innerText = "IDLE";
      statusEl.className = "font-bold text-slate-400 text-xs";
    }
    return;
  }

  if (btn) btn.innerText = "Stop Demo";

  const baseLatencies = { val: 24, cf: 12, ggl: 18 };

  simInterval = setInterval(() => {
    const base = baseLatencies[target] || 20;
    const isSpike = Math.random() < 0.15;
    const variance = isSpike ? Math.floor(Math.random() * 45) + 30 : Math.floor(Math.random() * 6) - 3;
    const currentRTT = Math.max(8, base + variance);
    const jitter = lastSimRTT > 0 ? Math.abs(currentRTT - lastSimRTT) : 1;
    lastSimRTT = currentRTT;

    if (rttEl) rttEl.innerText = `${currentRTT} ms`;
    if (jitterEl) jitterEl.innerText = `${jitter} ms`;

    if (statusEl) {
      if (jitter > 20) {
        statusEl.innerText = "SPIKE";
        statusEl.className = "font-bold text-[#fe007a] text-xs";
      } else {
        statusEl.innerText = "OPTIMAL";
        statusEl.className = "font-bold text-[#00ff88] text-xs";
      }
    }
  }, 600);
}

// 2. Interactive In-Browser CNN Softmax Inference Simulation
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
    btn.innerText = "Analyzing...";
    btn.disabled = true;
  }

  const datasetMap = {
    plane: { top: "Airplane (Class 0)", topPct: 94.2, sub: "Bird (Class 2)", subPct: 4.1 },
    truck: { top: "Automobile/Truck (Class 9)", topPct: 91.8, sub: "Ship (Class 8)", subPct: 5.3 },
    dog:   { top: "Dog / Canine (Class 5)", topPct: 88.6, sub: "Cat / Feline (Class 3)", subPct: 8.4 },
    ship:  { top: "Ship / Vessel (Class 8)", topPct: 96.1, sub: "Airplane (Class 0)", subPct: 2.7 }
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
      btn.innerText = "Classify";
      btn.disabled = false;
    }
  }, 400);
}

// Mount Default Screen on Boot
document.addEventListener("DOMContentLoaded", () => {
  switchScreen('status');
  if (window.lucide) {
    lucide.createIcons();
  }
});
// --- LOOT CHEST UNBOXING SYSTEM ---

const lootTable = [
  {
    name: "CYBERPUNK HUD",
    rarity: "item-rare",
    desc: "Terminal palette shifted to Neon Magenta.",
    action: () => applyTheme("theme-violet")
  },
  {
    name: "MATRIX OVERRIDE",
    rarity: "item-rare",
    desc: "Terminal palette shifted to Matrix Green.",
    action: () => applyTheme("theme-matrix")
  },
  {
    name: "SOLAR FLARE HUD",
    rarity: "item-rare",
    desc: "Terminal palette shifted to Tactical Amber.",
    action: () => applyTheme("theme-amber")
  },
  {
    name: "CLASSIFIED RESUME",
    rarity: "item-legendary",
    desc: "Operator Dossier ready for download.",
    action: () => {
      const link = document.createElement("a");
      link.href = "./resume.pdf";
      link.download = "Keval_Patel_Resume.pdf";
      link.click();
    }
  },
  {
    name: "TELEMETRY LOG",
    rarity: "item-common",
    desc: "Telemetry probe: Jitter 0.3ms // Status Optimal.",
    action: () => triggerCommsLog()
  }
];

// Comms trigger for Telemetry drop
function triggerCommsLog() {
  const commsEl = document.getElementById("comms-text");
  if (commsEl) {
    commsEl.innerText = "\"// SYSTEM EVENT: Tactical probe telemetry buffer synchronized. Latency stabilized.\"";
    commsEl.style.color = "#00ff88";
    setTimeout(() => { commsEl.style.color = ""; }, 2500);
  }
}
const CARD_WIDTH = 130;
const TOTAL_CARDS = 40;
let generatedCards = [];

function applyTheme(themeClass) {
  // Theme Color Configurations
  const themes = {
    "theme-matrix": {
      primaryHex: "#00ff88",
      primaryText: "text-[#00ff88]",
      primaryBg: "bg-[#00ff88]",
      primaryBorder: "border-[#00ff88]",
      glowColor: "rgba(0, 255, 136, 0.6)"
    },
    "theme-violet": {
      primaryHex: "#fe007a",
      primaryText: "text-[#fe007a]",
      primaryBg: "bg-[#fe007a]",
      primaryBorder: "border-[#fe007a]",
      glowColor: "rgba(254, 0, 122, 0.6)"
    },
    "theme-amber": {
      primaryHex: "#fcee0a",
      primaryText: "text-[#fcee0a]",
      primaryBg: "bg-[#fcee0a]",
      primaryBorder: "border-[#fcee0a]",
      glowColor: "rgba(252, 238, 10, 0.6)"
    }
  };

  const theme = themes[themeClass];
  if (!theme) return;

  // 1. Swap Active Nav Tab Button
  const activeTab = document.querySelector("#tab-status");
  if (activeTab) {
    activeTab.style.backgroundColor = theme.primaryHex;
    activeTab.style.borderColor = theme.primaryHex;
    activeTab.style.color = "#000000";
  }

  // 2. Swap Big Vault Button
  const vaultBtn = document.querySelector("button[onclick*='loot']");
  if (vaultBtn) {
    vaultBtn.style.backgroundColor = theme.primaryHex;
    vaultBtn.style.boxShadow = `0 0 15px ${theme.glowColor}`;
  }

  // 3. Swap "OPERATOR:" label & Avatar border
  const operatorLabel = document.querySelector("header div div");
  if (operatorLabel) operatorLabel.style.color = theme.primaryHex;

  // 4. Update Header Name Glow
  const glowNames = document.querySelectorAll(".glow-cyan, h2.glow-cyan");
  glowNames.forEach(el => {
    el.style.textShadow = `0 0 12px ${theme.glowColor}`;
  });

  // 5. Swap corner tick marks
  const box = document.querySelector(".hud-box");
  if (box) {
    box.style.setProperty("--theme-primary", theme.primaryHex);
  }

  localStorage.setItem("operator_hud_theme", themeClass);
}
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

    let borderAccent = "border-b-[#00f2fe] text-[#00f2fe]";
    if (item.rarity === "item-rare") borderAccent = "border-b-[#fe007a] text-[#fe007a]";
    if (item.rarity === "item-legendary") borderAccent = "border-b-[#fcee0a] text-[#fcee0a]";

    const card = document.createElement("div");
    card.className = `w-[130px] h-full flex-shrink-0 border-r border-[#1b2a4a] border-b-4 ${borderAccent} flex flex-col items-center justify-center font-orbitron text-[10px] text-center p-2 box-border bg-[#0a0f18] select-none`;
    card.innerHTML = `<span class="font-bold tracking-wide">${item.name}</span>`;
    strip.appendChild(card);
  }
}

// Global function callable from HTML onclick
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
      if (rewardDisplay) rewardDisplay.classList.add("hidden");

      const winningIndex = 32;
      const viewport = document.getElementById("roulette-viewport");
      const containerWidth = viewport ? viewport.offsetWidth : 540;
      const offset = -(winningIndex * CARD_WIDTH - (containerWidth / 2 - CARD_WIDTH / 2));

      setTimeout(() => {
        if (strip) {
          strip.style.transition = "transform 4.5s cubic-bezier(0.12, 0.8, 0.2, 1)";
          strip.style.transform = `translateX(${offset}px)`;
        }
      }, 50);

      setTimeout(() => {
        spinBtn.disabled = false;
        const wonReward = generatedCards[winningIndex];
        if (rewardDisplay && wonReward) {
          rewardDisplay.innerHTML = `
            <div class="text-[#fcee0a] font-bold font-orbitron text-xs">// DROP ACQUIRED: ${wonReward.name}</div>
            <div class="text-[11px] text-slate-400 mt-1 font-mono">${wonReward.desc}</div>
          `;
          rewardDisplay.classList.remove("hidden");
        }

        if (wonReward && typeof wonReward.action === "function") {
          wonReward.action();
        }
      }, 4600);
    };
  }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  initLootChestEvents();
  const savedTheme = localStorage.getItem("operator_hud_theme");
  if (savedTheme) document.body.classList.add(savedTheme);
});
