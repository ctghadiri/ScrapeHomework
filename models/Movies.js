var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    movie: {
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