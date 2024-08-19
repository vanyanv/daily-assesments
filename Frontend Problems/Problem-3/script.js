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

//function to transform data from API
const transformData = (rawData) => {
  return rawData?.results.map((item) => {
    // Combine correct and incorrect answers into one array for options
    const options = [...item.incorrect_answers, item.correct_answer];

    // Return a new object with a simplified structure
    return {
      category: item.category,
      question: item.question,
      correctAnswer: item.correct_answer,
      options: options,
      difficulty: item.difficulty,
      type: item.type,
    };
  });
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

const displayQuizScreen = () => {
  const setupScreen = document.getElementById('setup-screen');
  const quizScreen = document.getElementById('quiz-screen');
  setupScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
};

//function to show current quiz
const displayQuiz = (array) => {
  const currentQuestion = array[0];
  console.log(currentQuestion);
  const options = currentQuestion.options;
  const questionContainer = document.getElementById('question-container');
  const answersContainer = document.getElementById('answers-container');

  questionContainer.textContent = currentQuestion.question;
  options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.className = 'quiz-option';
    button.addEventListener('click', () =>
      handleAnswerSelection(button, option, index)
    );
    answersContainer.appendChild(button);
  });
};

//need to create a function that goes thru each question

const handleAnswerSelection = (button, selectedOption, index) => {
  const allBttons = document.querySelectorAll('.quiz-option');
  const submitButton = document.getElementById('submit-answer');

  allBttons.forEach((btn) => btn.classList.remove('selected'));

  button.classList.add('selected');
  submitButton.classList.remove('hidden');
};

document.addEventListener('DOMContentLoaded', async function () {
  let quizQuestions = [];
  const startQuizButton = document.getElementById('start-quiz');
  const categoriesArray = await getCategories();
  setCategories(categoriesArray);

  startQuizButton.addEventListener('click', async () => {
    const categorySelect = document.getElementById('category-select');
    const selectedValue = Number(categorySelect.value);
    const difficultySelected = document.getElementById('difficulty-select');
    const slectedDifficulty =
      difficultySelected.options[difficultySelected.selectedIndex].textContent;

    const questions = await getQuestions(selectedValue, slectedDifficulty);
    quizQuestions = transformData(questions);
    console.log(quizQuestions);
    displayQuizScreen();

    //display the quiz once data has been pouplated
    if (quizQuestions.length > 0) {
      displayQuiz(quizQuestions);
    }
  });
});
