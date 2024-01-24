const router = require ('express').Router();
const {User, Comment, Blog} = require ('../models');
const withAuth = require ('../utils/auth');


//fetch blog data from root path, render homepage and show blog data in render 
router.get ('/', async (req, res) =>{
    try {
        const blogData = await Blog.findAll ({
            include: [
            {
                model: User, 
                attributes : ['username'],
            },
        ],
        })
        const blogs = blogData.map((blog) => blog.get ({
            plain: true
        }));

        res.render ('homepage', {
            blogs, 
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }

});
//get blog data by user id and render it 
router.get ('blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User, 
                    attributes: ['username'],
                }, {
                    model: Comment, 
                    attributes: [
                        User
                    ]
                }
            ],
        });
        const blog = blogData.get({
            plain: true
        });
        res.render ('blog', {
            ...blog, 
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//if user is logged in, take them to the dashboard route, else render the login page 
router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}

	res.render('login');
});

//on signup page, render the signup,  if they are logged in then render the dashboard 
router.get ('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect ('/dashboard');
        return;
    }
    res.render('signup')
});

module.exports = router;
