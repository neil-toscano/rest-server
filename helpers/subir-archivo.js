const { v4:uuidv4 } = require("uuid");
const path=require('path');
const subirArchivo=(files,extValid=['png','jpg','pdf','jpeg','gif'],carpeta='')=>{
    return new Promise((resolve,reject)=>{
        
        const{archivo}= files;
    const nombreCortado=archivo.name.split('.');
    const extension=nombreCortado[nombreCortado.length-1];
    //validar extension
    //const extensiPermi=;
    console.log(nombreCortado);
    console.log(extension);

    if(!extValid.includes(extension)){
      //return res.status(400).json({
      //  msg:`La extension ${extension} no es permitida`
      //})
      return reject(`la extension ${extension} no es permitida`);
    }
    
    const nombreTemp=uuidv4()+'.'+extension;
  
  const  uploadPath = path.join(__dirname , '../uploads/' ,carpeta, nombreTemp);

  archivo.mv(uploadPath,(err)=>{
    if(err){
      reject(err);
      }
      resolve(nombreTemp)
    }
      )
    })
}
    //res.json({msg:'file'+uploadPath})

 

module.exports={
    subirArchivo

}