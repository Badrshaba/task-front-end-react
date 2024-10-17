import axios from 'axios'
import { useEffect, useState } from 'react'



function App() {
const [products, setProducts] = useState([])
const [error, setError] = useState(null)
const [loading, setLoading] = useState(false)
  const fetchProducts = async() => {
    setLoading(true)
    try {
      let {data} = await axios('https://fakestoreapi.com/products')
       setProducts(data);  
       setLoading(false)
    } catch (error) {
      setError(error?.message);
      setLoading(false)
    }

  }

  useEffect(() => {
fetchProducts()
  }, [])
if (error) {
  return <div className='bg-red-600' ><h2 className='text-center font-bold text-xl' >{error}</h2></div>
}
  return (
    <div className=' bg-[#e5e5e5] min-h-screen px-10 py-5'>
    {loading && <h2 className='text-center font-bold text-xl' >Loading...</h2>}
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6  gap-4' >
 {products.map((product) => (
    <div key={product.id} className=' border rounded-lg flex h-fit bg-white  items-center flex-col p-5 shadow hover:shadow-xl hover:scale-105 hover:cursor-pointer  transition-all duration-300' >
      <img src={product.image} width={150}  alt="product image"/>
      <div className='text-center'>
      <p className='font-bold' >{product.title}</p>
      <p> <span>${product.price}</span></p>
      <p>   <span>{product.rating?.rate}</span></p>
      </div>
    </div>
  ))}
    </div>
    </div>
  )
}

export default App
