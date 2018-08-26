const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));
app.use(bodyParser.json()); // JSON to post handler


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});