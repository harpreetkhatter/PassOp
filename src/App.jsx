import { useState } from "react";

import Navbar from "./assets/components/navbar";
import Manager from "./assets/components/Manager";
import Footer from "./assets/components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
   
      <Navbar />
      
      <Manager />
      <Footer/>
    </>
  );
}

export default App;
