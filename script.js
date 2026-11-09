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
const taskHelp = document.querySelector("#task-help");
const taskCharCount = document.querySelector("#task-char-count");
const taskSubmitButton = document.querySelector("#task-submit-button");
const taskSubmitStatus = document.querySelector("#task-submit-status");
const taskNoteOption = document.querySelector("#task-note-option");
const taskNoteFields = document.querySelector("#task-note-fields");
const taskNote = document.querySelector("#task-note");
const taskNoteError = document.querySelector("#task-note-error");
let isSubmittingTask = false;
let taskSubmitTimer = null;
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
    reviewOptions.disabled = !reviewOption.checked;
    reviewOption.setAttribute("aria-expanded", String(reviewOption.checked));
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

function updateTaskInputFeedback() {
    const raw = taskInput.value;
    const length = raw.length;
    const valid = raw.trim().length >= 2;

    taskCharCount.textContent = length + " / 40자";
    taskInput.classList.toggle("is-valid", valid);
    taskHelp.textContent = raw.trim().length === 0 ? "2~40자로 입력해 주세요."
        : valid ? "입력 조건을 충족했습니다." : "할 일을 2자 이상 입력해 주세요.";
    taskHelp.classList.toggle("is-valid", valid);
    if (valid) {
        taskError.textContent = "";
        taskInput.classList.remove("has-error");
        taskInput.setAttribute("aria-invalid", "false");
    } else if (taskInput.classList.contains("has-error")) {
        taskError.textContent = raw.trim().length === 0 ? "할 일을 입력해 주세요."
            : "할 일을 2자 이상 입력해 주세요.";
    }
}

function updateTaskNoteFields() {
    const enabled = taskNoteOption.checked;
    taskNoteFields.hidden = !enabled;
    taskNote.disabled = !enabled || isSubmittingTask;
    taskNote.required = enabled;
    taskNoteOption.setAttribute("aria-expanded", String(enabled));
    taskNoteError.textContent = "";
    taskNote.classList.remove("has-error");
    taskNote.setAttribute("aria-invalid", "false");
}

function setTaskSubmitState(isLoading) {
    isSubmittingTask = isLoading;
    taskForm.setAttribute("aria-busy", String(isLoading));
    taskSubmitButton.disabled = isLoading;
    taskSubmitButton.textContent = isLoading ? "추가 중…" : "할 일 추가하기";
    taskInput.disabled = isLoading;
    taskNoteOption.disabled = isLoading;
    taskNote.disabled = isLoading || !taskNoteOption.checked;
}

function showTaskSubmitMessage(message, status) {
    taskSubmitStatus.textContent = message;
    taskSubmitStatus.className = "task-submit-status";
    if (status) taskSubmitStatus.classList.add("is-" + status);
}

function showTaskInputError(message, input, error) {
    error.textContent = message;
    input.classList.add("has-error");
    input.setAttribute("aria-invalid", "true");
    showTaskSubmitMessage("", "");
    input.focus();
}

function addTaskToList(taskText, taskNoteText) {
    const listItem = document.createElement("li");
    const taskLabel = document.createElement("label");
    const checkbox = document.createElement("input");
    const taskInfo = document.createElement("span");
    const taskName = document.createElement("span");
    const removeButton = document.createElement("button");

    checkbox.type = "checkbox";
    taskInfo.className = "task-info";
    taskName.className = "task-name";
    taskName.textContent = taskText;
    taskInfo.appendChild(taskName);
    if (taskNoteText) {
        const noteLabel = document.createElement("small");
        noteLabel.className = "task-note-label";
        noteLabel.textContent = "메모: " + taskNoteText;
        taskInfo.appendChild(noteLabel);
    }
    taskLabel.appendChild(checkbox);
    taskLabel.appendChild(taskInfo);
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
    updateTaskProgress();
}

function addTask(event) {
    event.preventDefault();
    if (isSubmittingTask) return;

    const taskText = taskInput.value.trim();
    const taskNoteText = taskNoteOption.checked ? taskNote.value.trim() : "";

    if (taskText.length === 0) {
        showTaskInputError("할 일을 입력해 주세요.", taskInput, taskError);
        return;
    }
    if (taskText.length < 2) {
        showTaskInputError("할 일을 2자 이상 입력해 주세요.", taskInput, taskError);
        return;
    }
    if (taskNoteOption.checked && !taskNoteText) {
        showTaskInputError("메모를 입력하거나 메모 추가를 해제해 주세요.", taskNote, taskNoteError);
        return;
    }

    showTaskSubmitMessage("할 일을 추가하고 있습니다.", "loading");
    setTaskSubmitState(true);
    taskSubmitTimer = setTimeout(function () {
        taskSubmitTimer = null;
        const existing = taskList.querySelectorAll(".task-name");
        let duplicate = false;
        existing.forEach(function (item) {
            if (item.textContent === taskText) duplicate = true;
        });
        setTaskSubmitState(false);
        if (duplicate) {
            showTaskSubmitMessage("추가 실패: 같은 할 일이 이미 있습니다. 내용을 수정한 뒤 다시 추가해 주세요.", "error");
            taskInput.focus();
            return;
        }

        addTaskToList(taskText, taskNoteText);
        taskInput.value = "";
        taskNote.value = "";
        updateTaskInputFeedback();
        showTaskSubmitMessage("할 일을 체크리스트에 추가했습니다.", "success");
        taskInput.focus();
    }, 600);
}

taskForm.addEventListener("submit", addTask);
taskInput.addEventListener("input", function () {
    updateTaskInputFeedback();
    showTaskSubmitMessage("", "");
});
taskNoteOption.addEventListener("change", function () {
    updateTaskNoteFields();
    showTaskSubmitMessage("", "");
});
taskNote.addEventListener("input", function () {
    if (taskNote.value.trim() !== "") {
        taskNoteError.textContent = "";
        taskNote.classList.remove("has-error");
        taskNote.setAttribute("aria-invalid", "false");
    }
    showTaskSubmitMessage("", "");
});

openChecklist.addEventListener("click", function () {
    checklistPlanTitle.textContent = formData.title;
    showstep(4);
    updateTaskProgress();
    taskInput.focus();
});

checklistBack.addEventListener("click", function () {
    if (isSubmittingTask) return;
    showstep(3);
});

function resetChecklist() {
    if (taskSubmitTimer !== null) {
        clearTimeout(taskSubmitTimer);
        taskSubmitTimer = null;
    }
    setTaskSubmitState(false);
    taskList.textContent = "";
    taskInput.value = "";
    taskError.textContent = "";
    taskInput.classList.remove("has-error");
    taskInput.setAttribute("aria-invalid", "false");
    taskNoteOption.checked = false;
    taskNote.value = "";
    updateTaskNoteFields();
    updateTaskInputFeedback();
    showTaskSubmitMessage("", "");
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
    reviewOptions.disabled = true;
    reviewOption.setAttribute("aria-expanded", "false");
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


