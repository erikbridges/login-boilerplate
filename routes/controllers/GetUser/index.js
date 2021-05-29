const db = require("../../../database/db");


module.exports = async (req, reply) => {
    // Get The User By Token
    const selectedUser = await db("users").where("id", req.token.id).first();
    // Return The User back
    return reply.send({...selectedUser, passkey: undefined});
};