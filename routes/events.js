/*
  Rutas de eventos / Events
  host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { validateJWT } = require('../middlewares/jwtValidator');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');

const router = Router();

// Validar token en todas las rutas
router.use(validateJWT);

// Obtner eventos
router.get('/', getEvents);

// Crear evento
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').notEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
    fieldsValidator,
  ],
  createEvent
);

// Actualizar evento
router.put(
  '/:id',
  [
    check('title', 'El titulo es obligatorio').notEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
    fieldsValidator,
  ],
  updateEvent
);

// Eliminar evento
router.delete('/:id', deleteEvent);

module.exports = router;
