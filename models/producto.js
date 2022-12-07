const {Schema,model}=require('mongoose');
const ProductoSchema=Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio'],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref: 'Usuar',
        required:true
    },
    precio:{
        type:Number,
        default:0
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Catego'
    },
    descripcion:{
        type:String
    },
    disponible:{
        type:Boolean,
        default:true
    },
    img:{
        type:String
    }
});
const Produc=model('Produc',ProductoSchema);
module.exports={Produc}