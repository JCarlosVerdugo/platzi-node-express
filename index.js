const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

// app.set('port', process.env.port || 3000);

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});


app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});



app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const {categoryId, productId} = req.params;

  res.json({
    categoryId,
    productId,
    name: 'Product 2',
    price: 2000
  })

});


app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.send('No hay queries')
  }

});

routerApi(app);



// app.listen(app.get('port'), () => {
//   console.log(`Server on port ${app.get('port')}`)
// })

app.listen(port, () => {
  console.log(`My port ${port}`);
})
