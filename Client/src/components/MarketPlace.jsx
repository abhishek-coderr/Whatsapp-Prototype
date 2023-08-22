import React, { useEffect } from 'react';
import { useState } from 'react';
import './Marketplace.css'
import { useNavigate, useParams } from 'react-router-dom';

function MarketPlace() {
    const navigate=useNavigate()
    const { userId }=useParams()
    const sampleProducts = []

    const [newItemDivVisible, setNewItemDivVisible] = useState(false);

    const [products, setProducts] = useState(sampleProducts);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productSalePrice, setProductSalePrice] = useState('');
    const [productRegularPrice, setProductRegularPrice] = useState('');
    useEffect(()=>{
        fetch('http://localhost:3001/getallitems',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // console.log('Response from backend:', data)
            setProducts(data);
        })
        .catch(err => {
            console.error(err)
        })
    },[]);


    const handleGoBack=()=>{
        navigate(`/group_chat/${userId}`)
    }

    const showNewItemDivVisible=()=>{
        setNewItemDivVisible(true);
    }

    const hideNewItemDivVisible=()=>{
        setNewItemDivVisible(false);
        setProductName('');
        setProductDescription('');
        setProductSalePrice('');
        setProductRegularPrice('');
    }

    const handleAddProduct=(e)=>{
        e.preventDefault(); 
      
        const newProduct={
            imageUrl: "https://static-00.iconduck.com/assets.00/shopping-bags-icon-2048x2048-lz3b9gqu.png",
            name: productName,
            description: productDescription,
            salePrice: parseInt(productSalePrice),
            regularPrice: parseInt(productRegularPrice),
            pubilshedDate:new Date(),
            isSold:false
        }
        setProducts(prevProducts=>[...prevProducts, newProduct])
        fetch('http://localhost:3001/storeItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newProduct)
        })
        .then(response => response.json())
        .then(data => {
            // console.log('Response from backend:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        setProductName('')
        setProductDescription('')
        setProductSalePrice('')
        setProductRegularPrice('')
        hideNewItemDivVisible();
    }

    const handleBuyProduct =(e)=>{
        alert("Buy this item!");
        fetch('http://localhost:3001/update/'+e.target.id) 
        .then(response => response.json())
        .then(data => {
            setProducts(data);      
        })
        .catch(err => {
            console.log(err)
        })
    };

    const handleDeleteProduct=(e)=>{
        alert("Delete this item!");
        fetch('http://localhost:3001/delete/'+e.target.id) 
        .then(response => response.json())
        .then(data => {
            setProducts(data);      
        })
        .catch(err => {
            console.log(err)
        })
    };
      

    return (
        <div className='marketplace'>
            <div className='header'>
                <p><i className="fa-solid fa-arrow-left" onClick={handleGoBack}></i></p>
                <div className='user-icon'>
                <img src='https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_960_720.png'/>
                </div>
                <div  className='user-nmae'>
                <p>Name of group...</p>
                </div>
                <div className='user-contact'>
                <p><i className="fa-solid fa-video"></i></p>
                <p><i className="fa-solid fa-phone"></i></p>
                <p><i className="fa-solid fa-ellipsis-vertical"></i></p>
                </div>
            </div>


            <div className="allproducts">
                {products.map((product, index) => (
                    <div key={index} className="product">
                        <h2 className="product-name">{product.name}</h2>
                        <div className="product-image">
                            <img src={product.imageUrl} alt="Product" />
                        </div>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">Sale Price: {product.salePrice}</p>
                        <p className="product-price">Regular Price: {product.regularPrice}</p>
                        <button className="buy-button" id={product._id} onClick={handleBuyProduct} >Buy Item</button>
                        {userId==='admin' && (
                            <button className="buy-button" id={product._id} onClick={handleDeleteProduct} >Delete Item</button>
                        )}   
                    </div>
                ))}
            </div>
            
        

            {newItemDivVisible && (
                <div className='additem'>
                    <form className="product-form" onSubmit={handleAddProduct}>
                        <div className="image-container">
                            <div className="circular-div"><img src="https://static-00.iconduck.com/assets.00/shopping-bags-icon-2048x2048-lz3b9gqu.png" /></div>
                        </div>
                        <div className="details-container">
                            <input
                                type="text" 
                                className='product-name' 
                                placeholder='Name'
                                required
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                            <textarea 
                                className="textbox" 
                                placeholder="Enter product description..."
                                required
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                            >
                            </textarea>
                            <div className="price-inputs">
                                <input 
                                    type="text" 
                                    className="price-input" 
                                    placeholder="Regular Price"
                                    required
                                    value={productRegularPrice}
                                    onChange={(e) => setProductRegularPrice(e.target.value)} 
                                />
                                <input 
                                    type="text" 
                                    className="price-input" 
                                    placeholder="Sale Price"
                                    required
                                    value={productSalePrice}
                                    onChange={(e) => setProductSalePrice(e.target.value)} 
                                />
                            </div>
                            <div className="buttons">
                                <button className="submit-button">Add</button>
                                <button className="reset-button" onClick={hideNewItemDivVisible}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div> 
            )}
            
            <div className='addButton'onClick={showNewItemDivVisible}>
                <i className="fa-solid fa-plus"></i>
            </div>
            
            <div className='bottom'>
                <h4>Only Admins can remove products</h4>
            </div>
        </div>
    );
}

export default MarketPlace;