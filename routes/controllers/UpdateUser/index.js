const db = require("../../../database/db");
const validate = require("../../validators/validators");

module.exports = async (req, reply) => {
    const { email, username, password, updateWhich } = req.body;

    // Get The User By Token
    const selectedUser = await db("users").where("id", req.token.id).first();
    // Check if the password matches
    const isSame = await argon2.verify(selectedUser.passkey, password);

    // If it's not the same return an error
    if (!isSame) {
        return reply.code(400).send("Error: Unable to update user. Verification Failed")
    }
    // Update User The Selected User
    switch(updateWhich) {
        case "email": {
            // Validation Email
            const checkEmail = await validate.validateEmail(email)
            if (!checkEmail) {
                return reply.code(400).send("Error: Invalid Credentials. Make sure your email is valid.")
            }
            await db("users").update({email}).where("id", selectedUser.id)
        }
        case "password": {
            // Validation Password
            const checkPass = validate.validatePassword(password)
            if (!checkPass) {
                return reply.code(400).send("Error: 8 - 50 characters, at least one letter, one number and a special character")
            }
            // Change Password
            const newPassword = new Buffer.from(password);

            // Update Password
            const hash = await argon2.hash(newPassword, {hashLength: 50});
            await db("users").update({passkey: hash}).where("id", selectedUser.id)
        }
        case "username": {
            // Validation Username
            const checkUsername = validate.validateUsername(username)
            if (!checkUsername) {
                return reply.code(400).send("Error: Invalid Credentials")
            }
            await db("users").update({username}).where("id", selectedUser.id)
        }
    }
 
    // Return The User back
    return reply.send("Successfully Updated!");
};