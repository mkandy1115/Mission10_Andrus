import { useState } from 'react'
import Heading from './Header'
import BowlerList from './BowlerList'
import './App.css'

function App() {
  // State Variable
  const [count, setCount] = useState(0);

  // Show Heading component and BowlerList component
  return (
    <>
      <Heading />
      <BowlerList />
    </>
  );
}

export default App;
