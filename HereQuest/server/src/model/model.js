import mongoose, { Schema } from 'mongoose';

const QuestSchema = new Schema(
    {
        title: String,
        time: String,
        rating: Number,
        description: String,
        city: String,
        img: String
    }
);

const Quest = mongoose.model('Quest', QuestSchema);

export default Quest;