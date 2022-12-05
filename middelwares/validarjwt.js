const { request } = require("express");
const jwt=require('jsonwebtoken');
const { Usuar } = require("../models/usuari");
const validarJwt=async(req=request,res=response,next)=>{
    const token=req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg:"no hay token el la peticion"
        })
    }
    try {
        const {uid}=jwt.verify(token,process.env.key);
        const usuario=await Usuar.findById(uid) ;
        if(!usuario){
            return res.status(401).json({
                msg:"usuarion no existe en db"
            });
            
        }
        req.usuario=usuario;
        //verificar usuario
        if(!usuario.estado){
            return res.status(401).json({
            msg:"usuario borrado"
            })
        }
        req.uid=uid;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:"Token no valido"
        });
        
    }
    
}
module.exports=validarJwt;