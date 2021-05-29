const db = require("../../../database/db");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports = async (req, reply) => {
    const {email, password} = req.body;
    // Grab user by email
    const selectedUser = await db("users").where("email", email).first();

    // If there is no email return an error
    if (!selectedUser) {
        return reply.code(400).send("Error: Invalid Email or Password")
    }
    
    // Check if the password matches
    const isSame = await argon2.verify(selectedUser.passkey, password);

    // If it's not the same return an error
    if (!isSame) {
        return reply.code(400).send("Error: Invalid Email or Password")
    }

    // Create A Token
    const token = await jwt.sign({...selectedUser, passkey: undefined}, secret, { expiresIn: '1h' });

    return reply.send({token});

}