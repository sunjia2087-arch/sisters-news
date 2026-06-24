let latestData = null;
let episodes = {};

const audio = document.querySelector("#podcast");
const playButton = document.querySelector("#play-button");
const playIcon = document.querySelector("#play-icon");
const timeline = document.querySelector("#timeline");
const currentTime = document.querySelector("#current-time");
const duration = document.querySelector("#duration");
const episodeDate = document.querySelector("#episode-date");
const editionLabel = document.querySelector("#edition-label");
const episodeTitle = document.querySelector("#episode-title");
const episodeTopics = document.querySelector("#episode-topics");
const conversationTitle = document.querySelector("#conversation-title");
const micState = document.querySelector("#mic-state");
const dialogue = document.querySelector("#dialogue");
const questionForm = document.querySelector("#question-form");
const questionInput = document.querySelector("#question-input");
const micButton = document.querySelector("#mic-button");
const sendButton = document.querySelector("#send-button");
const audienceButtons = [...document.querySelectorAll(".audience")];

let version = "sister";
let recognition = null;
let episodeFinished = false;
let resumeAfterAnswer = false;
let isListening = false;
let recognitionStartTimer = null;
let browserTtsIndex = 0;
let browserTtsPlaying = false;
let browserTtsPaused = false;

function formatTime(value) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function speak(text, onEnd) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = version === "younger" ? 1.03 : 1.05;
  utterance.pitch = version === "younger" ? 1.08 : 1;
  utterance.addEventListener("end", () => onEnd?.());
  utterance.addEventListener("error", () => onEnd?.());
  window.speechSynthesis.speak(utterance);
}

function setPlayState(playing) {
  playIcon.textContent = playing ? "Ⅱ" : "▶";
  playButton.setAttribute("aria-label", playing ? "暂停" : "播放");
}

function addBubble(text, kind) {
  const bubble = document.createElement("p");
  bubble.className = `bubble ${kind}`;
  bubble.textContent = text;
  dialogue.appendChild(bubble);
  dialogue.scrollTop = dialogue.scrollHeight;
}

function setInputsEnabled(value) {
  questionInput.disabled = !value;
  micButton.disabled = !value;
  sendButton.disabled = !value;
  questionInput.placeholder = value ? "输入问题，或点击麦克风" : "暂时无法提问";
  micState.className = `mic-state ${value ? "ready" : "locked"}`;
  micState.textContent = value ? "可提问" : "未开放";
}

function pauseForQuestion() {
  if (currentEpisode()?.audioMode === "browser-tts" && browserTtsPlaying) {
    resumeAfterAnswer = true;
    browserTtsPaused = true;
    window.speechSynthesis.pause();
    setPlayState(false);
    return;
  }

  if (!audio.paused && !audio.ended) {
    resumeAfterAnswer = true;
    audio.pause();
  }
}

function resumeEpisode() {
  if (!resumeAfterAnswer || episodeFinished) return;
  resumeAfterAnswer = false;
  if (currentEpisode()?.audioMode === "browser-tts") {
    browserTtsPaused = false;
    browserTtsPlaying = true;
    window.speechSynthesis.resume();
    setPlayState(true);
    return;
  }
  audio.play().catch(() => {
    addBubble("点击播放按钮，可以从刚才的位置继续。", "answer");
  });
}

function currentEpisode() {
  return episodes[version];
}

function contextSummary(episode) {
  const titles = episode.stories.map((story) => story.title).join("；");
  return `今天这一版的新闻上下文已经准备好：${titles}。`;
}

function finishEpisode() {
  episodeFinished = true;
  resumeAfterAnswer = false;
  browserTtsPlaying = false;
  browserTtsPaused = false;
  playIcon.textContent = "↻";
  playButton.setAttribute("aria-label", "重新播放");
  conversationTitle.textContent = "开放问题回答";
  const prompt = currentEpisode().completionPrompt;
  addBubble(prompt, "answer");
  speak(prompt);
  questionInput.focus();
}

function speakBrowserTtsLine() {
  const episode = currentEpisode();
  const script = episode.ttsScript || [];
  if (!browserTtsPlaying || browserTtsPaused) return;

  if (browserTtsIndex >= script.length) {
    finishEpisode();
    return;
  }

  const line = script[browserTtsIndex];
  const utterance = new SpeechSynthesisUtterance(line.text);
  utterance.lang = "zh-CN";
  utterance.rate = version === "younger" ? 1.03 : 1.05;
  utterance.pitch = line.role === "新闻伙伴" ? 0.96 : 1.05;
  utterance.addEventListener("end", () => {
    browserTtsIndex += 1;
    currentTime.textContent = `${Math.min(browserTtsIndex, script.length)}/${script.length}`;
    timeline.value = script.length ? (browserTtsIndex / script.length) * 100 : 0;
    speakBrowserTtsLine();
  });
  utterance.addEventListener("error", () => {
    addBubble("浏览器朗读被中断了。可以再点一次播放继续。", "answer");
    browserTtsPlaying = false;
    setPlayState(false);
  });
  window.speechSynthesis.speak(utterance);
}

function playBrowserTts() {
  const episode = currentEpisode();
  if (!episode.ttsScript?.length) {
    addBubble("今天的朗读稿没有加载成功，请稍后刷新页面。", "answer");
    return;
  }

  if (browserTtsPlaying && browserTtsPaused) {
    browserTtsPaused = false;
    setPlayState(true);
    window.speechSynthesis.resume();
    return;
  }

  if (episodeFinished || browserTtsIndex >= episode.ttsScript.length) {
    episodeFinished = false;
    browserTtsIndex = 0;
    timeline.value = 0;
    currentTime.textContent = "0/0";
  }

  browserTtsPlaying = true;
  browserTtsPaused = false;
  setPlayState(true);
  window.speechSynthesis.resume();
  speakBrowserTtsLine();
}

function pauseBrowserTts() {
  browserTtsPaused = true;
  window.speechSynthesis.pause();
  setPlayState(false);
}

async function requestDynamicAnswer(question) {
  if (!latestData?.interaction?.dynamicBackendConfigured || !latestData?.interaction?.backendEndpoint) {
    return {
      answer: currentEpisode().backendUnavailableMessage,
      dynamic: false
    };
  }

  const response = await fetch(latestData.interaction.backendEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      version,
      question,
      episode: currentEpisode(),
      interaction: latestData.interaction
    })
  });

  if (!response.ok) {
    throw new Error("Dynamic backend request failed");
  }

  return response.json();
}

async function answerQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;

  pauseForQuestion();
  addBubble(cleanQuestion, "question");
  questionInput.value = "";

  try {
    const result = await requestDynamicAnswer(cleanQuestion);
    const answer = result.answer || currentEpisode().backendUnavailableMessage;
    addBubble(answer, "answer");
    speak(answer, resumeEpisode);
  } catch {
    const fallback = "动态互动后端暂时不可用。我不会猜答案。可以稍后再试，或继续播放节目。";
    addBubble(fallback, "answer");
    speak(fallback, resumeEpisode);
  }
}

function loadEpisode(nextVersion) {
  version = nextVersion;
  const episode = currentEpisode();
  episodeFinished = false;
  resumeAfterAnswer = false;
  window.speechSynthesis.cancel();
  browserTtsIndex = 0;
  browserTtsPlaying = false;
  browserTtsPaused = false;
  audio.pause();
  if (episode.audioMode === "browser-tts") {
    audio.removeAttribute("src");
    audio.load();
    duration.textContent = episode.ttsScript?.length ? `${episode.ttsScript.length}句` : "朗读";
  } else {
    audio.src = episode.audio;
    audio.load();
  }
  setPlayState(false);
  timeline.value = 0;
  currentTime.textContent = episode.audioMode === "browser-tts" ? "0/0" : "0:00";
  editionLabel.textContent = episode.label;
  episodeTitle.textContent = episode.title;
  episodeTopics.textContent = episode.topics;
  conversationTitle.textContent = "播放时也可以随时提问";
  dialogue.innerHTML = "";
  addBubble("播放中提问时，节目会暂停。当前未配置安全动态后端，页面不会用关键词预设答案冒充理解。", "system-message");
  if (episode.audioMode === "browser-tts") {
    addBubble("今天使用浏览器中文朗读播放，音色会跟设备有关。", "system-message");
  }
  addBubble(contextSummary(episode), "system-message");
  setInputsEnabled(true);

  audienceButtons.forEach((button) => {
    const active = button.dataset.version === version;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function setupRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    micButton.dataset.mode = "dictation";
    micButton.title = "使用键盘听写";
    micButton.setAttribute("aria-label", "使用键盘听写");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "zh-CN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;

  recognition.addEventListener("start", () => {
    window.clearTimeout(recognitionStartTimer);
    isListening = true;
    micState.className = "mic-state listening";
    micState.textContent = "正在听";
    micButton.textContent = "■";
    micButton.setAttribute("aria-label", "停止录音");
  });

  recognition.addEventListener("result", (event) => {
    answerQuestion(event.results[0][0].transcript);
  });

  recognition.addEventListener("end", () => {
    window.clearTimeout(recognitionStartTimer);
    isListening = false;
    micState.className = "mic-state ready";
    micState.textContent = "可提问";
    micButton.textContent = "●";
    micButton.setAttribute("aria-label", "语音提问");
  });

  recognition.addEventListener("error", (event) => {
    window.clearTimeout(recognitionStartTimer);
    const messages = {
      "not-allowed": "浏览器没有获得麦克风权限。可以在浏览器设置中允许麦克风，或直接输入文字。",
      "service-not-allowed": "浏览器当前不允许网页语音识别。可以点击输入框，使用键盘听写。",
      "audio-capture": "没有检测到可用麦克风。请检查系统麦克风权限。",
      "no-speech": "没有听到说话声，请靠近麦克风再试一次。",
      "network": "语音识别服务暂时无法连接。可以直接输入文字。"
    };
    addBubble(messages[event.error] || "没有听清楚。可以再说一次，或者在下面输入问题。", "answer");
    resumeEpisode();
  });
}

async function requestMicrophone() {
  if (!navigator.mediaDevices?.getUserMedia) return true;

  try {
    micState.className = "mic-state listening";
    micState.textContent = "申请权限";
    const stream = await Promise.race([
      navigator.mediaDevices.getUserMedia({ audio: true }),
      new Promise((_, reject) => {
        window.setTimeout(() => {
          const error = new Error("Microphone permission timed out");
          error.name = "TimeoutError";
          reject(error);
        }, 15000);
      })
    ]);
    stream.getTracks().forEach((track) => track.stop());
    micState.className = "mic-state ready";
    micState.textContent = "可提问";
    return true;
  } catch {
    addBubble("暂时无法使用麦克风。可以点击输入框，使用键盘输入或听写。", "answer");
    micState.className = "mic-state ready";
    micState.textContent = "可提问";
    return false;
  }
}

playButton.addEventListener("click", () => {
  if (currentEpisode()?.audioMode === "browser-tts") {
    if (browserTtsPlaying && !browserTtsPaused) {
      pauseBrowserTts();
    } else {
      playBrowserTts();
    }
    return;
  }

  if (audio.paused) {
    if (audio.ended) audio.currentTime = 0;
    audio.play().catch(() => {
      addBubble("音频暂时没有开始，请再点一次播放。", "answer");
    });
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", () => {
  setPlayState(true);
});

audio.addEventListener("pause", () => {
  if (!audio.ended) {
    setPlayState(false);
  }
});

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTime.textContent = formatTime(audio.currentTime);
  timeline.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
});

audio.addEventListener("ended", () => {
  finishEpisode();
});

timeline.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (Number(timeline.value) / 100) * audio.duration;
  }
});

audienceButtons.forEach((button) => {
  button.addEventListener("click", () => loadEpisode(button.dataset.version));
});

questionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  answerQuestion(questionInput.value);
});

micButton.addEventListener("click", async () => {
  if (!recognition) {
    questionInput.focus();
    addBubble("当前浏览器不支持网页直接录音识别。请点击输入框，使用键盘听写或输入文字。", "answer");
    return;
  }

  if (isListening) {
    recognition.stop();
    return;
  }

  pauseForQuestion();
  window.speechSynthesis.cancel();
  const permitted = await requestMicrophone();
  if (!permitted) {
    resumeEpisode();
    return;
  }

  try {
    recognition.start();
    recognitionStartTimer = window.setTimeout(() => {
      if (isListening) return;
      addBubble("浏览器没有启动语音识别。可以直接输入文字。", "answer");
      micState.className = "mic-state ready";
      micState.textContent = "可提问";
      resumeEpisode();
    }, 2500);
  } catch {
    addBubble("麦克风正在准备中，请稍等一下再点击。", "answer");
    resumeEpisode();
  }
});

setupRecognition();

async function initialize() {
  setInputsEnabled(false);
  try {
    const response = await fetch(`latest.json?ts=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("latest.json request failed");
    latestData = await response.json();
    episodes = latestData.episodes;
    episodeDate.textContent = latestData.displayDate;
    loadEpisode(version);
  } catch {
    addBubble("没有加载到今日节目数据。请稍后刷新页面。", "answer");
  }
}

initialize();
