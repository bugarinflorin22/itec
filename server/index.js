const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 1616;
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api', (rq, res) => {
    res.json({ 
        message: "Hello from server!"
    });
});

app.listen(port);