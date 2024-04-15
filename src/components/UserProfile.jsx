import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import bgImg from "../assets/logo.jpg";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdOutlineCreateNewFolder } from "react-icons/md";


function UserProfile() {
 const [products, setProducts] = useState();


 useEffect(() => {
  axios.get('https://backend-homedesign.onrender.com/products')
  .then(res => setProducts(res.data))
  .catch(err => console.log(err))

}, [products, setProducts])




  const { id } = useParams();
  const [productId, setproductId] = useState();
  const [details, setDetails] = useState();
 
  useEffect(() => {
    axios.get(`https://backend-homedesign.onrender.com/merchants/${id}`)
      .then(res => setDetails(res.data))
      .catch(err => console.log(err))

  }, [])
 

  const bgImage = {
    backgroundImage: `url(${details ? details.logo : bgImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
  };


  // const [product, setProduct] = useState();
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);

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
      axios.post("https://backend-homedesign.onrender.com/products", createdProduct);
    setProducts(products.concat(createdProduct));
    onCloseModalC();
    } catch (error) {
      console.log("Id Not Fiy=und====!!");
    }
  }

  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: 0,
    size: "",
    specifications: "",
  });

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleEdit = (productId) => {
    console.log(productId);
    setproductId(productId);
    onOpenModal();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });

  };
  const handleDeleted = (id) => {
    
    axios.delete(`https://backend-homedesign.onrender.com/products/${id}`)
    .then(setProducts(products.filter((product) => product.id !== id)))
    .catch(err => console.log(err))
    
  }

  const handleSubmit = () => {
    // Handle form submission, e.g., update product details
    axios.put(`https://backend-homedesign.onrender.com/products/${productId}`, editedProduct);
    setProducts(products.map((product) => (product.id === productId ? { ...product, ...editedProduct } : product)));
    onCloseModal();
    setEditedProduct({});
    console.log(products);
  };


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar code here */}
      {/* Navbar is assumed to be outside of this component */}
      <main className="bg-cover bg-center relative" style={bgImage}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-white text-center pt-24">
          <h1 className="text-4xl font-bold">{details?.name}</h1>
          <p className="text-xl font-semibold mt-4">{details?.location}</p>
        </div>
      </main>
      <section className="container mx-auto px-4 py-8">
        <div className="text-2xl flex gap-2 font-semibold text-gray-800 mb-4"> Product List < MdOutlineCreateNewFolder onClick={onOpenModalC} className="text-4xl text-gray-600 cursor-pointer "  /></div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            (product.merchant_id === parseInt(id)) && <div className="max-w-sm rounded overflow-hidden cursor-pointer shadow-lg"  >

              <div>
                <img
                  className="w-full h-48 object-cover"
                  src={product?.image}
                  alt={product?.name}
                />
              </div>

              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xl mb-2">{product.name}</div>
                  <div className='flex gap-2 items-center'>
                    <div onClick={() => { handleEdit(product.id) }} >
                      <FaEdit className="text-red-500 cursor-pointer" />
                    </div>
                    <Modal open={open} onClose={onCloseModal} center>
                      <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md p-2 mb-2"
                          placeholder="Name"
                          name="name"
                          value={editedProduct.name}
                          onChange={handleInputChange}
                        />
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded-md p-2 mb-2"
                          placeholder="Price"
                          name="price"
                          value={editedProduct.price}
                          onChange={handleInputChange}
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md p-2 mb-2"
                          placeholder="Size"
                          name="size"
                          value={editedProduct.size}
                          onChange={handleInputChange}
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md p-2 mb-2"
                          placeholder="Specifications"
                          name="specifications"
                          value={editedProduct.specifications}
                          onChange={handleInputChange}
                        />
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                          onClick={handleSubmit}
                        >
                          Save Changes
                        </button>
                      </div>
                    </Modal>
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
          ))}
        </div>
      </section>
    </div>
  );
}

export default UserProfile;
