import mongoose from "mongoose"

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default : "pending"
    },
    phoneNumber: {
        type: String,
        required: true
    },
    billItems: {
        type: [
            {
                productId: String,
                productName: String,
                image: String,
                quantity: Number,
                labeledPrice: Number,
                price: Number
            }
        ],
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    discountTotal: {
        type: Number,
        required: true
    },
    finalTotal: {
        type: Number,
        required: true
    }
})

const Order = mongoose.model("orders",orderSchema)

export default Order