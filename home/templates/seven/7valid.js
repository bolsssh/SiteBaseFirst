let filter = [];

const keypadZero = 48;
const numpadZero = 96;

for (let i = 0; i <= 9; i++) {
    filter.push(i + keypadZero);
    filter.push(i + numpadZero);
}

filter.push(8);
filter.push(9);
filter.push(46);
filter.push(37);
filter.push(39);

function onKeyDownValid(e) {
    console.dir(filter);
    console.log(e.keyCode);
    if (filter.indexOf(e.keyCode) < 0) {
        e.preventDefault();
        return false;
    }
}

function formatPhoneText(value) {
    value = value.replaceAll("-", "");
    console.log('input:' + value + ' ' + value.length);

    if (value.length < 5)
        value = value.slice(0, 1) + "-" + value.slice(1, 4);
    else if (value.length < 8) {
        value = value.slice(0, 1) + "-" + value.slice(1, 4) + "-" + value.slice(4, 7);
    } else if (value.length < 10)
        value = value.slice(0, 1) + "-" + value.slice(1, 4) + "-" + value.slice(4, 7)
            + "-" + value.slice(7, 9);
    else if (value.length >= 10)
        value = value.slice(0, 1) + "-" + value.slice(1, 4) + "-" + value.slice(4, 7)
            + "-" + value.slice(7, 9) + "-" + value.slice(9, 11);
    return value;
}


function validatePhone(p) {
    p = p.replaceAll('-', '');
    let phoneRe = /^((\+7|7|8)+([0-9]){10})$/;
    //let phoneRe = /^((\+7|7|8)(-)([0-9]){3}(-)([0-9]){3}(-)([0-9]){2}(-)([0-9]){2})$/;
    let digits = p.replace(/\D/g, "");
    return phoneRe.test(digits);
}

function onKeyUpValid(e) {
    let input = e.target;
    let formatted = formatPhoneText(input.value);
    let isValid = (validatePhone(formatted) || formatted.length == 0);
    let color = (isValid) ? "greenyellow" : "red";
    let borderWidth = (isValid) ? "3px" : "3px";
    input.style.borderColor = color;
    input.style.borderWidth = borderWidth;
    input.value = formatted;
}

function setupPhoneFields(className) {
    let lstPhoneFields = document.getElementsByClassName(className);
    for (let i = 0; i < lstPhoneFields.length; i++) {
        let input = lstPhoneFields[i];
        if (input.type.toLowerCase() == "text") {
            input.placeholder = "(X-XXX-XXX-XX-XX)";
            input.addEventListener("keydown", onKeyDownValid);
            input.addEventListener("keyup", onKeyUpValid);
        }
    }
}