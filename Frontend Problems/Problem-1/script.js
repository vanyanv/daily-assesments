const quotes = [
  'The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela',
  'The way to get started is to quit talking and begin doing. - Walt Disney',
  "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
  'If life were predictable it would cease to be life, and be without flavor. - Eleanor Roosevelt',
  "If you look at what you have in life, you'll always have more. - Oprah Winfrey",
  "Life is what happens when you're busy making other plans. - John Lennon",
];

// Generate a random quote
const newQuote = (array) => {
  if (array.length === 0) return 'No Available Quotes';
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

//creates a success or fail message depending on if a new quote was added or not
const successOrFail = function (newQuote, form, input) {
  if (newQuote.length === 0) {
    const error = document.createElement('p');
    error.innerText = 'No Quote to Add';
    form.appendChild(error);
    setTimeout(function () {
      error.remove();
    }, 1000);
    return;
  }

  quotes.push(newQuote);
  const success = document.createElement('p');
  success.innerText = 'Successfully Added Quote';
  input.value = ''; // Clear the input field
  form.appendChild(success);
  setTimeout(function () {
    success.remove();
  }, 1000);
};

const fetchData = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.quote;
  } catch (error) {
    console.log('Error', error);
  }
};

window.onload = function () {
  const button = document.getElementById('new-quote-btn');
  const display = document.getElementById('quote');
  const form = document.getElementById('add-a-quote');

  // Add event listener to the button
  button.addEventListener('click', async function () {
    // Generate a new quote
    // const quote = newQuote(quotes);
    const quote = await fetchData('https://api.kanye.rest');
    display.innerText = quote;
  });

  // Add event listener to the form submission
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const newQuoteValue = document.getElementById('text').value;
    const input = document.getElementById('text');
    console.log('NewQuote:', newQuoteValue);
    console.log(newQuoteValue.length);
    successOrFail(newQuoteValue, form, input);
  });
};
