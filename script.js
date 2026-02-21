const music = document.getElementById("bgMusic");

const messages = [
"Honey… même loin, je sens ton cœur battre avec le mien.",
"Tu es la paix que je cherche après chaque journée.",
"Repose-toi mon amour, ton corps mérite toute la tendresse.",
"Même dans le silence, mon amour pour toi parle fort.",
"Tu rends mes journées plus légères.",
"La distance mesure les kilomètres, pas l’intensité.",
"Je t’aime dans tes jours forts et encore plus dans tes jours fragiles.",
"Tu es ma douceur dans un monde parfois dur.",
"Respire doucement… je suis avec toi.",
"Je pense à toi plus souvent que tu ne l’imagines.",
"Même fatiguée, tu restes magnifique à mes yeux.",
"Je veux être ton refuge, pas seulement ton amoureux.",
"Prends ton temps, je reste à tes côtés.",
"Tu es mon endroit sûr.",
"Chaque étoile ce soir me rappelle toi.",
"Tu n’as pas besoin d’être forte tout le temps.",
"Je te choisis. Chaque jour. Même loin.",
"Je suis fier de toi, plus que tu ne l’imagines.",
"Avec toi, même la distance devient poésie.",
"Si la douleur te fatigue, laisse-moi porter ton cœur un instant.",
"Je suis reconnaissant de t’avoir.",
"Si mon cœur avait une adresse, ce serait toi.",
"Même dans tes jours gris, tu es ma couleur préférée.",
"Je voudrais te tenir la main jusqu’à ce que ça aille mieux.",
"Ton sourire vaut toutes les distances du monde.",
"Je suis là pour toi, même quand tu te sens fragile.",
"Je t’aime aussi dans tes silences.",
"Tu es la plus belle chose de ma vie.",
"Mon cœur te reconnaît toujours.",
"Ta sensibilité est une force, pas une faiblesse.",
"Je veux construire des souvenirs avec toi.",
"Chaque jour loin de toi est un jour de plus vers nos retrouvailles.",
"Je t’aime dans les petits détails.",
"Même les étoiles ne brillent pas autant que toi.",
"Je voudrais être la chaleur qui te réconforte.",
"Je pense à toi avant même que ma journée commence.",
"Tu es mon calme quand tout bouge autour.",
"Je veux que tu te sentes aimée, même à distance.",
"Ferme les yeux… imagine mes bras autour de toi.",
"Je t’aime profondément. Doucement. Pour longtemps.",
"Tu es plus forte que tu ne le crois.",
"Si je pouvais, je t’enverrais un câlin à travers l’écran.",
"Je veux être celui qui t’apaise.",
"Même loin, je me sens proche de toi.",
"Je t’aime pour ce que tu es, et pour tout ce que tu deviendras."
];

const messageBox = document.getElementById("messageBox");
const messageText = document.getElementById("messageText");
const heartsContainer = document.getElementById("hearts-container");
const hint = document.getElementById("hint");
const secretOverlay = document.getElementById("secretOverlay");
const secretEnvelope = document.getElementById("secretEnvelope");
const paperSound = document.getElementById("paperSound");

let musicStarted = false;
let isMessageActive = false;
let messageTimeout;
let hintTimeout;

function showMessage() {

    // 💓 Vibration tactile (mobile)
    if (navigator.vibrate) {
        navigator.vibrate(40);
    }

    // Effet tactile visuel pour iPhone
    document.body.style.transform = "scale(0.995)";
    setTimeout(() => {
        document.body.style.transform = "scale(1)";
    }, 100);


    // 🚫 Bloquer si message déjà actif
    if (isMessageActive) return;

    isMessageActive = true;

    clearTimeout(messageTimeout);
    clearTimeout(hintTimeout);

    // 🎵 Musique
    
    // Cacher hint
    hint.style.opacity = "0";

    // Message aléatoire
    const randomIndex = Math.floor(Math.random() * messages.length);
    messageText.textContent = messages[randomIndex];

    messageBox.classList.remove("hidden");

    createHearts();

    // Disparition message
    messageTimeout = setTimeout(() => {

        messageBox.classList.add("hidden");
        isMessageActive = false;

        // Réafficher hint après 4 sec si aucun clic
        hintTimeout = setTimeout(() => {
            if (!isMessageActive) {
                hint.style.opacity = "1";
            }
        }, 4000);

    }, 6000);
}

function createHearts(type = "normal") {

    heartsContainer.innerHTML = "";

    for (let i = 0; i < 15; i++) {

        const heart = document.createElement("div");
        heart.innerHTML = type === "special" ? "💖" : "💗";

        heart.style.filter = "drop-shadow(0 0 8px gold)";
        heart.style.position = "absolute";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "0px";
        heart.style.fontSize = (Math.random() * 15 + 18) + "px";
        heart.style.opacity = "1";
        heart.style.transition = "transform 3s linear, opacity 3s linear";

        heartsContainer.appendChild(heart);

        // Lancer animation après insertion
        setTimeout(() => {
            heart.style.transform = "translateY(-120vh)";
            heart.style.opacity = "0";
        }, 50);

        // Supprimer après animation
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
}

// 🌌 Génération étoiles arrière-plan
function generateBackgroundStars() {

    const bg = document.querySelector(".background-stars");

    let starCount = window.innerWidth < 768 ? 60 : 100;

    for (let i = 0; i < starCount; i++) {

        const star = document.createElement("div");
        star.classList.add("star-bg");

        star.style.top = Math.random() * 100 + "vh";
        star.style.left = Math.random() * 100 + "vw";

        star.style.animationDuration = (Math.random() * 3 + 2) + "s";

        bg.appendChild(star);
    }
}

generateBackgroundStars();

const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");
const container = document.querySelector(".container");

enterBtn.addEventListener("click", () => {
    //console.log("CLICK INTRO");
    // Effet tactile léger
    document.body.style.transform = "scale(0.98)";
    setTimeout(() => {
        document.body.style.transform = "scale(1)";
    }, 120);

    // 🎵 Lancer musique avec fade-in
    music.volume = 0;
    music.play().catch(() => {});

    let volume = 0;
    const fadeIn = setInterval(() => {
        if (volume < 0.5) {
            volume += 0.02;
            music.volume = volume;
        } else {
            clearInterval(fadeIn);
        }
    }, 200);

    intro.style.opacity = "0";

    setTimeout(() => {
        intro.style.display = "none";
        container.style.display = "block";

        setTimeout(() => {
            container.style.opacity = "1";
        }, 100);

    }, 1500);
});


let wasPlaying = false;

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        // Sauvegarder si la musique jouait
        wasPlaying = !music.paused;
        music.pause();

    } else {

        // Si elle jouait avant, on reprend
        if (wasPlaying) {
            setTimeout(() => {
                music.play().catch(() => {});
            }, 300);
        }

    }

});

function showSpecialMessage() {

    if (isMessageActive) return;

    isMessageActive = true;
    hint.style.opacity = "0";

    secretOverlay.classList.remove("hidden");
    setTimeout(() => {
    secretOverlay.classList.add("active");
    }, 10);
}

if (secretEnvelope) {
    secretEnvelope.addEventListener("click", () => {

    secretEnvelope.classList.add("open");

    if (paperSound) {
        paperSound.play().catch(()=>{});
    }

    setTimeout(() => {

        messageText.textContent =
        "Honey… tu viens d’ouvrir le message le plus précieux. Même dans un ciel rempli d’étoiles, c’est toi que mon cœur choisit.";

        messageBox.classList.remove("hidden");
        createHearts("special");

        secretOverlay.classList.remove("active");

        setTimeout(() => {
            secretOverlay.classList.add("hidden");
            secretEnvelope.classList.remove("open");
            isMessageActive = false;
        }, 600);

    }, 700);

});
}
