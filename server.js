// Server Set Up
const fastify = require('fastify')({
    logger: true
  })
const helmet = require("fastify-helmet");

// DOT ENV and PORT Configuration
require('dotenv').config();

// Database
const options =
  process.env.NODE_ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: true
      }
    : {
        host: "127.0.0.1",
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: "login-test"
      };

const PORT = process.env.PORT || 5000

// Configuration
fastify.register(require("fastify-cors"));
fastify.register(require("fastify-auth"));
fastify.register(
  helmet,
  { contentSecurityPolicy: false }
)
fastify.register(require("./middleware/auth"));
fastify.register(require("./routes/routes.js"), { prefix: "/api" });



// // Running Static
// fastify.register(require('fastify-static'), {
//     root: path.join(__dirname, 'client'),
//     prefix: '/public/', // optional: default '/'
// })


  
fastify.listen(PORT, (err, address) => {
    if (err) throw err
    fastify.log.info(`server listening on ${address}`)
  })