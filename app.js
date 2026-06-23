let episodes = {
  sister: {
    label: "姐姐版 · 双人播客",
    title: "能源通道与SpaceX上市",
    topics: "霍尔木兹海峡谈判 · 商业航天IPO",
    audio: "latest_sister.mp3",
    age: 11,
    greeting: "姐姐，今天的新闻和开放式问题都听完了。你还有其他问题吗？",
    fallback: "这个问题很有意思，但今天的新闻资料还不足以让我准确回答。我不想猜。可以请爸爸妈妈一起查一个可靠来源。",
    answers: [
      {
        terms: ["霍尔木兹", "海峡", "通道", "在哪里"],
        answer: "霍尔木兹海峡位于波斯湾出口附近，是连接波斯湾和阿拉伯海的重要水道。许多能源运输船要从这里经过，所以它是否畅通会影响多个国家。"
      },
      {
        terms: ["油价", "石油", "能源", "涨价", "价格"],
        answer: "如果重要航道受阻，市场会担心石油不能按时送到，供应可能变少。需求没有同时减少时，价格就容易上涨。恢复通行会减轻这种担心。"
      },
      {
        terms: ["液化天然气", "天然气", "液化"],
        answer: "液化天然气是把天然气降到很低的温度，让它变成液体。液体体积更小，更方便装进大型船只运到其他国家。"
      },
      {
        terms: ["谈判", "协议", "信任", "美国", "伊朗"],
        answer: "谈判的作用是让双方把要求、担心和可以接受的办法说清楚。一次会议不一定解决所有问题，但可以先建立规则，再通过检查和后续会议确认大家有没有遵守。"
      },
      {
        terms: ["核查", "核问题", "核检查"],
        answer: "国际核查人员会查看相关设施和记录，确认核材料是否按照协议使用。对各方来说，可验证的事实比只靠口头承诺更容易建立信任。"
      },
      {
        terms: ["SpaceX", "spacex", "做什么", "什么公司"],
        answer: "SpaceX是一家航天科技公司。它制造和发射火箭，用龙飞船运送宇航员和货物，研制星舰，还通过星链卫星提供互联网服务。"
      },
      {
        terms: ["上市", "IPO", "首次公开募股", "股票"],
        answer: "上市是指公司第一次把股票公开卖给投资者。股票代表公司的一小部分所有权。投资者可能分享公司成长的收益，也要承担价格下跌和项目失败的风险。"
      },
      {
        terms: ["猎鹰", "火箭", "重复使用", "回收"],
        answer: "SpaceX的猎鹰九号火箭可以让第一级完成任务后返回并着陆，经过检查后再次飞行。重复使用有机会减少制造新火箭的次数，从而降低发射成本。"
      },
      {
        terms: ["龙飞船", "宇航员", "空间站"],
        answer: "龙飞船是SpaceX制造的航天器，可以把宇航员或货物送到国际空间站。完成任务后，它还能返回地球。"
      },
      {
        terms: ["星链", "卫星", "互联网"],
        answer: "星链由许多在近地轨道运行的小卫星组成。它们把互联网信号传到地面，尤其可以服务没有方便地面网络的地区。"
      },
      {
        terms: ["为什么重要", "影响", "商业航天", "投资"],
        answer: "SpaceX上市说明商业航天已经成为资本市场中的重要产业。更多资金可能加快火箭和卫星技术发展，但公司也要面对投资者对收益、风险和进度的要求。"
      }
    ]
  },
  younger: {
    label: "妹妹版 · 双人播客",
    title: "世界杯与长寿蝴蝶",
    topics: "48支球队 · Heliconius蝴蝶",
    audio: "../daily_sisters_news_podcast_2026-06-23_younger_dialogue_v2.mp3",
    age: 8,
    greeting: "妹妹，今天的新闻和开放式问题都听完了。你还有其他问题吗？",
    fallback: "这个问题很好。不过，今天的新闻没有告诉我们足够的信息。我先不乱猜。我们可以请爸爸妈妈一起查一查。",
    answers: [
      {
        terms: ["世界杯", "什么时候", "开始"],
        answer: "二零二六年世界杯从六月十一日开始，在美国、加拿大和墨西哥举行。它是第一次由三个国家一起主办。"
      },
      {
        terms: ["四十八", "48", "多少球队", "几支", "队伍"],
        answer: "这次有四十八支球队参加，比以前的三十二支更多。这样，一些以前很难进入世界杯的国家也有了机会。"
      },
      {
        terms: ["三个国家", "一起主办", "为什么三个", "主办国"],
        answer: "三个国家可以一起使用不同城市的球场，也能一起安排交通和接待球迷。不过，他们需要认真合作，才能让比赛顺利进行。"
      },
      {
        terms: ["淘汰赛", "淘汰", "输了"],
        answer: "淘汰赛里，获胜的球队继续比赛，输掉的球队离开这次比赛。球队一轮一轮比赛，最后选出冠军。"
      },
      {
        terms: ["第一次", "新球队", "首次参加"],
        answer: "有些国家的球队第一次来到世界杯。对这些球员和球迷来说，这是一次很特别的机会，也让更多地方的人能看到自己的球队。"
      },
      {
        terms: ["蝴蝶", "Heliconius", "叫什么"],
        answer: "这种蝴蝶叫Heliconius，生活在中美洲和南美洲的雨林里。它们是科学家研究长寿和变老过程的重要小帮手。"
      },
      {
        terms: ["活多久", "一年", "长寿", "寿命"],
        answer: "有些这种蝴蝶能活接近一年。和成年后只能活几个星期的一些蝴蝶相比，这已经很长了。"
      },
      {
        terms: ["为什么长寿", "为什么活", "变老"],
        answer: "科学家还没有找到全部答案。他们发现，这些蝴蝶会吃有营养的花粉，而且老了以后身体能力下降得比较慢。"
      },
      {
        terms: ["花粉", "吃什么", "食物"],
        answer: "花粉是花朵里的细小粉末，里面有营养。这种蝴蝶会吃花粉，科学家正在研究这是不是帮助它们活得更久。"
      }
    ]
  }
};

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
const answerAudio = new Audio();

let version = "sister";
let unlocked = true;
let recognition = null;
let episodeFinished = false;
let resumeAfterAnswer = false;

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
  utterance.rate = 1;
  utterance.pitch = version === "younger" ? 1.08 : 1;
  utterance.addEventListener("end", () => onEnd?.());
  utterance.addEventListener("error", () => onEnd?.());
  window.speechSynthesis.speak(utterance);
}

function playAnswer(text, audioPath, onEnd) {
  window.speechSynthesis.cancel();
  answerAudio.pause();
  answerAudio.src = audioPath;
  answerAudio.currentTime = 0;
  answerAudio.onended = () => onEnd?.();
  answerAudio.onerror = () => speak(text, onEnd);
  answerAudio.play().catch(() => speak(text, onEnd));
}

function addBubble(text, kind) {
  const bubble = document.createElement("p");
  bubble.className = `bubble ${kind}`;
  bubble.textContent = text;
  dialogue.appendChild(bubble);
  dialogue.scrollTop = dialogue.scrollHeight;
}

function setUnlocked(value) {
  unlocked = value;
  questionInput.disabled = !value;
  micButton.disabled = !value;
  sendButton.disabled = !value;
  questionInput.placeholder = value ? "输入问题，或点击麦克风" : "暂时无法提问";
  micState.className = `mic-state ${value ? "ready" : "locked"}`;
  micState.textContent = value ? "可提问" : "未开放";
}

function pauseForQuestion() {
  if (!audio.paused && !audio.ended) {
    resumeAfterAnswer = true;
    audio.pause();
  }
}

function resumeEpisode() {
  if (!resumeAfterAnswer || episodeFinished) return;
  resumeAfterAnswer = false;
  audio.play().catch(() => {
    addBubble("点击播放按钮，可以从刚才的位置继续。", "answer");
  });
}

function loadEpisode(nextVersion) {
  version = nextVersion;
  const episode = episodes[version];
  episodeFinished = false;
  resumeAfterAnswer = false;
  window.speechSynthesis.cancel();
  answerAudio.pause();
  audio.pause();
  audio.src = episode.audio;
  audio.load();
  playIcon.textContent = "▶";
  playButton.setAttribute("aria-label", "播放");
  timeline.value = 0;
  currentTime.textContent = "0:00";
  editionLabel.textContent = episode.label;
  episodeTitle.textContent = episode.title;
  episodeTopics.textContent = episode.topics;
  dialogue.innerHTML = '<p class="system-message">播放中提问时，节目会暂停，回答后继续。</p>';
  conversationTitle.textContent = "播放时也可以随时提问";
  setUnlocked(true);

  audienceButtons.forEach((button) => {
    const active = button.dataset.version === version;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function findAnswer(question) {
  const normalized = question.toLowerCase().replace(/\s+/g, "");
  const episode = episodes[version];
  let best = null;
  let bestScore = 0;

  episode.answers.forEach((item) => {
    const score = item.terms.reduce((total, term) => {
      return total + (normalized.includes(term.toLowerCase().replace(/\s+/g, "")) ? term.length : 0);
    }, 0);
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  });

  return best || {
    answer: episode.fallback,
    audio: episode.fallbackAudio
  };
}

function answerQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;
  pauseForQuestion();
  addBubble(cleanQuestion, "question");
  questionInput.value = "";
  const answer = findAnswer(cleanQuestion);
  window.setTimeout(() => {
    addBubble(answer.answer, "answer");
    playAnswer(answer.answer, answer.audio, resumeEpisode);
  }, 250);
}

function setupRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    micButton.hidden = true;
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "zh-CN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.addEventListener("start", () => {
    micState.className = "mic-state listening";
    micState.textContent = "正在听";
    micButton.textContent = "■";
  });

  recognition.addEventListener("result", (event) => {
    answerQuestion(event.results[0][0].transcript);
  });

  recognition.addEventListener("end", () => {
    micState.className = "mic-state ready";
    micState.textContent = "可提问";
    micButton.textContent = "●";
  });

  recognition.addEventListener("error", () => {
    addBubble("没有听清楚。可以再说一次，或者在下面输入问题。", "answer");
    resumeEpisode();
  });
}

playButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().catch(() => {
      addBubble("音频暂时没有开始，请再点一次播放。", "answer");
    });
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", () => {
  playIcon.textContent = "Ⅱ";
  playButton.setAttribute("aria-label", "暂停");
});

audio.addEventListener("pause", () => {
  if (!audio.ended) {
    playIcon.textContent = "▶";
    playButton.setAttribute("aria-label", "播放");
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
  episodeFinished = true;
  resumeAfterAnswer = false;
  playIcon.textContent = "↻";
  playButton.setAttribute("aria-label", "重新播放");
  conversationTitle.textContent = "你还有其他问题吗？";
  const greeting = episodes[version].greeting;
  addBubble(greeting, "answer");
  playAnswer(greeting, episodes[version].greetingAudio);
  questionInput.focus();
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
  if (unlocked) answerQuestion(questionInput.value);
});

micButton.addEventListener("click", () => {
  if (!unlocked || !recognition) return;
  pauseForQuestion();
  window.speechSynthesis.cancel();
  answerAudio.pause();
  recognition.start();
});

setupRecognition();

async function initialize() {
  try {
    const response = await fetch(`latest.json?ts=${Date.now()}`, { cache: "no-store" });
    if (response.ok) {
      const latest = await response.json();
      episodes = latest.episodes;
      episodeDate.textContent = latest.displayDate;
    }
  } catch {
    // The embedded episode remains available when opened without a web server.
  }

  loadEpisode(version);

  if (new URLSearchParams(window.location.search).has("questions")) {
    episodeFinished = true;
    conversationTitle.textContent = "你还有其他问题吗？";
    addBubble(episodes[version].greeting, "answer");
  }
}

initialize();
