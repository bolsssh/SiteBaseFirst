// async function elementUpdate(selector) {
//     try {
//         let html = await (await fetch(location.href)).text();
//         console.dir(html);
//         let newdoc = new DOMParser().parseFromString(html, 'text/html');
//         console.log('newdoc');
//         console.dir(newdoc);
//         let elem1 = document.getElementById(selector);
//         console.dir(elem1);
//
//         let elem2 = newdoc.getElementById(selector);
//
//         console.dir(elem2);
//         elem1.outerHTML = elem2.outerHTML;
//         console.log('upd');
//         return true;
//     } catch (e) {
//         console.dir(e);
//         return false;
//     }
// }

function createWrapper() {
    let wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    wrapper.style.height = '100vh';
    wrapper.style.display = 'flex';
    wrapper.style.margin = 'auto';
    wrapper.style.alignItems = 'flex-start';
    wrapper.style.backgroundColor = 'rgba(44, 44, 44, 0)';
    return wrapper;
}

function deleteTask(name, groupName) {
    let group = getObject(groupName);
    if (group != null) {
        console.dir(group);
        let index = group.map((task) => task.name).indexOf(name);
        group.splice(index, 1);
        setObject(groupName, group);
    }
}

function addTask(name, groupName) {
    let group = getObject(groupName);
    if (group == null) {
        group = [];
    }
    group.push({'name': name});
    setObject(groupName, group);
}

function addGroup(groupName) {
    let groups = getObject('lists');
    groups.push({name: groupName});
    setObject('lists', groups);
}

function deleteGroup(groupName) {
    let groups = getObject('lists');
    groups = groups.filter((list) => list.name != groupName);
    setObject('lists', groups);
}

function createGroup(className, title) {
    let group = document.createElement('div');
    group.className = className;
    group.id = title;
    return group
}

function createTask(content) {
    let task = document.createElement('div');
    task.className = 'cell';
    //task.style.display = 'flex';
    task.id = content;
    task.style.color = 'rgba(220, 220, 220, 1)';
    let text = document.createElement('div');
    text.className = 'cell-text';
    text.innerText = content;
    task.appendChild(text);
    return task;
}

function createAddTask(groupName) {
    let button = document.createElement('button');
    button.addEventListener('click', function () {
        let name = prompt('Название задачи:', 'Новая задача');
        addTask(name, groupName);
        console.log('addTask');
        window.location.reload();
        //document.getElementById(groupName+' wrapper').innerHTML = showGroup(groupName, getObject(groupName)).innerHTML;
    });
    button.className = 'cell';
    button.style.display = 'flex';
    button.style.position = 'relative';
    button.style.backgroundColor = 'rgba(44, 44, 44, 0.2)';
    button.style.border = 'none';
    let text = document.createElement('div');
    text.className = 'cell-text';
    text.innerText = 'Add';
    button.appendChild(text);
    return button;
}

function createDeleteTask(name, groupName) {
    let button = document.createElement('button');
    button.addEventListener('click', function () {
        if (confirm('Вы уверены ?')) {
            deleteTask(name, groupName);
            window.location.reload();
        }
    });
    button.style.width = '20px';
    button.style.height = 'auto';
    button.style.border = 'none';
    button.style.margin = '10px 10px 10px 0';
    //button.style.borderRadius = '50%';
    button.style.color = 'rgba(200, 200, 200, 0.6)';
    button.innerText = 'X';
    button.style.backgroundColor = 'rgba(255, 0,0, 0)';
    return button;
}

function createAddGroup() {
    let button = document.createElement('button');
    button.addEventListener('click', function () {
        let name = prompt('Название группы:', 'Новая группа');
        addGroup(name);
        window.location.reload();
        //document.getElementById('addGroup').remove();
        //document.getElementsByClassName('wrapper')[0].appendChild(showGroup(name, getObject(name)));
        //document.getElementsByClassName('wrapper')[0].appendChild(showAddGroup());
    });
    button.id = 'addGroup';
    button.innerText = '+';
    button.style.fontSize = '100px';
    button.style.color = 'rgba(200, 200, 200, 0.6)';
    button.className = 'task-list';
    button.style.border = 'none';
    return button
}


function createListWrapper(title) {
    let listWrapper = document.createElement('div');
    listWrapper.className = 'list-wrapper';
    listWrapper.id = title + ' wrapper';
    listWrapper.innerText = title;
    return listWrapper
}

function createDeleteGroup(groupName) {
    let button = document.createElement('button');
    button.id = groupName + '-deleteButtom';
    button.addEventListener('click', async function () {
        if (confirm('Вы уверены ?')) {
            deleteGroup(groupName);
            window.location.reload();
        }

        //document.getElementById(groupName + ' wrapper').remove();
    });

    button.className = 'cell';
    button.style.display = 'flex';
    button.style.position = 'relative';
    button.style.backgroundColor = 'rgba(44, 44, 44, 0.2)';
    button.style.border = 'none';
    let text = document.createElement('div');
    text.className = 'cell-text';
    text.innerText = 'delete';
    button.appendChild(text);
    return button;
}


function showTask(taskName, groupName) {
    let task = createTask(taskName, groupName);
    task.appendChild(createDeleteTask(taskName, groupName));
    return task;
}

function showGroup(groupName, tasks) {
    let listWrapper = createListWrapper(groupName);
    let group = createGroup("task-list", groupName);
    if (tasks != null) {
        for (const [taskName, task] of Object.entries(tasks)) {
            group.appendChild(showTask(task['name'], groupName));
        }
    }
    group.appendChild(createAddTask(groupName));
    group.appendChild(createDeleteGroup(groupName));
    listWrapper.appendChild(group);
    return listWrapper
}

function showAddGroup() {
    let addListWrapper = createListWrapper('add');
    addListWrapper.style.color = 'rgba(0, 0, 0, 0)';
    addListWrapper.appendChild(createAddGroup());
    return addListWrapper
}

// function showGroup(groupName) {
//     let listWrapper = createListWrapper(groupName);
//     listWrapper
//     document.getElementsByClassName('wrapper')[0].appendChild(listWrapper);
//     document.getElementById(groupName + ' wrapper').appendChild(createGroup("task-list", groupName));
//     let tasks = (getObject(groupName));
//     if (tasks != null) {
//         for (const [taskName, task] of Object.entries(tasks)) {
//             console.log(task['name']);
//             showTask(task['name'], groupName);
//         }
//     }
//     document.getElementById(groupName).appendChild(createAddTask(groupName));
//     document.getElementById(groupName).appendChild(createDeleteGroup(groupName));
// }

/*function showTask(taskName, groupName) {
    document.getElementById(groupName).appendChild(createTask(taskName, groupName));
    document.getElementById(groupName + '-' + taskName).appendChild(createDeleteTask(taskName, groupName));
}*/
