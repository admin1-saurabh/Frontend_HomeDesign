import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { FaExternalLinkAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';


  

function Product({products, setProducts}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState();


  useEffect(() => {
    const data = products.filter((product) => product.id === parseInt(id))[0];
     
     setProduct(data);
 
   
   }, []);


 
  return (
    <div className="w-full flex items-center justify-center mt-10">
      <div className="bg-white w-[80%] h-auto shadow-md flex gap-6 rounded-lg p-8">
        <div className="w-[50%]">
          <img src={product?.image} className=" h-96 w-full object-cover" alt={product?.name} />
        </div>
        <div className="w-[50%] pl-4 flex flex-col gap-2 ">
          <div onClick={() => navigate(`/profile/${product?.merchant_id}`)} className="text-4xl flex  cursor-pointer font-bold">{product?.name}
          <FaExternalLinkAlt className="text-xs text-blue-400 " />
          </div>
          {/* <p className="text-xs text-blue-700 font-semibold underline cursor-pointer " >Merchant </p> */}
          <p className="text-2xl font-semibold">Price: ${product?.price}</p>
          <p className="text-lg font-semibold">Size: {product?.size}</p>
          <p className="text-lg font-semibold">{product?.specifications}</p>

          <div className="mt-6 flex gap-2  w-full justify-around">
          <Accordion className="w-full">
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                    Specifications
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    {product?.specifications}
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                     OverView
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                    {product?.specifications}
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
