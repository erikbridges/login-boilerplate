const validate = require("../../validators/validators")
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const { nanoid } = require("nanoid");
const db = require("../../../database/db")

module.exports = async (req, reply) => {
    const { username = "", email = "", phoneNum = "", password = "" } = req.body;
    const id = nanoid(5); 

    console.log(req.body)
    // Validate information (Return 400 if the information is incorrect)
    // Username
    const checkUsername = validate.validateUsername(username)
    if (!checkUsername) {
        return reply.code(400).send("Error: Invalid Credentials")
    }
    // Email Address
    const checkEmail = await validate.validateEmail(email)
    if (!checkEmail) {
        return reply.code(400).send("Error: Invalid Credentials. Make sure your email is valid.")
    }
    // Phone Number
    const checkPhone = validate.validatePhoneNum(phoneNum)
    if (!checkPhone) {
        return reply.code(400).send("Error: Invalid Credentials")
    }
    // Validate Password
    const checkPass = validate.validatePassword(password)
    if (!checkPass) {
        return reply.code(400).send("Error: 8 - 50 characters, at least one letter, one number and a special character")
    }

    /*
        Encrypt the user's password with argon2 encryption.
        I usually would use bcrypt but, I thought I would try something different
        as a proof of concept. 
    */
    const newPassword = new Buffer.from(password);

    const hash = await argon2.hash(newPassword, {hashLength: 50});

    const newUser = {
        id,
        username,
        email,
        phonenum: phoneNum,
        passkey: hash,
        smsverified: false,
        verifiedcode: nanoid(7),
        forgotactive: false,
        isverified: false
    }


    // Add user to the database
    await db("users").insert(newUser)
    const token = await jwt.sign(newUser, secret, { expiresIn: '1h' });
    // let accountSid = process.env.TWILIO_ACCOUNT_SID; 
    // let authToken = process.env.TWILIO_AUTH_TOKEN;   


    // Verify Account using ID
    // const client = require("twilio")(accountSid, authToken, {
    //     lazyLoading: true
    // });

    // client.messages.create({
    //     from: "+17014048403",
    //     to: phoneNum,
    //     body: "Verification Code From Test App. For security reasons, do not share this code with anyone! Code:"
    // })

    return reply.send({token})
}