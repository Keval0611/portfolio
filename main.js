// Navigation Screen Switcher
function switchScreen(screenId) {
  const screens = ['status', 'loot', 'missions', 'prototypes'];
  const tabs = ['tab-status', 'tab-loot', 'tab-missions', 'tab-prototypes'];
  
  // Hide all screens
  screens.forEach(s => {
    const el = document.getElementById(`screen-${s}`);
    if (el) el.classList.add('hidden');
  });

  // Reset all tabs to inactive styling
  tabs.forEach(t => {
    const tabEl = document.getElementById(t);
    if (tabEl) {
      tabEl.className = "px-3 py-2 text-xs font-orbitron font-bold border border-slate-700 bg-[#0a0f18] text-slate-300 hover:border-[#00f2fe] hover:text-[#00f2fe] whitespace-nowrap transition";
    }
  });

  // Show active screen
  const activeScreen = document.getElementById(`screen-${screenId}`);
  if (activeScreen) {
    activeScreen.classList.remove('hidden');
  }

  // Highlight active tab
  const activeTab = document.getElementById(`tab-${screenId}`);
  if (activeTab) {
    activeTab.className = "px-3 py-2 text-xs font-orbitron font-bold border border-[#00f2fe] bg-[#00f2fe] text-black whitespace-nowrap transition";
  }

  // Re-mount Lucide icons on tab switch
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Reset Directive / Target Objective Cycling Logic
let directiveIndex = 0;
const directives = [
  "IT Systems / Support Specialist",
  "Technical Operations & Systems Analyst",
  "Infrastructure & Network Support Specialist"
];

function resetObjectiveDirective() {
  directiveIndex = (directiveIndex + 1) % directives.length;
  const roleEl = document.getElementById('target-role-text');
  const commsEl = document.getElementById('comms-text');
  
  if (roleEl) {
    roleEl.innerText = directives[directiveIndex];
    roleEl.style.color = '#fcee0a';
    setTimeout(() => { roleEl.style.color = '#ffffff'; }, 500);
  }
  
  if (commsEl) {
    commsEl.innerText = `\"Directive updated: Target profile re-aligned to [${directives[directiveIndex]}]. System calibration complete.\"`;
  }
}

// Interactive Comms Dialogue Feeds
function triggerComms(mode) {
  const feed = document.getElementById('comms-text');
  if (!feed) return;

  if (mode === 'deploy') {
    feed.innerText = "\"Deployment readiness: 100%. Open to IT Systems Specialist & Operations opportunities in Ottawa, Sudbury, or Kitchener.\"";
  } else if (mode === 'skills') {
    feed.innerText = "\"Core matrix: L1/L2 Technical Support, Active Directory, Python automation, Win32 network optimization, and TensorFlow CNN pipelines.\"";
  } else if (mode === 'contact') {
    feed.innerText = "\"Transmission channel open: Connect via GitHub or direct professional channels for interview scheduling.\"";
  }
}

// 1. In-Browser Ping Simulation Logic
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

// 2. In-Browser CNN Softmax Inference Simulation
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

// Initial Screen Boot & Lucide Icon Initialization
document.addEventListener("DOMContentLoaded", () => {
  switchScreen('status');
  if (window.lucide) {
    lucide.createIcons();
  }
});
