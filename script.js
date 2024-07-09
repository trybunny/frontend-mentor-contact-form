"use strict";

let queryType;
let consent = false;
const errorIdx = document.querySelectorAll(".error");

const nameIp = document.querySelectorAll(".form-name-item input");
const emailIp = document.querySelector(".form-email input");
const queryIp = document.querySelector(".query-type-item");
const radioBtn = document.querySelectorAll(".radio-btn img");
const queryIpSpan = document.querySelectorAll(".radio-btn");
const msgIp = document.querySelector(".form-msg textarea");
const consentBox = document.querySelector("#consent-check");
const consentBoxCheck = document.querySelector("#consent-check img");
const submitBtn = document.querySelector(".form-btn");
const feedback = document.querySelector(".feedback");

class formData {
   constructor(firstName, lastName, email, queryType, msg, consent) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.queryType = queryType;
      this.msg = msg;
      this.consent = consent;
   }
}

const resetForm = function () {
   nameIp[0].value = nameIp[1].value = emailIp.value = msgIp.value = "";
   // resetting all radio btn & span
   for (let i = 0; i < radioBtn.length; i++) {
      radioBtn[i].classList.add("hidden");
      queryIpSpan[i].style.border = "1px solid hsl(186, 15%, 59%)";
   }
   queryType = undefined;
   consent = false;
   // resetting checkbox
   consentBoxCheck.classList.add("hidden");
};

queryIp.addEventListener("click", function (e) {
   // deciding which query is typed
   const type = e.target.closest(".type");
   // resetting all radio btn & span
   for (let i = 0; i < radioBtn.length; i++) {
      radioBtn[i].classList.add("hidden");
      queryIpSpan[i].style.border = "1px solid hsl(186, 15%, 59%)";
   }
   // deciding query type
   queryType = type.children[1].innerText;
   // adding radio btn
   type.children[0].style.border = "none";
   type.children[0].children[0].classList.remove("hidden");
});

const generateError = function (idx, msg) {
   errorIdx[idx].textContent = `${msg}`;
   errorIdx[idx].classList.remove("hidden");
};

function validateEmail(email) {
   let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
   return re.test(email);
}

const resetError = (ipEl, errEl) => {
   ipEl?.classList.remove("add-error");
   errEl.classList.add("hidden");
};

const validInput = (firstName, lastName, email, queryType, msg, consent) => {
   let flag = true;
   if (!firstName) {
      flag = false;
      nameIp[0].classList.add("add-error");
      generateError(0, "This field is required");
   } else {
      resetError(nameIp[0], errorIdx[0]);
   }
   if (!lastName) {
      flag = false;
      nameIp[1].classList.add("add-error");
      generateError(1, "This field is required");
   } else {
      resetError(nameIp[1], errorIdx[1]);
   }
   if (!email) {
      flag = false;
      emailIp.classList.add("add-error");
      generateError(2, "This field is required");
   } else if (!validateEmail(email)) {
      flag = false;
      emailIp.classList.add("add-error");
      generateError(2, "Please enter a valid email address");
   } else {
      resetError(emailIp, errorIdx[2]);
   }

   if (!queryType) {
      flag = false;
      generateError(3, "Please select query type");
   } else {
      resetError(undefined, errorIdx[3]);
   }

   if (!msg) {
      flag = false;
      generateError(4, "This field is required");
      msgIp.style.borderColor = "hsl(0, 66%, 54%)";
   } else {
      msgIp.style.borderColor = "hsl(186, 15%, 59%)";
      resetError(undefined, errorIdx[4]);
   }
   if (!consent) {
      flag = false;
      generateError(5, "To submit this form, please consent to being contacted");
   } else {
      resetError(undefined, errorIdx[5]);
   }
   return flag;
};

submitBtn.addEventListener("click", function (e) {
   e.preventDefault();
   const firstName = nameIp[0].value;
   const lastName = nameIp[1].value;
   const email = emailIp.value;
   const msg = msgIp.value;
   if (!consentBoxCheck.classList.contains("hidden")) {
      consent = true;
   }

   // validate input
   if (validInput(firstName, lastName, email, queryType, msg, consent)) {
      const obj = new formData(firstName, lastName, email, queryType, msg, consent);

      // feedback logic
      feedback.classList.remove("hidden");
      setTimeout(function () {
         feedback.classList.add("hidden");
      }, 5000);
      resetForm();
   } else {
      consent = false;
   }
});

consentBox.addEventListener("click", function () {
   consentBoxCheck.classList.toggle("hidden");
});
