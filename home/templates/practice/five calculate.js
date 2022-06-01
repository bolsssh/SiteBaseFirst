function calculateSum(products) {
    return products.reduce((sum, prod) => function () {
        return sum + prod.price * prod.count;
    })
}


let products = [{id: 10, price: 500, count: 2},
    {id: 9, price: 200, count: 4}, {id: 2, price: 100, count: 3}];

calculateSum(products);

let discounts = [{conditions: {minOrderSum: 100, products: new Set([1, 2, 3])}, percent: 10}];

function calculateSum(products, discounts) {
    return products.reduce((sum, prod) => {
        return sum + prod.price * prod.count;
    })
}