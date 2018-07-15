'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')
var bCrypt = require('bcrypt-nodejs')

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: createHash(req.body.password)
  })

  user.save((err) => {
    if (err) res.status(500).send({message: `Error al crear el usuario: ${err}`})

    return res.status(200).send({ token: service.createToken(user) })
  })
}

function signIn (req, res) {
  User.findOne({ 'email': req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'No existe el usuario'})
    req.user = user
    res.status(200).send({
      message: 'Te has logeado corréctamente',
      token: service.createToken(user)
    })
  })
}

// Generates hash using bCrypt
var createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

module.exports = {
  signUp,
  signIn
}
