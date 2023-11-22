import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/cart.context';
import { LayoutContext } from '../../context/layout.context'
import { UserContext } from '../../context/user.context';
import { OrderStatus } from '../../enums/enums';
import { PngIcons } from '../../icons'
import { ProductService } from '../../services';
import { useNavigate } from 'react-router-dom';
import { showToaster } from '../../utils/utils';

export default function Cart() {

    const layout   = useContext(LayoutContext);
    const cart     = useContext(CartContext);
    const user     = useContext(UserContext);
    const navigate = useNavigate();

    const [cartData, setCartData] = useState();
    const [totalAmount, setTotalAmount] = useState();

    useEffect(()=>{
      if(cart.products)
      { 
        setCartData(cart);
        let bill = 0;
        for (const item of cart.products) {
            bill =  bill + (item.productDetails.price * item.quantity)  
        }

        setTotalAmount(bill)
      }

      layout.setLayout({
        showNav : true,
        showFooter: true,
      })
  
    },[])

    const handleQuanity = (e, product) =>{
        cart.products.map((element, idx)=>{
            if(element.productDetails._id == product._id){
                cart.products[idx].quantity = e.target.value
            }
        })

        cart.updateCart({ products: cart.products})
        setCartData(cart);

        let bill = 0;
        for (const item of cart.products) {
            bill =  bill + (item.productDetails.price * item.quantity)  
        }

        setTotalAmount(bill)
    }   

    const removeProduct = (product) => {
        let array = []
        cart.products.map((element, idx)=>{
            if(element.productDetails._id != product._id){
                array.push(element);
            }
        })

        cart.products = array;

        cart.updateCart({ products: array})
        setCartData(cart);

        let bill = 0;
        for (const item of cart.products) {
            bill =  bill + (item.productDetails.price * item.quantity)  
        }

        setTotalAmount(bill)
    }


    const handleCheckout = async () =>{
        if(!user._id) {
            showToaster({message : 'You need to login first before ordering' , severity : 'error'})            
            return navigate('/login')
        }

        const {response, error} =  await ProductService.Checkout({payload  : {
            cart                    : cart.products, 
            customerId              : user._id,
            status                  : OrderStatus.RECIEVED,
            orderDate               : new Date().valueOf(),
            orderAddress            : { address: "abc road"},
            totalAmount             : totalAmount,
        }})
        if(response){
            window.open(response, "_self")
        }
        console.log('response ', response)
        console.log('error ', error)

    }
  

  return (
    <div id="Cart">
        <section id="page-header" className="about-header" style={{backgroundImage : `url(${PngIcons.banner.banner8})`}}>
            <h2>#cart</h2>
            <p>Add your coupon code &amp; SAVE upto 70%!</p>
        </section>
            <section id="cart" className="section-p1">
                <table width="100%">
                <thead>
                    <tr>
                    <td>Remove</td>
                    <td>Image</td>
                    <td>Product</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Subtotal</td>
                    </tr>
                </thead>
                {console.log('cartData ', cartData)}
                <tbody>
                    {
                        cartData && cartData.products && cartData.products.map((element, idx)=>(
                            <tr>
                            <td><a href="#" onClick={()=> {removeProduct(element.productDetails)}}><i className="far fa-times-circle" /></a></td>
                            <td><img src={element?.productDetails?.images[0]} alt /></td>
                            <td>{element.productDetails.name}</td>
                            <td>{element.productDetails.price}</td>
                            <td><input type="number" defaultValue={element.quantity} name id onChange={(e)=>{handleQuanity(e, element.productDetails)}} /></td>
                            <td>{element.productDetails.price * element.quantity}</td>
                            </tr>
                        ))
                    }
                   
                </tbody>
                </table>
            </section>
            <section id="cart-add" className="section-p1">
                <div id="cuopon">
                <h3>Apply Coupon</h3>
                <div>
                    <input type="text" name id placeholder="Enter Your Coupon" />
                    <button className="normal">Apply</button>
                </div>
                </div>
                <div id="subtotal">
                <h3>Cart Totals</h3>
                <table>
                    <tbody><tr>
                        <td>Cart Subtotal</td>
                        <td>$ {totalAmount || 0}</td>
                    </tr>
                    <tr>
                        <td>Shipping</td>
                        <td>Free</td>
                    </tr>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>$ {totalAmount || 0}</strong></td>
                    </tr>
                    </tbody></table>
                <button className="normal" onClick={handleCheckout}>Proceed to checkout</button>
                </div>
            </section>
    </div>
  )
}
