const requireAuthAdmin = (req, res, next) => {

    const authToken = req.cookies.token;

    const isAdmin = req.cookies.isAdmin
    // Inject the user to the request
    req.user = authToken

    if (req.user) {
        if (isAdmin == 1){
            next()
        } else {
            res.json({
                message: "You are not connected as admin",
                messageClass: 'alert-danger'
            });
        }
    } else {
        res.json({
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
    }
};

module.exports = requireAuthAdmin