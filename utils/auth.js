//If user isnt logged in to the site, redirect them to the login page

const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect ('./login')
    } else {
        next ();
    }
};

module.exports = withAuth;