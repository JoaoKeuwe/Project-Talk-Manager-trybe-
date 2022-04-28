const validationTalk = (req, res, next) => {
    const message = { 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };

   const { talk } = req.body;
        if (!talk) {
        return res.status(400).json(message);
        }
        if (!talk.watchedAt) {
            return res.status(400).json(message);
        }
        if (talk.rate === undefined) {
            return res.status(400).json(message);
        }
    next();
    };
    
    module.exports = validationTalk;