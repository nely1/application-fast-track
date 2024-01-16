"use client";

import {useState, useEffect, ChangeEvent} from 'react'
import { useRouter } from 'next/navigation';



export default function postingTable() {

  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  
  const handleClick = () => {
    router.push("/");
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  return (
    <section>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search job posting'
          value = {searchText}
          onChange={handleSearchChange}
          className=''
        />
      </form>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Job posting</th>
            <th>Number of applications</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-700 hover:text-blue-500">
            <td><button type="button" onClick={() => handleClick()} className="w-full text-left">1</button></td>
            <td><button   type="button" onClick={() => handleClick()} className="w-full text-left">Software engineer position for NES web platform</button></td>
            <td><button  type="button" onClick={() => handleClick()} className="w-full text-left">101</button></td> 
          </tr>

          <tr className="hover:bg-gray-700 hover:text-blue-500">
            <td><button  type="button" onClick={() => handleClick()} className="w-full text-left">2</button></td>
            <td><button  type="button" onClick={() => handleClick()} className="w-full text-left">Project Manager position for NES web platform</button></td>
            <td><button  type="button" onClick={() => handleClick()} className="w-full text-left">200</button></td>
          </tr>
          
          <tr className="hover:bg-gray-700 hover:text-blue-500">
            <td><button  type="button" onClick={() => handleClick()} className="w-full text-left">3</button></td>
            <td><button  type="button" onClick={() => handleClick()} className="w-full text-left">Intern position for NES web platform</button></td>
            <td><button  type="button" onClick={() => handleClick()} className="w-full text-left">10000</button></td>
          </tr>
        </tbody>
    </table>
  </section>
  )
}

