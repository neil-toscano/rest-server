const express=require('express');
const cors=require('cors');
const { dbConection } = require('../dbase/config');
const fileUpload=require('express-fileupload');

require('dotenv').config();
class Server{

    constructor(){
        this.app=express();
        this.dbConec();
        this.middlewares();
        this.routes();
    }
    middlewares(){
        //Directorio publico
        this.app.use(express.static('public'));
        //
        //lectura y parseo
        this.app.use(express.json());
        this.app.use(cors());
        // Note that this option available for versions 1.0.0 and newer. 
this.app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath:true
}));
    }
    routes(){
       this.app.use('/api/usuarios',require('../routes/usuarios'));
       this.app.use('/auth/login',require('../routes/auth'));
        this.app.use('/api/categorias',require('../routes/categorias'));
        this.app.use('/api/productos',require('../routes/productos'));
        this.app.use('/api/buscar',require('../routes/buscar'));
        this.app.use('/api/uploads',require('../routes/upload'));
       
        // this.app.use('/api/buscar', require('../routes/buscar'));
    }
    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log("servido corriendo en puerto 8080:");
        });
    }
    async dbConec(){
        await dbConection();
    }
}
module.exports=Server;