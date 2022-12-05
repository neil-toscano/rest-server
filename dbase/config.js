const mongoose=require('mongoose');
const dbConection=async()=>{
    try {
        await mongoose.connect(process.env.mongo);
        console.log('base de datos conectado');
        
    } catch (error) {
        console.log(error);
        throw ('no se puede');
        
    }
    
}

module.exports={
dbConection
}