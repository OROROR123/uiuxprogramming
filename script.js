const servicename = "FocusDay";
let issubscribed = false;
let submitcount = 0;


function makesubscribemessage(email, subscribed) {
    if (subscribed == true)
        return email + "로 알림 신청이 완료되었습니다. ";

    return "이메일을 입력한 뒤 신청해주세요.";}

const subscribeForm = document.querySelector("#subscribe-form");
const emailInput = document.querySelector("#email");
const subscribeButton = document.querySelector("#subscribe-button");
const subscribeMessage = document.querySelector("#subscribe-message");

function handleSubscribe(event) {
    event.preventDefault();

    const subscribeEmail = emailInput.value.trim();

    if (subscribeEmail === "") {
        subscribeMessage.textContent =
          "이메일을 입력한 뒤 신청해주세요.";
        emailInput.focus();
        return;
    }

    issubscribed = true;
    submitcount += 1;

    subscribeMessage.textContent = 
      makesubscribemessage(subscribeEmail, issubscribed);
      
    
    subscribeMessage.classList.add("is-success");

    subscribeButton.textContent = "신청 완료";
    subscribeButton.disabled = true;


}


subscribeForm.addEventListener("submit", handleSubscribe);

const themebutton = document.querySelector("#themebutton");
const nicknameinput = document.querySelector("#nickname");
const nicknameCount = document.querySelector("#nicknamecount");
const agreeCheck = document.querySelector("#agreecheck");
const agreemessage = document.querySelector("#agreemessage");
const startbutton = document.querySelector("#startbutton"); 

function handleThemeClick() {
    const isdark = document.body.classList.toggle("dark");

    themebutton.textContent = isdark ? "라이트 모드" : "다크 모드";
}    

themebutton.addEventListener("click", handleThemeClick);

function handleNicknameInput() {
    const maxLength = nicknameinput.maxLength;
    const currentLength = Math.min(nicknameinput.value.length, maxLength);
    nicknameCount.textContent = currentLength + " / " + maxLength;
}

nicknameinput.addEventListener("input", handleNicknameInput);

function handleAgreeChange() {
    const agreed = agreeCheck.checked;

    startbutton.disabled = !agreed;
    agreemessage.textContent = agreed ? 
    "설정을 시작할 수 있습니다." : "안내 사항을 확인해 주세요.";

    if (agreed) {
        agreemessage.classList.add("is-ready");
    } else {
        agreemessage.classList.remove("is-ready");
    }
}

agreeCheck.addEventListener("change", handleAgreeChange);

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanel() {
    tabs.forEach(function (tab) {
        tab.classList.remove("is-active");
        tab.setAttribute("aria-selected", "false");

    });
    panels.forEach(function (panel) {
        panel.classList.remove("is-active");
        panel.hidden = true;
    });
} 

function activateTab(clickedTab) {
    const targetselector = clickedTab.dataset.target;
    const targetPanel = document.querySelector(targetselector);
    
    clickedTab.classList.add("is-active");
    clickedTab.setAttribute("aria-selected","true");

    targetPanel.classList.add("is-active");
    targetPanel.hidden = false;
}

function handleTabClick(event) {
    resetTabsAndPanel();
    activateTab(event.currentTarget);
}

tabs.forEach(function (tab) {
    tab.addEventListener("click", handleTabClick);
});

const planningFlow = document.querySelector("#planning-flow");
const flowSteps = planningFlow.querySelectorAll(".step");
const progressItems = planningFlow.querySelectorAll(".progress-item");
const titleInput = document.querySelector("#plan-title");
const titleError = document.querySelector("#plan-title-error");
const titleNext = document.querySelector("#title-next");
const durationRange = document.querySelector("#duration-range");
const durationValue = document.querySelector("#duration-value");
const reviewOption = document.querySelector("#review-option");
const reviewOptions = document.querySelector("#review-options");
const optionPrev = document.querySelector("#option-prev");
const optionNext = document.querySelector("#option-next");
const summaryPrev = document.querySelector("#summary-prev");
const finishButton = document.querySelector("#finish-button");
const restartButton = document.querySelector("#restart-button");
const openChecklist = document.querySelector("#open-checklist");
const checklistBack = document.querySelector("#checklist-back");
const checklistRestart = document.querySelector("#checklist-restart");
const checklistPlanTitle = document.querySelector("#checklist-plan-title");
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskError = document.querySelector("#task-error");
const taskList = document.querySelector("#task-list");
const taskEmptyMessage = document.querySelector("#task-empty-message");
const taskCompleteMessage = document.querySelector("#task-complete-message");
const taskProgressText = document.querySelector("#task-progress-text");
const taskProgress = document.querySelector("#task-progress");
const summaryTitle = document.querySelector("#summary-title");
const summaryDuration = document.querySelector("#summary-duration");
const summaryReview = document.querySelector("#summary-review");
const durationValues = ["간단하게", "보통", "자세하게"];

const formData = {
    title: "", duration: "보통", review: false, reviewCount: "2"
};

function showstep(index) {
    flowSteps.forEach((step, i) => { step.hidden = i !== index; });
    progressItems.forEach((item, i) => {
        item.classList.toggle("is-active", i === index);
    });
}

const planningDialog = document.querySelector("#planning-dialog");
const planningCancel = document.querySelector("#planning-cancel");
const planningConfirm = document.querySelector("#planning-confirm");

function revokePlanningAgreement() {
    agreeCheck.checked = false;
    planningFlow.hidden = true;
    handleAgreeChange();
    agreeCheck.focus();
}

startbutton.addEventListener("click", () => {
    if (!agreeCheck.checked) return;
    planningDialog.showModal();
});
planningCancel.addEventListener("click", () => {
    planningDialog.close();
    revokePlanningAgreement();
});

planningDialog.addEventListener("cancel", revokePlanningAgreement);

planningConfirm.addEventListener("click", () => {
    if (!agreeCheck.checked) return;
    planningDialog.close();
    planningFlow.hidden = false;
    showstep(0);
    planningFlow.scrollIntoView({behavior: "smooth"});
    titleInput.focus();
});

function validateTitle() {
    const value = titleInput.value.trim();
    if (!value) {
        titleError.textContent = "계획 제목을 입력해 주세요.";
        titleInput.classList.add("has-error");
        titleInput.focus();
        return false;
    }

    titleError.textContent = "";
    titleInput.classList.remove("has-error");
    formData.title = value;
    return true;
}

titleNext.addEventListener("click", () => {
    if (!validateTitle()) return;
    showstep(1);
});

durationRange.addEventListener("input", () => {
    durationValue.value = durationValues[durationRange.value];
});

reviewOption.addEventListener("change", () => {
    reviewOptions.hidden = !reviewOption.checked;
});

optionPrev.addEventListener("click", () => showstep(0));
optionNext.addEventListener("click", () => {
    formData.duration = durationValues[durationRange.value];
    formData.review = reviewOption.checked;
    const count = document.querySelector('input[name="review-count"]:checked');
    formData.reviewCount = count.value;
    summaryTitle.textContent = formData.title;
    summaryDuration.textContent = formData.duration;
    summaryReview.textContent = formData.review ? formData.reviewCount + "개 포함" : "미포함";
    showstep(2);
});

summaryPrev.addEventListener("click", () => showstep(1));
finishButton.addEventListener("click", () => showstep(3));

function updateTaskProgress() {
    const tasks = taskList.querySelectorAll("li");
    const checkedTasks = taskList.querySelectorAll('input[type="checkbox"]:checked');

    taskProgressText.textContent = checkedTasks.length + " / " + tasks.length + "개 완료";
    taskProgress.max = tasks.length === 0 ? 1 : tasks.length;
    taskProgress.value = checkedTasks.length;

    taskEmptyMessage.hidden = tasks.length !== 0;
    taskCompleteMessage.hidden = tasks.length === 0 || checkedTasks.length !== tasks.length;
}

function addTask(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        taskError.textContent = "할 일을 입력한 뒤 추가해 주세요.";
        taskInput.classList.add("has-error");
        taskInput.focus();
        return;
    }

    taskError.textContent = "";
    taskInput.classList.remove("has-error");

    const listItem = document.createElement("li");
    const taskLabel = document.createElement("label");
    const checkbox = document.createElement("input");
    const taskName = document.createElement("span");
    const removeButton = document.createElement("button");

    checkbox.type = "checkbox";
    taskName.textContent = taskText;
    taskLabel.appendChild(checkbox);
    taskLabel.appendChild(taskName);
    removeButton.type = "button";
    removeButton.textContent = "삭제";
    removeButton.setAttribute("aria-label", taskText + " 삭제");

    listItem.appendChild(taskLabel);
    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);

    checkbox.addEventListener("change", function () {
        listItem.classList.toggle("is-done", checkbox.checked);
        updateTaskProgress();
    });

    removeButton.addEventListener("click", function () {
        listItem.remove();
        updateTaskProgress();
        taskInput.focus();
    });

    taskInput.value = "";
    taskInput.focus();
    updateTaskProgress();
}

taskForm.addEventListener("submit", addTask);
taskInput.addEventListener("input", function () {
    taskError.textContent = "";
    taskInput.classList.remove("has-error");
});

openChecklist.addEventListener("click", function () {
    checklistPlanTitle.textContent = formData.title;
    showstep(4);
    updateTaskProgress();
    taskInput.focus();
});

checklistBack.addEventListener("click", function () {
    showstep(3);
});

function resetChecklist() {
    taskList.textContent = "";
    taskInput.value = "";
    taskError.textContent = "";
    taskInput.classList.remove("has-error");
    checklistPlanTitle.textContent = "";
    updateTaskProgress();
}

function restartPlanning() {
    formData.title = "";
    formData.duration = "보통";
    formData.review = false;
    formData.reviewCount = "2";
    titleInput.value = "";
    titleError.textContent = "";
    titleInput.classList.remove("has-error");
    durationRange.value = "1";
    durationValue.value = "보통";
    reviewOption.checked = false;
    reviewOptions.hidden = true;
    document.querySelector('input[name="review-count"][value="2"]').checked = true;
    summaryTitle.textContent = "";
    summaryDuration.textContent = "";
    summaryReview.textContent = "";
    resetChecklist();
    showstep(0);
    titleInput.focus();
}

restartButton.addEventListener("click", restartPlanning);
checklistRestart.addEventListener("click", restartPlanning);




 