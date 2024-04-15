import React, {useState} from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { MdOutlineCreateNewFolder } from "react-icons/md";
import axios from 'axios'


function Navbar({ wishList ,  products, setProducts}) {
  const navigate = useNavigate();
  const [openc, setOpenC] = useState(false);
  const [createdProduct, setcreatedProduct] = useState({
    name: "",
    price: 0,
    size: "",
    specifications: "",
    image: "",
    merchant_id: 0,
  });

  const onOpenModalC = () => setOpenC(true);
  const onCloseModalC = () => setOpenC(!openc);

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setcreatedProduct({ ...createdProduct, [name]: value });
   
   
  };

  const handleCreate = () => {
    
    try {
      axios.post("http://[::1]:3000/products", createdProduct);
    setProducts(products.concat(createdProduct));
    onCloseModalC();
    } catch (error) {
      console.log("Id Not Fiy=und====!!");
    }
  }

  return (
    <nav className="flex flex-row items-center h-16 bg-red justify-around gap-2 w-full ">
      <a href="/" className="logo nav-common">
        <img
          src="https://www.superbolter.com/Images/logo_original_beta.svg "
          alt="brand-logo"
      />
      </a>
      <ul className="flex gap-4 font-serif font-semibold text-gray-600  ">
        <li className="hover:text-gray-500 ">
          <a href="#">Home</a>
        </li>
        <li className="hover:text-gray-500 ">
          <a href="#products">Products</a>
        </li>
        <li className="hover:text-gray-500 ">
          <a href="#collections">Collections</a>
        </li>
      </ul>
      <div className="relative flex gap-4 items-center  ">
        {/* < MdOutlineCreateNewFolder onClick={onOpenModalC} className="text-3xl text-gray-600 cursor-pointer "  /> */}
        
        <FiShoppingCart className="text-2xl text-gray-600 " />
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-sm">
          {wishList.length}
        </div>

        <Modal open={openc} onClose={onCloseModalC} center>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Create Product</h2>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  placeholder="Name"
                  name="name"
                  value={createdProduct.name}
                  onChange={handleCreateChange}
                />
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  placeholder="Price"
                  name="price"
                  value={createdProduct.price}
                  onChange={handleCreateChange}
                />
                <input
                  type="price"
                  className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  placeholder="Merchant Id"
                  name="merchant_id"
                  value={createdProduct.merchant_id}
                  onChange={handleCreateChange}
                />
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  placeholder="Size"
                  name="size"
                  value={createdProduct.size}
                  onChange={handleCreateChange}
                />
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  placeholder="Image"
                  name="image"
                  value={createdProduct.image}
                  onChange={handleCreateChange}
                />
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 mb-2"
                  placeholder="Specifications"
                  name="specifications"
                  value={createdProduct.specifications}
                  onChange={handleCreateChange}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={handleCreate}
                >
                  Save Changes
                </button>
              </div>
            </Modal>
       
      </div>
    </nav>
  );
}

export default Navbar;