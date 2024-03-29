"use client";

import React, {useState, useEffect, ChangeEvent} from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Posting } from '@/lib/interfaces';
import {Loading} from '@/components/loading'


export function PostingTable() {

  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [postings, setPostings] = useState<Posting[]>([]);
  const {data: session} = useSession();
  const [load, setLoad] = useState<Boolean>(true);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
 

  // sort tables in terms of field
  const handleSorting = (sortField: string, sortOrder: string) => {
    if (sortField) {
      const sorted = [...postings].sort((a, b) => {
        if (sortOrder === "desc") {
          const temp = a;
          a = b;
          b = temp;
        }
        return (
         a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
          numeric: true,}));  
        })
      setPostings(sorted);
    };
  }

  const handleSortingChange = (accessor: string) => {
    const sortOrder = (accessor === sortField && order === "asc") ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
    
  };

  // fetch data to display for table
  useEffect(() => {
    console.log("it is the start")
    const fetchPostings = async () => {
      const response = await fetch(`/api/company/${session?.user?.email}/postings`);
      console.log(response);
      const data = await response.json();
      
      if (data) {
        setPostings(data);   
        console.log(postings);
        console.log("the conditional is reached");
      }
      setLoad(!load); 
    }
    if (session?.user?.email) {
      fetchPostings();
      
    }
  }, [session?.user?.email]);


  const handleClick = (posting: Posting) => {
    router.push(`/table/${posting.id}/applications`);
  }

  // const handleSearch = (searchText: string) => {
  //   if (searchText) {
  //     var filter = searchText.toUpperCase();
  //     var titleArray = postings.map(function (posting) { return posting.title; })
  //     const searched = [...postings].filter(() => {
  //       for (var i=0; i < titleArray.length; i++) {
  //         var title = titleArray[i].toUpperCase();
  //         if (title.includes(filter)){
  //           return true;
  //         }
  //       } 
  //     })
  //     displayPostings = searched;
  //     console.log(searched);
  //   };
  // }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText(e.target.value);
    console.log(e.target.value)
    // handleSearch(searchText);
  }

  return (load ? (<Loading/>) : (
      <div>
        <form className='relative w-full flex-center'>
          <input
            type="text"
            name="searching"
            placeholder='Search job posting'
            value = {searchText}
            onChange={handleSearchChange}
          />
        </form>
        <table>
          <thead>
            <tr>
              <th>No. </th>
              <th><button type="button" onClick={() => handleSortingChange('title')}>Job Posting</button></th>
              <th><button type="button" onClick={() => handleSortingChange('applications')}>Number of Applications</button></th>
            </tr>
          </thead>
          <tbody>
            {postings.map((posting: Posting, index: number) => (   
              <tr key={index} className="hover:bg-gray-700 hover:text-blue-500">
                <td><button type="button" onClick={() => handleClick(posting)} className="w-full text-left">{index + 1}</button></td>
                <td><button   type="button" onClick={() => handleClick(posting)} className="w-full text-left">{posting.title}</button></td>
                <td><button  type="button" onClick={() => handleClick(posting)} className="w-full text-left">{posting.applications.length}</button></td> 
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