import nodemailer from 'nodemailer';
import { User } from '@/utils/model/userModel';
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email,  emailType, userId}: any)=>{
     try {
        console.log("enter mailer")
        const hashedToken =  await bcryptjs.hash(userId.toString(), 10)
       
        if(emailType === "VERIFY"){
             await User.findByIdAndUpdate(userId,
            {verifyToken:hashedToken, verifyTokenExpiry: Date.now()+3600000})
        }else if(emailType === "RESET"){
             await User.findByIdAndUpdate(userId,
                {forgotPasswordToken:hashedToken, forgotPasswordTokenExpiry: Date.now()+3600000})
        }

        const transporter = nodemailer.createTransport({     
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: '16236b16e3bb8c',
                  pass: '5ee3792945cc86'
                }
        })

        const mailOptions = {
            from: 'fackwuwu@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" 
            :"Reset your password",
            html: `<p> click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">
            here<a/> to ${
            emailType === "VERIFY" ? "verify your email" : 
            "reset your password"} or copy and past the link below 
            in your browser. <br>${process.env.domain}
            /verifyemail?token=${hashedToken}</br></P>`
        }
        console.log(transporter, "options:", mailOptions)
        const mailresponse = await transporter.sendMail(mailOptions)

        return mailresponse;
     } catch (error:any) {
          throw new Error(error.message)
     }
}