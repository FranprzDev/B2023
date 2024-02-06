const express = require("express")
const morgan = require("morgan")
const path = require("path")

const paymentRoutes = require("./src/routes/payment.routes")

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use(morgan("dev"));

app.use(paymentRoutes);

app.use(express.static(path.resolve("src/public")));

app.listen(3000, () => console.log('Running at port', 3000));
