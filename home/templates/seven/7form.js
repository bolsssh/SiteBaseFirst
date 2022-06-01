const applicantForm = document.getElementById('adder');
applicantForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    let data = serializeForm(event.target);
    let phone = data.get('phone');
    let name = data.get('name');
    console.log('contact:  ' + name + ' ' + phone);
    addContact(phone, name);
    showContacts();
    document.location.href='#close';

}

function serializeForm(formNode) {
    const {elements} = formNode;
    const data = new FormData();

    Array.from(elements)
        .filter((item) => !!item.name)
        .forEach((element) => {
            console.dir(element);
            const name = element.name;
            const value = element.value;
            console.log('dataitem:  ' + name + ' ' + value);
            data.append(name, value)
        });
    return data
}


function addContact(phone, name) {
    let contactsKey = 'contacts';
    let contacts = getObject(contactsKey);
    contacts[phone] = name;
    setObject(contactsKey, contacts);

}