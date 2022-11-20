const {response}=require('express')
const usuarioGet=(req,res=response)=>{
    const params=req.query;
    res.json({
        msg:'ok',
        params
        
    });
};

const usuarioPost=(req,res)=>{
    const body=req.body;
    res.json({
        msg:'posts',
        respu:body
        
    });
};

const usuarioPut=(req,res)=>{
    const id=req.params.id;
    const ip=req.params.ip;
    res.json({
        msg:'put',
        id,
        ip

        
    });
};

const usuarioDelete=(req,res)=>{
    res.json({
        msg:'delete',
        
    });
};

module.exports={
    usuarioDelete,
    usuarioGet,
    usuarioPost,
    usuarioPut
}
