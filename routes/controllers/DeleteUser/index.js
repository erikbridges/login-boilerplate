const db = require("../../../database/db");


module.exports = async (req, reply) => {
    const { password } = req.body;

    // Get The User By Token
    const selectedUser = await db("users").where("id", req.token.id).first();
    // Check if the password matches
    const isSame = await argon2.verify(selectedUser.passkey, password);

    // If it's not the same return an error
    if (!isSame) {
        return reply.code(400).send("Error: Unable to delete user. Verification Failed")
    }
    // Delete The Selected User
    await db("users").del().where("id", selectedUser.id)
    // Return The User back
    return reply.send("Deletion Successful");
};