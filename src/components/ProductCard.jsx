import React from 'react';
import { MdAddShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { MdDeleteForever } from "react-icons/md";
function ProductCard({ product, handleAddToWishList , handleDeleted}) {

    const navigate = useNavigate();
  return (
    <div className="max-w-sm rounded overflow-hidden cursor-pointer shadow-lg"  >

      <div>
      <img
        className="w-full h-48 object-cover"
        src={product.image}
        alt={product.name}
        onClick={() => navigate(`/product/${product.id}`)}
      />
      </div>
      
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl mb-2">{product.name}</div>
          <div className='flex gap-2 items-center'>
          <div onClick={() => handleAddToWishList(product.id)} >
            <MdAddShoppingCart className="text-red-500 cursor-pointer" />
          </div>
          <div onClick={() => handleDeleted(product.id)} >
            <MdDeleteForever className="text-red-500 cursor-pointer" />
          </div>
          </div>
        </div>
        <p className="text-gray-700 text-base">{product.specifications}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="text-gray-700 text-base">Size: {product.size}</span>
        <span className="float-right text-gray-700 text-base">${product.price}</span>
      </div>
    </div>
  );
}

export default ProductCard;
