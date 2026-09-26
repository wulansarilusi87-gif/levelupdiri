// ===============================
// STATE
// ===============================

let user = {
  level: 1,
  xp: 0,
  totalCompleted: 0,
  todayXp: 0,
  streak: 0
};


// ===============================
// ELEMENTS
// ===============================

const levelElement = document.getElementById("level");
const xpElement = document.getElementById("xp");
const nextXpElement = document.getElementById("nextXp");
const xpBar = document.getElementById("xpBar");

const todayXpElement =
  document.getElementById("todayXp");

const completedQuestElement =
  document.getElementById("completedQuest");

const streakElement =
  document.getElementById("streak");

const toast =
  document.getElementById("toast");


// ===============================
// LOAD DATA
// ===============================

function loadData() {

  const savedData =
    localStorage.getItem("levelUpUser");

  if (savedData) {
    user = JSON.parse(savedData);
  }

  updateUI();
}


// ===============================
// SAVE DATA
// ===============================

function saveData() {

  localStorage.setItem(
    "levelUpUser",
    JSON.stringify(user)
  );
}


// ===============================
// UPDATE UI
// ===============================

function updateUI() {

  const requiredXp =
    user.level * 100;

  levelElement.textContent =
    user.level;

  xpElement.textContent =
    user.xp;

  nextXpElement.textContent =
    requiredXp;

  todayXpElement.textContent =
    `${user.todayXp} XP`;

  completedQuestElement.textContent =
    user.totalCompleted;

  streakElement.textContent =
    `${user.streak} hari`;

  const percentage =
    Math.min(
      (user.xp / requiredXp) * 100,
      100
    );

  xpBar.style.width =
    `${percentage}%`;
}


// ===============================
// ADD XP
// ===============================

function addXP(amount) {

  user.xp += amount;
  user.todayXp += amount;

  const requiredXp =
    user.level * 100;

  if (user.xp >= requiredXp) {

    user.xp -= requiredXp;

    user.level++;

    showToast(
      `🎉 LEVEL UP! Kamu sekarang Level ${user.level}`
    );

  } else {

    showToast(
      `+${amount} XP 🚀`
    );
  }

  updateUI();
  saveData();
}


// ===============================
// COMPLETE QUEST
// ===============================

function setupQuestButtons() {

  const buttons =
    document.querySelectorAll(
      ".complete-btn"
    );

  buttons.forEach(button => {

    button.addEventListener(
      "click",
      function () {

        const quest =
          this.closest(".quest");

        if (
          quest.classList.contains(
            "completed"
          )
        ) {
          return;
        }

        const xp =
          Number(
            quest.dataset.xp
          );

        quest.classList.add(
          "completed"
        );

        this.textContent =
          "✓ Selesai";

        user.totalCompleted++;

        user.streak =
          Math.max(
            user.streak,
            1
          );

        addXP(xp);
      }
    );

  });
}


// ===============================
// TOAST
// ===============================

function showToast(message) {

  toast.textContent =
    message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove(
      "show"
    );

  }, 2500);
}


// ===============================
// MODAL
// ===============================

const modal =
  document.getElementById(
    "questModal"
  );

const addQuestBtn =
  document.getElementById(
    "addQuestBtn"
  );

const closeModal =
  document.getElementById(
    "closeModal"
  );

addQuestBtn.addEventListener(
  "click",
  () => {

    modal.classList.add(
      "active"
    );

  }
);

closeModal.addEventListener(
  "click",
  () => {

    modal.classList.remove(
      "active"
    );

  }
);

modal.addEventListener(
  "click",
  event => {

    if (
      event.target === modal
    ) {
      modal.classList.remove(
        "active"
      );
    }

  }
);


// ===============================
// CREATE QUEST
// ===============================

const questForm =
  document.getElementById(
    "questForm"
  );

questForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    const name =
      document.getElementById(
        "questName"
      ).value;

    const xp =
      Number(
        document.getElementById(
          "questXp"
        ).value
      );

    createQuest(
      name,
      xp
    );

    questForm.reset();

    modal.classList.remove(
      "active"
    );

  }
);


// ===============================
// CREATE QUEST ELEMENT
// ===============================

function createQuest(
  name,
  xp
) {

  const questList =
    document.getElementById(
      "questList"
    );

  const quest =
    document.createElement(
      "div"
    );

  quest.className =
    "quest";

  quest.dataset.xp =
    xp;

  quest.innerHTML = `
    <div class="quest-icon">
      🎯
    </div>

    <div class="quest-content">
      <h3>${name}</h3>
      <p>Quest pribadi untuk meningkatkan dirimu.</p>
    </div>

    <div class="quest-right">
      <span class="quest-xp">
        +${xp} XP
      </span>

      <button class="complete-btn">
        Selesai
      </button>
    </div>
  `;

  questList.appendChild(
    quest
  );

  setupQuestButtons();
}


// ===============================
// DARK MODE
// ===============================

const themeBtn =
  document.getElementById(
    "themeBtn"
  );

themeBtn.addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "dark"
    );

    const dark =
      document.body.classList.contains(
        "dark"
      );

    themeBtn.textContent =
      dark ? "☀️" : "🌙";

    localStorage.setItem(
      "darkMode",
      dark
    );
  }
);


// ===============================
// LOAD DARK MODE
// ===============================

function loadTheme() {

  const dark =
    localStorage.getItem(
      "darkMode"
    ) === "true";

  if (dark) {

    document.body.classList.add(
      "dark"
    );

    themeBtn.textContent =
      "☀️";
  }
}


// ===============================
// START APP
// ===============================

loadData();
loadTheme();
setupQuestButtons();
