const validation = (req, res, next) => {
    const { authorization } = req.headers;
if (!authorization) {
    res.status(401).json({ message: 'Token não encontrado' });
}
if (authorization.toString().length < 16) {
    res.status(401).json({ message: 'Token inválido' });
}
next();
};

module.exports = validation;