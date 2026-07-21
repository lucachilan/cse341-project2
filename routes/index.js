const router = require('express').Router();

router.use('/', require('./swagger'))

router.get('/', (req,res) => {
    //#swagger.tags=['is working']
    res.send("is working")
});

router.use('/inventory', require('./inventory'));
router.use('/maintenance', require('./maintenance'));

module.exports = router;