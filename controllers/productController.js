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
            res.json({
                message : "Product saved successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
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
            res.json({
                message : "Product deleted successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Product not deleted"
            })
        }
    )
}
export function updateProduct(req,res){
    if(req.user == null){
        res.json({
            message : "You must be logged in first"
        })
        return
    }
    if(req.user.role != "admin"){
        res.json({
            message : "You are not authorized to update"
        })
        return
    }
    Product.findOneAndUpdate({
        productId : req.params.productId
    },req.body).then(
        ()=>{
            res.json({
                message : "Product updated successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Product not updated"
            })
        }
    )
}