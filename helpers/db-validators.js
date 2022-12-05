const { Catego } = require("../models/categoria");
const { Produc } = require("../models/producto");
const { Role } = require("../models/rol");
const { Usuar } = require("../models/usuari");

const esRoleValido=async(rol='')=>{
    const existRol=await Role.findOne({rol});
    
    if(!existRol){
       throw new Error(`El rol ${rol} no esta registrado`);
    }
}

const ValidarEmail=async(correo)=>{
    const exitemail=await Usuar.findOne({
        correo:correo
        
    
    });
    if(exitemail){
        throw new Error(`El correo ya existe`);
    }

}
const existeUsuarioId=async(id='')=>{
    const exiteId=await Usuar.findById(id);
    if(!exiteId){
        throw new Error(`El id no existe`);
    }

}
const existeCategoriaId=async(nombre='')=>{
    const exiteId=await Catego.find({nombre:nombre});
    if(!exiteId){
        throw new Error(`La categoria con este id no existsse`);
    }

}
const existeProductoId=async(id='')=>{
    const existeID=await Produc.findById(id);
    if(!existeID){
        throw new Error('no existe el id con este producto');
    }
}



module.exports={
    esRoleValido,
    ValidarEmail,
    existeUsuarioId,
    existeProductoId,
    existeCategoriaId
}