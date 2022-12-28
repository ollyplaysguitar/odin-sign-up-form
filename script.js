"use strict";

const form = document.querySelector("#form");
const btnSubmit = document.querySelector("#submit");

const validator = {
  len: (val, min) => val.length >= min,
  match: () => myForm["pword"].el.value === myForm["pword2"].el.value,
  email: (email) =>
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
  phone: (phone) => String(phone).match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im),
};

const toggleFormError = function (el, remove) {
  if (remove) {
    el.classList.remove("error");
    el.nextElementSibling.classList.add("hidden");
  } else {
    el.classList.add("error");
    el.nextElementSibling.classList.remove("hidden");
  }
};

const myForm = {
  fname: { el: document.querySelector("#fname"), validate: validator.len, args: 3 },
  lname: { el: document.querySelector("#lname"), validate: validator.len, args: 3 },
  email: { el: document.querySelector("#email"), validate: validator.email, args: null },
  phone: { el: document.querySelector("#phone"), validate: validator.phone, args: null },
  pword: { el: document.querySelector("#pword"), validate: validator.len, args: 8 },
  pword2: { el: document.querySelector("#pword2"), validate: validator.match, args: null },
};

form.addEventListener("focusout", function (e) {
  if (e.target.name === "submit") return;
  toggleFormError(e.target, myForm[e.target.name].validate(e.target.value, myForm[e.target.name].args));
});

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  validateForm();
});

const validateForm = function () {
  const formData = new FormData(form);
  for (let [name, value] of formData) {
    toggleFormError(myForm[name].el, myForm[name].validate(value, myForm[name].args));
  }
};
