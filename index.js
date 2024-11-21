'use strict';

const express = require('express');
const app = express();

// define endpoint for exercise 1 here
app.get('/math/circle/:r', (req, res) => {
//TODO1  
  const radius = Number(req.params.r)
  const circ = 2 * Math.PI * radius
  const area = Math.PI * radius * radius
  res.json({"circumference": circ, "area": area});
});

app.get('/math/rectangle/:width/:height', (req, res) => {
  const width = Number(req.params.width)
  const height = Number(req.params.height)
  const circ = 2 * (width + height)
  const area = width * height
  res.json({"circumference": circ, "area": area});
});

app.get('/math/power/:base/:exponent', (req, res) => {
  const { root } = req.query
  let getRoot = false
  if (typeof root !== undefined) {
    getRoot = Boolean(root)
  }
  try {
    const base = Number(req.params.base)
    const exponent = Number(req.params.exponent)
    if (isNaN(base) || isNaN(exponent)) {
      throw Error()
    }
    const result = Math.pow(base, exponent)
    if (!getRoot) {
      res.json({ "result": result });
      return
    }
    res.json({"result": result, "root": Math.sqrt(base)})
  }
  catch {
    res.status(400).json({"error":"invalid input"})
  }
});

//TODO2
let categories = ['funnyJoke', 'lameJoke'];
let funnyJoke = [
  {
    'joke': 'Dlaczego komputer poszedł do lekarza?',
    'response': 'Bo złapał wirusa!'
  },
  {
    'joke': 'Dlaczego komputer nie może być głodny?',
    'response': 'Bo ma pełen dysk!'
  },
  {
    'joke': 'Co mówi jeden bit do drugiego?',
    'response': '„Trzymaj się, zaraz się przestawiamy!”'
  }
];
let lameJoke = [
  {
    'joke': 'Dlaczego programiści preferują noc?',
    'response': 'Bo w nocy jest mniej bugów do łapania!'
  },
  {
    'joke': 'Jak nazywa się bardzo szybki programista?',
    'response': 'Błyskawiczny kompilator!'
  }
];


app.get("/jokebook/categories", (req, res) => {
  res.json(categories)
})

app.get("/jokebook/joke/:category", (req, res) => {
  const category = req.params.category
  let reply
  switch (category) {
    case "funnyJoke":
      reply = funnyJoke[Math.floor(Math.random() * funnyJoke.length)]
      break
    case "lameJoke":
      reply = lameJoke[Math.floor(Math.random() * lameJoke.length)]
      break
    default:
      reply = { "error": `no jokes for category ${category}` }
      break
  }
  res.json(reply)
})

//TODO3


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});