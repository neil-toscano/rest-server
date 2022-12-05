const { response, json } = require("express");
const { Catego } = require("../models/categoria");

//obtener categorias
const obtenerCategorias=async(req,res=response)=>{
    const {limite=5,inicio=0}=req.query;
    const query={estado:true};
    const [total,categorias]=await Promise.all([
        Catego.countDocuments(query),
        Catego.find(query).populate('usuario','nombre').skip(Number(inicio)).limit(Number(limite)),
    ])
   
    
    
    
    res.status(200).json({
        msg:"obtener categorias ok",
        total,
        categorias
        
    })

}
//obtener categoria
const obtenCate=async(req,res=response)=>{
    const {id}=req.params;
    const categor=await Catego.findById(id);
    res.json({
        msg:'obtener categoria',
        categor
    })
}


const crearCAtegoria=async(req,res=response)=>{
const nombre=req.body.nombre.toUpperCase();
const categoriaDB=await Catego.findOne({nombre});

if(categoriaDB){
    return res.status(400).json({
        msg:`la categoria ${nombre} ya existe`,
    })
}
//generar la data a guardar
const data={
    nombre,
    usuario:req.usuario._id,
}
const categoo=new Catego(data);
await categoo.save();
return res.json({
    msg:'guardado categoria',
    categoo
})

}
//actualizar categoria
const actualizarCatego=async (req,res=response)=>{
    const {estado,usuario,...data}=req.body;
    data.nombre=data.nombre.toUpperCase();
    const {id}=req.params;
    data.usuario=req.usuario._id;
    const dato=await Catego.findByIdAndUpdate(id,data,{new:true});
    res.json({
        msg:"ok actualizar",
        dato,
    })
}
//borrar categoria
const borrarCate=async(req,res=response)=>{
    const {id}=req.params;
    const datox=await Catego.findByIdAndUpdate(id,{estado:false});
    res.json({
        msg:"ok borrado",
        datox
    })

}

module.exports={
    crearCAtegoria,
    obtenerCategorias,
    obtenCate,
    actualizarCatego,
    borrarCate
}
