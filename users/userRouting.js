const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const passport = require('passport');
const { userService } = require('./services/index.js');
const { productsServices } = require('../products/services/index.js');


/* * *
 *
 * register user
 *
 * * * * */
router.post('/register', async (req, res, next) => {
  // debugger;
  const newUser = await userService.registerUser(req.body);
  if (newUser.status === 404) return res.status(404).send(newUser);

  if (newUser.jwt) res.send({ jwt: newUser.jwt });
});

/* * *
 *
 * user login
 *
 * * * * */
router.post('/login', passport.authenticate('local', {
  session: false,
}), async (req, res) => {
  if (req.user instanceof Error) {
    return res.status(400).send({ message: 'username or password is wrong' });
  }
  if (req.user) {
    const { jwt } = req.user;
    res.send({ jwt });
  }
});

/* * *
 *
 * cart main page
 *
 * * * * */
router.get('/cart', (req, res, next) => {
  res.render('cart/cartPage', { 'user': req.user });
});


/* * *
 *
 * update cart items
 *
 * this method checks query to determine if user needs to update cart when logging in or
 * when they are already in a logged in state. this changes how updateCart behaves. if
 * user is logging in we need to combine offline cart Items with db cart items. if he is
 * already in a logged in state then priority goes to items recieved from the request.
 *
 * * * * */
router.post('/cart/updateCart', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const userId = req.user.id;
  const cartItems = req.body.items;
  const login = (req.query.login === 'true');


  const done = await userService.updateCart(userId, cartItems, login);
  if (done instanceof Error) return next(createError(done));

  res.send(done);
});


/* * *
 *
 * get cart items
 *
 * * * * */
router.get('/getCartItems', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const userId = req.user.id;

  const cartItems = await userService.getCartItems(userId);
  if (cartItems instanceof Error) return next(createError(500, 'Error at getCartItems'));

  res.send(JSON.stringify(cartItems));
});


module.exports = router;
