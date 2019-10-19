const express = require('express')
const uuidv4 = require('uuid/v4');


const validateProduct = require('./products.validate');

let products = require('../../db').products;
let users = require('../../db').users;

const productsRoutes = express.Router()

productsRoutes.get('/', (req, res) => {
    res.json(products);
});

productsRoutes.post('/', validateProduct, (req, res) => {
    const newProduct = {...req.body, id: uuidv4() };
    products.push(newProduct);
    res.json(newProduct);
})

///products/098as908asd098asd089
productsRoutes.put('/:id', (req, res) => {
    /* const filterProduct = products.filter(product => product.id === req.params.id)[0];

    const updatedProduct = { ...filterProduct, ...req.body  };

    res.json(updatedProduct); */




    const id = req.params.id;
    let index; //0
    let productFilter;

    products.filter((product, i) => {
        if (product.id === id) {
            productFilter = product;
            index = i;
        }
    });




    products[index] = {
        ...productFilter,
        ...req.body
    }



    /* const id = req.params.id;
    let index; //0
    let productFilter;
    let user = req.body.user;
    let productUpdate = req.body.product;

    products.filter((product, i) => {
        if (product.id === id) {
            productFilter = product;
            index = i;
        }
    })

    console.log(productFilter.owner)
    console.log(user)
    if (productFilter.owner === user) {

        products[index] = {
            ...productFilter,
            ...productUpdate

        }

    } */
    /* products[index] = {
        ...productFilter,
        ...req.body
    } */
    res.json(products);
})

// DESTROY

productsRoutes.delete('/:id', (req, res) => {
    const filterProduct = products.filter(product => product.id === req.params.id)[0];

    const productsWithoutSelected = products.filter(product => product.id !== req.params.id)[0];

    products = productsWithoutSelected;

    res.json(filterProduct);
});


module.exports = productsRoutes;