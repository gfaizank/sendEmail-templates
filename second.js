const Express = require("express");
const nodemail = require("nodemailer");

const Server = Express();

Server.use(Express.json());

// let orderNo = 0;

Server.post("/sendEmail", async (req, res) => {
  try {
    const { cartItems, name, email, phone, address, timings } = req.body;
    //    console.log(order)
    const transporter = nodemail.createTransport({
      service: "gmail",
      auth: {
        user: "connect.urbanspace@gmail.com",
        pass: "cghfbvmttjungoyl",
      },
    });

    const emailTemplate = `
       <!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header h1 {
            color: #333;
            font-size: 24px;
            margin: 0;
        }

        .content {
            margin-bottom: 30px;
            text-align: center;
        }

        .content p {
            margin: 0 0 10px;
            line-height: 1.5;
            text-align: center;
        }

        .footer {
            text-align: center;
        }

        .footer p {
            color: #999;
            font-size: 14px;
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Hi Admin@Urban Space!</h1>
        </div>
        <div class="content">
            <p>You have got a booking to serve..</p>
            <p>Booked for- ${cartItems}</p>
            <p>Customer Name- ${name}</p>
            <p>Customer Email- ${email}</p>
            <p>Customer contact- ${phone}</p>
            <p>Customer address- ${address}</p>
            <p>Preferred Timings & Date- ${timings}</p>
        </div>
        <div class="footer">
            <p>Have a nice day Urban Space :)</p>
        </div>
    </div>
</body>
</html>
       `;
    const mailOptions = {
      from: "Urban Space <connect.urbanspace@gmail.com>",
      to: "faizan2017.fk@gmail.com",
      subject: "Subscribe Urban Space",
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "E-mail sent successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error Sending mail" });
  }
});

Server.listen(8000, () => {
  console.log("Server is running");
});


// {
//     "name": "Faizan Khan",
//     "cartItems": "AC Installation",
//     "email": "faizan2017.fk@gmail.com",
//     "phone": "8765483471",
//     "address": "Magnolia Towers",
//     "timings": "Sun, 2nd March, 2024 ",
//   }