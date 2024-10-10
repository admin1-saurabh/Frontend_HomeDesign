import React, {useEffect, useState} from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'
import bgImg from "../assets/siper.webp";




function Main({ wishList, setWishList, products, setProducts }) {

  
  const handleAddToWishList = (productId) => {
    const newWishList = [...wishList, productId];
    setWishList(newWishList);
  }

  const handleDeleted = (id) => {
    
    axios.delete(`https://backend-homedesign-1.onrender.com/products/${id}`)
    .then(setProducts(products.filter((product) => product.id !== id)))
    .catch(err => console.log(err))
    
  }

  const bgImage = {
    backgroundImage: `url(${bgImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
  };


  return (
    <>
    <main className="bg-cover bg-center relative p-20 " style={bgImage}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-white text-center pt-24">
          <h1 className="text-4xl font-bold"><span className='text-pink-600'>S</span>uperbolter</h1>
          <p className="text-lg mt-4">We create your home design only not in earth also in Mars</p>
        </div>
      </main>
    <div className='w-full flex flex-col mt-10  justify-center items-center  '>
        {/* <div className='flex flex-start ml-10 items-center'>
                  POPULAR PRODUCTS
        </div> */}
        <div className='grid grid-cols-4 gap-6 w-[90%] mb-10'>
           {
            products.map((product) => (
              <ProductCard key={product.name} product={product} handleAddToWishList={handleAddToWishList} handleDeleted={handleDeleted} />
            ))
           }
        </div>
    </div>
    </>
  )
}

export default Main
