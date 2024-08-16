import { useCallback, useEffect, useRef, useState } from 'react'

// import './App.css'

function App() {
  const [length ,setLength]  = useState(8);
  const [numberAllowed,setNumAllowed] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password,setPassword] = useState("")
  const passwordRef = useRef(null)

  const copyPasswordToClipboard =useCallback(()=>{
    passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator = useCallback(()=>{
   let pass = ""
   let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtuvwxyz'
   if(numberAllowed) str += "0123456789"
   if(character) str+= "!@#$%^&*()~?"

   for(let i=1; i <= length; i++){
    let char = Math.floor(Math.random() * str.length + 1)

    pass += str.charAt(char)
   }

   setPassword (pass)
  },[length,numberAllowed,character,setPassword])

  useEffect(() => {
    passwordGenerator()
  },[length,numberAllowed,character,passwordGenerator])
  return (
    <>
         
         

         <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8  bg-gray-800'>
         <h1 className='text-slate-200 text-3xl text-center py-4'>Password Generator</h1>
            <div className='flex shadow rounded-lg overflow-hidden mb-4'>
               <input type="text" 
               value={password}
               className='outline-none w-full py-2 px-3'
               placeholder='passowrd'
               readOnly
               ref={passwordRef}
               />
               <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700
                text-white px-3 py-0.5 shrink-0'>copy</button>
            </div>
               <div className='flex text-sm gap-x-2 py-4'>
                 <div className='flex items-center gap-x-1'>
                  <input type="range" 
                  max={100}
                  min={6}
                  value={length}
                  className='cursor-pointer'
                  onChange={(e)=>{setLength(e.target.value)}}
                  />
                  <label htmlFor="" className='text-white'>Length: {length}</label>
                 </div>
                 <div className='flex items-center gap-x-1'>
                  <input 
                  type="checkbox" 
                  defaultChecked = {numberAllowed}
                  id = "numberInput"
                  onChange={()=> {
                    setNumAllowed((prev)=> !prev);
                  }}
                  
                  />
                  <label htmlFor="number" className='text-white'>Number</label>
                 </div>
                 <div className='flex  items-center gap-x-1'>
                 <input 
                  type="checkbox" 
                  defaultChecked = {character}
                  id = "charInput"
                  onChange={()=> {
                    setCharacter((prev)=> !prev);
                  }} />

                 <label htmlFor="number" className='text-white'>Character</label>
                 </div>
               </div>
         </div>

    </>
  )
}

export default App
