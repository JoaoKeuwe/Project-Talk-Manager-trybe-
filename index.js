const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const randomToken = require('random-token');
const validationEmail = require('./validations/validationEmail');
const validation = require('./validations/validationToken');
const validationName = require('./validations/validationName');
const validationAge = require('./validations/validationAge');
const validationWatched = require('./validations/validationWatched');
const validationRate = require('./validations/validationRate');
const validationTalk = require('./validations/validationTalk');

const pathTalker = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// REQUISITO 07
app.delete('/talker/:id', validation, (req, res) => {
  console.log('chegou');
  const { id } = req.params;
  const talker = fs.readFileSync(pathTalker, 'utf8');
  const talkers = JSON.parse(talker);
  const index = talkers.filter((i) => i.id !== Number(id));
  console.log(index);
  fs.writeFileSync(pathTalker, JSON.stringify(index, null, 2), 'utf8');
  return res.status(204).end();
});
// REQUISITO 02
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const fsText = fs.readFileSync(pathTalker, 'utf8');
  const filterTalkerId = JSON.parse(fsText).find((talker) => talker.id === Number(id));
    if (filterTalkerId === undefined) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(filterTalkerId);
  });

  // REQUISITO 06
  app.put('/talker/:id', 
  validation,
  validationName,
  validationAge,
  validationTalk,
  validationWatched,
  validationRate,
  (req, res) => {
    const { id } = req.params;
    const fsText = fs.readFileSync(pathTalker, 'utf8');
    const takeId = JSON.parse(fsText);
    const index = takeId.findIndex((talker) => talker.id === Number(id));
    const object = {
      ...req.body,
     id: Number(id),
    };
    takeId[index] = object;
    fs.writeFileSync(pathTalker, JSON.stringify(takeId, null, 2), 'utf8');
     res.status(200).json(object);
  });
  
  // REQUISITO 01
  app.get('/talker', (req, res) => {
    const fsText = fs.readFileSync(pathTalker, 'utf8');
    res.status(200).json(JSON.parse(fsText));
  });

    // REQUISITO 05
    app.post('/talker',
    validation,
    validationName,
    validationAge,
    validationTalk,
    validationRate,
    validationWatched,
      (req, res) => {
      const fsText = fs.readFileSync(pathTalker, 'utf8');
      const talkers = JSON.parse(fsText);
      const newTalker = req.body;
      const obj = {
      ...newTalker,
      id: talkers.length + 1,
      };
      talkers.push(obj);
      fs.writeFileSync(pathTalker, JSON.stringify(talkers, null, 2));
      return res.status(201).json(obj);
    });

  // REQUISITO 03
  app.post('/login', validationEmail, (req, res) => {
    const token = randomToken(16);
    return res.status(200).json({ token });
  });

app.listen(PORT, () => {
  console.log('Online');
});