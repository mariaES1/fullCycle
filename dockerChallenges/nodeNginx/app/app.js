const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL');

  const createTable = `CREATE TABLE people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )`;

  connection.query(createTable, (err) => {
    if (err) {
      console.error('Erro ao criar a tabela:', err);
      return;
    }
    console.log('Tabela "people" criada com sucesso.');
  });
});

app.get('/', (res) => {
    const name = 'Maria Eduarda';
    const insertSql = `INSERT INTO people (name) VALUES ('${name}')`;

    connection.query(insertSql, (err) => {
      if (err) {
        console.error('Erro ao inserir nome na tabela:', err);
        res.status(500).send('Erro ao inserir nome na tabela.');
        return;
      }
  
      console.log('Nome inserido com sucesso na tabela.');

      const selectSql = 'SELECT name FROM people';
      connection.query(selectSql, (err, results) => {
        if (err) {
          console.error('Erro ao consultar nomes na tabela:', err);
          res.status(500).send('Erro ao consultar nomes na tabela.');
          return;
        }

        const names = results.map((row) => row.name);

        res.send(`
          <h1>Full Cycle Rocks!</h1>
          <p>Lista de nomes cadastrados:</p>
          <ul>
            ${names.map((name) => `<li>${name}</li>`).join('')}
          </ul>
        `);
      });
    });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
