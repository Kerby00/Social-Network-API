// const User = require('../models/user');
// const Thoughts = require('../models/thought');
const {User, Thought} = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users)
            console.log(res)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v').populate('thoughts').populate('friends');

            if (!user) {
                return res.status(400).json({ message: 'No user found with that ID' })
            }
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async createUser(req, res) {
        console.log(req)
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

            await Thought.deleteMany({ _id: { $in: byebye.thoughts } });

            res.json({message: 'user deleted'})
        } catch (err) {
            console.log(err)
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
    },
    async addFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.params.friendId}},
                { new: true}
            );
            
            if(!friend) {
                res.status(400).json({message: 'couldnt find a user with that ID'})
            };

            res.json(friend)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async dropFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                { new: true}
            );
            
            if(!friend) {
                res.status(400).json({message: 'couldnt find a user with that ID'})
            };

            res.json(friend)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}


