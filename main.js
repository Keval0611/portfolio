// Initialize Lucide SVG Icons
lucide.createIcons();

// Narrative Objectives Engine
const objectives = [
  {
    id: "LOG #01 // PRIMARY FIELD OBJECTIVE",
    text: '"Tactical Objective: To deliver rapid, tier-1/tier-2 IT diagnostics, hardware maintenance, and systems reliability for enterprise field environments—leveraging an analytical Computer Science foundation and practical business workflow execution."'
  },
  {
    id: "LOG #02 // TROUBLESHOOTING DOCTRINE",
    text: '"Operational Philosophy: Systematic root-cause isolation over guesswork. Whether diagnosing networked pay-station peripherals or remote client OS connectivity, every issue is documented, tracked, and eliminated with minimal downtime."'
  },
  {
    id: "LOG #03 // TECHNICAL & AUTOMATION SYNERGY",
    text: '"Development & Tools: Python-certified and trained in Machine Learning architectures (TensorFlow/CNNs), combining programmatic scripting with hands-on hardware troubleshooting to automate repetitive support workflows."'
  },
  {
    id: "LOG #04 // BUSINESS & SLA ACCOUNTABILITY",
    text: '"Business Operations: Holding a Business Diploma from Algonquin College, I manage shifts, balance audits, and interface directly with end-users while keeping strict adherence to operational KPIs and SLAs."'
  }
];

let currentObjIndex = 0;

function cycleObjective() {
  currentObjIndex = (currentObjIndex + 1) % objectives.length;
  const el = document.getElementById('dialogue-text');
  const idEl = document.getElementById('transmission-id');
  el.style.opacity = '0';
  setTimeout(() => {
    idEl.innerText = objectives[currentObjIndex].id;
    el.innerText = objectives[currentObjIndex].text;
    el.style.opacity = '1';
  }, 150);
}

const customDialogue = {
  field: '"Field Operations: Experienced in on-site terminal maintenance, hardware swaps, cash-handling systems, and rapid escalation resolution under tight service windows."',
  troubleshoot: '"Troubleshooting: Methodical diagnosis of connectivity, peripheral device drivers, operating system configurations, and customer-facing software errors."',
  biz: '"Business Operations: Trained in market research, SWOT analysis, inventory reconciliation, and front-line team supervision."'
};

function showDialogue(key) {
  const el = document.getElementById('dialogue-text');
  const idEl = document.getElementById('transmission-id');
  el.style.opacity = '0';
  setTimeout(() => {
    idEl.innerText = "QUERY RESPONSE // " + key.toUpperCase();
    el.innerText = customDialogue[key];
    el.style.opacity = '1';
  }, 150);
}

// Screen / Tab Switcher Logic
function switchScreen(screenName) {
  const screens = ['status', 'inventory', 'quests', 'prototypes', 'comms'];
  screens.forEach(s => {
    const el = document.getElementById('screen-' + s);
    const btn = document.getElementById('btn-' + s);
    if (s === screenName) {
      el.classList.remove('hidden');
      if (btn) {
        btn.classList.remove('text-slate-400', 'bg-black/40', 'border-slate-700');
        btn.classList.add('bg-hud-cyan', 'text-black', 'border-hud-cyan');
      }
    } else {
      el.classList.add('hidden');
      if (btn) {
        btn.classList.remove('bg-hud-cyan', 'text-black', 'border-hud-cyan');
        btn.classList.add('text-slate-400', 'bg-black/40', 'border-slate-700');
      }
    }
  });
}

// Loot Chest Unlock Animation & State
let chestOpen = false;
function openChest() {
  const container = document.getElementById('chest-container');
  const icon = document.getElementById('chest-icon');
  const prompt = document.getElementById('chest-prompt');

  container.classList.add('animate-chest-shake');
  setTimeout(() => {
    container.classList.remove('animate-chest-shake');
    chestOpen = true;
    icon.innerHTML = '<i data-lucide="sparkles" class="w-10 h-10 text-hud-cyan animate-pulse"></i>';
    icon.classList.remove('border-hud-yellow');
    icon.classList.add('border-hud-cyan', 'bg-hud-cyan/20');
    prompt.innerHTML = '<span class="text-hud-cyan glow-cyan">★ VAULT UNLOCKED // ALL CERTIFICATIONS ACTIVE ★</span>';
    lucide.createIcons();
  }, 400);
}

// In-Browser Ping Simulation Logic
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
    statusEl.className = "font-bold text-slate-400 text-sm";
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
      statusEl.className = "font-bold text-hud-magenta text-sm";
    } else {
      statusEl.innerText = "OPTIMAL";
      statusEl.className = "font-bold text-hud-green text-sm";
    }
  }, 600);
}
// In-Browser CNN Softmax Inference Simulation
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
