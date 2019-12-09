import nodemailer from 'nodemailer';
import Booking from "./booking";

export const sendBookingNotification = (booking: Booking) => {
    let transport = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: '52094677bbdc1d',
            pass: '4b76ee885c82df'
        }
    });
    const message = {
        from: 'uqtontran@gmail.com',
        to: 'to@email.com',
        subject: 'Din booking for WashIt er nå ledig',
        text: `Tid ${booking.date}`
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
};