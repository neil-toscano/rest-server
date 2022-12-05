const { response, json } = require("express");
const { Usuar } = require("../models/usuari");
const bcryptjs=require('bcryptjs');
const { generarjwt } = require("../helpers/generarjwt");
const { verify } = require("jsonwebtoken");
const { verifyy } = require("../helpers/google-verify");
const login=async(req,res=response)=>{
    const {correo,password}=req.body;

    try {
        const emailExis=await Usuar.findOne({correo});
        if(!emailExis){
            return res.status(400).json({
                msg:'usuario/password no son correctos /correo',
            })
        }
        if(!emailExis.estado){
            return res.status(400).json({
                msg:"usuario/password no son correctos / estado:false"
            })
        }

        const validPassword= bcryptjs.compareSync(password,emailExis.password);
            
        if(!validPassword){
            return res.status(400).json({
                msg:"correo/password no correctos / password"
            })
        }
        //generar json web token
        const iid=emailExis.id;
        const token=await generarjwt(emailExis.id);
        res.json({
            msg:'login OK',
            emailExis,
            iid,
            token
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"hable con el administrador"

        })
        
    }
    
}
const googleSignIn=async(req,res=response)=>{
    const {id_token}=req.body;
    try {
        const {correo,nombre,img}=await verifyy(id_token);
    //let 
      let usuario=await Usuar.findOne({correo});
      
      if(!usuario){
          console.log('encontrado');
          const data={
              nombre,
              correo,
              password:"comovasamigo",
              img,
              rol:"Admin_Rol",
              google:true
//
          }
          usuario=new Usuar(data);
          await usuario.save();
      }
      //borrado
      //console.log(impriUsu);
      if(!usuario.estado){
          return res.status(401).json({
              msg:"Hable con el administrador, usuario bloqueado"
          });
      }
    //generar JWT
     const token=await generarjwt(usuario.id);

     //console.log(googleUser);
        res.json({
            msg:"todo ok en signIn",
            id_token,
            //googleUser,
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"El token no se pudo verificar"
        })
        
    }
    

}
module.exports={login,googleSignIn}