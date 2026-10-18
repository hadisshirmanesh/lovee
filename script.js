const $ = (selector) => document.querySelector(selector);

const toast = (message) => {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  window.setTimeout(() => element.classList.remove("show"), 2600);
};

function makeHeart() {
  const container = $(".floating-hearts");
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = ["♡", "♥", "✦", "💗"][Math.floor(Math.random() * 4)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${14 + Math.random() * 22}px`;
  heart.style.animationDuration = `${7 + Math.random() * 7}s`;
  container.appendChild(heart);
  window.setTimeout(() => heart.remove(), 15000);
}
for (let i = 0; i < 12; i++) window.setTimeout(makeHeart, i * 350);
window.setInterval(makeHeart, 1100);

$("#startBtn").addEventListener("click", () => {
  $("#reasons").scrollIntoView({ behavior: "smooth" });
  toast("خوش اومدی عزیزدلم، حمید جون 💗");
});

$("#reasonsGrid").addEventListener("click", (event) => {
  const card = event.target.closest(".reason-card");
  if (!card) return;
  $("#reasonReveal").textContent = card.dataset.message;
  $("#reasonReveal").animate(
    [{ transform: "scale(.98)", opacity: .5 }, { transform: "scale(1)", opacity: 1 }],
    { duration: 260, easing: "ease-out" }
  );
});

$("#openLetterBtn").addEventListener("click", () => {
  const content = $("#letterContent");
  content.hidden = !content.hidden;
  $("#openLetterBtn").textContent = content.hidden ? "نامه‌مو باز کن 💌" : "نامه رو ببند ♡";
  if (!content.hidden) content.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

const savedDate = localStorage.getItem("loveStartDate");
if (savedDate) {
  $("#startDate").value = savedDate;
  updateCounter(savedDate);
}

function updateCounter(dateValue) {
  if (!dateValue) {
    $("#daysCount").textContent = "♡";
    $("#dateMessage").textContent = "تاریخ خودتونو انتخاب کن؛ این قسمت منتظر خاطره‌ی شماست.";
    return;
  }
  const start = new Date(`${dateValue}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (Number.isNaN(start.getTime())) return;
  if (start > today) {
    $("#daysCount").textContent = "♡";
    $("#dateMessage").textContent = "این تاریخ هنوز نرسیده؛ یه تاریخ گذشته یا امروز انتخاب کن.";
    return;
  }
  const days = Math.floor((today - start) / 86400000);
  $("#daysCount").textContent = new Intl.NumberFormat("fa-IR").format(days);
  $("#dateMessage").textContent = "هر روز یه فرصت تازه‌ست برای ساختن یه خاطره‌ی قشنگ‌تر. 💞";
}

$("#saveDateBtn").addEventListener("click", () => {
  const value = $("#startDate").value;
  if (!value) {
    toast("اول تاریخ قشنگتون رو انتخاب کن 🌷");
    return;
  }
  const chosen = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (chosen > today) {
    toast("یه تاریخ گذشته یا امروز انتخاب کن عزیزم 💗");
    return;
  }
  localStorage.setItem("loveStartDate", value);
  updateCounter(value);
  toast("تاریخ قشنگتون ثبت شد 💞");
});

const quizAnswers = [
  "به اندازه‌ی همه‌ی قلب‌های این صفحه و بازم بیشتر! 💗",
  "اون‌قدر که این سایت برای گفتنش کم میاره! 🥹",
  "بذار حساب کنم... نه، بی‌نهایت راحت‌تره! ♾️",
  "به اندازه‌ی یه عالمه بغل و یه عالمه خاطره‌ی قشنگ! 🫂"
];
$("#loveQuizBtn").addEventListener("click", () => {
  $("#loveQuizResult").textContent = quizAnswers[Math.floor(Math.random() * quizAnswers.length)];
  burstHearts(8);
});

const hugs = [
  "بغل مجازی ارسال شد! محکم بگیرش 🫂💗",
  "یه بغل طولانی که فعلاً از پشت صفحه می‌فرستم! 🤗",
  "اگه نزدیکت بودم، این پیام تبدیل به یه بغل واقعی می‌شد. 💞"
];
$("#hugBtn").addEventListener("click", () => {
  $("#hugResult").textContent = hugs[Math.floor(Math.random() * hugs.length)];
  burstHearts(12);
});

const sweetMessages = [
  "یه یادآوری کوچولو: یکی اینجا خیلی دوستت داره. 💌",
  "آب بخور، یه کم استراحت کن و یادت باشه چقدر عزیزی. 🌷",
  "کاش الان می‌تونستم یه لبخند واقعی روی لبت بیارم. 😊",
  "امروزت هر جوری که بوده، امیدوارم ادامه‌ش قشنگ‌تر بشه. 🍓",
  "تو یکی از آدم‌های موردعلاقه‌ی دنیای منی. ♡"
];
$("#messageBtn").addEventListener("click", () => {
  $("#messageResult").textContent = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
});

$("#surpriseBtn").addEventListener("click", () => {
  const message = $("#surpriseMessage");
  message.hidden = !message.hidden;
  $("#surpriseBtn").textContent = message.hidden ? "آخرین سورپرایز ✨" : "یه بار دیگه بخون ♡";
  if (!message.hidden) burstHearts(24);
});

function burstHearts(count) {
  const container = $(".floating-hearts");
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = ["♡", "♥", "💗", "💖"][Math.floor(Math.random() * 4)];
    heart.style.left = `${25 + Math.random() * 50}%`;
    heart.style.bottom = `${10 + Math.random() * 30}%`;
    heart.style.fontSize = `${18 + Math.random() * 24}px`;
    heart.style.animationDuration = `${2 + Math.random() * 2}s`;
    container.appendChild(heart);
    window.setTimeout(() => heart.remove(), 5000);
  }
}


$("#yesLoveBtn").addEventListener("click", () => {
  $("#loveAnswer").textContent = "می‌دونستممم! 😭💗 بیا این همه بوس و بغل طلبت!";
  burstHearts(18);
});

$("#noLoveBtn").addEventListener("click", () => {
  $("#loveAnswer").textContent = "نه؟ 😏 من که می‌دونم دوستم دارییی! فقط خواستی ناز کنی، بیا بغلم حالا 💗🫂";
  burstHearts(10);
});
