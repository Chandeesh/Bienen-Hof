const nodemailer = require('nodemailer');

module.exports = {

    sendMail: (emailId, token) => {
        const transporter = nodemailer.createTransport({
            port: 465,               // true for 465, false for other ports
            host: "smtp.mail.yahoo.com",
            auth: {
                user: 'chandeesh64@yahoo.com',
                pass: 'sepxlqetqtiacptu',
            },
            secure: true,
        });
        const mailData = {
            from: 'chandeesh64@yahoo.com',  // sender address
            to: emailId,   // list of receivers
            subject: 'Activate your account',
            text: 'Please click on the link to activate to your account and then login',
            html: 'http://localhost:5000/bienen/user/confirm?token=' + token,
        };

        try {
            transporter.sendMail(mailData);
            return true;
        } catch(e) {
            return false;
        }
        
    }
}