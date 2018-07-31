'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')
var bCrypt = require('bcrypt-nodejs')

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save((err) => {
    if (err) {
      console.log(err)
      res.status(500).send({message: `Error accessing database: ${err}`})
    } else {
      console.log(user)
      return res.status(200).send({ token: service.createToken(user) })
    }
  })
}

function signIn (req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({message: 'User not found!'})

    user.comparePassword(req.body.password, (error, isMatch) => {
      console.log(error)
      if (!isMatch) {
        return res.status(401).send({ message: 'Wrong credentials!' })
      } else {
        req.user = user
        return res.status(200).send({ message: 'Logged in!', token: service.createToken(user), user })
      }
    })
  })
}

function getUser(req, res) {
	User.findOne({ _id: req.params._id }, (err, user) => {
		if (err) return res.status(500).send({ message: err });
    if (!user) return res.status(404).send({ message: "User not found!" });
    return res
					.status(200)
					.send({
						message: "Allowed",
						user
					});
	});
}

// Generates hash using bCrypt
// var createHash = function (password) {
//   return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
// }

module.exports = {
  signUp,
  signIn,
  getUser
}
