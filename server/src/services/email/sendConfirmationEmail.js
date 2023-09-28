const transporter = require('./transporter')
const nodemailer = require('nodemailer')
const confirmEmail = require('./templates/confirmEmail')

const sendConfirmationEmail = async (email, name, id) => {
    mailData = confirmEmail(email, name, id)

    transporter.sendMail(mailData, function (err, info) {
        if(err){
        console.log("errir")
          console.log(err)
        }else{
            console.log("success")
            console.log(info);
        }
     });
}

module.exports = sendConfirmationEmail