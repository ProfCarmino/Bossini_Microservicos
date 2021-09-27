const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
const lembretes = {};
contador = 0;

app.get('/lembretes', (req, res) => {
    res.send(lembretes);
});

app.put('/lembretes', async(req, res) => {
    contador++;
    const { texto } = req.body;
    lembretes[contador] = { contador, texto };

    await axios.post("http://localhost:10000/eventos", {
        tipo: "LembreteCriado",
        dados: { contador, texto },
    });

    res.status(201).send(lembretes[contador]);
});

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});

app.listen(4040, () => {
    console.log('Lembretes. Porta 4040');
});
