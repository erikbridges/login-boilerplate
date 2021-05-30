// Controllers 
const registerUser = require("./controllers/Register");
const LoginUser = require("./controllers/SignIn");
const getUser = require("./controllers/GetUser");
const authTest = require("./controllers/AuthTest");
const updateUser = require("./controllers/UpdateUser");
const deleteUser = require("./controllers/DeleteUser");

async function routes (fastify, options) {

    // Main
    fastify.get("/", async (request, reply) => {
      return {test: "Hello Welcome to the server"}
    });

    fastify.post("/register", async (req, reply) => registerUser(req, reply))

    // Auth Test 
    fastify.route({
        method: 'POST',
        url: '/auth-test',
        preHandler: fastify.auth([
          fastify.verifyUserAndPassword
        ]),
        handler: (req, reply) => authTest(req, reply)
      })
    
    // Login User
    fastify.post("/sign-in", async (req, reply) => LoginUser(req, reply))

    // Get User By Id
    fastify.route({
      method: 'GET',
      url: '/user',
      preHandler: fastify.auth([
        fastify.verifyUserAndPassword
      ]),
      handler: (req, reply) => getUser(req, reply)
    })

    // Update User by id
    fastify.route({
        method: 'PATCH',
        url: '/user',
        preHandler: fastify.auth([
          fastify.verifyUserAndPassword
        ]),
        handler: (req, reply) => updateUser(req, reply)
    })
    

    // Delete User by id
    fastify.route({
      method: 'DELETE',
      url: '/user',
      preHandler: fastify.auth([
        fastify.verifyUserAndPassword
      ]),
      handler: (req, reply) => deleteUser(req, reply)
    })

  }
  
module.exports = routes
  