const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');
const Event = require('../models/event');
const exportToJson = require('../helpers/helpers');

router.post('/signin', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' })
  }

  User.findOne({ email })
    .then((existingUser) => {

      if (existingUser) {
        const token = jwt.sign({ user: existingUser }, 'secret', { expiresIn: 3600 });
        return res.status(200).json({ token, userId: existingUser._id });
      }

      const user = new User({ email, password });

      user.save()
        .then((user) => {
          const token = jwt.sign({ user }, 'secret', { expiresIn: 3600 });
          res.status(200).json({ token, userId: user._id })
        })
        .catch(err => next(err));

    }).catch(err => {
      return next(err);
    });
});

router.use('/event', (req, res, next) => {
  jwt.verify(req.query.token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      });
    }
    next();
  });
});

router.get('/event', function (req, res, next) {
  const decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id)
    .populate('events')
    .then(user => {
      res.status(200).json({ events: user.events });
    })
    .catch(err => next(err));
});

router.post('/event', (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id)
    .populate('events')
    .then(user => {
      const event = new Event({
        start: req.body.start,
        title: req.body.title,
        duration: req.body.duration,
        user
      });

      event.save()
        .then(event => {
          user.events.push(event.toObject());
          user.save();

          Event.find({})
            .then(events => exportToJson(events));

          return res.status(201).json({ event })
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

router.delete('/event/:id', (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  Event.findById(req.params.id)
    .then(event => {
      event.remove()
        .then(event => {
          User.findById(decoded.user._id)
            .populate('events')
            .then(user => {
              User.update({ _id: decoded.user._id },{"$pull": { "events": { "_id": event._id } } })
                .then((response) => {
                  Event.find({})
                    .then(events => exportToJson(events));

                  return res.status(200).json({ response });
                });
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));
    })
    .catch(err => {
      return next(err);
    });
});

module.exports = router;
