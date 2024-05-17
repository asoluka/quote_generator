const quoteContainerElem = document.getElementById("quote-container");
const quoteTextElem = document.getElementById("quote");
const quoteAuthorElem = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const tweetQuoteBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");
let apiQuotes = [];

function showLoader() {
  loader.hidden = false;
  quoteContainerElem.hidden = true;
}

function hideLoader() {
  loader.hidden = true;
  quoteContainerElem.hidden = false;
}

tweetQuoteBtn.addEventListener("click", () => {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteTextElem.textContent} - ${quoteAuthorElem.textContent}`;
  window.open(twitterURL, "_blank");
});

newQuoteBtn.addEventListener("click", newQuote);

function newQuote() {
  showLoader();
  let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  quoteTextElem.textContent = quote.text;
  quoteAuthorElem.textContent = quote.author ?? "Unknown";
  hideLoader();

  quote.text.length > 120
    ? quoteTextElem.classList.add("long-quote")
    : quoteTextElem.classList.remove("long-quote");
}

async function getQuotes() {
  showLoader();
  const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const res = await fetch(apiURL);
    apiQuotes = await res.json();
    newQuote();
  } catch (e) {
    // Catch Error.
  }
}

getQuotes();
