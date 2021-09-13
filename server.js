const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.get("/api/quotes/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote });
});

app.get("/api/quotes", (req, res, next) => {
  let quotesSelection = quotes;
  if ("person" in req.query) {
    quotesSelection = quotesSelection.filter((quoteObject) => {
      return quoteObject.person === req.query.person;
    });
  }
  res.send({ quotes: quotesSelection });
});

app.post("/api/quotes", (req, res, next) => {
  if ("person" in req.query && "quote" in req.query) {
    const { person, quote } = req.query;
    quotes.push({ person, quote });
    res.send({ quote: quotes[quotes.length - 1] });
  } else {
    res.sendStatus(400);
  }
});
