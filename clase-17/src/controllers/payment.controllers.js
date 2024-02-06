const mercadopago = require('mercadopago')

const createOrder = async (req, res) => {
    await mercadopago.configure({
        access_token: 'TEST-8605149906174985-020518-44d8217e321f03bceca8e7d92d052bf9-1670744262'
    })
    const result = await mercadopago.preferences.create({
        items: [
            {
                title: "Laptop",
                unit_price: req.body.precio,
                currency_id: "ARS",
                quantity: 1,
            },
        ],
        notification_url: "https://q955p4pn-3000.brs.devtunnels.ms/webhook",
        back_urls: {
            success: "http://localhost:3000/vuelta-success.html",
            pending: "http://localhost:3000/vuelta-pending.html",
            failure: "http://localhost:3000/vuelta-failure.html",
        },
    });

    res.json(result)
}

const manejarFin = async (req, res) => {
    mercadopago.configure({
        access_token: 'TEST-8605149906174985-020518-44d8217e321f03bceca8e7d92d052bf9-1670744262'
    })

    if (req.query.topic === 'merchant_order') {
        const data = await mercadopago.merchant_orders.findById(req.query.id)

        console.log(data)
    }

    res.status(204)
}

module.exports = {
    createOrder,
    manejarFin
}
