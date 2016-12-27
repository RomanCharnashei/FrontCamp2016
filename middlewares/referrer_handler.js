module.exports = {
    save_referrer: function(req, res, next) {
        req.session.referer = req.header('Referer') || '/';
        next();
    },
    clear_referrer: function(req){
        req.session.referer = null;
    },
    go_to_referrer: function(req, res) {
        var referre = req.session.referer;
        this.clear_referrer(req);
        res.redirect(referre);
    },
    get_referrer: function(req) {
        return req.session.referer || req.header('Referer') || '/';
    }
};