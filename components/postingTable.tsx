"use client";

import {useState, useEffect, ChangeEvent} from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Posting } from '@/lib/interfaces';
import {Loading} from '@/components/loading'


export function PostingTable({data}:any) {

  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [postings, setPostings] = useState<Posting[]>([]);
  const {data: session} = useSession();
  const [load, setLoad] = useState<Boolean>(true);

  useEffect(() => {
    const fetchPostings = async () => {
      const response = await fetch(`/api/company/${session?.user?.email}/postings`);
      const data = await response.json();
      setPostings(data);   
      setLoad(!load); 
    }
    if (session?.user?.email) {
      fetchPostings();
      
    }
  }, [session?.user?.email]);


  const handleClick = (id: number) => {
    router.push(`/table/${id}/applications`);
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  return (load ? (<Loading/>) : (
      <div>
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
            {postings.map((posting: Posting, index: number) => (   
              <tr key={index} className="hover:bg-gray-700 hover:text-blue-500">
                <td><button type="button" onClick={() => handleClick(posting.id)} className="w-full text-left">{index + 1}</button></td>
                <td><button   type="button" onClick={() => handleClick(posting.id)} className="w-full text-left">{posting.title}</button></td>
                <td><button  type="button" onClick={() => handleClick(posting.id)} className="w-full text-left">{posting.applications.length}</button></td> 
              </tr>  
                )
              )
            }
          </tbody>
      </table>
    </div>
    )
  )
}

export default PostingTable;