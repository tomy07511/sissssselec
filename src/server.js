// Requerimientos a instalar con NPM
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const morgan = require('morgan');
const body_parser = require('body-parser');
const fileUpload = require('express-fileupload');
const readXlsxFile = require('read-excel-file/node');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

// Initializations
const app = express();
require('./config/passport');

// settings
app.set('port', process.env.PORT || 4000); // Puerto para el servidor localhost:5000
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(fileUpload());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Ruta para manejar la carga de archivos de Excel
app.post('/upload', (req, res) => {
  if (!req.files || !req.files.excelFile) {
    req.flash('error_msg', 'No se ha proporcionado un archivo válido.');
    return res.redirect('/ruta_de_redireccion'); // Cambia 'ruta_de_redireccion' a tu ruta deseada
  }

  const excelFile = req.files.excelFile;

  readXlsxFile(excelFile.data)
    .then((rows) => {
      // Procesa los datos del archivo Excel (rows)
      console.log('Datos del archivo Excel:', rows);

      // Renderiza la vista 'ruta_de_redireccion' con los datos del archivo Excel
      res.render('ruta_de_redireccion', {
        success_msg: 'Archivo Excel procesado con éxito.',
        excelData: JSON.stringify(rows), // Convierte los datos a JSON
      });
    })
    .catch((error) => {
      req.flash('error_msg', 'Error al procesar el archivo Excel: ' + error);
      res.redirect('/ruta_de_redireccion'); // Cambia 'ruta_de_redireccion' a tu ruta deseada
    });
});

// Rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(body_parser.urlencoded({ extended: true }));

module.exports = app;
