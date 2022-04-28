 const validationEmail = (req, res, next) => {
    const { email, password } = req.body;
    if (email === undefined) {
      res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (password === undefined) {
        res.status(400).json({ message: 'O campo "password" é obrigatório' });
      }
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const userEmail = regex.test(email);
    if (userEmail === false) {
      res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
      if (password.length < 6) {
      res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
      }
    next();
  };

  module.exports = validationEmail;