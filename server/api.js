const express = require('express');
const mongoose = require('mongoose');
require('./models/users');
require('./models/items');
const helmet = require('helmet');
var User = mongoose.model('User');
var Item = mongoose.model('Item');
var cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config({
  path: '../.env'
});
require('./config/passport');

var app = express();

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(helmet());

mongoose.connect(
  process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

app.get('/', (req, res) => {
  res.json({
    'Status': 'Working'
  })
})

app.post('/api/register', (req, res) => {
  var user = new User();

  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function (err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token": token
    });
  });
})

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    var token;
    if (err) {
      return next(err);
    }
    if (user) {
      token = user.generateJwt();
      res.status(200).json({
        "token": token
      });
    } else {
      res.status(401).json(info);
    }
  })(req, res, next);
})

app.get('/api/register', (req, res) => {
  res.send("Register route working!");
})

app.get('/api/login', (req, res) => {
  res.send("Login route working!");
})

app.get('/api/profile', (req, res) => {
  if (!req.payload._id) {
    res.status(401).json({
      "message": "Unauthorized!"
    });
  } else {
    User.findById(req.payload._id)
      .exec((err, user) => {
        res.status(200).json(user);
      })
  }
})

app.post('/api/product', (req, res) => {
  var item = new Item({
    'title': req.body.title,
    'description': req.body.description,
    'category': req.body.category,
    'img': req.body.img,
    'price': req.body.price
  })

  item.save((err) => {
    if (err) {
      res.json(err)
    } else {
      res.json(item)
    }
  })
})

app.get('/api/products', (req, res) => {
  Item.find({}, (err, data) => {
    if (err) {
      res.status(400).json(err)
    } else {
      res.json(data);
    }
  })
})

app.get('/api/products/:category', (req, res) => {
  Item.find({
    'category': req.params.category
  }, (err, data) => {
    if (err) {
      res.status(400).json(err)
    } else {
      res.json(data);
    }
  })
})

app.get('/api/product/:id', (req, res) => {
  Item.find({
    '_id': req.params.id
  }, (err, data) => {
    if (err) {
      res.status(400).json(err)
    } else {
      res.json(data);
    }
  })
})

app.delete('/api/product/:id', (req, res) => {
  Item.deleteOne({
    '_id': req.params.id
  }, (err, data) => {
    if (err) {
      res.status(400).json(err)
    } else {
      res.json(data);
    }
  })
})

app.listen(process.env.PORT || 8000, () => {
  console.log(`Api started!`);
})
