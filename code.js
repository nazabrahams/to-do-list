document.addEventListener('DOMContentLoaded', () => {
    let todoInput = document.getElementById('todo-input');
    let todoList = document.getElementById('todo-list');
    let addItemButton = document.getElementById('add-item');
    let sortItemButton = document.getElementById('sort-item');
    let todos = [];
    addItemButton.addEventListener('click', (event) => {
        event.preventDefault();
        addTodo();
    });
    //SORT
    sortItemButton.addEventListener('click', (event) => {
        event.preventDefault();
        sortTodos();
    });
    function addTodo() {
        let todoName = todoInput.value.trim();
        if (!validateTodoName(todoName)) {
            alert("Invalid input. The task must be non-empty, start with an uppercase letter, and have more than three characters.");
            return;
        }
        let todo = {
            id: Date.now(),
            name: todoName,
            createdDate: new Date().toISOString(),
            completed: false
        };
        todos.push(todo);
        renderTodos();
        todoInput.value = '';
    }
    function validateTodoName(name) {
        return name.length > 3 && name[0] === name[0].toUpperCase();
    }
    //SORT
    function sortTodos() {
        todos.sort((a, b) => a.name.localeCompare(b.name));
        renderTodos();
    }
function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            let li = document.createElement('li');
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('click', () => {
                toggleComplete(todo.id);
            });
            let span = document.createElement('span');
            span.textContent = todo.name;
            if (todo.completed) {
                span.classList.add('completed');
            }
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'x';
            deleteBtn.classList.add('close-btn');
            deleteBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                deleteTodo(todo.id);
            });
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }
    function toggleComplete(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        renderTodos();
    }
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
    }
});
