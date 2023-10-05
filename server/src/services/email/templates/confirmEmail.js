const config = require('config')
const gmailUsername = config.get('gmail.userName')
const apiURL = config.get('api.url')
const apiPort = config.get('api.port')
const confirmEmail = (email, name, id) => {
   const mailData = {
        from: gmailUsername,  // sender address
        to: email,   // list of receivers
        subject: 'Kuchnia - potwierdzenie rejestracji',
        html: `<b>Witaj w Kuchni ${name}</b><br> Aby zakończyć proces rejestracji potwierdź email klikając w przycisk poniżej<br/><a href="${apiURL}:${apiPort}/user/activate/${id}">potwierdź email</button>`,
    };
    return mailData
}

module.exports = confirmEmail