let newPasswordValue;
let confirmationValue;
const submitBtn = document.getElementById("update-profile");
const newPassword = document.getElementById("new-password");
const confirmation = document.getElementById("password-confirmation");
const validationMessage = document.getElementById("validation-message");

// functions declaration
function validatePassword(message, add, remove) {
    validationMessage.textContent = message;
    validationMessage.classList.add(add);
    validationMessage.classList.remove(remove);
}

// DOM
confirmation.addEventListener("input", (e) => {
    e.preventDefault();
    newPasswordValue = newPassword.value;
    confirmationValue = confirmation.value;
    if (newPasswordValue !== confirmationValue) {
        validatePassword("password must match!", "color-red", "color-green");
        submitBtn.setAttribute("disabled", true);
    } else {
        validatePassword("password match!", "color-green", "color-red");
        submitBtn.removeAttribute("disabled");
    }
});
