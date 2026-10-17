const servicename = "FocusDay";
let issubscribed = false;
let submitcount = 0;


function makesubscribemessege(email, subscribed) {
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
      makesubscribemessege(subscribeEmail, issubscribed);
      
    
    subscribeMessage.classList.add("is-success");

    subscribeButton.textContent = "신청 완료";
    subscribeButton.disabled = true;


}


subscribeForm.addEventListener("submit", handleSubscribe);

const themebutton = document.querySelector("#themebutton");
const nicknameinput = document.querySelector("#nickname");
const nicknameCount = document.querySelector("#nicknamecount");
const agreecheck = document.querySelector("#agreecheck");
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
    const agreed = agreecheck.checked;

    startbutton.disabled = !agreed;
    agreemessage .textContent = agreed ? 
    "시작할 수 있습니다." : "동의 후 시작할 수 있습니다.";

    if (agreed) {
        agreemessage.classList.add("is-ready");
    } else {
        agreemessage.classList.remove("is-ready");
    }
}

agreecheck.addEventListener("change", handleAgreeChange);

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

function handleTabclick(event) {
    resetTabsAndPanel();
    activateTab(event.currentTarget);
}

tabs.forEach(function (tab) {
    tab.addEventListener("click", handleTabclick);
});





 