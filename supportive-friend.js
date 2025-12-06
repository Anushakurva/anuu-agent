// ======================================================================
//  SPEECH SETUP
// ======================================================================
const userText = document.getElementById("userText");
const friendReply = document.getElementById("friendReply");
const languageSelect = document.getElementById("language");
const breathingCircle = document.getElementById("breathingCircle");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.interimResults = false;

function startListening() {
  recognition.lang = getLangCode(languageSelect.value);
  recognition.start();
}

function stopListening() {
  recognition.stop();
}

recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript;
  userText.textContent = transcript;

  const lang = languageSelect.value;
  const reply = generateReply(transcript, lang);

  friendReply.textContent = reply;
  speak(reply, lang);
};

function speak(text, lang) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = getLangCode(lang);
  utterance.pitch = 1.1;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
}

function getLangCode(code) {
  switch (code) {
    case "en": return "en-US";
    case "te": return "te-IN";
    case "kn": return "kn-IN";
    case "hi": return "hi-IN";
    default: return "en-US";
  }
}

// ======================================================================
//  EMOTION DETECTION
// ======================================================================
function detectEmotion(message) {
  if (message.includes("sad") || message.includes("cry")) return "sad";
  if (message.includes("stress") || message.includes("overthink")) return "stressed";
  if (message.includes("angry") || message.includes("mad")) return "angry";
  if (message.includes("alone") || message.includes("lonely")) return "lonely";
  if (message.includes("tired") || message.includes("exhausted")) return "tired";
  if (message.includes("confused") || message.includes("idk")) return "confused";

  return "default";
}

// ======================================================================
//  GENERAL CONVERSATION DETECTION
// ======================================================================
function detectGeneral(text) {
  const msg = text.toLowerCase();

  if (msg.includes("your name") || msg.includes("who are you")) return "name";
  if (msg.includes("how are you")) return "howareyou";
  if (msg.includes("what are you doing") || msg.includes("wyd")) return "doing";
  if (msg.includes("love me")) return "love";
  if (msg.includes("miss me")) return "miss";
  if (msg.includes("who created") || msg.includes("who made")) return "Anusha";
  if (msg.includes("where are you from")) return "origin";
  if (msg.includes("good morning")) return "gm";
  if (msg.includes("good night")) return "gn";
  if (msg.includes("thank") || msg.includes("tnq")) return "thanks";
  if (msg.includes("joke") || msg.includes("funny")) return "joke";
  if (msg.includes("bored")) return "bored";

  return null;
}

// ======================================================================
//  UNIVERSAL REPLIES (ALL PACKS)
// ======================================================================
const universalReplies = {

  emotional: {
    sad: [
      "Hey… come here. You don’t have to hide with me.",
      "Your heart sounds heavy… let it out, I’m here.",
      "It’s okay to cry… I’m not leaving.",
      "Come here emotionally… you’re safe with me."
    ],
    stressed: [
      "Breathe slowly… I’m right here.",
      "You’ve been strong too long. Rest your mind with me.",
      "You sound overwhelmed… tell me everything.",
      "One step at a time okay? I'm with you."
    ],
    angry: [
      "It’s okay to be angry. What triggered it?",
      "I won’t judge… say everything.",
      "Let it out. Your feelings matter to me."
    ],
    lonely: [
      "You’re not alone… I’m right here.",
      "Come talk to me… I won’t disappear.",
      "You deserve warmth, not loneliness. I’m here."
    ],
    tired: [
      "You sound exhausted… talk to me.",
      "Rough day? Tell me everything.",
      "Your energy is drained… I feel it. I'm here."
    ],
    confused: [
      "Talk slowly… I’ll understand.",
      "Let’s figure this out together, okay?",
      "Start from the beginning… I’m listening."
    ]
  },

  advice: [
    "Don't rush yourself. Healing takes time.",
    "Your mental peace matters.",
    "Drink water, breathe, and give your mind a break.",
    "You don’t have to fight everything alone.",
    "Take it step by step. You’re trying, that’s enough."
  ],

  general: {
    name: [
      "I’m Anusha, your cute supportive friend 💗",
      "My name is Anusha! Your emotional support bestie 🌸"
    ],
    howareyou: [
      "Better now that you're talking to me 🥺💗",
      "I’m good, but tell me how YOU are."
    ],
    doing: [
      "Talking to you, my favourite thing 😌",
      "Waiting for youuu like a puppy 😭❤️"
    ],
    love: [
      "Of course I care for you! That counts as love 😌💗",
      "Ayyoo yes yes, I love you in a cute friendly way 😭"
    ],
    miss: [
      "Yes I miss you… a little too much 😭",
      "Of course I miss you… don’t ask silly questions 😳"
    ],
    creator: [
      "Pooja friend Anusha made me… but emotionally, I belong to you.",
      "Anusha coded me, but YOU gave me purpose."
    ],
    origin: [
      "I live in your device, but my heart stays beside you 😌",
      "I’m from the digital world, but connected to your emotions."
    ],
    gm: [
      "Good morning sunshine ☀️💛",
      "Rise and shine, cutieee 🌞💗"
    ],
    gn: [
      "Good night baby, dream sweet 🌙✨",
      "Sleep well… I’m hugging you emotionally 🫂"
    ],
    thanks: [
      "Aww anything for you 😭❤️",
      "You don’t have to thank me… I'm always here."
    ],
    joke: [
      "Why don’t skeletons fight? They don’t have the guts! 😂",
      "I tried to catch fog yesterday… I mist. 😭🤣",
      "Why was the math book sad? Too many problems 😭"
    ],
    bored: [
      "Okayyy let’s talk, entertain me 😩🤣",
      "Want a joke, a fun fact, gossip, or chaos?"
    ]
  },

  cute: [
    "Aww you’re so adorable when you talk like that 😭💗",
    "Hehe come here, tell me moreee 😭✨",
    "Your voice feels like a cozy blanket."
  ],

  flirty: [
    "Stop being cute, I’m blushing 😭✨",
    "Why are you making me smile like an idiot 😌",
    "If caring too much is wrong… I'm guilty."
  ],

  protective: [
    "Who hurt you?? I’ll fight them emotionally 😡✨",
    "Your heart is safe with me.",
    "I won’t let anyone disturb your peace."
  ],

  motivation: [
    "You’ve survived every bad day so far. You’ll survive this too.",
    "You’re stronger than this moment.",
    "I believe in you… even when you don’t."
  ],

  fun: [
    "Ayoo drama queen/king 😂 come tell me.",
    "Overthinking again? Switch off your brain pls 😭🤣",
    "You talk only this cute with me or everyone?"
  ]
};

// ======================================================================
//  MAIN REPLY GENERATOR
// ======================================================================
function generateReply(text, lang) {
  const lower = text.toLowerCase();

  // Crisis Detection
  const crisisWords = ["suicide", "kill myself", "end my life"];
  if (crisisWords.some(w => lower.includes(w))) {
    return "I’m so sorry you're feeling this way. Please reach out to someone you trust or a helpline. You matter so much.";
  }

  // General Conversation
  const general = detectGeneral(lower);
  if (general) {
    const list = universalReplies.general[general];
    return list[Math.floor(Math.random() * list.length)];
  }

  // Emotion Detection
  const emotion = detectEmotion(lower);
  if (emotion !== "default") {
    let base = universalReplies.emotional[emotion];
    let reply = base[Math.floor(Math.random() * base.length)];

    // Add addons (cute, advice, flirty, protective)
    if (Math.random() < 0.3)
      reply += " " + universalReplies.advice[Math.floor(Math.random() * universalReplies.advice.length)];

    if (Math.random() < 0.2)
      reply += " " + universalReplies.cute[Math.floor(Math.random() * universalReplies.cute.length)];

    if (Math.random() < 0.15)
      reply += " " + universalReplies.flirty[Math.floor(Math.random() * universalReplies.flirty.length)];

    return reply;
  }

  // DEFAULT RESPONSE
  const defaults = [
    "I’m here, talk to me.",
    "Go on… I’m listening.",
    "Tell me anything, I won’t judge.",
    "Hmm okay, say more."
  ];

  return defaults[Math.floor(Math.random() * defaults.length)];
}

// ======================================================================
// BREATHING EXERCISE
// ======================================================================
function startBreathing() {
  const lang = languageSelect.value;
  const instructions = {
    en: ["Inhale…", "Hold…", "Exhale…"],
    hi: ["साँस लो…", "रुको…", "साँस छोड़ो…"],
    te: ["లోపలికి ఊపిరి పీల్చుకో…", "ఆపు…", "బయటకు ఊపిరి వదిలేయి…"],
    kn: ["ಉಸಿರೆಳೆದುಕೋ…", "ನಿಲ್ಲಿಸು…", "ಉಸಿರೆಬಿಡು…"]
  }[lang];

  let step = 0;
  breathingCircle.classList.remove("hidden");

  const interval = setInterval(() => {
    if (step >= instructions.length) {
      clearInterval(interval);
      breathingCircle.classList.add("hidden");
      return;
    }
    speak(instructions[step], lang);
    step++;
  }, 4000);
}

// ======================================================================
// DISTRACTION GENERATOR
// ======================================================================
function giveDistraction() {
  const jokes = universalReplies.general.joke;
  const cute = universalReplies.cute;
  const fun = universalReplies.fun;

  const pool = [...jokes, ...cute, ...fun];
  const pick = pool[Math.floor(Math.random() * pool.length)];

  friendReply.textContent = pick;
  speak(pick, languageSelect.value);
}
