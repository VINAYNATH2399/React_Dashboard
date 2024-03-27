import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateProduct() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [company, setCompany] = useState("")
    const params = useParams(); //jab page call hoga
    const navigate = useNavigate()

    useEffect(() => {
        getProductDetails();
    }, [])

    async function getProductDetails() {
        // console.log(param);
        let result = await fetch(`http://localhost:3000/product/${params.id}`)
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    async function updateProduct() {
        console.log(name, price, category, company);
        let result = await fetch(`http://localhost:3000/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': "application/json"
            }
        });
        result = await result.json()
        console.log(result);
        navigate('/')
    }
    return (
        <div className='product'>
            <h1>Update Product</h1>
            <input type="text" placeholder='Enter product name' className='inputBox'
                onChange={(e) => { setName(e.target.value) }} value={name} />


            <input type="text" placeholder='Enter product price' className='inputBox'
                onChange={(e) => { setPrice(e.target.value) }} value={price} />


            <input type="text" placeholder='Enter product category' className='inputBox'
                onChange={(e) => { setCategory(e.target.value) }} value={category} />

            <input type="text" placeholder='Enter product company' className='inputBox'
                onChange={(e) => { setCompany(e.target.value) }} value={company} />


            <button onClick={updateProduct} className='appButton'>Update Product</button>

        </div>
    )
}

export default UpdateProduct;