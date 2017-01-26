module.exports = function(req, res, next) {
    req.is_json = req.accepts('json', 'html') == 'json';
    console.log(req.is_json);
    next();
};