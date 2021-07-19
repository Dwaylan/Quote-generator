const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//  hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// show new quote
function newQuote() {
  loading();
  // using .Math to pick a random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //   check if author field is blank and replace it with 'unkown'
  if (!quote.author) {
    authorText.textContent = "unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //    check quote length to determine styling

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //   set quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}

// Quote rest API
async function getQuotes() {
  loading();
  const quoteApi = "https://type.fit/api/quotes";

  try {
    const response = await fetch(quoteApi);
    apiQuotes = await response.json();
    newQuote();
    // console.log(apiQuotes);
  } catch (error) {
    // Contains error catch
  }
}

// tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event listners
twitterBtn.addEventListener("click", tweetQuote);
newQuoteButton.addEventListener("click", newQuote);

// loading

getQuotes();
// loading();
