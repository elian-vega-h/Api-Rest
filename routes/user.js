import { Router } from 'express';
import { usuarioGet, usuarioPost, usuarioPut, usuarioDelete } from '../controllers/user.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { emailExsite, esRolValido, existeUsuarioID } from '../helpers/db-validator.js';

export const router= Router();

router.get('/', usuarioGet);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria y debese de 6 digitos').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExsite),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROL','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuarioPost);

router.put('/:id',[
    check('id','No es un id valido'). isMongoId(),
    check('id').custom(existeUsuarioID),
    check('rol').custom(esRolValido),
    validarCampos

], usuarioPut);

router.delete('/:id', usuarioDelete);

