const { Router } = require("express");
const { createOrder, manejarFin } = require("../controllers/payment.controllers");

const router = Router();

router.post("/create-order", createOrder);

router.post("/webhook", manejarFin);

// router.get("/success", (req, res) => res.send("Caso de compra exitosa"));
// router.get("/failure", (req, res) => res.send("Caso de compra fallida"));
// router.get("/pending", (req, res) => res.send("Caso de compra pendiente"));

module.exports = router;
