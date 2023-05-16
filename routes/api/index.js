const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtsRoutes');

router.use('/user', userRoutes)
router.use('/thoughts', thoughtRoutes)

module.exports = router;