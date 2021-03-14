var express = require('express');
var router = express.Router();
const { check } = require('express-validator');
const LogIn = require('../controllers/login');
const Inventory = require('../controllers/inventory');
const Orders = require('../controllers/order');

//Middle ware that is specific to this router
const passport = require('passport');
require("../configuration/jwt")(passport);

// Passport middleware
router.use(passport.initialize());
// Passport config

router.get('/', (req, res) => {
    res.send("Welcome to my backend demonstration!")
  })

router.post('/register', [

  check('email', 'Email is invalid').isEmail().normalizeEmail(),
  check('password', 'Password must be at least 6 characters and less than 20').isLength({ min: 6, max: 20 }),

], LogIn.register)

router.post('/login', LogIn.login);

router.get('/buildInventory', passport.authenticate('jwt', {session: false}),Inventory.buildInventory);

router.post('/inventory', passport.authenticate('jwt', {session: false}),Inventory.addInventory);

router.get('/inventories', passport.authenticate('jwt', {session: false}),Inventory.getInventory);

router.get('/orders', passport.authenticate('jwt', {session: false}), Orders.getOrders)

router.post('/order', passport.authenticate('jwt', {session: false}), Orders.addOrder)

module.exports = router;