"use client";

import {useState, useEffect, ChangeEvent} from 'react'
import { useRouter } from 'next/navigation';
import { Application } from '@/lib/interfaces';
import {Loading} from '@/components/loading'


export function ApplicationTable({params}: any) {

  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);
  const [load, setLoad] = useState<Boolean>(true);


  useEffect(() => {
    const fetchApplications = async () => {
      const response = await fetch(`/api/posting/${params.id}/applications`);
      const data = await response.json();
      setApplications(data);
      setLoad(!load);   
    }
    if (params.id) {
      fetchApplications();
      
    }
  }, [params.id]);

  const handleClick = (id: number) => {
    router.push(`/application-view`);
  }
  
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }

  return ( load ? (<Loading/>) : (
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
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((posting: Application, index: number) => (   
            <tr key={index} className="hover:bg-gray-700 hover:text-blue-500">
              <td><button type="button" onClick={() => handleClick(posting.id)} className="w-full text-left">{index + 1}</button></td>
              <td><button   type="button" onClick={() => handleClick(posting.id)} className="w-full text-left">{posting.resumeFile}</button></td>
            </tr>  
              )
            )
          }
        </tbody>
    </table>
  </div>)

  )
}

export default ApplicationTable;