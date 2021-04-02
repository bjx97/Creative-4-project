const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const jobSchema = new mongoose.Schema({
  position: String, 
  posteddate: Number,
  openings: Number,
  startdate: Number, 
  shift: Number, 
  wage: Number, 
  description: String
});

jobSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

jobSchema.set('toJSON', {
  virtuals: true
});

const Job = mongoose.model('Job', jobSchema);

app.get('/api/jobs', async (req, res) => {
  try {
    let jobs = await Job.find();
    res.send({jobs: jobs});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/jobs', async (req, res) => {
  const job = new Job({
  position: req.body.position,
  posteddate: req.body.posteddate,
  openings: req.body.openings,
  startdate: req.body.startdate,
  shift: req.body.shift,
  wage: req.body.wage,
  description: req.body.description
});
try {
  await job.save();
  res.send({job: job});
} catch (error) {
  console.log(error);
  res.sendStatus(500);
}
});

app.delete('/api/jobs/:id', async (req, res) => {
  try {
    await Job.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

