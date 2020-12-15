import mongoose from 'mongoose';
import QuestModel from './model/model';
import express from 'express';
import bodyParser from 'body-parser';
import Quest from './model/model';

const app = express();

mongoose.connect('mongodb://localhost/quests');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/quests', (req, res) => {
    const data = req.body;
    const quest = new QuestModel({
        title: data.title,
        time: data.time,
        rating: data.rating,
        description: data.description,
        city: data.city,
        img: data.img
    });

    quest.save().then(() => {
        res.send({status: 'ok'});
    });
});

app.get('/quests', (req, res) => {
    QuestModel.find().then((err, quests) => {
        if (err) {
            return res.send(err);
        }

        res.json(quests);
    });
});

app.delete('/quests/:id', (req, res) => {
    QuestModel.remove({
        _id: req.params.id
    }).then(quest => {
        if (quest) {
            res.json({ status: 'deleted' });
        } else {
            res.json({ status: 'error' });
        }
    });
});

app.put('/quests/:id', (req, res) => {
    QuestModel.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
        if (err) {
            return res.send(err);
        }

        res.json({ status: 'updated' });
    });
});

app.listen(3333, () => {
    console.log('start server');
});