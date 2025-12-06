const userText = document.getElementById("userText");
const friendReply = document.getElementById("friendReply");
const languageSelect = document.getElementById("language");
const breathingCircle = document.getElementById("breathingCircle");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.interimResults = false;

// 🎤 START / STOP LISTENING
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

// 🗣️ Text-to-Speech
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

// 😭 Emotion Detection
function detectEmotion(message) {
  if (message.includes("sad") || message.includes("cry")) return "sad";
  if (message.includes("stress") || message.includes("overthink")) return "stressed";
  if (message.includes("angry") || message.includes("mad")) return "angry";
  if (message.includes("alone") || message.includes("lonely")) return "lonely";
  if (message.includes("tired") || message.includes("exhausted")) return "tired";
  if (message.includes("confused") || message.includes("idk")) return "confused";

  return "default";
}

// ❤️ Friend-like Emotional Replies
function generateReply(text, lang) {
  const lower = text.toLowerCase();
  const emotion = detectEmotion(lower);

  // Crisis detection
  const crisisWords = ["suicide", "kill myself", "end my life"];
  if (crisisWords.some(w => lower.includes(w))) {
    return "I’m really sorry you’re feeling this way. Please reach out to someone you trust or a helpline. You matter a lot.";
  }

  // Emotional reply database
  const emotionalReplies = {
    en: {
      sad: [
        "Hey… come here. Tell me what happened, I’m right here.",
        "Your heart sounds heavy… let it out, I’m listening.",
        "It’s okay to feel sad. I’m with you."
      ],
      stressed: [
        "Breathe slowly… I’m right here. What stressed you out?",
        "You sound overwhelmed. Share with me, I’m not leaving.",
        "You’re doing your best. Tell me what’s on your mind."
      ],
      angry: [
        "It’s okay to be angry. Tell me what triggered you.",
        "Vent it out here, I won’t judge.",
        "Hmm… what made you feel this way? I’m listening."
      ],
      lonely: [
        "You’re not alone… I’m here with you.",
        "Talk to me… what’s making you feel lonely?",
        "I’m right here. You don’t have to deal with this alone."
      ],
      tired: [
        "You sound exhausted… sit and talk to me.",
        "Long day? Tell me what happened.",
        "Your energy feels drained… what’s bothering you?"
      ],
      confused: [
        "Hmm… tell me slowly. What’s confusing you?",
        "I’m here, let’s figure it out together.",
        "Start from the beginning… I’ll listen."
      ],
      default: [
        "I’m listening… go on.",
        "Tell me more, I’m here with you.",
        "Talk to me, I’m not going anywhere."
      ]
    },

    // You can add Telugu / Hindi / Kannada later here
    hi: {},
    te: {},
    kn: {}
  };

  const langBlock = emotionalReplies[lang] || emotionalReplies.en;
  const replyList = langBlock[emotion] || langBlock.default;

  return replyList[Math.floor(Math.random() * replyList.length)];
}

// 🧘‍♀️ BREATHING EXERCISE
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

// 🎭 DISTRACTION FUNCTION
function giveDistraction() {
  const jokes = [
    "Why don’t scientists trust atoms? Because they make up everything!",
    "What did the ocean say to the beach? Nothing, it just waved.",
    "Why did the scarecrow win an award? He was outstanding in his field!"
  ];

  const compliments = [
    "You're doing better than you think.",
    "You have a kind heart.",
    "Your presence makes a difference."
  ];

  const facts = [
    "Did you know? Hummingbirds can fly backwards.",
    "Elephants can recognize themselves in a mirror.",
    "Laughter boosts your immune system!"
  ];

  const all = [...jokes, ...compliments, ...facts];
  const pick = all[Math.floor(Math.random() * all.length)];

  friendReply.textContent = pick;
  speak(pick, languageSelect.value);
}
