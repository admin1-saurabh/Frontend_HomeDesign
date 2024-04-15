import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Product from "./components/Product";
import UserProfile from "./components/UserProfile";
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0);
  const [wishList, setWishList] = useState([]);

  const [products, setProducts] = useState([])


  useEffect(() => {
    axios.get('https://backend-homedesign.onrender.com/products')
    .then(res => setProducts(res.data))
    .catch(err => console.log(err))

  }, [])

  console.log(products);


  return (
    <>
      {/* <Navbar wishList={wishList} /> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={[ <Navbar wishList={wishList} products={products} setProducts={setProducts} />, <Main wishList={wishList} products={products} setProducts={setProducts} setWishList={setWishList} />]}
          />
          <Route path="/product/:id" element={[<Navbar wishList={wishList} />, <Product products={products} setProducts={setProducts} />]}  />
          <Route path= "/profile/:id" element={[<Navbar wishList={wishList} />, <UserProfile products={products} setProducts={setProducts} />]} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
