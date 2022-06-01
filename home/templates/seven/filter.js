function setupFilter(className) {
    let fields = document.getElementsByClassName(className);
    for (let i = 0; i < fields.length; i++) {
        let input = fields[i];
        {
            //input.addEventListener("keydown", onKeyDownValid);
            input.addEventListener("keyup", onKeyUpFilter);
        }

    }
}


let searchFilter = '';

// function onKeyDown(e) {
//     e.preventDefault();
//     return false;
// }

function onKeyUpFilter(e) {
    let input = e.target;
    searchFilter = input.value;
    showContacts();
}

function isValid(name, phone) {
    console.log('validation: ' + phone + ' ' + name);

    return phone.replaceAll('-', '').startsWith(searchFilter)
        || name.toLowerCase().startsWith(searchFilter)
        || searchFilter.length === 0;

}