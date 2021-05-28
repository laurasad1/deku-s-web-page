const express = require('express');
const app = express();
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 3030;


app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/contacto', (req, res) => {
    res.render('pages/contacto');
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

 const connection = mysql.createConnection({
     host: 'freedb.tech',
     user: 'freedbtech_lisabel',
     password: 'Rapatumaixd123',
     database: 'freedbtech_dbusers'

 });

  connection.connect(err => {
      if (err) throw error;
      console.log('Database running ');
 })

 app.get('/users', (req, res) => {
     const sql = 'SELECT * FROM users';

    connection.query(sql, (err, results) => {

       if (err) {
            throw error;
         } else {
            res.render('pages/users', {
                 'results': results
           });
         }
     })
 });

 app.post('/users', (req, res) => {

     const sql = `SELECT * FROM users WHERE correo = '${req.body.mail}'`;
    const sql2 = `insert into users SET ?`;

    const {
        nombre,
         apellido,
         mail,
         sexo,
         descripcion
    } = req.body;
     contenHTML =      `
     <h1> Información resultante </h1>

     <ul>

    <li> Nombre: ${nombre} </li>
    <li> Apellido: ${apellido} </li>
     <li> Sexo: ${sexo} </li>
    <li> Correo: ${mail} </li>

     </u>

    <p>
     ${descripcion}
     </p>
     `
    const transporter = nodemailer.createTransport({
        service: 'gmail',
         auth: 
         {
             user: 'bocuakademia@gmail.com',
             pass: 'megustadeku123'
         }
     });

     const info = 
     {
         from: 'bocuakademia@gmail.com',
         to: 'lisabelwheatly@gmail.com',
         subecjt: 'datos del form',
         html: contenHTML
     }

    connection.query(sql, (err, results) => {

        if (err) {
           throw error;
       }

        if (!results.length > 0) {
            const usersobj = {
                 nombre: req.body.nombre,
                 correo: req.body.mail
             }

             connection.query(sql2, usersobj, err => {

                 if (err) {
                     throw error;
                }
             });
         }

        transporter.sendMail(info, err => {
            if (err) {
                 throw err;
             } else {
                 console.log('email enviado');
             }

        });
         res.render('pages/index');
    });
 });

app.listen(port, () => console.log(`Example app listening on port 3030`));