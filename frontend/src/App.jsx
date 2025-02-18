import { useState } from 'react'
import { ImageList } from './images';
import {Routes,Route,useNavigate} from 'react-router-dom'
import { CartContext, useCart} from './cartContext';
import CartPage from './cart'
import PaymentPage from './payment';


export function CenteredBox() {

const [index,setIndex]=useState(0);
const navigate = useNavigate()
const {addToCart} = useCart() 

let prev = index>0
let Next = index<ImageList.length-1

const handleNextClick=()=>{
if(Next){
  setIndex(index+1);
}

}

const handlePreviousClick=()=>{
  if(prev){
    setIndex(index-1)
  }
 
}

let Images = ImageList[index]
  return (
    <div className="h-screen  flex items-center justify-center bg-gray-700 relative">

      <div className=' absolute top-5 left-5 max-w-md'><h1 className='text-red-500 font-bold text-6xl from-neutral-95 mr-96'>Direct Buy</h1>
      <h4 className='italic text-gray-400 mt-2 whitespace-nowrap'>"This is an application that you can buy the limited listed items directlly . Add to cart and just buy ,Experience the smoothness..!"</h4></div>

       <div className='flex flex-col items-center'>

        
      <div className=" relative w-120 h-96 bg-gray-200 rounded-2xl flex items-center justify-center mt-32">

      <button onClick={handlePreviousClick}  className="absolute left-[-40px] p-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer">
            <span className="text-xl ">&lt;</span> 
          </button>

      <div className=" flex items-center justify-center">
            <img src={Images.url} alt={Images.alt} className=' absolute w-120 h-96  object-cover shadow-black shadow-2xl rounded-2xl '/> 
          </div>

          <div className='bg-white absolute w-120 h-15 mt-96 shadow-2xl'>

            <div className='flex justify-center items-center flex-col'>

            <h2 className=' text-2xl font-normal '>{Images.name}</h2>
            <h3 className='italic'>"{Images.description}"</h3>

            </div>

           

           
          </div>

          <button onClick={handleNextClick}  className="absolute right-[-40px] p-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer">
            <span className="text-xl ">&gt;</span> 
          </button>

      </div>
     
      <button onClick={()=>{addToCart({name:Images.name,url:Images.url,price:Images.price});navigate('/cart')}}   className=' mt-20 font-bold bg-amber-300 w-70 h-10 rounded-lg  transition duration-400 ease-in-out hover:bg-amber-400 hover:scale-105 active:scale-95 cursor-pointer'>Add To Cart</button>
      </div>
    </div>
  );
}

function App() {
  return (
 
    <CartContext>
    <Routes>
     <Route path= "/" element={<CenteredBox/>}/>
     <Route path="/cart" element={<CartPage/>}/>
     <Route path='/checkout' element={<PaymentPage/>}></Route>
    </Routes>
    </CartContext>
  );
}

export default App;

