const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    pic: { type: String },
    eventName: { type: String, required: false, unique: false, trim: false },
    media: { type: String },
    university: { type: String },
    fromDate: { type: Date },
    toDate: { type: Date },
    fromTime: { type: Date },
    toTime: { type: Date },
    ofCommunity: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community"
    }],
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;