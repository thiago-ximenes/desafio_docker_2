const express = require("express");
const {
    uniqueNamesGenerator,
    colors,
    animals,
} = require("unique-names-generator");

const app = express();
const port = 3000;
const config = {
    host: "db",
    user: "root",
    password: "teste",
    database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);

const randomName = uniqueNamesGenerator({
    dictionaries: [colors, animals],
    length: 2,
});

const createSql = `
CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id));
`;
connection.query(createSql);
const sqlInsert = `INSERT INTO people(name) values('${randomName}')`;
connection.query(sqlInsert);
const sqlSelect = `SELECT name FROM people`;
let names = "";
connection.query(sqlSelect, (err, result) => {
    names = result;
});

app.get("/", (_, res) => {
    res.send(
        `<div>
        <p>
          <p>
            <h1>Full Cycle Rocks! teste</h1>
          </p>
        </p>
        <ul>
            ${names.map((data) => `<li>${data.name}</li>`).join("")}
        </ul>
    </div>`
    );
});

app.listen(port, () => {
    console.log("Rodando na porta" + port);
});