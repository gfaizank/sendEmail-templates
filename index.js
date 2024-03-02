const Express = require('express')
const nodemail = require('nodemailer')


const Server = Express();

Server.use(Express.json())

Server.post('/sendEmail', async (req, res) => {

   try{
      const { name } = req.body;
    //    console.log(order) 
        const transporter = nodemail.createTransport({
         service: 'gmail',
         auth: {
           user: 'connect.urbanspace@gmail.com',
           pass: "cghfbvmttjungoyl",
         }
       })

       const emailTemplate = `
       <!DOCTYPE html>
       <html lang="en">
         <head>
           <meta charset="UTF-8" />
           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
           <title>Document</title>
           <style>
             @import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@1,200&display=swap");
       
             * {
               margin: 0;
               padding: 0;
               border: 0;
             }
       
             body {
               font-family: "Raleway", sans-serif;
               background-color: #d8dada;
               font-size: 19px;
               max-width: 800px;
               margin: 0 auto;
               padding: 3%;
             }
       
             img {
               max-width: 100%;
             }
       
             header {
               width: 98%;
             }
       
             #logo {
               max-width: 120px;
               margin: 3% 0 3% 3%;
               float: left;
             }
       
             #wrapper {
               background-color: #f0f6fb;
             }
       
             #social {
               float: right;
               margin: 3% 2% 4% 3%;
               list-style-type: none;
             }
       
             #social > li {
               display: inline;
             }
       
             #social > li > a > img {
               max-width: 35px;
             }
       
             h1,
             p {
               margin: 3%;
             }
             .btn {
               float: right;
               margin: 0 2% 4% 0;
               background-color: #303840;
               color: #f6faff;
               text-decoration: none;
               font-weight: 800;
               padding: 8px 12px;
               border-radius: 8px;
               letter-spacing: 2px;
             }
       
             hr {
               height: 1px;
               background-color: #303840;
               clear: both;
               width: 96%;
               margin: auto;
             }
       
             #contact {
               text-align: center;
               padding-bottom: 3%;
               line-height: 16px;
               font-size: 12px;
               color: #303840;
             }
           </style>
         </head>
         <body>
           <div id="wrapper">
             <header style="display: flex; justify-content: center; align-items: center;">
               <div id="logo">
                 <img
                   src="Urban Space.jpg"
                   alt=""
                 />
               </div>
             </header>
             <div class="one-col">
               <h2 style="text-align: center; margin-bottom: 30px;">Greetings, ${name}!</h2>
              <p style="font-size: 22px; font-weight: 600; text-align: center; margin-bottom: 70px;">Thank you for choosing Urban Space as your appliance repair partner.</p>
       
              <hr>
              <div style="display: flex; justify-content: space-around;">
               <p style="font-size: 16px; font-weight: 600; ">Order no. {{ordernumber}}</p>
               <p style="font-size: 16px; font-weight: 600; ">for {cartItems}</p>
              </div>
              <hr>
       
             <p style="font-weight:500; margin-top: 70px; text-align: center;">Order is confirmed and our service partner will be getting in touch with you soon for confirming availability and service timings with you.</p>
                   <p style="font-weight:500; text-align: center;">Till then sit back and relax because we've got you covered and shall be providing you with best in class service for your appliance.</p>
                   <p style="font-weight: 700; margin-top: 70px; text-align: center; margin-bottom: 50px;">We hope you enjoy your experience with Urban Space.</p>
       
               <hr />
       
               <div style="display: flex; justify-content: center; align-items: center; text-align: center; margin-left: 5rem; ">
               <p style="font-size: 0.75rem; line-height: 1rem; ">Best regards</p>
               <p style="font-size: 0.75rem; line-height: 1rem; text-align: center;">Urban Space</p>
           </div>

             </div>
           </div>
         </body>
       </html>
       `;
    const mailOptions = {
          from: 'Urban Space <connect.urbanspace@gmail.com>',
          to: 'faizan2017.fk@gmail.com',
          subject: 'Subscribe Urban Space',
          html: emailTemplate
       };

       await transporter.sendMail(mailOptions) 

       res.status(200).json({ message: 'E-mail sent successfully' });
   }
   catch(err){
      res.status(500).json({ error: 'Error Sending mail'});
   }
});


Server.listen(8000, () => {
    console.log('Server is running');
})