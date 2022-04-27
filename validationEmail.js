 const validationEmail = (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (email === undefined) {
      res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    const userEmail = regex.test(email);
    if (userEmail === false) {
      res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    } 
    if (password === undefined) {
        res.status(400).json({ message: 'O campo "password" é obrigatório' });
      }
  
      if (password.length >= 6) {
      res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
      }
    next();
  };

/*   const validationPassword = (req, res, next) => {
    const { password } = req.body;
    console.log(req.body);
    
    next();
  };
 */
  module.exports = validationEmail;