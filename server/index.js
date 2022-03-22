const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const saltRounds = 10;

app.listen(3001, () =>{
  console.log("Rodando na porta 3001");
});

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "banco",
});

app.use(express.json());
app.use(cors());

app.post("/login", (req, res) => {
  const idvendedor = req.body.idvendedor;

  db.query("SELECT * FROM vendedores WHERE idvendedor = ?", [idvendedor], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      compare(idvendedor, result.idvendedor, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response) {
          res.send({ msg: "Usuário logado" });
        } else {
          res.send({ msg: "ID incorreto" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
})

app.post("/register", (req, res) => {
  const email = req.body.email;
  const nome = req.body.nome;

  db.query("SELECT * FROM vendedores WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      nome(nome, saltRounds, (err, nome) => {
        db.query(
          "INSERT INTO usuarios (email, nome) VALUE (?,?)",
          [email, nome],
          (error, response) => {
            if (err) {
              res.send(err);
            }
            res.send({ msg: "Usuário cadastrado com sucesso" });
          }
        );
      });
    } else {
      res.send({ msg: "Email já cadastrado" });
    }
  });
});

app.post("/vendas", (req, res) => {
    const vendas = req.body.vendas;

    db.query("SELECT * FROM vendedores WHERE vendas = ?", [vendas], (err, result) => {
      if(err) {
        res.send(err);
      }
      if (result.length > 0) {
        compare(idvendedor, result.idvendedor, (error, response) => {
          if (error)
          {
            res.send(error);
          }
          if(response)
          {
            res.send({ msg: "Venda Cadastrada!" })
          };
        });
      };
    });
})