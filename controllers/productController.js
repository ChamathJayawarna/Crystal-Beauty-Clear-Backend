import Product from "../models/product.js"

export function saveProduct(req,res){
    if(req.user == null){
        res.json({
            message : "You must be logged in first"
        })
        return
    }
    if(req.user.role != "admin"){
        res.json({
            message : "Unauthorized access"
        })
        return
    }
    const product = new Product(req.body)
    product.save().then(
        ()=>{
            res.status(200).json({
                message : "Product saved successfully"
            })
        }
    ).catch(
        ()=>{
            res.status(404).json({
                message : "Product not saved"
            })
        }
    )
}
export function getAllProducts(req,res){
    Product.find().then(
        (products)=>{
            res.json(products)
        }
    ).catch(
        ()=>{
            res.json({
                message : "Product can not be found"
            })
        }
    )
}
export async function getProductById(req,res){
    const productId = req.params.productId
    const product = await Product.findOne({productId : productId})

    if(product == null){
        res.status(404).json({
            message : "Product cannot be found"
        })
        return
    }
    res.json({
        product : product
    })
}
export function deleteProduct(req,res){
    if(req.user == null){
        res.json({
            message : "You must be logged in first"
        })
        return
    }
    if(req.user.role != "admin"){
        res.json({
            message : "You are not authorized to delete"
        })
        return
    }
    Product.findOneAndDelete({
        productId : req.params.productId
    }).then(
        ()=>{
            res.status(200).json({
                message : "Product deleted successfully"
            })
        }
    ).catch(
        ()=>{
            res.status.status(404).json({
                message : "Product not deleted"
            })
        }
    )
}
export function updateProduct(req,res){
    if(req.user == null){
        res.status(200).json({
            message : "You must be logged in first"
        })
        return
    }
    if(req.user.role != "admin"){
        res.status(404).json({
            message : "You are not authorized to update"
        })
        return
    }
    Product.findOneAndUpdate({
        productId : req.params.productId
    },req.body).then(
        ()=>{
            res.status(200).json({
                message : "Product updated successfully"
            })
        }
    ).catch(
        ()=>{
            res.status(404).json({
                message : "Product not updated"
            })
        }
    )
}