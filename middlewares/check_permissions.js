module.exports = function (req, res, next) {
    if (!req.isAuthenticated() || !req.article._user.equals(req.user)) {
        return next(new Error("You have no permitions"));
    } else {
        next();
    }
};