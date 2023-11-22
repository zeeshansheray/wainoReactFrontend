import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CartContext } from '../../context/cart.context';
import { LayoutContext } from '../../context/layout.context'
import { PngIcons } from '../../icons'
import SvgIcons from '../../icons/svg.icon';
import ProductService from '../../services/Product';

export default function Product() {

    const layout = useContext(LayoutContext)
    const cart = useContext(CartContext)
    const location = useLocation()

    const [state, setState] = useState({
        product           : location.state,
        selectedImageIndex: 0,
        allProducts       : [],
    })

    const [selectedProduct, setSelectedProduct] = useState({
        productId : location.state?._id,
        quantity  : 1,
        color     : '',
        model     : '',
        type      : '',
        idx       : 0,
        size      : location.state?.sizes[0]?.size,
    })

    useEffect(()=>{
        onLoadFunc();
        layout.setLayout({
          showNav : true,
          showFooter: true,
        })
    
      },[])
      
      const onLoadFunc = async() => {
        let query = {
            createdBy : location.state.createdBy,
        }
        const {response, error} =  await ProductService.GetProducts({query})
        if(response.data){
            setState({...state, allProducts : response.data})
        }
      }

      const handleAddtoCart = async () => {
            console.log('cart', cart);

            if(cart.products) { 
                let check = false;
                cart.products.map((element, idx)=>{
                    if(element.productDetails._id === state.product._id){
                        check = true;
                        cart.products[idx].quantity = cart.products[idx].quantity + 1;
                    }
                })

                if(!check){
                    cart.products.push(
                        {
                            productDetails : state.product,
                            ...selectedProduct
                        }
                    )
                }

                cart.updateCart({ products: cart.products})
            }
            else {
                let product = {
                    productDetails : state.product,
                    quantity       : 1,
                }
                cart.updateCart({ products: [
                    product
                ]})
            }
            window.location.reload();
      }


  return (
    <div id="SingleProduct">
        <div className="container mt_32">
            <div className="single-product">
                <div className="row">
                <div className="col-md-6">
                    <div className="product-image middle">
                    <div className="product-image-main">
                        <img src={state.product.images[state.selectedImageIndex]} alt id="product-main-image" />
                    </div>
                    <div className="product-image-slider">
                        {state?.product?.images.map((image, idx)=>idx != state.selectedImageIndex && <img onClick={()=>setState({...state, selectedImageIndex : idx})} src={image} alt className="image-list" />)}
                    </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="breadcrumb">
                    <span><Link to="/">Home</Link></span>
                    <span><Link to="/products">Products</Link></span>
                    <span className="active">{state.product.category.subcategory}</span>
                    </div>
                    <div className="product">
                    <div className="product-title capitalize">
                        <h2>{state.product.name}</h2>
                    </div>
                    <div className="product-rating">
                        <span><i className="bx bxs-star" /></span>
                        <span><i className="bx bxs-star" /></span>
                        <span><i className="bx bxs-star" /></span>
                        <span><i className="bx bxs-star" /></span>
                        <span><i className="bx bxs-star8" /></span>
                        <span className="review ml_8">(47 Review)</span>
                    </div>
                    <div className="product-price">
                        <span className="offer-price">{"$" + (state.product?.discount >0 ? state.product.price - state.product.discount : state.product.price)}</span>
                        <span className="sale-price">{state.product?.discount > 0 && "$ " + (state.product.price) }</span>
                    </div>
                    <div className="product-details">
                        <h3>Description</h3>
                        <p>{state.product.description}</p>
                    </div>
                    {state.product?.sizes?.length > 0 && <div className="product-size">
                        <h4>Sizes</h4>
                        <div className="size-layout">
                        {state.product?.sizes?.length > 0 && state?.product?.sizes.map((size, idx)=>
                        <>
                            <label onClick={()=>setSelectedProduct({...selectedProduct , size : size.size, idx : idx })} htmlFor={1} className={`size ${size.size == selectedProduct.size && 'selected'} `}>{size.size}</label>
                        </>
                        )}
                        </div>
                    </div>}
                    {state.product.sizes[selectedProduct.idx]?.colors?.length > 0 && <div className="product-color">
                        <h4>Colors</h4>
                        <div className='d-flex flex-wrap'>
                            {state.product.sizes[selectedProduct.idx]?.colors?.length > 0 && state.product.sizes[selectedProduct.idx].colors.map((color)=>
                            <div onClick={()=>setSelectedProduct({...selectedProduct , color : color})} className="color-layout mr_10 middle" style={{backgroundColor : color}}>
                                {selectedProduct.color == color && <SvgIcons.IconTick color="#ffffff"/>}
                            </div>)}
                        </div>
                    </div>}
                    {state.product?.colors?.length > 0 &&<div className="product-color">
                        <h4>Colors</h4>
                        <div className='d-flex flex-wrap'>
                            {state.product?.colors?.length  > 0 && state.product?.colors?.map((color)=>
                            <div onClick={()=>setSelectedProduct({...selectedProduct , color : color})} className="color-layout mr_10 middle" style={{backgroundColor : color}}>
                                {selectedProduct.color == color && <SvgIcons.IconTick color="#ffffff"/>}
                            </div>)}
                        </div>
                    </div>}
                    {state.product?.models?.length > 0 &&<div className="product-color">
                        <h4>Models</h4>
                        <div className='d-flex flex-wrap'>
                            {state.product?.models?.length  > 0 && state.product?.models?.map((model)=>
                            <div onClick={()=>setSelectedProduct({...selectedProduct , model : model})} className={`${selectedProduct?.model?.includes(model) && 'selectedType'} capitalize singleType mr_10 middle`}>
                                {model}
                            </div>)}
                        </div>
                    </div>}
                    {state.product?.types?.length > 0 &&<div className="product-color">
                        <h4>Types</h4>
                        <div className='d-flex flex-wrap'>
                            {state.product?.types?.length  > 0 && state.product?.types?.map((type)=>
                            <div onClick={()=>setSelectedProduct({...selectedProduct , type : type})} className={`${selectedProduct?.type?.includes(type) && 'selectedType'} capitalize singleType mr_10 middle`}>
                                {type}
                            </div>)}
                        </div>
                    </div>}
                    <span className="divider" />
                    <div className="product-btn-group">
                        <div className="button add-cart" onClick={handleAddtoCart}><i className="bx bxs-cart"/> Add to Cart</div>
                        <div className="button heart"><i className="bx bxs-heart" /> Add to Wishlist</div>
                    </div>
                    </div>
                </div>
                </div>
                <div className='mt_32 mb_64 w-100 borderRadius-8'>
                        {state.allProducts.length > 0  && <h2 className='Heading18B color-Heading mb_24'>Other Products by {location.state.storeName}</h2>}
                        <div className='d-flex'>
                        {state.allProducts.length > 0 && state.allProducts.map((product)=>
                        (state.product._id != product._id) && <div id="product1" className='d-flex mr_16' onClick={()=>setState({...state, product : product})}>
                              <div className="pro cp" 
                         >
                            <img height={227}  width={227} src={product?.images?.length > 0 ? product.images[0] :  PngIcons.products.product1} alt />
                            <div className="des">
                                <span className='capitalize'>{product.storeName}</span>
                                <h5 className='capitalize'>{product.name}</h5>
                                <div className="star">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                </div>
                                <h4 className='Body22B'>$ {product?.discount > 0 ? 'QR ' + (product.price-product.discount) : product.price }<span className='beforePrice Body16R line-through color-Heading'>{"  " + product.discount > 0 && product.price}</span></h4>
                            </div>
                            <Link to={(`/products/${product._id}`, {state: product})}><i className="fal fa-shopping-cart cart" /></Link>
                        </div>
                        </div>
                        )}
                        </div>
                </div>
            </div>
         
            </div>
        </div>
  )
}
