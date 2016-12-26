
module.exports = function(req, res, next) {
    if(req.isAuthenticated()) {
        res.model = {user_profile: req.user};
    } else {
        res.model = {user_profile: null};
    }
    next();
};