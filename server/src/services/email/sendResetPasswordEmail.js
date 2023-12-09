const transporter = require('./transporter')
const nodemailer = require('nodemailer')
const confirmEmail = require('./templates/resetPasswordEmail')

const sendConfirmationEmail = async (email, id) => {
    mailData = confirmEmail(email, id)

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