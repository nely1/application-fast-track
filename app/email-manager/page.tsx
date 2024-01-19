import {GetGmails} from '@/lib/googleapis';

import React from 'react'



export async function page() {
 const data = await GetGmails('Internship at NES');

  return (
    <div>
       hi
    </div>
  )
}

export default page;