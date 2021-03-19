const express = require("express");
const app = express();

const route_produtos = require("./routes/produtos");
const route_pedidos = require("./routes/pedidos");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Authorization');

    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();

});

app.use("/produtos", route_produtos);
app.use("/pedidos", route_pedidos);

app.use((req, res, next) => {
    const erro = new Error("Não Encontrado");
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status||500);
    return res.send({
        erro:{
            message: error.message
        }
    });
});

module.exports = app;