// {id: 9, name: 'General Knowledge'}
const getCategories = async () => {
  const response = await fetch('https://opentdb.com/api_category.php');
  const data = await response.json();
  return data.trivia_categories;
};

const getQuestions = async (id, difficulty) => {
  difficulty = difficulty.toLowerCase();
  if (id === 0) return;
  if (difficulty == 'Select Difficulty') return;
  console.log(id, difficulty);
  const response = await fetch(
    `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=${difficulty}`
  );
  const data = await response.json();
  return data;
};



const setCategories = (array) => {
  const select = document.getElementById('category-select');

  array.forEach(({ id, name }) => {
    const option = document.createElement('option');
    option.textContent = name;
    option.value = id;
    select.appendChild(option);
  });
};

document.addEventListener('DOMContentLoaded', async function () {
  const quizQuestions = [];
  const startQuizButton = document.getElementById('start-quiz');
  const categoriesArray = await getCategories();
  setCategories(categoriesArray);

  startQuizButton.addEventListener('click', () => {
    const categorySelect = document.getElementById('category-select');
    const selectedValue = Number(categorySelect.value);
    const difficultySelected = document.getElementById('difficulty-select');
    const slectedDifficulty =
      difficultySelected.options[difficultySelected.selectedIndex].textContent;

    const questions = getQuestions(selectedValue, slectedDifficulty);
  });
});
