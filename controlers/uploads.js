const { response } = require("express");
const  fs  = require("fs");
const path=require('path');
const { subirArchivo } = require("../helpers/subir-archivo");
const { Produc } = require("../models/producto");
const { Usuar } = require("../models/usuari");
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const cargaArchivo=async(req,res=response)=>{
   
        let sampleFile;
       
      
      
        console.log('req.files >>>', req.files); // eslint-disable-line
     
        try {
          const pathCompleto=await subirArchivo(req.files,undefined,"imgs")
       res.json({
        pathCompleto
       })
          
        } catch (error) {
          res.status(400).json({
            msg:error
          })
          
        }
       
//
//
//err);
//
//
//
//loadPath
//
//
//
//
}

//actualizar imagen
const ActualiImg=async(req,res=response)=>{
  const {id,coleccion}=req.params;
  let modelo;
  switch (coleccion) {
    case 'usuario':
      modelo=await Usuar.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg:`no existe usuario con el id ${id}`
        })
      }
      
      break;
    case 'productos':
      modelo=await Produc.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg:`no existe producto con el id ${id}`
        })
      }
      break;
    default:
      return res.status(500).json({
        msg:'se me olvido validar esto'
      })
      
  }
  //limpiar imagenes previas
if(modelo.img){
  //borrar imagen del servidos
  const pathImage=path.join(__dirname,'../uploads',coleccion,modelo.img);
  if(fs.existsSync(pathImage)){
    fs.unlinkSync(pathImage);
  }
}

  modelo.img=await subirArchivo(req.files,undefined,coleccion);
  await modelo.save();
  res.json({
    modelo,
    id,
    coleccion
  })

}
//
//actualizar imagen cLOUDINARY
const ActualiImgCloudy=async(req,res=response)=>{
  const {id,coleccion}=req.params;
  let modelo;
  switch (coleccion) {
    case 'usuario':
      modelo=await Usuar.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg:`no existe usuario con el id ${id}`
        })
      }
      
      break;
    case 'productos':
      modelo=await Produc.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg:`no existe producto con el id ${id}`
        })
      }
      break;
    default:
      return res.status(500).json({
        msg:'se me olvido validar esto'
      })
      
  }
  //limpiar imagenes previas
if(modelo.img){
  const nombreARR=modelo.img.split('/');
  const nombre=nombreARR[nombreARR.length-1];
  const [public_id]=nombre.split('.');
  await cloudinary.uploader.destroy(public_id);

  
}
//subiendo nuevo archivo
console.log(req.files.archivo);
const {tempFilePath}=req.files.archivo;
const {secure_url}=await cloudinary.uploader.upload(tempFilePath);
modelo.img=secure_url;
await modelo.save();

 // cloudinary.uploader.upload()
  res.json(modelo)

}

const mostrarImagen=async(req,res=response)=>{
  const {id,coleccion}=req.params;

  let modelo;
  switch (coleccion) {
    case 'usuario':
      modelo=await Usuar.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg:`no existe usuario con el id ${id}`
        })
      }
      
      break;
    case 'productos':
      modelo=await Produc.findById(id);
      if(!modelo){
        return res.status(400).json({
          msg:`no existe producto con el id ${id}`
        })
      }
      break;
    default:
      return res.status(500).json({
        msg:'se me olvido validar esto'
      })
      
  }
  //limpiar imagenes previas
if(modelo.img){
  //borrar imagen del servidos
  const pathImage=path.join(__dirname,'../uploads',coleccion,modelo.img);
  if(fs.existsSync(pathImage)){
    res.sendFile(pathImage)
  }
}
else{
  const pathnoImage=path.join(__dirname,'../assets/','no-image.jpg');
  res.sendFile(pathnoImage)
}


  
}
module.exports={
    cargaArchivo,
    ActualiImg,
    mostrarImagen,
    ActualiImgCloudy
}