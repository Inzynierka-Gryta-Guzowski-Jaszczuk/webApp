//maile
const nodemailer = require('nodemailer')

const sendEmail = () => {    
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

module.exports = sendEmail