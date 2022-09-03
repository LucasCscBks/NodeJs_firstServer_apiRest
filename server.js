const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/routes');
const port = 3000;

const app = express();
app.use(cors())
app.use(express.json())
app.use(routes);

app.use(express.static('Public'));
app.listen(port, () => {
    console.log(`Server running at port:${port}`);
})
