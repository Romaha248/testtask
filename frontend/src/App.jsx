// import { useState } from 'react'
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./components/Routes/AllRoutes";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      {/* <HomePage></HomePage> */}
      <AllRoutes />
    </>
  );
}

export default App;
