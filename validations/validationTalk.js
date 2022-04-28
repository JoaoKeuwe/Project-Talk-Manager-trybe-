const validationTalk = (req, res, next) => {
   const { rate, watchedAt, talk } = req.body;
        if (!rate || !watchedAt || !talk) {
    return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
);
        }
        next();
    };
    
    module.exports = validationTalk;