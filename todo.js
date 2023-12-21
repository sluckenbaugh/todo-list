// Variables

const addButton = document.getElementById('task__btn');
const taskInput = document.getElementById('task__input');
const newTaskContainer = document.querySelector('.new-task');
const taskContainer = document.querySelector('.task__container-1');
const apology = document.createElement('p');
apology.innerText = 'Please enter a task to complete.';

const deleteAllButton = document.createElement('button')
deleteAllButton.classList.add('delete-all');
deleteAllButton.innerText = 'Delete All';

// Date
const now = new Date();
const date = now.toDateString();
const today = document.createElement('div');
// taskInput.placeholder = `To Do ${date}`;

// Add task funtion 

function addTask() {
    let task = document.createElement('div');
    task.classList.add('task');

    let p = document.createElement('p');
    p.innerText = `${taskInput.value}`;
    task.appendChild(p);

    let checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fa-solid fa-check"><i>';
    checkButton.classList.add('check__btn');
    task.append(checkButton);

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"><i>';
    deleteButton.classList.add('trash__btn');
    task.append(deleteButton);

    // Validate input and append users task to task container
    
    if (!taskInput.value) {
        taskContainer.append(apology);
        taskInput.focus();
    }
    else {
        newTaskContainer.style.display = 'block';
        newTaskContainer.prepend(task);
        apology.remove();
        taskInput.focus();
    }
    taskInput.value = '';
    console.log(newTaskContainer.childElementCount);

    // Add delete all button
    if (newTaskContainer.childElementCount > 1) {
        newTaskContainer.append(deleteAllButton);
    }
    
    checkButton.addEventListener('click', () => {
        checkButton.parentElement.classList.toggle('checked');
        taskInput.focus();
    })

    deleteButton.addEventListener('click', (e) => {
        let deleted = deleteButton.parentElement;
        deleted.remove();
        taskInput.focus();
        
        let childCount = newTaskContainer.childElementCount;
        if (childCount === 2) deleteAllButton.remove();
        if (childCount === 0) newTaskContainer.style.display = 'none';

    })
    deleteAllButton.addEventListener('click', () => {
       let tasks = Array.from(newTaskContainer.querySelectorAll('.task'));
       for (let task of tasks) {
           task.remove();
       }
       deleteAllButton.remove();
       newTaskContainer.style.display = 'none';
       taskInput.focus();
    })
}

// Event Listeners

addButton.addEventListener('click', addTask);

window.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        addTask();
    }
});

