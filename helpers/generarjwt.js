const jwt=require('jsonwebtoken');
const generarjwt=(uid='')=>{
    return new Promise((resolve,reject)=>{
        const payload={uid};
        jwt.sign(payload,process.env.key,{
            expiresIn:'1h'
        },(error,token)=>{
            if(error){
                console.log(error);
                reject('no se pudo generar el jwt')
            }
            else{
                resolve(token);
            }
        })
    });

}
module.exports={
    generarjwt
}