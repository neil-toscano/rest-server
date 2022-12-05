const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.googleid);
async function verifyy(token='') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.googleid,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  console.log(payload);
  const {name,picture,email}=ticket.getPayload();
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  return {
    nombre:name,
    img:picture,
    correo:email
  }
}
//verify().catch(console.error);
module.exports={
    verifyy
}