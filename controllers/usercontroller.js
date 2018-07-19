var exports = module.exports = {}

exports.users = function(req, res, users) {
    var context = {
        title: "Hidden-History Users",
    };
    res.render('users', { context, users, req });
}
