/*
* Author: Erik Bridges
*  Auth Middleware Decorator

*/
const fastifyPlugin = require("fastify-plugin");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports = fastifyPlugin(async (fastify) => {
    fastify.decorate('verifyUserAndPassword', async function (req, reply, done) {
        // Header names in Express are auto-converted to lowercase
        let token = req.headers['x-access-token'] || req.headers['authorization']; 
  
        // Remove Bearer from string
        token = token.replace(/^Bearer\s+/, "");
        // Verify JWT Token
        let tokenVerify = await jwt.verify(token, secret);
       
        // Pass Token To Request
        req.token = {...tokenVerify, passkey: undefined}
        done() // pass an error if the authentication fails
      })
})