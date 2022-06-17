const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());

app.post('/create', (req, res) => {
  const { todo } = req.body;
  if (!todo) {
    res.sendStatus(400);
    return;
  }
  prisma.todos
    .create({
      data: {
        todo: todo
      }
    })
    .then(val => {
      console.log(val);
      res.status(201).json(val);
    });
});

app.get('/read', (req, res) => {
  prisma.todos
    .findMany({
      orderBy: {
        id: 'asc'
      }
    })
    .then(val => res.json(val));
});

app.put('/update', (req, res) => {
  const { todo, id } = req.body;
  if (!todo || Number.isNaN(Number(id))) {
    res.sendStatus(400);
    return;
  }

  prisma.todos
    .update({
      where: { id: id },
      data: { todo: todo }
    })
    .then(val => {
      res.status(201).json(val);
    });
});

app.delete('/delete', (req, res) => {
  const { id } = req.body;
  if (Number.isNaN(Number(id))) {
    res.sendStatus(400);
    return;
  }

  prisma.todos
    .delete({
      where: { id: id }
    })
    .then(val => {
      res.status(201).json(val);
    })
    .catch(val => {
      res.status(400).json(val);
    });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
