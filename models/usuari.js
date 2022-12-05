const { default: mongoose } = require("mongoose");

const usu=new mongoose.Schema({
nombre:{
    type:String,
    required:[true, 'El nombre es obligatorio']
},
correo:{
    type: String,
    required:[true,'el correo es obligatorio'],
    unique: true
},
password:{
    type:String,
    required:[true,'la contrasena es obligatorio']
},
img:{
    type:String
},
rol:{
    type:String,
    required:true,
    //enum:['Admin','User']
},
estado:{
    type:Boolean,
    default:true
},
google:{
    type:Boolean,
    default:false
}

});
usu.methods.toJSON=function(){  
    const{__v,password,_id,...usuarioo}=this.toObject();
   usuarioo.uid=_id;
    return usuarioo;
}
const Usuar=mongoose.model('Usuar',usu);
module.exports={
    Usuar
}

