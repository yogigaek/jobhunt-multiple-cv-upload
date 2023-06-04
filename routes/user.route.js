const router = require('express').Router()
const user = require('../controller/user.controller')
const passport = require('passport')
const Localstrategy  = require('passport-local').Strategy

passport.use(new Localstrategy({usernameField: 'email'}, user.localstrategy))
router.post('/register', user.register)
router.post('/login', user.login)
router.post('/logout', user.logout)
router.get('/me', user.me)

module.exports = router