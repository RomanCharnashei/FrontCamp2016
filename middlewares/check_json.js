module.exports = function(req, res, next) {
    req.is_json = !req.accepts('html') && req.accepts('json');
    console.log(req.is_json);
    next();
};