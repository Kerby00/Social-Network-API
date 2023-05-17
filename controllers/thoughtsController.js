const Thoughts = require('../models/thought');

module.exports = {
    async getThoughts(req, res) {
        console.log('RESPONSE ', res)
        try {
            const thoughts = await Thoughts.find();

            res.json(thoughts);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thoughts.findOne({ _id: req.params.thoughtsId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that Id' })
            }

            res.json(thought);
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    async createThoughts(req, res) {
        try {
            const createthot = await Thoughts.create(req.body);

            res.json(createthot);
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    async deleteThoughts(req, res) {
        try {
            const deleteDatThot = await Thoughts.findOneAndDelete({ _id: req.params.thoughtsId });

            if (!deleteDatThot) {
                return res.status(400).json({ message: 'no thot deleted: check Id' })
            }

            res.json({message: '"thought" deleted'});
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async updateThoughts(req, res) {
        try {
            const letsUpdate = await Thoughts.findOneAndUpdate(
                {_id: req.params.thoughtsId},
                {$set: req.body},
                {runValidators: true, new: true }
            );

            if(!letsUpdate) {
                res.status(400).json({message: 'couldnt find a thought with that ID'})
            };

            res.json(letsUpdate)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const addReact = await Thoughts.findOneAndUpdate(
                {_id: req.params.thoughtsId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            );
            if(!addReact) {
                res.status(400).json({message: 'couldnt find a thought with that ID'})
            };
            res.json(addReact)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
     
    async removeReaction(req, res) {
        try {
            const removeReact = await Thoughts.findOneAndUpdate(
                {_id: req.params.thoughtsId},
                {$pull: {reactions: req.params.reactionId}},
                {runValidators: true, new: true}
            );
            if(!removeReact) {
                res.status(400).json({message: 'couldnt find a thought with that ID'})
            };
            res.json(removeReact)
        } catch (err) {
            return res.status(500).json(err)
        }
    }


}