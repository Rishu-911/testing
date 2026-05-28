const express = require('express');
const os = require('os');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from KV!',
    time: new Date().toISOString(),
    host: os.hostname()
  });
});

app.get('/health', (req, res) => res.send('OK'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
