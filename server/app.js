const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('hello Node!'));

// Listen to PORT 5000
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Listening to port 8000...');
});
