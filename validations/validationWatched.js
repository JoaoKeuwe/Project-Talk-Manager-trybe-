const validationWatched = (req, res, next) => {
const { talk } = req.body;
/* const { watchedAt } = talk; */
const regex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
const validRegex = regex.test(talk.watchedAt);
    if (!validRegex) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
   return next();
};

module.exports = validationWatched;