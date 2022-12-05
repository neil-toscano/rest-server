const {check}=require('express-validator');
const {Router}=require('express');
const { login, googleSignIn } = require('../controlers/auth');
const { ValidarEmail } = require('../helpers/db-validators');
const { ValidadCampos } = require('../middelwares/validad-campos');
const router=Router();

router.post('',
[
    check('correo','El correo no es valido').isEmail(),
    check('password','la contrassena es obligatoria').notEmpty(),
    ValidadCampos
],login);

router.post('/google',
[
    check('id_token','El token de google es nece').notEmpty(),
    
    ValidadCampos
],googleSignIn);
module.exports=router;
