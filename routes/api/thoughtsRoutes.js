const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThoughts,
    deleteThoughts,
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtsId').get(getSingleThought).delete(deleteThoughts);

module.exports = router;
