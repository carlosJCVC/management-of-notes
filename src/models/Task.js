const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const TaskSchema = new Schema({
  //  author: ObjectId,
    title: { type: String, required: true},
    description: { type: String, required: true},
    date: { type: Date, default: Date.now},
    status: {
        type: Boolean,
        default: false,
    },
    user_id: {type: String}
});

module.exports = mongoose.model('Task', TaskSchema);