/*
  Rutas de usuarios / Auth
  host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { validateJWT } = require('../middlewares/jwtValidator');
const { createUser, login, renewToken } = require('../controllers/auth');

const router = Router();

router.post(
  '/new',
  [
    // Middlewares
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe ser de 6 caracteres o mas').isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe ser de 6 caracteres o mas').isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  login
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
