const {response, request}=require('express');

const { Usuar } = require('../models/usuari');
const bcriptjs=require('bcryptjs');
const usuarioGet=async(req,res=response)=>{

    //const params=req.query;
    const {limite=5,desde=0}=req.query;
  // const usuarios= await Usuar.find({estado:true})
  // .skip(Number(desde)).limit(Number(limite));
   //const total=await Usuar.countDocuments({estado:true});

    const[total, usuarios]=await Promise.all([
        Usuar.countDocuments({estado:true}),
        Usuar.find({estado:true})
    .skip(Number(desde)).limit(Number(limite))

    ]);
        res.json({
        msg:'gets',
        total,
        usuarios
        
        
    });
};

const usuarioPost=async(req,res=response)=>{
    
    const {nombre,correo,password,rol}=req.body;
    

    const this_user=new Usuar({
        nombre,
        correo,
        password,
        rol
    });
    const salt=bcriptjs.genSaltSync();
    this_user.password=bcriptjs.hashSync(password,salt);
    await this_user.save();
    
    res.json({
        msg:"post api",
        this_user
        
    });
};

const usuarioPut=async(req,res=response)=>{
    const id=req.params.id;
    //const {password,google,...resto}=req.params;
    const {_id,password,google,...resto}=req.body;
    
    //validas contra base de datos
    if(password){
        const salt=bcriptjs.genSaltSync();
        resto.password=bcriptjs.hashSync(password,salt);
    }
    const usuarioDB=await Usuar.findByIdAndUpdate(id,resto);
    res.json({
        msg:'put',
        usuarioDB
        

        
    });
};

const usuarioDelete=async(req=request,res)=>{
    const {id}=req.params;
    const uid=req.uid;
    const usuarioautenticado=req.usuario;
//fisicamente delete
//const usuario=await Usuar.findByIdAndDelete(id);
const usuario=await Usuar.findByIdAndUpdate(id,{estado:false});
    res.json({
        msg:'delete',
        id,
        usuario,
        usuarioautenticado
       
        
    });
};

module.exports={
    usuarioDelete,
    usuarioGet,
    usuarioPost,
    usuarioPut
}
