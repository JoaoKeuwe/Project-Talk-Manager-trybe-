const validationTalk = (req, res, next) => {
    const MENSAGEM = {
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      };
          const { talk } = req.body;
          if (talk === undefined) return res.status(400).json(MENSAGEM);
          if (talk.rate === undefined) return res.status(400).json(MENSAGEM);
          if (talk.watchedAt === undefined) return res.status(400).json(MENSAGEM);
          next();
      };
      
module.exports = validationTalk;