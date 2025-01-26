"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { RoadMap } from '../Ai'

const ResultPage=(Results)=>{
    return(
        Results.map(e=>{
            return(
                <div className='w-full h-full pt-5'>
                    <h1 className='font-semibold text-3xl text-center'>{e.Level}</h1>
                    <ul className='flex gap-3 flex-col ml-10 mt-10 '>
                        {e.Chapters.map(e=>{return(
                            <>
                            <li>{e.Topic} : {e.Explanation}</li>
                            </>
                        )})}
                    </ul>
                    <Link href={e.Resource} className='mt-3 ml-10 font-semibold'>Resource</Link>
                </div>
            )
        })
    )
}


const page = () => {
    const [Text,setText]=useState()
    const [Results,setResults]=useState([])
    const [Loader,setLoader]=useState(false)
    const [Home,setHome]=useState(true)
    const Generate=async()=>{
        const Chat=Text
        setText("");
        setHome(false)
        const Data=await RoadMap(Chat)
        // setLoader(true)
        const cleanedData = await Data.replace(/```json/, "").replace(/```/g, "").trim();        console.log(cleanedData)
        const JsonResponse=await JSON.parse(cleanedData)
        setResults(JsonResponse)
        // setLoader(false)
    }
return (
    <div className="bg-black text-white min-h-screen">
    {/* Navbar */}
    <nav className="flex justify-between items-center p-5">
      <h1 className="text-2xl font-bold">Smart AI</h1>
      <div className="space-x-5">
        <Link href="/" className="hover:text-gray-400">Home</Link>
        <Link href="/about" className="hover:text-gray-400">About Us</Link>
        <Link href="/Smart-AI" className="hover:text-gray-400">Smart AI</Link>
      </div>
    </nav>

    {/* Content Section */}
    <div className="flex flex-col items-center justify-center py-20 space-y-5">
      <div className="bg-gray-300 text-black p-10 rounded-md shadow-md">
        {ResultPage(Results)}
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="What You Want to Learn"
          className="p-2 w-64 bg-gray-300 text-black rounded-md shadow-md focus:outline-none" value={Text} onChange={(e)=>setText(e.target.value)}/>
        <button
          className="bg-gray-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-gray-700" onClick={Generate}>
          Generate
        </button>
      </div>
    </div>
  </div>
)
}

export default page