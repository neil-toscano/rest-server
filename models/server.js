const express=require('express');
const cors=require('cors');
require('dotenv').config();
class Server{

    constructor(){
        this.app=express();
        this.middlewares();
        this.routes();
    }
    middlewares(){
        //Directorio publico
        this.app.use(express.static('public'));
        //lectura y parseo
        this.app.use(express.json());
        this.app.use(cors());
    }
    routes(){
       this.app.use('/api/usuarios',require('../routes/usuarios'));
    }
    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log("servido corriendo en puerto:");
        });
    }
}
module.exports=Server;