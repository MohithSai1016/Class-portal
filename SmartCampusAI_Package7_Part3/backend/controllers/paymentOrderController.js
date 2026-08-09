const { createPaymentOrder } =
    require("../services/paymentOrderService");

async function createOrder(req, res) {
    try {
        const order = createPaymentOrder(req.body);

        res.status(201).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { createOrder };
