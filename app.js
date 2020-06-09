// Define ui 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter'); 
const taskInput = document.querySelector('#task');

//load all listeners

loadEventListeners();

//Load all event listeners
function loadEventListeners() {
    //DOM Load Event
    document.addEventListener('DOMContentLoaded',getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove tasks
    taskList.addEventListener('click', removeItem);
    //clear em all
    clearBtn.addEventListener('click', removeAll);
    //search
    filter.addEventListener('keyup', searchin);
}
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
          // Create li element
          const li = document.createElement('li');
          // Add class
          li.className = 'collection-item';
          // Create text node and append to li
          li.appendChild(document.createTextNode(task));
          // Create new link element
          const link = document.createElement('a');
          // Add class
          link.className = 'delete-item secondary-content';
          // Add icon html
          link.innerHTML = '<i class="fa fa-remove"></i>';
          // Append the link to li
          li.appendChild(link);
  
          // Append li to ul
          taskList.appendChild(li);
  
          //store in ls
        //   storeTaskinLocalStorage(taskInput.value);
  
          //Success Message
        //   M.toast({html: `"${taskInput.value}" added successfully!`, classes: '#43a047 green darken-1'});
          // Clear input
    });
}
// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
function addTask(e) {

    if(taskInput.value === '') {
        // alert('Add a task');
        M.toast({html: 'Please Enter A Value!', classes: '#ef5350 red lighten-1'});
      }
    else{
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);

        //store in ls
        storeTaskinLocalStorage(taskInput.value);

        //Success Message
        M.toast({html: `"${taskInput.value}" added successfully!`, classes: '#43a047 green darken-1'});
        // Clear input
        taskInput.value = '';
      
    }
     
    
      e.preventDefault();   
}

//Store Task
function storeTaskinLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeItem(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        var thays = e.target.parentElement.parentElement.innerHTML;
        e.target.parentElement.parentElement.remove();
        M.toast({html: `"${thays}" removed successfully!`, classes: '#e65100 orange darken-4'});
    }
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    e.preventDefault();
}

function removeAll(e) {
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);    
    }
    M.toast({html: 'Removed Everything: Success!', classes: '#ef5350 red lighten-1'});
    e.preventDefault();
    localStorage.clear();
}

function searchin(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(
    function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display = 'block';
        } else{
            task.style.display = 'none';
        }
    }
    );
    e.preventDefault();
}