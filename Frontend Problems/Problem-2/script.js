//
let todoList = JSON.parse(localStorage.getItem('todos')) || [];

const displayTodos = () => {
  console.log('running Display TODOS');
  const container = document.getElementById('todos');
  container.innerText = '';
  for (let i = 0; i < todoList.length; i++) {
    const currentTodo = todoList[i];
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const button = document.createElement('button');
    checkbox.setAttribute('type', 'checkbox');
    button.innerText = 'Delete';
    button.classList.add('delete');
    li.innerText = currentTodo;
    button.addEventListener('click', () => {
      console.log(currentTodo, i);
      //delete the todo
      todoList.splice(i, 1);
      //save new todolist to local storage
      localStorage.setItem('todos', JSON.stringify(todoList));
      displayTodos();
    });
    li.appendChild(checkbox);
    li.appendChild(button);
    container.appendChild(li);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-a-todo');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const newTodo = document.getElementById('text').value;
    const inputField = document.getElementById('text');
    if (newTodo.length === 0) return;
    todoList.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todoList));
    inputField.value = '';
    displayTodos();
  });

  displayTodos();
});
