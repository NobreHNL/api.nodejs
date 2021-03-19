const express = require("express");
const router = express.Router();
const mysql = require("../db-context");

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error, response: null})}   
        conn.query(`SELECT  pedidos.idpedido,
                            pedidos.quantidade,
                            produtos.idproduto,
                            produtos.nome,
                            produtos.preco
                       FROM pedidos
                 INNER JOIN produtos
                         ON produtos.idproduto = pedidos.idproduto;`,
        (erro, result, field) => {
            conn.release();
            if(erro) {return res.status(500).send({error: erro, response: null})} 
            const response = {
                quantidade: result.length,
                pedidos: result.map(ped => {
                    return {
                        idpedido: ped.idpedido,
                        quantidade: ped.quantidade,
                        produto: {
                            id: ped.idproduto,
                            nome: ped.nome,
                            preco: ped.preco
                        },
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes do pedido',
                            url: 'http://localhost:3000/pedidos/' + ped.idpedido
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
        conn.query('SELECT * FROM produtos WHERE idproduto =?', [req.body.idproduto],
        (erro, result, field) => {
            if(erro) {return res.status(500).send({error: erro, response: null})}
            
            if (result.length == 0) 
                return res.status(404).send({error: "Not Found", message: "Produto não encontrado com Id " + req.body.idproduto, response: null})

            conn.query('INSERT INTO pedidos (idproduto, quantidade) VALUES (?, ?)', [req.body.idproduto, req.body.quantidade],
            (erro, result, field) => {
                conn.release();
                if(erro) {return res.status(500).send({error: erro, response: null})} 
                
                const response = {
                    message: 'Pedido inserido com sucesso',
                    produto: {
                        idpedido: result.insertId,
                        idproduto: req.body.idproduto,
                        quantidade: req.body.quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os pedidos',
                            url: 'http://localhost:3000/pedidos'
                        }
                    }
                }
                return res.status(200).send(response);
            });
        });        
    });
});

router.get('/:idpedido', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error, response: null})}
        conn.query('SELECT * FROM pedidos WHERE idpedido =?', [req.params.idpedido],
        (erro, result, field) => {
            conn.release();
            if(erro) {return res.status(500).send({error: erro, response: null})}
            
            if (result.length == 0) 
                return res.status(404).send({error: "Not Found", message: "Pedido não encontrado com Id " + req.params.idpedido, response: null})

            const response = {                    
                produto: {
                    idpedido: result[0].idpedido,
                    idproduto: result[0].idproduto,
                    quantidade: result[0].quantidade,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna todos os Pedidos',
                        url: 'http://localhost:3000/pedidos'
                    }
                }
            }
            return res.status(200).send(response);
        });
    });   
});

router.delete('/:idpedido', (req, res, next) => {        
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error, response: null})}
        conn.query("DELETE FROM pedidos WHERE idpedido=?", [req.params.idpedido],
        (erro, result, field) => {
            conn.release();
            if(erro) {return res.status(500).send({error: erro, response: null})}
            const response = {
                message: 'Pedido removido com sucesso',              
                request: {
                    tipo: 'POST',
                    descricao: 'Insere um novo pedido',
                    url: 'http://localhost:3000/pedidos',
                    body:{
                        idproduto: 'string',
                        quantidade: 0
                    }
                }                
            }
            return res.status(202).send(response);
        });
    });
});

module.exports = router;