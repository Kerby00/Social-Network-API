const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThoughts,
    deleteThoughts,
    updateThoughts,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtsId').get(getSingleThought).delete(deleteThoughts).put(updateThoughts);

router.route('/:thoughtsId/reactions').post(addReaction);

router.route('/:thoughtsId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
