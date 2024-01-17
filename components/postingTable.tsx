"use client";

import React, {useState, useEffect, ChangeEvent} from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


export function PostingTable() {

  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [postings, setPostings] = useState([]);
  const {data: session} = useSession();
  const data = [
    { id: 1, name: 'Software engineer position for NES web platform', applications: 101},
    { id: 2, name: 'Project Manager position for NES web platform', applications: 200},
    { id: 3, name: 'Intern position for NES web platform', applications: 10000}
  ]

  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const [tableData, setTableData] = useState(data);

  const handleSorting = (sortField: string, sortOrder: string) => {
    if (sortField) {
     const sorted = [...data].sort((a, b) => {
      return (
       a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
        numeric: true,
       }) * (sortOrder === "asc" ? 1 : -1)
      );
     });
     setTableData(sorted);
    }
   };

  const handleSortingChange = (accessor: string) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  useEffect(() => {
    const fetchPostings = async () => {
      const response = await fetch(`/api/company/${session?.user?.email}/postings`);
      const data = await response.json();
      setPostings(data);
    }

    if (session?.user?.id) {
      fetchPostings();
    }
  }, [session?.user?.id]);

  const handleClick = () => {
    router.push("/application-view");
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  return (
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
            <th><button type="button" onClick={() => handleSortingChange('id')}>No.</button></th>
            <th><button type="button" onClick={() => handleSortingChange('name')}>Job Posting</button></th>
            <th><button type="button" onClick={() => handleSortingChange('applications')}>Number of Applications</button></th>
          </tr>
        </thead>
        <tbody>
          {data.map(product => (
            <tr className="hover:bg-gray-700 hover:text-blue-500" key={product.id}>
              <td><button type="button" onClick={() => handleClick()} className="w-full text-left">{product.id}</button></td>
              <td><button   type="button" onClick={() => handleClick()} className="w-full text-left">{product.name}</button></td>
              <td><button  type="button" onClick={() => handleClick()} className="w-full text-left">{product.applications}</button></td> 
            </tr>
          ))}
        </tbody>
    </table>
  </div>
  )
}

export default PostingTable;