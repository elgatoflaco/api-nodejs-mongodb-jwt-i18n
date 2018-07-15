'use strict'

function validateVideo (req, res, next) {
  if (!req.files.archivo) {
    console.log(req.file)
    res.statusCode = 400
    return res.json({
      errors: ['File failed to upload']
    })
  }
  if (req.files.archivo.truncated) {
    res.statusCode = 400
    return res.json({
      errors: ['File too large']
    })
  }

  // req.checkBody('title', 'Invalid title').notEmpty();
  req.check('title', 'Invalid title').notEmpty()
  // req.checkBody('album_id', 'Invalid album_id').isNumeric();

  var errors = req.validationErrors()
  if (errors) {
    var response = { errors: [] }
    errors.forEach(function (err) {
      response.errors.push(err.msg)
    })

    res.statusCode = 400
    return res.json(response)
  }

  return next()
}

module.exports = validateVideo
