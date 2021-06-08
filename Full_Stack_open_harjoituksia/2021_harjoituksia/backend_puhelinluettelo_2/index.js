const express = require("express");
const morgan = require("morgan");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

//app.use(morgan("tiny"));
/*
morgan.token("host", function (req, res) {
  return req.hostname;
});
app.use(
  morgan(":method :host :status :res[content-length] - :response-time ms")
);
*/
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

let persons = [
  {
    id: 1,
    name: "Elli Eloisa",
    age: 24,
  },
  {
    id: 2,
    name: "Milla Makoisa",
    age: 33,
  },
];

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p> <p>${new Date()}</p>`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = persons.find((p) => p.id === id);

  if (!person) {
    res.status(404).end();
  } else {
    res.json(person);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

const generateId = () => {
  var i = 0;

  while (i <= persons.length) {
    const randomId = Math.floor(Math.random() * (500 - 1) + 1);

    const person = persons.find((p) => p.id === randomId);

    if (!person) {
      //console.log(randomId);
      return randomId;
    }
  }
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  const person = {
    id: generateId(),
    name: body.name,
    age: body.age,
  };

  if (!body.name || !body.age || (!body.name && !body.age)) {
    return res.status(400).json({
      error: "name or age missing",
    });
  }

  const p = persons.find((p) => p.name === body.name);

  if (p) {
    console.log(p);
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  persons = persons.concat(person);

  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
