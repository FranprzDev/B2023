const { Preference } = require('mercadopago');
const { MercadoPagoConfig, Payment, PaymentMethod, } = require('mercadopago');
const db = require('../models');

const client = new MercadoPagoConfig({
    accessToken: 'TEST-8605149906174985-020518-44d8217e321f03bceca8e7d92d052bf9-1670744262'
});

const listPaymentMethods = async (req, res) => {
    const paymentMethod = new PaymentMethod(client);

    const data = await paymentMethod.get()

    res.json({ data, errors: [] })
}

const findPayment = async (req, res) => {
    const { id } = req.query

    try {
        const payment = new Payment(client)

        const data = await payment.get({ id })

        const paymentEntity = await db.Payments.findByPk(id)

        res.json({
            data: {
                paymentEntity,
                payment: data
            }, errors: []
        })
    } catch (error) {
        res.json({ data: null, errors: [error] })
    }
}

const createOrder = async (req, res) => {
    const preference = new Preference(client)

    try {
        const data = await preference.create({
            body: {
                items: [
                    {
                        id: 25,
                        quantity: 1,
                        title: 'Cliente nuevo',
                        unit_price: req.body.price
                    }
                ],
                notification_url: 'https://q955p4pn-3000.brs.devtunnels.ms/webhook',
                back_urls: {
                    success: 'http://localhost:5173/success',
                    pending: 'http://localhost:5173/pending',
                    failure: 'http://localhost:5173/failure',
                }
            },
        })

        res.json({ data, errors: [] })
    } catch (err) {
        res.json({ data: null, errors: [err] })
    }
}

const handleWebhook = async (req, res) => {
    if (req.query.type === 'payment') {
        try {
            const payment = new Payment(client)

            const data = await payment.get({ id: req.query['data.id'] })

            const {
                id: paymentId,
                transaction_details: {
                    total_paid_amount: price,
                    net_received_amount: netPrice
                },
                description,
                currency_id: currency,
                installments,
                payment_method: {
                    type: paymentMethod
                }
            } = data

            const fee = price - netPrice

            await db.Payments.findOrCreate({
                where: { id: paymentId },
                defaults: {
                    title: description,
                    description,
                    price,
                    netPrice,
                    fee: +fee.toFixed(2),
                    feePercentage: +(fee * 100 / price).toFixed(2),
                    currency,
                    installments,
                    paymentMethod
                }
            })
        } catch (error) {
        }
    }
    res.status(204).send()
}

module.exports = {
    createOrder,
    listPaymentMethods,
    findPayment,
    handleWebhook
}