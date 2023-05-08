const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerUsuarios, registrarUsuario, loginUsuario, obtenerUsuarioUnico } = require('../controllers/usuarios');
const router = Router();

router.get('/', obtenerUsuarios);

router.post('/', registrarUsuario)
router.post('/obtener-usuario', obtenerUsuarioUnico)

router.post('/login',[
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], loginUsuario)

module.exports = router;