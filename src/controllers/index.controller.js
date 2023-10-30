

const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};

indexCtrl.renderAbout = (req, res) => {
  res.render('about');
};

indexCtrl.renderHome = (req, res) => {
  res.render('home');
};

indexCtrl.renderpedir = (req, res) => {
  res.render('pedir');
};

indexCtrl.renderInfo = (req, res) => {
  res.render('Info');
};
indexCtrl.renderdatos = (req, res) => {
  const user = req.user;
  res.render('datos',{user:user});
};
indexCtrl.renderruta_de_redireccion = (req, res) => {
  const user = req.user;
  res.render('ruta_de_redireccion',{user:user});
};


module.exports = indexCtrl;