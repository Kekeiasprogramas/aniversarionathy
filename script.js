// =========================
// CONFIGURAÇÃO DO FORMULÁRIO
// =========================

// COLOQUE AQUI O LINK DO SEU GOOGLE FORMS
const FORMS_URL = "COLE_AQUI_O_LINK_DO_SEU_GOOGLE_FORMS";

function openForms() {
  if (!FORMS_URL || !FORMS_URL.includes("http")) {
    alert(
      "O link do formulário ainda não foi configurado.\n\n" +
        "Abra o arquivo script.js e troque FORMS_URL pelo link do seu Google Forms."
    );
    return;
  }

  window.open(FORMS_URL, "_blank");
}

// =========================
// PÉTALAS ANIMADAS
// =========================
function createPetals(quantity = 22) {
  const container = document.getElementById("petals-container");
  if (!container) return;

  for (let i = 0; i < quantity; i++) {
    const petal = document.createElement("span");
    petal.classList.add("petal");

    const startX = Math.random() * 100;
    const endX = startX + (Math.random() * 20 - 10);

    petal.style.left = `${startX}vw`;
    petal.style.setProperty("--x-start", "0vw");
    petal.style.setProperty("--x-end", `${endX - startX}vw`);

    const duration = 12 + Math.random() * 10;
    const delay = Math.random() * -duration;

    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;

    container.appendChild(petal);
  }
}

// =========================
// MÚSICA DE FUNDO COM FADE
// =========================
let music, musicBtn;
let musicStarted = false;
let fadeInterval = null;

function fadeInMusic(targetVolume = 0.5, step = 0.02, intervalMs = 200) {
  if (!music) return;
  clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    if (music.volume < targetVolume) {
      music.volume = Math.min(targetVolume, music.volume + step);
    } else {
      clearInterval(fadeInterval);
    }
  }, intervalMs);
}

async function startMusic() {
  if (!music) return;
  try {
    music.volume = 0;
    const playPromise = music.play();
    if (playPromise !== undefined) {
      await playPromise;
    }
    fadeInMusic();
    musicStarted = true;
    if (musicBtn) {
      musicBtn.textContent = "🎵 Música ligada";
      musicBtn.classList.add("music-on");
    }
  } catch (err) {
    console.warn("Autoplay bloqueado:", err);
  }
}

function stopMusic() {
  if (!music) return;
  clearInterval(fadeInterval);
  music.pause();
  musicStarted = false;
  if (musicBtn) {
    musicBtn.textContent = "🎵 Ativar música";
    musicBtn.classList.remove("music-on");
  }
}

function setupMusic() {
  music = document.getElementById("bgMusic");
  musicBtn = document.getElementById("musicToggle");
  if (!music || !musicBtn) return;

  music.volume = 0;

  musicBtn.addEventListener("click", () => {
    if (!musicStarted) {
      startMusic();
    } else {
      stopMusic();
    }
  });
}

// =========================
// INTRO SCREEN (TELA INICIAL)
// =========================
function setupIntroScreen() {
  const intro = document.getElementById("introScreen");
  const main = document.getElementById("mainContent");
  const btn = document.getElementById("enterBtn");

  if (!intro || !main || !btn) return;

  btn.addEventListener("click", async () => {
    // some a tela de intro com fade
    intro.classList.add("hide");

    // mostra o conteúdo principal depois da animação
    setTimeout(() => {
      intro.style.display = "none";
      main.removeAttribute("hidden");
      main.classList.add("show");
    }, 500); // mesmo tempo da transição no CSS

    // inicia a música com fade-in
    await startMusic();
  });
}

// =========================
// INICIALIZAÇÃO
// =========================
document.addEventListener("DOMContentLoaded", () => {
  createPetals();
  setupMusic();
  setupIntroScreen();
});

// =========================
// CONTADOR REGRESSIVO
// =========================

function startCountdown() {
  const eventDate = new Date("2025-12-07T13:00:00"); // data + hora do evento
  const cdDays = document.getElementById("cd-days");
  const cdHours = document.getElementById("cd-hours");
  const cdMinutes = document.getElementById("cd-minutes");
  const cdSeconds = document.getElementById("cd-seconds");

  function update() {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      cdDays.textContent = "00";
      cdHours.textContent = "00";
      cdMinutes.textContent = "00";
      cdSeconds.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    cdDays.textContent = String(days).padStart(2, "0");
    cdHours.textContent = String(hours).padStart(2, "0");
    cdMinutes.textContent = String(minutes).padStart(2, "0");
    cdSeconds.textContent = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

startCountdown();

