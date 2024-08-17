let todoList = ['get a drink', 'do hw'];

const displayTodos = () => {
  console.log('running Display TODOS');
  const container = document.getElementById('todos');
  const deleteButtons = document.querySelectorAll('button');
  container.innerHTML = '';

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
      console.log(currentTodo);
      todoList = todoList.filter((todo) => todo !== currentTodo);
      displayTodos();
    });
    li.appendChild(checkbox);
    li.appendChild(button);
    container.appendChild(li);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-a-todo');
  const deleteButton = document.getElementsByClassName('delete');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const newTodo = document.getElementById('text').value;
    const inputField = document.getElementById('text');
    if (newTodo.length === 0) return;
    todoList.push(newTodo);
    console.log(todoList);
    inputField.value = '';
    displayTodos();
  });

  displayTodos();
});
