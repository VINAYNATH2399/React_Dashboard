import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function ProductLIst() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    async function getProducts() {
        let result = await fetch('http://localhost:3000/products', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result)
    }
    // console.log("products", products);

    async function deleteProduct(id) {
        // console.log(id);
        let result = await fetch(`http://localhost:3000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json()
        if (result) {
            getProducts()
        }
    }

    async function searchHandle(e) {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:3000/search/${key}`)
            result = await result.json()
            if (result) {
                setProducts(result)
            }
        }
        else {
            getProducts();
        }
    }

    return (
        <div className='products-list'>
            <h3>Product List</h3>
            <input type="text" className='search-product-box' placeholder='Search-box'
                onChange={searchHandle} />
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ?
                    products.map((item, index) =>
                        <ul key={item._id}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>Rs {item.price}</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li>
                                <button ><Link className='update' to={'/update/' + item._id}>Update</Link></button>
                                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            </li>
                        </ul>
                    )
                    : <h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductLIst;