var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    Note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Movies = mongoose.model("Movie", MovieSchema)

module.exports = Movies