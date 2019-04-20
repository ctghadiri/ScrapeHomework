var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    movie: {
        type: String,
        unique: true,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Movies = mongoose.model("Movie", MovieSchema)

module.exports = Movies