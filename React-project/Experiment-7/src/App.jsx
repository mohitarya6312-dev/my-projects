import { useState } from 'react'
import './App.css'

import Productcart from './components/productcart'; 

function App() {
  const product1 = {
    name: "Shoes",
    price: 19.99,
    inStock: true
  }
  const product2 = {
    name: "T-shirt",
    price: 9.99,
    inStock: true
  }
  const product3 = {
    name: "Jeans",
    price: 29.99,
    inStock: false
  }

  return (
    <>
      <h1>Product list</h1>
      {/* ✅ pass the right variables */}
      <Productcart props={product1} />
      <Productcart props={product2} />
      <Productcart props={product3} />
    </>
  )
}

export default App;
