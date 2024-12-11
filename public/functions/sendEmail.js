require('dotenv').config(); // Assurez-vous d'installer dotenv et de créer un fichier .env
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Remplacez par le nom de votre variable d'environnement
    pass: process.env.PASSWORD // Remplacez par le nom de votre variable d'environnement
  }
});

var mailOptions = {
  from: process.env.EMAIL, // Remplacez par le nom de votre variable d'environnement
  to: 'beytou43@gmail.com',
  subject: 'Vérification de votre adresse e-mail',
  text: 'Cliquez sur ce lien pour vérifier votre adresse e-mail : ${verificationLink}'
};

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log('Error occurred: ' + error.message); // Affiche le message d'erreur
  } else {
    console.log('Email sent: ' + info.response); // Affiche la réponse si l'e-mail est envoyé avec succès
  }
});
