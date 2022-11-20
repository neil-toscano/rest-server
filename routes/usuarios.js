const {Router}=require('express');
const { usuarioGet, usuarioPut, usuarioDelete, usuarioPost } = require('../controlers/usuarios');
const router=Router();

router.get('/',usuarioGet);
router.put('/:id/:ip',usuarioPut);
router.delete('/',usuarioDelete);
router.post('/',usuarioPost);

module.exports=router;
