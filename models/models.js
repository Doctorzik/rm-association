const {model, Schema} = require("mongoose")

const eventSchema = new Schema({
    name: String,
    location: String,
    description: String,
    date: Date
})

const Event = model("Event", eventSchema)


module.exports = {
    Event, 
}