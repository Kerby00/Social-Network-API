const {Thoughts } = require('../models/thought');

module.exports = {
    async getThoughts(req, res) {
        try{
            const thoughts = await Thoughts.find();

            res.json(thoughts);
        } catch (err) {
res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thoughts.findOne({_id: req.params.thoughtsId});

            if (!thought) {
                return res.status(404).json({message: 'No thought found with that Id'})
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
            const deleteDatThot = await Thoughts.findOneAndRemove({__id: req.params.thoughtsId});

            if (!deleteDatThot) {
                return res.status(400).json({message: 'no thot deleted: check Id'})
            }

            res.json(deleteDatThot);
        } catch(err) {
            return res.status(500).json(err)
        }
    },


}