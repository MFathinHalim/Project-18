import { Model, Schema, Types, model, models } from "mongoose";

const bookSchema = new Schema({
    id: String,
    prompt: String,
    user: {
        tujuan: String,
        pengirim: String
    },
    mode: Number,
    gender: Number
})