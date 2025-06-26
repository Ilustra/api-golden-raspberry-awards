const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(cors());
const PORT =  4000;


require('./app/controllers/index')(app);
app.use('/movies', require('./app/controllers/movie/movieController'));
app.listen(PORT, () => {
  console.log(`-------------------------------------------------------`);
   console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`);
   console.log(`-------------------------------------------------------`);
});