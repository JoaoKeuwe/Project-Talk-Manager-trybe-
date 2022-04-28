const validationRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    // console.log(rate);
    const maiorOuMenorque = rate < 1 || rate > 5;
    if (rate === undefined || !(Number.isInteger(rate)) || maiorOuMenorque) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};
    
    module.exports = validationRate;