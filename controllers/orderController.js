import Order from "../models/order.js"
import Product from "../models/product.js"


export async function createOrder(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "You must be logged first"
        })
        return
    }
    const body = req.body
    const orderData = {
        orderId: "",
        email: req.user.email,
        name: body.name,
        address: body.address,
        phoneNumber: body.phoneNumber,
        billItems: [],
        subTotal: 0,
        discountTotal: 0,
        netTotal: 0
    }
    Order.find().sort({
        date: -1,
    }).limit(1).then(
        async (lastBills) => {
            if (lastBills.length == 0) {
                orderData.orderId = "ORD00001"
            } else {
                const lastBill = lastBills[0]
                const lastOrderId = lastBill.orderId // ORD00551
                const lastOrderNumber = lastOrderId.replace("ORD", "") // 00551
                const lastOrderNumberInt = parseInt(lastOrderNumber) //551
                const newOrderNumberInt = lastOrderNumberInt + 1 //552
                const newOrderNumberStr = newOrderNumberInt.toString().padStart(5, '0') // 00552
                orderData.orderId = "ORD" + newOrderNumberStr
            }

            for (let i = 0; i < body.billItems.length; i++) {

                const product = await Product.findOne({ productId: body.billItems[i].productId })
                if (product == null) {
                    res.status(404).json({
                        message: "Product " + body.billItems[i].productId + " not available"
                    })
                    return
                }
                orderData.billItems[i] = {
                    productId: product.productId,
                    productName: product.productName,
                    image: product.images[0],
                    quantity: body.billItems[i].quantity,
                    labeledPrice: product.labeledPrice,
                    price: product.price
                }
                orderData.subTotal = orderData.subTotal + (product.labeledPrice * body.billItems[i].quantity)
                orderData.netTotal = orderData.netTotal + (product.price * body.billItems[i].quantity)
                orderData.discountTotal = orderData.subTotal - orderData.netTotal

            }

            const order = new Order(orderData)
            order.save().then(
                () => {
                    res.json({
                        message: "Order saved successfully"
                    })
                }
            ).catch(
                () => {
                    res.status(500).json({
                        message: "Order not saved"
                    })
                }
            )

        }
    )

}

export function getOrders(req, res) {

    if (req.user == null) {
        res.status(401).json(
            {
                message: "You must be logged in first"
            }
        )
        return
    }
    if (req.user.role == "admin") {
        Order.find().then(
            (orders) => {
                res.json(orders)
            }
        ).catch(
            (err) => {
                res.status(500).json({
                    message: "Orders are not found"
                })
            }
        )
    } else {
        Order.find({
            email: req.user.email
        }).then(
            (orders) => {
                res.json(orders)
            }
        ).catch(
            (err) => {
                res.status(500).json({
                    message: "Orders are not found"
                })
            }
        )
    }
}

export async function updateOrder(req,res) {
    try {
        if (req.user == null) {
            res.status(401).json(
                {
                    message: "You must be logged in first"
                }
            )
            return
        }
        if (req.user.role != "admin") {
            res.status(403).json(
                {
                    message: "Unauthorized"
                }
            )
            return
        }

        const orderId = req.params.orderId
        const order = await Order.findOneAndUpdate({ orderId: orderId }, req.body)

        res.json({
            message: "Order updated successfully"
        })

    } catch (err) {
        res.status(500).json({
            message: "Order updating failed"
        })
    }
}