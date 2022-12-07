const { response } = require("express");

const ValidarArchivo=(req,res=response,next)=>{
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No hay archivos que subir');
        return;
      }
      if (!req.files.archivo ) {
         return res.status(400).send('No hay archivos que subir');
         
        }
        next();
}
module.exports={
    ValidarArchivo
}