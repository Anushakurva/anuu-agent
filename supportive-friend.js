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

// Emotion and crisis detection
function generateReply(text, lang) {
  const lower = text.toLowerCase();

  const crisisWords = {
    en: ["suicide", "end my life", "kill myself"],
    hi: ["आत्महत्या", "मरना चाहता", "खत्म कर दूं"],
    te: ["ఆత్మహత్య", "చచ్చిపోవాలి", "నన్ను చంపుకోవాలి"],
    kn: ["ಆತ್ಮಹತ್ಯೆ", "ನಾನು ಸಾಯಬೇಕು", "ನನ್ನನ್ನು ಕೊಲ್ಲಬೇಕು"]
  };

  const stressWords = {
    en: ["tired", "anxious", "depressed", "sad", "stressed"],
    hi: ["थका", "चिंतित", "उदास", "तनाव"],
    te: ["అలసిపోయాను", "బాధగా ఉంది", "నిరుత్సాహంగా"],
    kn: ["ಥಾಕಿದೇನೆ", "ಚಿಂತೆ", "ದುಃಖ", "ಒತ್ತಡ"]
  };

  const responses = {
    en: {
      stress: [
        "Hey, this is Anusha. I'm here for you. Want to try a deep breath together?",
        "That sounds tough. You're not alone. Anusha is listening.",
        "Sending you a big virtual hug. You're doing your best."
      ],
      crisis: "I'm really sorry you're feeling this way. Please talk to someone you trust or call a local helpline. You're not alone, and you matter."
    },
    hi: {
      stress: [
        "मैं अनुषा हूँ, मैं तुम्हारे साथ हूँ। चलो एक गहरी साँस लें।",
        "यह कठिन लग रहा है। आप अकेले नहीं हैं।",
        "आपकी भावनाएँ महत्वपूर्ण हैं। सब ठीक हो जाएगा।"
      ],
      crisis: "मुझे खेद है कि आप ऐसा महसूस कर रहे हैं। कृपया किसी भरोसेमंद व्यक्ति से बात करें या हेल्पलाइन से संपर्क करें। आप अकेले नहीं हैं।"
    },
    te: {
      stress: [
        "నేను అనుషా. నీతోనే ఉన్నాను. ఒక లోతైన శ్వాస తీసుకుందాం.",
        "ఇది కష్టంగా అనిపిస్తోంది. నీవు ఒంటరిగా లేవు.",
        "నీ భావాలు ముఖ్యం. నీవు బలంగా ఉన్నావు."
      ],
      crisis: "నీవు ఇలా అనిపించుకోవడం బాధాకరం. దయచేసి నమ్మకమైన వ్యక్తిని సంప్రదించు లేదా హెల్ప్‌లైన్‌కు కాల్ చేయి. నీవు ఒంటరిగా లేవు."
    },
    kn: {
      stress: [
        "ನಾನು ಅನುಷಾ. ನಿನ್ನ ಜೊತೆಯಲ್ಲಿದ್ದೇನೆ. ಒಂದು ಆಳವಾದ ಉಸಿರಾಟ ಮಾಡೋಣ.",
        "ಇದು ಕಠಿಣವಾಗಿದೆ ಎಂದು ತೋರುತ್ತದೆ. ನೀನು ಒಬ್ಬಳಲ್ಲ.",
        "ನಿನ್ನ ಭಾವನೆಗಳು ಮುಖ್ಯ. ನೀನು ಶಕ್ತಿಶಾಲಿ."
      ],
      crisis: "ನೀನು ಹೀಗೆ ಅನುಭವಿಸುತ್ತಿರುವುದಕ್ಕೆ ವಿಷಾದವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಂಬಿಕಸ್ಥ ವ್ಯಕ್ತಿಯೊಂದಿಗೆ ಮಾತನಾಡಿ ಅಥವಾ ಸಹಾಯವಾಣಿ ಸಂಪರ್ಕಿಸಿ. ನೀನು ಒಬ್ಬಳಲ್ಲ."
    }
  };

  const crisis = crisisWords[lang].some(word => lower.includes(word));
  if (crisis) return responses[lang].crisis;

  const stress = stressWords[lang].some(word => lower.includes(word));
  if (stress) {
    const options = responses[lang].stress;
    return options[Math.floor(Math.random() * options.length)];
  }

  return {
    en: "I'm listening. Tell me more.",
    hi: "मैं सुन रही हूँ। और बताओ।",
    te: "నేను వింటున్నాను. ఇంకా చెప్పు.",
    kn: "ನಾನು ಕೇಳುತ್ತಿದ್ದೇನೆ. ಇನ್ನಷ್ಟು ಹೇಳು."
  }[lang];
}

// 🧘 Breathing Exercise
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

// 🎭 Distraction Generator
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
