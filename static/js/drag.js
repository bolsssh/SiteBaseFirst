document.addEventListener('DOMContentLoaded', (event) => {
    let tasksListElement = document.querySelectorAll('.cell');
    tasksListElement.forEach(function (item) {
        item.draggable = true;
    });

    tasksListElement.forEach.call(tasksListElement, function (item) {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragend', handleDragEnd, false);
        item.addEventListener('drop', handleDragEnd, false);
    });

    function handleDragEnd(evt) {
        evt.target.classList.remove('selected');
        this.classList.remove('invisible');
    }

    function handleDragStart(evt) {
        evt.target.classList.add('selected');
        //this.classList.add('invisible');
        evt.target.style.opacity = '1';
    }


    function swope(selected, destination) {
        let selParent = selected.parentElement.id;
        let selName = selected.id;
        let selPos = getObject(selParent).map(function (task) {
            return task.name;
        }).indexOf(selName);

        let destParent = destination.parentElement.id;

        let nextName = destination.id;

        console.dir(nextName);
        console.log('Group:   ');
        console.dir(getObject(destParent));

        let nextPos = getObject(destParent).map(function (task) {
            return task.name;
        }).indexOf(nextName);
        nextPos = nextPos === -1 ? destination.parentElement.childElementCount - 2 : nextPos;

        console.log(nextPos);
        let selectValue = getObject(selParent)[selPos];
        let nextArray = getObject(destParent);
        let delPos = (selPos > nextPos && destParent === selParent) ? selPos + 1 : selPos;
        console.log('delPos: ' + delPos);
        nextArray.splice(nextPos, 0, selectValue);
        console.log('afterInsert: ');
        console.dir(nextArray);
        setObject(destParent, nextArray);

        let array = getObject(selParent);
        array.splice(delPos, 1);
        setObject(selParent, array);
        console.dir(getObject(selParent));


        destination.parentNode.insertBefore(selected, destination);
    }


    function handleDragOver(evt) {
        const activeElement = querySelectorFrom('.selected', tasksListElement)[0]; //tasksListElement.querySelector('.selected');
        const currentElement = evt.target;
        let firstCond = (activeElement !== currentElement);
        let secondCond = currentElement.classList.contains('cell');
        const isMoveable = firstCond && secondCond;

        if (!isMoveable) {
            return;
        }

        const nextElement = getNextElement(evt.clientY, currentElement);
        if (nextElement && activeElement === nextElement ||
            activeElement === nextElement.previousElementSibling ||
            activeElement.id === '' || currentElement.id === ''

        ) return;

        swope(activeElement, nextElement);
    }


    const getNextElement = (cursorPosition, currentElement) => {
        const currentElementCoord = currentElement.getBoundingClientRect();
        const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

        const nextElement = (cursorPosition < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling;

        return nextElement;
    };


    function querySelectorFrom(selector, elements) {
        return [].filter.call(elements, function (element) {
            return element.matches(selector);
        });
    }
});
