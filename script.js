const music = document.getElementById("bgMusic");

const messages = [
"Honey… même loin, je sens ton cœur battre avec le mien.",
"Si je pouvais traverser l’écran, je te prendrais dans mes bras.",
"Ta force m’inspire chaque jour.",
"Même pendant tes moments difficiles, tu restes la plus belle chose de ma vie.",
"Repose-toi mon amour… je suis ton calme.",
"Ton sourire vaut toutes les distances du monde.",
"Je suis fier de toi, plus que tu ne l’imagines.",
"Chaque jour loin de toi est un jour de plus vers nos retrouvailles.",
"Je t’aime dans tes jours forts et encore plus dans tes jours fragiles.",
"Si la douleur te fatigue, laisse-moi porter ton cœur un instant.",
"Tu es mon endroit sûr.",
"Je suis jaloux de ton oreiller… il a plus de câlins que moi.",
"Même les étoiles ne brillent pas autant que toi.",
"Ferme les yeux… imagine mes bras autour de toi.",
"Honey, je t’aime. Profondément. Doucement. Pour longtemps."
];

const messageBox = document.getElementById("messageBox");
const messageText = document.getElementById("messageText");
const heartsContainer = document.getElementById("hearts-container");
const hint = document.getElementById("hint");

let musicStarted = false;
let isMessageActive = false;
let messageTimeout;
let hintTimeout;

function showMessage() {

    // 🚫 Bloquer si message déjà actif
    if (isMessageActive) return;

    isMessageActive = true;

    clearTimeout(messageTimeout);
    clearTimeout(hintTimeout);

    // 🎵 Musique
    if (!musicStarted) {
        music.volume = 0.5;
        music.play().catch(() => {});
        musicStarted = true;
    }

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

function createHearts() {

    heartsContainer.innerHTML = ""; // Nettoyage propre

    for (let i = 0; i < 15; i++) {

        const heart = document.createElement("div");
        heart.innerHTML = "💗";
        heart.style.position = "absolute";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "0";
        heart.style.fontSize = Math.random() * 20 + 15 + "px";
        heart.style.animation = "floatUp 3s linear forwards";

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
}