const express = require("express");
const router = express.Router();
const mysql = require("../db-context");

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error, response: null})}   
        conn.query('SELECT * FROM produtos',
        (erro, result, field) => {
            conn.release();
            if(erro) {return res.status(500).send({error: erro, response: null})} 
            const response = {
                quantidade: result.length,
                produtos: result.map(prod => {
                    return {
                        idproduto: prod.idproduto,
                        nome: prod.nome,
                        preco: prod.preco,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes do produto',
                            url: 'http://localhost:3000/produtos/' + prod.idproduto
                        }
                    }
                })
            }
            return res.status(200).send(response);
        });
    });  
});

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {     
        if(error) {return res.status(500).send({error: error, response: null})}
        conn.query('INSERT INTO produtos (nome, preco) VALUES (?, ?)', [req.body.nome, req.body.preco],
        (erro, result, field) => {
            conn.release();
            if(erro) {return res.status(500).send({error: erro, response: null})} 
            
            const response = {
                message: 'Produto inserido com sucesso',
                produto: {
                    idproduto: result.insertId,
                    nome: req.body.nome,
                    preco: req.body.preco,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna todos os produtos',
                        url: 'http://localhost:3000/produtos'
                    }
                }
            }
            return res.status(200).send(response);
        });
    });
});

router.get('/:idproduto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error, response: null})}
        conn.query('SELECT * FROM produtos WHERE idproduto =?', [req.params.idproduto],
        (erro, result, field) => {
            conn.release();
            if(erro) {return res.status(500).send({error: erro, response: null})}
            
            if (result.length == 0) 
                return res.status(404).send({error: "Not Found", message: "Produto não encontrado com Id " + req.params.idproduto, response: null})

            const response = {                    
                produto: {
                    idproduto: result[0].idproduto,
                    nome: result[0].nome,
                    preco: result[0].preco,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna todos os produtos',
                        url: 'http://localhost:3000/produtos'
                    }
                }
            }
            return res.status(200).send(response);
        });
    });   
});

router.patch('/', (req, res, next) => {    
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error, response: null})}
        conn.query("UPDATE produtos SET nome =?, preco=? WHERE idproduto = ?", [ req.body.nome,  req.body.preco, req.body.idproduto],
        (erro, result, field) => {
            conn.release();
            if(erro) {return res.status(500).send({error: erro, response: null})} 
            const response = {
                message: 'Produto alterado com sucesso',
                produto: {
                    idproduto: req.body.idproduto,
                    nome: req.body.nome,
                    preco: req.body.preco,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna os detalhes do produto',
                        url: 'http://localhost:3000/produtos/' + req.body.idproduto
                    }
                }
            }
            return res.status(202).send(response);
        });
   });
});


router.delete('/:idproduto', (req, res, next) => {        
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error, response: null})}
        conn.query("DELETE FROM produtos WHERE idproduto=?", [req.params.idproduto],
        (erro, result, field) => {
            conn.release();
            if(erro) {return res.status(500).send({error: erro, response: null})}
            const response = {
                message: 'Produto removido com sucesso',              
                request: {
                    tipo: 'POST',
                    descricao: 'Insere um novo produto',
                    url: 'http://localhost:3000/produtos',
                    body:{
                        nome: 'string',
                        preco: 0
                    }
                }                
            }
            return res.status(202).send(response);
        });
    });
});

module.exports = router;