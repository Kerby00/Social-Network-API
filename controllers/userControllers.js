const { User, Thoughts } = require('../models/user')

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });

            if (!user) {
                return res.status(400).json({ message: 'No user found with that ID' })
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async createUser(req, res) {
        try {
            const create = await User.create(req.body);
            res.json(create)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteUser(req, res) {
        try {
            const byebye = await User.findOneAndDelete({ _id: req.params.userId });

            if (!byebye) {
                return res.status(400).json({ message: 'Id not found, no user deleted' })
            };

            await Thoughts.deleteMany({ _id: { $in: byebye.thoughts } });

            res.json(byebye)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async updateUser(req, res) {
        try {
            const letsUpdate = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true }
            );

            if(!letsUpdate) {
                res.status(400).json({message: 'couldnt find a user with that ID'})
            };

            res.json(letsUpdate)
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

