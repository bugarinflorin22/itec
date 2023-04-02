require("dotenv").config();

const OpenAi = require("openai");
const { Configuration, OpenAIApi } = OpenAi;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = parseInt(process.env.REACT_APP_PORT);

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY
});

var poem = ""

const openai = new OpenAIApi(configuration);
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/poemGenerator', async (dataFromUser, dataFromAI) => {
    const {promptFromUser} = dataFromUser.body;

    const response = await openai.createCompletion({
        model: process.env.REACT_APP_MODEL_AI,
        prompt: process.env.REACT_APP_PROMPT + promptFromUser,
        temperature: parseInt(process.env.REACT_APP_TEMPERATURE),
        max_tokens: parseInt(process.env.REACT_APP_MAX_TOKENS),
    });

    dataFromAI.json({ 
        poemFromAI: response.data.choices[0].text
    }); 
    poem = response.data.choices[0].text;
});

app.post('/imageGenerator', async (dataFromUser, dataFromAI) => {
    const {promptFromUser} = dataFromUser.body;

    const response = await openai.createImage({
        prompt: promptFromUser,
        n: 1,
        size: process.env.REACT_APP_IMG_SIZE,
    });

    dataFromAI.json({ 
        imageFromAI: response.data.data[0].url
    }); 
});

app.listen(port);