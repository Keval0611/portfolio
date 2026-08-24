// Screen Navigation Switching
function switchScreen(screenId) {
  const screens = ['status', 'loot', 'missions', 'prototypes'];
  const tabs = ['tab-status', 'tab-loot', 'tab-missions', 'tab-prototypes'];
  
  screens.forEach(s => {
    const el = document.getElementById(`screen-${s}`);
    if (el) el.classList.add('hidden');
  });

  tabs.forEach(t => {
    const tabEl = document.getElementById(t);
    if (tabEl) {
      tabEl.className = "px-3 py-2 text-xs font-orbitron font-bold border border-slate-700 bg-hud-card text-slate-300 hover:border-hud-cyan hover:text-hud-cyan whitespace-nowrap transition";
    }
  });

  const activeScreen = document.getElementById(`screen-${screenId}`);
  if (activeScreen) activeScreen.classList.remove('hidden');

  const activeTab = document.getElementById(`tab-${screenId}`);
  if (activeTab) {
    activeTab.className = "px-3 py-2 text-xs font-orbitron font-bold border border-hud-cyan bg-hud-cyan text-black whitespace-nowrap transition";
  }
}

// Interactive Comms Dialogue Feeds
function triggerComms(mode) {
  const feed = document.getElementById('comms-text');
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
  const target = document.getElementById('sim-target').value;

  if (simInterval) {
    clearInterval(simInterval);
    simInterval = null;
    btn.innerText = "Run Demo";
    btn.classList.remove('bg-hud-magenta', 'text-white');
    btn.classList.add('bg-hud-cyan', 'text-black');
    statusEl.innerText = "IDLE";
    statusEl.className = "font-bold text-slate-400 text-xs";
    return;
  }

  btn.innerText = "Stop Demo";
  btn.classList.remove('bg-hud-cyan', 'text-black');
  btn.classList.add('bg-hud-magenta', 'text-white');

  const baseLatencies = { val: 24, cf: 12, ggl: 18 };

  simInterval = setInterval(() => {
    const base = baseLatencies[target] || 20;
    const isSpike = Math.random() < 0.15;
    const variance = isSpike ? Math.floor(Math.random() * 45) + 30 : Math.floor(Math.random() * 6) - 3;
    const currentRTT = Math.max(8, base + variance);
    const jitter = lastSimRTT > 0 ? Math.abs(currentRTT - lastSimRTT) : 1;
    lastSimRTT = currentRTT;

    rttEl.innerText = `${currentRTT} ms`;
    jitterEl.innerText = `${jitter} ms`;

    if (jitter > 20) {
      statusEl.innerText = "SPIKE";
      statusEl.className = "font-bold text-hud-magenta text-xs";
    } else {
      statusEl.innerText = "OPTIMAL";
      statusEl.className = "font-bold text-hud-green text-xs";
    }
  }, 600);
}

// 2. In-Browser CNN Softmax Inference Simulation
function runVisionInference() {
  const btn = document.getElementById('vision-btn');
  const target = document.getElementById('vision-sample').value;
  const labelTop = document.getElementById('label-top');
  const confTop = document.getElementById('conf-top');
  const barTop = document.getElementById('bar-top');
  const labelSub = document.getElementById('label-sub');
  const confSub = document.getElementById('conf-sub');
  const barSub = document.getElementById('bar-sub');

  btn.innerText = "Analyzing...";
  btn.disabled = true;

  const datasetMap = {
    plane: { top: "Airplane (Class 0)", topPct: 94.2, sub: "Bird (Class 2)", subPct: 4.1 },
    truck: { top: "Automobile/Truck (Class 9)", topPct: 91.8, sub: "Ship (Class 8)", subPct: 5.3 },
    dog:   { top: "Dog / Canine (Class 5)", topPct: 88.6, sub: "Cat / Feline (Class 3)", subPct: 8.4 },
    ship:  { top: "Ship / Vessel (Class 8)", topPct: 96.1, sub: "Airplane (Class 0)", subPct: 2.7 }
  };

  setTimeout(() => {
    const res = datasetMap[target];
    labelTop.innerText = `Identified: ${res.top}`;
    confTop.innerText = `${res.topPct}%`;
    barTop.style.width = `${res.topPct}%`;

    labelSub.innerText = `Secondary: ${res.sub}`;
    confSub.innerText = `${res.subPct}%`;
    barSub.style.width = `${res.subPct}%`;

    btn.innerText = "Classify";
    btn.disabled = false;
  }, 400);
}

// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    lucide.createIcons();
  }
});
