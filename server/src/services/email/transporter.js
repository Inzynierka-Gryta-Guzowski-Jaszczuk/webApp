const nodemailer = require('nodemailer')
const config = require('config')
const gmailUsername = config.get('gmail.userName')
const gmailPassword = config.get('gmail.password')

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: gmailUsername,
            pass: gmailPassword,
         },
    secure: true,
    });

module.exports = transporter