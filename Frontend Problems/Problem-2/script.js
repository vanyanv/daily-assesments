const todoList = ['get a drink', 'do hw'];

const displayTodos = () => {
  console.log('running Display TODOS');
  const container = document.getElementById('todos');
  container.innerHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const currentTodo = todoList[i];
    const li = document.createElement('li');
    li.innerText = currentTodo;
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
    console.log(todoList);
    inputField.value = '';
    displayTodos();
  });

  displayTodos();
});
