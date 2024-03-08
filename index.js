const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { errorHandler, logErrors, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

// const cors = require('cors');

// var corsOptions = {
//   origin: 'https://example.com',
//   optionsSuccessStatus: 200
// }

// app.use(cors(corsOptions ));

app.use(express.json());

const whitelist = ['http://localhost:5500', 'https://myapp.co', 'http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

// app.set('port', process.env.port || 3000);

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});


app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});


routerApi(app);


app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// app.listen(app.get('port'), () => {
//   console.log(`Server on port ${app.get('port')}`)
// })

app.listen(port, () => {
  console.log(`My port ${port}`);
})
