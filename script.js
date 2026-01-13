let currentSrc = null;
let currentName = null;

const viewer = document.getElementById("viewer");
const bigImg = document.getElementById("bigImg");
const currentNameEl = document.getElementById("currentName");

const statusEl = document.getElementById("status");

const moveBtn = document.getElementById("moveBtn");
const loadBtn = document.getElementById("loadBtn");
const dlBtn = document.getElementById("dlBtn");

const loader = document.getElementById("loader");
const loaderText = document.getElementById("loaderText");
const cancelFake = document.getElementById("cancelFake");

const progressWrap = document.getElementById("progressWrap");
const progressBar = document.getElementById("progressBar");
const progressPct = document.getElementById("progressPct");
const progressLabel = document.getElementById("progressLabel");
const progressNote = document.getElementById("progressNote");

const voidMsg = document.getElementById("voidMsg");

function setStatus(msg){ statusEl.textContent = msg; }

// 1) Obrir foto (sense modal)
document.querySelectorAll(".thumb").forEach(btn => {
  btn.addEventListener("click", () => {
    currentSrc = btn.dataset.src;
    currentName = btn.dataset.name;

    viewer.hidden = false;
    bigImg.src = currentSrc;
    currentNameEl.textContent = currentName;

    // reset trampes
    setStatus("");
    loader.hidden = true;
    progressWrap.hidden = true;
    progressBar.style.width = "0%";
    progressPct.textContent = "0%";
    progressNote.textContent = "—";
  });
});

// 2) Botó que canvia de posició en clicar
moveBtn.addEventListener("click", () => {
  const parent = moveBtn.parentElement;
  const maxX = Math.max(0, parent.clientWidth - moveBtn.offsetWidth);
  const maxY = 120;

  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  moveBtn.style.position = "relative";
  moveBtn.style.left = x + "px";
  moveBtn.style.top = y + "px";

  const msgs = ["Ups.", "Gairebé.", "No era aquí.", "Segueix intentant-ho."];
  setStatus(msgs[Math.floor(Math.random() * msgs.length)]);
});

// 3) Loading infinit
let dotsTimer = null;
loadBtn.addEventListener("click", () => {
  loader.hidden = false;
  setStatus("Carregant contingut…");

  let dots = 0;
  if (dotsTimer) clearInterval(dotsTimer);
  dotsTimer = setInterval(() => {
    dots = (dots + 1) % 4;
    loaderText.textContent = "Carregant" + ".".repeat(dots);
  }, 450);
});

cancelFake.addEventListener("click", () => {
  loader.hidden = true;
  if (dotsTimer) clearInterval(dotsTimer);
  dotsTimer = null;
  setStatus("Cancel·lat. Però no s’ha resolt res.");
});

// 4) Descàrrega fake al 99% (de la foto oberta)
dlBtn.addEventListener("click", () => {
  if (!currentName) {
    setStatus("Primer obre una imatge.");
    return;
  }

  progressWrap.hidden = false;
  progressLabel.textContent = `Descarregant ${currentName}…`;
  progressNote.textContent = "Preparant fitxer…";
  setStatus("");

  let p = 0;
  progressBar.style.width = "0%";
  progressPct.textContent = "0%";

  const interval = setInterval(() => {
    if (p < 90) p += 10;
    else if (p < 99) p += 1;
    else p = 99;

    progressBar.style.width = p + "%";
    progressPct.textContent = p + "%";

    if (p === 99) {
      progressNote.textContent = "Quasi. Però no.";
      setStatus("La descàrrega s’ha quedat a 99% per sempre.");
      clearInterval(interval);
    }
  }, 200);
});

// 5) Scroll infinit buit
window.addEventListener("scroll", () => {
  const y = window.scrollY || document.documentElement.scrollTop;

  if (y > 300 && y % 420 < 12) {
    const msgs = [
      "Encara més avall.",
      "Ja quasi hi ets.",
      "La resposta és a sota. Sempre.",
      "Un últim esforç.",
      "Segueix."
    ];
    voidMsg.textContent = msgs[Math.floor(Math.random() * msgs.length)];
  }

  const nearBottom = window.innerHeight + y >= document.body.offsetHeight - 60;
  if (nearBottom) {
    const spacer = document.createElement("div");
    spacer.style.height = "55vh";
    document.body.appendChild(spacer);
  }
});
