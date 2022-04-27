const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const randomToken = require('random-token');
const validationEmail = require('./validationEmail');
const validation = require('./validationToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// REQUISITO 02
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const fsText = fs.readFileSync('./talker.json', 'utf8');
  const filterTalkerId = JSON.parse(fsText).find((talker) => talker.id === Number(id));
  console.log(filterTalkerId);
    if (filterTalkerId === undefined) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(200).json(filterTalkerId);
  });
  // REQUISITO 07
  app.delete('/talker/:id', validation, (req, res) => {
    const { id } = req.params;
    const talker = fs.readFileSync('./talker.json', 'utf8');
    const index = JSON.parse(talker).filter((i) => i.id !== Number(id));
    fs.writeFileSync('./talker.json', JSON.stringify(index), 'utf8');
    return res.status(204).send();
  });
  
  // REQUISITO 01
  app.get('/talker', (req, res) => {
    const fsText = fs.readFileSync('./talker.json', 'utf8');
    console.log(fsText);
    res.status(200).json(JSON.parse(fsText));
  });

  // REQUISITO 03
  app.post('/login', validationEmail, (req, res) => {
    const token = randomToken(16);
    return res.status(200).json({ token });
  });

app.listen(PORT, () => {
  console.log('Online');
});