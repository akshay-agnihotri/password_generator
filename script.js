const inputSlider = document.querySelector("[dataLengthSlider]");
const lengthDisplay = document.querySelector("[data-length-number]");
const indicator = document.querySelector("[data-indicator]");
const upperCaseCheck = document.querySelector("#upperCase");
const LowerCaseCheck = document.querySelector("#lowerCase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const AllCheckbox = document.querySelectorAll("input[type=checkbox]");
const generate_button = document.querySelector(".generate");
const display = document.querySelector(".display");
const copyBtn = document.querySelector("#copybtn");

let PasswordLength = 10;
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

// set password length
function handleSlider() {
  inputSlider.value = PasswordLength;
  lengthDisplay.textContent = PasswordLength; // Set the text-content of lengthDisplay to PasswordLength
}
// on Load
handleSlider();

inputSlider.addEventListener("input", function () {
  PasswordLength = parseInt(inputSlider.value);
  handleSlider();
});

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  // shadow
  indicator.style.boxShadow = `0 0 15px 1px ${color}`;
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomNumber() {
  return getRandomInteger(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(getRandomInteger(97, 123));
}

function generateUpperCase() {
  return String.fromCharCode(getRandomInteger(65, 91));
}

function generateSymbols() {
  return symbols[getRandomInteger(0, symbols.length)];
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;

  if (upperCaseCheck.checked) hasUpper = true;

  if (LowerCaseCheck.checked) hasLower = true;

  if (symbolCheck.checked) hasSym = true;

  if (numberCheck.checked) hasNum = true;

  if (hasUpper && hasLower && (hasNum || hasSym) && PasswordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    PasswordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

function generateRandomPassword() {
  let hasUpper = upperCaseCheck.checked;
  let hasLower = LowerCaseCheck.checked;
  let hasNum = numberCheck.checked;
  let hasSym = symbolCheck.checked;

  let randomInt;
  let password = "";

  for (let i = 0; i < parseInt(inputSlider.value); i++) {
    randomInt = Math.floor(Math.random() * 4 + 1);

    if (randomInt === 1 && !hasUpper) {
      i--;
      continue;
    } else if (randomInt === 2 && !hasLower) {
      i--;
      continue;
    } else if (randomInt === 3 && !hasNum) {
      i--;
      continue;
    } else if (randomInt === 4 && !hasSym) {
      i--;
      continue;
    }

    if (randomInt === 1 && hasUpper) {
      password += generateLowerCase();
    } else if (randomInt === 2 && hasLower) {
      password += generateUpperCase();
    } else if (randomInt === 3 && hasNum) {
      password += generateRandomNumber();
    } else if (randomInt === 4 && hasSym) {
      password += generateSymbols();
    }
  }

  return password;
}

generate_button.addEventListener("click", function () {
  if (
    AllCheckbox[0].checked ||
    AllCheckbox[1].checked ||
    AllCheckbox[2].checked ||
    AllCheckbox[3].checked
  ) {
    let password = generateRandomPassword();
    display.value = password;
    calcStrength();
  }
});

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
}

copyBtn.addEventListener("click", function () {
  if (
    AllCheckbox[0].checked ||
    AllCheckbox[1].checked ||
    AllCheckbox[2].checked ||
    AllCheckbox[3].checked
  ) {
    copyToClipboard(display.value);
    document.querySelector('#Copied').style.display = 'block';
    setTimeout(() => {
        document.querySelector('#Copied').style.display = 'none';
    }, 2000); // 5000 milliseconds = 5 seconds
  }
});
