const express = require("express");
const app = express();

app.use(express.json());

app.get("/last-sale", (req, res) => {

    const fs = require("fs");

    const data = fs.readFileSync("last_sale.json", "utf8");

    res.json(JSON.parse(data));
});

app.post("/webhook", (req, res) => {

    const payment = req.body;

    console.log("Pago recibido:", payment);

    // SIMULACIÓN DE FICHAS (luego DB real)
    const vouchers = [
        {user:"wifi001", pass:"12345", plan:"1H"},
        {user:"wifi002", pass:"67890", plan:"12H"},
        {user:"wifi003", pass:"abcde", plan:"1D"}
    ];

    const voucher = vouchers[Math.floor(Math.random() * vouchers.length)];

    // guardar última venta
    const fs = require("fs");
    fs.writeFileSync("last_sale.json", JSON.stringify(voucher));

    res.sendStatus(200);
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo");
});
