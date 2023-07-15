import ManagerUsuarios from "./ProductManager.js";
import  express  from "express";

const manager = new ManagerUsuarios();

const app = express();

app.get("/products", (req, resp) => {
    manager.consultarUsuarios()
    .then((data) => {
        let limit = req.query.limit

        if (limit) {
            limit = parseInt(limit)
            resp.send(data.slice(0, limit))
        } else {
            resp.send(data)
        }
    })
})

app.get("/products/:pid", (req, resp) => {
    manager.consultarUsuarios()
    .then((data) => {
        let productId = req.params.pid;
        let numero = isNaN(productId)
        if (!numero) {
            productId = parseInt(productId);
    
            let producto = data.find((data) => data.id === productId)
    
            if (producto) {
                resp.send(producto)
            } else {
                resp.send(`No existe ningún producto con el ID: ${productId}`)
            }
        } else {
            resp.send("Los id de productos solo contienen numeros")
        }
    })
})


app.listen(8080, () => console.log("Server on port 8080"))