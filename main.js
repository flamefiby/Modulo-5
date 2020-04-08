// JavaScript Document

function addNewTask() {

    // add new list from the user input
    let li = document.createElement("li");
    let task = document.getElementById("task").value;
    // instead append the text in the <li> create a p element
    // li.appendChild(getTask);
    let p = document.createElement("p");
    p.innerHTML = task;
    li.appendChild(p);
    document.getElementById("list").appendChild(li);
    // delete text in the input element when task add
    document.getElementById('task').value = '';

    // add checkbox
    let checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    li.appendChild(checkBox);

    // change text style and background when click the checkbox
    checkBox.addEventListener('click', clickTask);
    function clickTask() {
        if (this.checked === true) {
        li.style.textDecoration = 'line-through';
        li.style.backgroundColor = 'green';
        let bottomLi = document.getElementById('list');
        bottomLi.appendChild(li);
        // add ding sound
        let ding = new Audio('ding.mp3');
        ding.play();
        } else {
            li.style.textDecoration = '';
            li.style.backgroundColor = '';
        }
    }
    // add delete button
    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.textContent = 'Delete';
    button.addEventListener('click', deleteTask);
    li.appendChild(button);
    function deleteTask() {
        let li = this.parentElement;
        let ul = li.parentElement;
        ul.removeChild(li);
    }

    // Browser API
    /* The notify function code below inspired by:
    https://developer.mozilla.org/zh-CN/docs/Web/API/Notification
    */

    // add notify button
    let notifyButton = document.createElement('button');
    notifyButton.setAttribute('type', 'button');
    notifyButton.textContent = 'Click to Notify Me';
    notifyButton.addEventListener('click', notifyTask);
    li.appendChild(notifyButton);

    // function notify task
    function notifyTask(){
        // get the task
        let text = p.textContent;
        // Check browser availability
        if (!("Notification" in window)) {
            alert("Sorry, this browser does not support the task notification");
        }
        // check if user still willing to get the notify
        else if (Notification.permission === "granted") {
            let notification = new Notification('To-Do List Notify : ' + task);
        }
        // ask the user to get the permission
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                // notify user if they willing to
                if (permission === "granted") {
                    let notification = new Notification('To-Do List Notify : ' + task);
                }
            });
        }
        // if the code execute here means the user reject the notify
        // and we should not annoy them anymore
    }
}




