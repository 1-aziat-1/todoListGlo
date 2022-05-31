'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');


let todoDate = [];

const showArr = () => {
    todoDate = JSON.parse(localStorage.save);
};

const render = () => {
    localStorage.setItem('save', JSON.stringify(todoDate));
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoDate.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `<span class="text-todo">${item.value}</span>
                        <div class="todo-buttons">
                            <button class="todo-remove"></button>
                            <button class="todo-complete"></button>
                        </div>`;

        if(item.completed){
            todoCompleted.append(li);
        }else{
            todoList.append(li); 
        }
         
        
        const btnTodoCompleted = li.querySelector('.todo-complete');

        btnTodoCompleted.addEventListener('click',() => {
            item.completed = !item.completed;
            render();
        })

        const btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoRemove.addEventListener('click',() => {
            todoDate.splice( todoDate.indexOf(item),1);

            render();
        });
    });
    
};

todoControl.addEventListener('submit', (event) => {
    event.preventDefault();

    const newTodo = {
        value: headerInput.value.trim(),
        completed: false
    };

    if(newTodo.value.trim() !== ''){
        todoDate.push(newTodo);
        headerInput.value = '';
    }else{
        headerInput.value = '';
    }
    
    render();
});
showArr();
render();

