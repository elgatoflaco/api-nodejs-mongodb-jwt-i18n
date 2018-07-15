module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONDODB || 'mongodb://localhost/passport',
  SECRET_TOKEN: 'miclavedetokens'
}
