const { response, json } = require("express");

const { Catego } = require("../models/categoria");
const { Produc } = require("../models/producto");

//obtener productos
const obtenerProductos=async(req,res=response)=>{
    const {limite=5,inicio=0}=req.query;
    const query={estado:true};
    const [total,productos]=await Promise.all([
        Produc.countDocuments(query),
        Produc.find(query)
            .populate('usuario','nombre')
            .skip(Number(inicio))
            .limit(Number(limite)),
    ])
   
    
    
    
    res.status(200).json({
        msg:"obtener producto OK",
        total,
        productos
        
    })

}
//obtener PRODUCTOS
const obtenProduc=async(req,res=response)=>{
    const {id}=req.params;
    const producto=await Produc.findById(id);
    res.json({
        msg:'PRODUCTO',
        producto
    })
}

//crear
const crearProducto=async(req,res=response)=>{
const nombre=req.body.nombre.toUpperCase();

const {precio,categoria,descripcion='',estado=true,disponible=true}=req.body;
const preci=Number(precio);
const ProductoDB=await Produc.findOne({nombre:nombre});
const cate=await Catego.findOne({nombre:categoria})
//buscar PRODUCTO
console.log(categoria);
if(ProductoDB){
    return res.status(400).json({
        msg:`el producto ${nombre} ya existe`,
    })
}
//generar la data a guardar
const data={
   nombre,
   usuario:req.usuario._id,
   precio:preci,
   categoria:cate._id,
   descripcion,
   estado,
   disponible
}
const producte=new Produc(data);
await producte.save();
return res.json({
    producte
})

}
//actualizar PRODUCTO
const actualizarProduc=async (req,res=response)=>{
    const {categoria='',estado,...data}=req.body;
    if(data.nombre){
        data.nombre=data.nombre.toUpperCase();
    }
  
    const {id}=req.params;
    data.usuario=req.usuario._id;
    const dato=await Produc.findByIdAndUpdate(id,data,{new:true});
    res.json({
        msg:"ok actualizar",
        dato,
    })
}
//borrar Producto
const borrarProduct=async(req,res=response)=>{
    const {id}=req.params;
    const datox=await Produc.findByIdAndUpdate(id,{estado:false});
    res.json({
        msg:"ok borrado",
        datox
    })

}

module.exports={
    crearProducto,
    obtenProduc,
    obtenerProductos,
    actualizarProduc,
    borrarProduct
}
