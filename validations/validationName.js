const validationName = (req, res, next) => {
    const { name } = req.body;
    // caso o name nao tenha sido passado
    if (name === undefined) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    // caso name seja menor que 3
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
      }
      next();
};
module.exports = validationName;