const { response } = require("express")

const esAdminRole=(req,res=response,next)=>{
    if(!req.usuario){
        return res.status(500).json({
            msg:"Se quiere verificar el role sin verificar token"
        })
    }
    const {rol,nombre}=req.usuario;
    if(rol!=='Admin_Rol'){
       return  res.status(401).json({
            msg:`${ nombre } no es administrador - NO puede hacer esto`
        })
    }

next();
}

const tieneRole=(...roles)=>{
    return (req,res=response,next)=>{
        if(!req.usuario){
            return res.status(500).json({
                msg:"Se quiere verificar el role sin verificar token"
            })
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:"El servicio requiere un rol para borrar Admin"
            })
        }
        next();
    }

}

module.exports={
    esAdminRole,
    tieneRole
}