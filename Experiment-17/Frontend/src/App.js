import React from "react";
import ProductList from "./components/ProductList";
import Chat from "./components/Chat";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Full Stack App</h1>
      <h2>1️⃣ Product List (via Axios)</h2>
      <ProductList />
      <hr />
      <h2>2️⃣ Real-Time Chat (via Socket.io)</h2>
      <Chat />
    </div>
  );
}

export default App;
