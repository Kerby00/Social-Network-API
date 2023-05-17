const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            Default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    }, {
    toJSON: {
        virtuals: true,
        getters: true
    }
}
);

thoughtsSchema.virtual('reactionCount').get(function () { return this.reactions.length });

const Thoughts = model("Thoughts", thoughtsSchema);

module.exports = Thoughts;
