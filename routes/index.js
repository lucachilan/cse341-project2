const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/inventory', require('./inventory'));
router.use('/maintenance', require('./maintenance'));

router.get('/login', passport.authenticate('github'), (req, res) => {
    /*
        #swagger.tags = ['Authentication']
    */
});

router.get('/logout', function (req, res, next) {
    /*
        #swagger.tags = ['Authentication']
    */
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy(function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });
});

module.exports = router;
