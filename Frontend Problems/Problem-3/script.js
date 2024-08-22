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

const checkAnswer = (selectedAnswer, currentAnswer) => {
  //check if answer is correct
  console.log('buttonClicked');
  console.log('CHECKING ANSWERS');
  console.log(selectedAnswer);
  console.log(currentAnswer);
  console.log('Check', selectedAnswer === currentAnswer);

  return selectedAnswer === currentAnswer;
};

const displayQuizScreen = () => {
  const setupScreen = document.getElementById('setup-screen');
  const quizScreen = document.getElementById('quiz-screen');
  setupScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
};

//function to show current quiz
const displayQuiz = (array) => {
  let currentIndex = 0;
  const userAnswers = [];
  let userAnswer = '';
  let currentAnswer = '';
  let progress = 0;

  // Function to display the current question and options
  const displayCurrentQuestion = () => {
    const currentQuestion = array[currentIndex];
    const questionContainer = document.getElementById('question-container');
    const answersContainer = document.getElementById('answers-container');

    // Clear previous question and options
    questionContainer.textContent = '';
    answersContainer.innerHTML = '';

    // Display the current question
    questionContainer.textContent = currentQuestion.question
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/039/g, "'")
      .replace(/quot/g, '"');

    // Display the options
    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.textContent = option.replace(/[^a-zA-Z0-9 ]/g, '');

      button.className = 'quiz-option';
      button.addEventListener('click', () => {
        userAnswer = option;

        currentAnswer = currentQuestion.correctAnswer;

        handleAnswerSelection(button, option, index);
      });
      answersContainer.appendChild(button);
    });
  };

  displayCurrentQuestion();

  const submitButton = document.getElementById('submit-answer');
  submitButton.addEventListener('click', function () {
    const progressBar = document.getElementById('progress-bar');
    userAnswers.push(checkAnswer(userAnswer, currentAnswer));
    console.log(userAnswers);
    submitButton.classList.add('hidden');
    progressBar.style.width = progress + '%';
    progress += 10;
    currentIndex++;
    if (currentIndex < array.length) {
      displayCurrentQuestion();
    } else {
      //once quiz is finished to display answers
      displayResults(userAnswers);
    }
  });
};

const displayResults = (correctAnswers) => {
  const resultsScreen = document.getElementById('results-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const scoreDisplay = document.getElementById('score-display');
  quizScreen.classList.add('hidden');
  resultsScreen.classList.remove('hidden');
  //array for correct answers
  const score = correctAnswers.filter((answer) => answer === true);
  scoreDisplay.textContent = `${score.length} / ${correctAnswers.length}`;
};
//show what button is being selected
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

    //display the quiz once data has been populated
    if (quizQuestions.length > 0) {
      displayQuiz(quizQuestions);
    }
  });
});
