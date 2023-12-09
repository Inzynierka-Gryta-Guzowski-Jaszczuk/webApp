const config = require('config')
const gmailUsername = config.get('gmail.userName')
const apiURL = config.get('api.url')
const apiPort = config.get('api.port')
const resetPasswordEmail = (email, id) => {
   const mailData = {
        from: gmailUsername,  // sender address
        to: email,   // list of receivers
        subject: 'Kuchnia - reset hasła',
        html: `<b>Witaj w Kuchni</b><br/>
        Aby zresetować hasło kliknij w przycisk poniżej<br/>
        <a href="localhost:5173/user/resetPassword/${id}">zmień hasło</a><br>
        ${id}</br>
        jeżeli nie wykonałeś dyspozycji resetu hasła, zignoruj tę wiadomość`,
    };
    return mailData
}

module.exports = resetPasswordEmail