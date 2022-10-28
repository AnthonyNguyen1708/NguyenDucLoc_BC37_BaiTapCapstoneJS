function regexRequired(value, selectorError, name) {
  console.log(selectorError);
  if (value === "") {
    document.querySelector(selectorError).innerHTML =
      name + " không được bỏ trống!";
    document.querySelector(selectorError).style.display = "block";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

function regexLetter(value, selectorError, name) {
  var regexLetter = /^[A-Z a-z]+$/;
  if (regexLetter.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML = name + " phải là chữ cái!";
  document.querySelector(selectorError).style.display = "block";
  return false;
}

function regexIdNumber(value, selectorError, name) {
  var regexNumber = /^[0-9]+$/;
  if (regexNumber.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML = name + " phải là số!";
  document.querySelector(selectorError).style.display = "block";
  return false;
}
