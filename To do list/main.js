//Selectors
const todoInput =  document.querySelector(".todo-input");       //target the classes
const todoButton =  document.querySelector(".todo-button");
const todoList =  document.querySelector(".todo-list");
//Event Listeners
todoButton.addEventListener('click',addTodo);  
todoList.addEventListener('click',deleteCheck);
document.addEventListener("DOMContentLoaded",getTodos);

//Functions

function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    // create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;       // adding value in todo input  
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    saveLocalTodo(todoInput.value);
    //create button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class = "fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = "";   
}

function deleteCheck(event){
    const item = event.target;
    //delete to do 
    if (item.classList[0] === "trash-btn") {     //if 1st class
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);   
        todo.addEventListener('transitionend',function(){   //this only work after animation completed 
            todo.remove();
        });
    }

    //check mark
    if (item.classList[0] === "complete-btn") {     //if 1st class
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
    
}

function saveLocalTodo(todo){
    //check-- hey do I already have thing in there ?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    //check-- hey do I already have thing in there ?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        // create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;       // adding value in todo input  
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //create button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class = "fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}