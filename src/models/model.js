import { Schema, model, models } from "mongoose";

const cardSchema = new Schema({
    uid: String,
    prompt: String,
    user: {
        tujuan: String,
        pengirim: String
    },
    mode: Number,
    gender: Number
})

const cardModel = models.card || model("card", cardSchema);
export { cardModel }