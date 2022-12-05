const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Catego } = require("../models/categoria");
const { Produc } = require("../models/producto");
const { Usuar } = require("../models/usuari");
const coleecionesPermintidas=[
    'usuarios',
    'categoria',
    'productos',
    'roles'
];
const buscarUsuarios=async(termino='',res=response)=>{
    const esMOngoId= isValidObjectId(termino);
    console.log(esMOngoId);
    if(esMOngoId){
        const usuario=await Usuar.findById(termino);
        return res.json({
            results:(usuario)?[usuario]:[]
        })
    }
    const regex=new RegExp(termino,'i');
    console.log(regex);
    const usuarioos=await Usuar.find({
        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]
    });
    return res.json({
        results:usuarioos
    })
    
 
}
const buscarProductos=async(termino='',res=response)=>{
    const esMOngoId= isValidObjectId(termino);
    console.log(esMOngoId);
    if(esMOngoId){
        const producto=await Produc.findById(termino);
        return res.json({
            results:(producto)?[producto]:[]
        })
    }
    const regex=new RegExp(termino,'i');
    console.log(regex);
    const productos=await Produc.find({
        $or:[{nombre:regex}],
        $and:[{estado:true}]
    });
    return res.json({
        results:productos
    })
    
 
}
const buscarCategoria=async(termino='',res=response)=>{
    const esMOngoId= isValidObjectId(termino);
    console.log(esMOngoId);
    if(esMOngoId){
        const categoria=await Catego.findById(termino);
        return res.json({
            results:(categoria)?[categoria]:[]
        })
    }
    const regex=new RegExp(termino,'i');
    console.log(regex);
    const categorias=await Catego.find({
        $or:[{nombre:regex}],
        $and:[{estado:true}]
    });
    return res.json({
        results:categorias
    })
    
 
}

const buscar=async(req,res=response)=>{

    const {coleccion,termino}=req.params;
    if(!coleecionesPermintidas.includes(coleccion)){
        return res.status(400).json({
            msg:`las coleccionas permitidas son ${coleecionesPermintidas}`
        })
    }
switch (coleccion){
    case 'usuarios':
        buscarUsuarios(termino,res);
        break;
    case 'productos':
        buscarProductos(termino,res);
        break;
    case 'categoria':
        buscarCategoria(termino,res);
        break;
    default:
        res.json({

            img:"buscar",
            coleccion,
            termino
        })

}


    
}

module.exports ={buscar}


