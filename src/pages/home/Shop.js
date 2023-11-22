import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import { LayoutContext } from '../../context/layout.context'
import { PngIcons } from '../../icons'
import { ProductService } from '../../services'
import CustomTextField from '../../components/CustomTextField';
import SvgIcons from '../../icons/svg.icon';
import CategoryList from '../../utils/CategoriesDetail.json'
import { UserContext } from '../../context/user.context'

export default function Shop() {

  const layout = useContext(LayoutContext)
  const navigate = useNavigate();
  const [categories, setCategories] = useState(CategoryList);

  const [show, setShow] = useState({
    mainLoader      : false,
  })

  const [state, setState] = useState({
    products           : [],
    selectedCategory   : {},
    filteredProducts   : [],
    categoryShowIndex  : 15,
    selectedSubCategory: ""
  })

  useEffect(()=>{
    layout.setLayout({
      showNav : true,
      showFooter: true,
    })

  },[])



  const OnLoad = async() =>{
    setShow({...show, mainLoader: true})
    const {response, error} =  await ProductService.GetAll()
    if(response){
      setState({...state, products : response.data, filteredProducts : response.data});
    }
    setShow({...show, mainLoader: false})
    console.log('ProductsList ', response)
  }


  useEffect(()=>{
    OnLoad();
  },[])

  console.log('show ', show.filteredProducts)

  const handleFilter = (subcategory) => {
    const filteredproducts = state.products.filter((product)=>{
      return (product.category.category == state.selectedCategory.category) && (product.category.subcategory == subcategory)
    })

    setState({...state, filteredProducts : filteredproducts, selectedSubCategory : subcategory})

  }


  const handleSearchProduct = (e) =>{
    let filteredProducts = state.products.filter((product)=>{
        return product.name.toLowerCase().includes(e.target.value.toLowerCase());
    })

    if(e.target.value == ""){
      setState({...state, filteredProducts : state.products})
    }
    else{
      setState({...state, filteredProducts : filteredProducts})
    }
  
  }

  console.log('state ', state)


  return (
      <div id='Shop'>
          {show.mainLoader ? 

          <Loader />

          :

          <div>
            <section id="product1" className="section-p1">
            <div className=' w-100  d-flex justify-flex-end align-items-center'>
                  <div className='w-30 d-flex justify-flex-end mb_16'>
                    <CustomTextField 
                          className   = "w-100"
                          placeholder = "Search Product"
                          icon        = <SvgIcons.SearchIcon fill={"#84889b"}/>
                          position    = "start"
                          onChange    = {(e)=>handleSearchProduct(e)}
                          top         = {7}
                          left        = {10}
                      />
                  </div>
              </div>
              <div className='row'>
              <div className='col-md-4 pt_20 text-left'>
                 <div className='d-flex space-between align-items-center w-90'>
                    <h2 className='Heading18M mb_0 color-Heading cp' onClick={()=>setState({...state, filteredProducts : state.products, selectedCategory : {}, selectedSubCategory : '' })}>Categories</h2>
                    {/* <h2 className='Body13R mb_0 color-neutral70 position-relative'>{`${state.selectedCategory.category ? state.selectedCategory.category : ''} ${state.selectedSubCategory ? ('   /   '  + state.selectedSubCategory) : ''}`}
                    </h2> */}
                 </div>
                  <div className='mt_24'>
                  {
                    categories.map((category, idx)=>
                      (idx <= state.categoryShowIndex) && <div>
                        <h4 className={`cp mb_12 ${(state.selectedCategory.category == category.category) ? 'Body14M transition color-primary50' : 'Body14R color-neutral60'}`} onClick={()=>setState({...state, selectedCategory : category})}>
                          {category.category}
                        </h4>
                        {(state.selectedCategory.category == category.category) && category.subcategories.map((subcategory)=> <p className={`transition cp mb_8 pl_16 ${state.selectedSubCategory == subcategory.name ? 'Heading12M color-primary50' : 'Heading12R color-neutral70'}`} onClick={()=>handleFilter(subcategory.name)}>
                          • {subcategory.name}
                        </p>)}
                      </div>
                    )
                  }
                    {(state.categoryShowIndex <= categories.length) &&  <p className='cp underline Heading12R color-primary30' onClick={()=>setState({...state, categoryShowIndex : state.categoryShowIndex + 15})}>Show More</p>}
                  </div>
              </div>
              <div className="pro-container col-md-8 mt_32 h-fit">


          {state.filteredProducts.length == 0 ? 
            <div className='emptyScreen middle w-100'>
             <img src={PngIcons.products.noProducts} width="200px" alt=""/> 
            </div>

            :

            <>

                {state.filteredProducts.length > 0 && state?.filteredProducts.map((product, idx)=>
                <div className="pro cp" onClick={()=>navigate(`/products/${product._id}`, {state : product})}>
                  <img height={227}  width={227} src={product.images.length > 0 ? product.images[0] :  PngIcons.products.product1} alt />
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
                </div>)}
                </>}
              </div>
              </div>
            </section>
          </div>
          }
      </div>

  )
}
