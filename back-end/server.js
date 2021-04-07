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
  posteddate: String,
  openings: Number,
  startdate: String, 
  shift: String,
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

const commentSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.ObjectId,
    ref: 'Job'
  },
  text: String,
  name: String,
  whenDate: String,
  jobEmail: String
});


const Comment = mongoose.model('Comment', commentSchema);
//submit comments/interests for jobs

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

app.put('/api/jobs/:id', async (req, res) => {
  try {
    let foundJob = await Job.findOne({
      _id: req.params.id
    });
    foundJob.position = req.body.position;
    foundJob.posteddate = req.body.posteddate;
    foundJob.openings = req.body.openings;
    foundJob.startdate = req.body.startdate;
    foundJob.shift = req.body.shift;
    foundJob.wage = req.body.wage;
    foundJob.description = req.body.description;
    await foundJob.save();
    res.send(foundJob);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    let foundJob = await Job.findOne({
      _id: req.params.id
    });
    res.send(foundJob);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/jobs/:id', async (req, res) => {
  try {
    let foundJob = await Job.findOne({
      _id: req.params.id
    });
    foundJob.position = req.body.position;
    foundJob.posteddate = req.body.posteddate;
    foundJob.openings = req.body.openings;
    foundJob.startdate = req.body.startdate;
    foundJob.shift = req.body.shift;
    foundJob.wage = req.body.wage;
    foundJob.description = req.body.description;
    await foundJob.save();
    res.send(foundJob);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



app.post('/api/jobs/:id/comments', async (req, res) => {
  try {
      let job = await Job.findOne({_id: req.params.id});
      if (!job) {
          res.send(404);
          return;
      }
      let comment = new Comment({
          job: job,
          text: req.body.text,
          name: req.body.name,
          whenDate: req.body.whenDate,
          jobEmail: req.body.jobEmail
      });
      await comment.save();
      res.send(comment);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

app.get('/api/jobs/:id/comments', async (req, res) => {
  try {
      let job = await Job.findOne({_id: req.params.id});
      if (!job) {
          res.send(404);
          return;
      }
      let comments = await Comment.find({job:job});
      //console.log(comments);
      res.send(comments);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});


app.delete('/api/jobs/:id/comments/:commentID', async (req, res) => {
  try {
      let comment = await Comment.findOne({_id:req.params.commentID, job: req.params.id});
      if (!comment) {
          res.send(404);
          return;
      }
      await comment.delete();
      res.sendStatus(200);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));

