import {GetGmails} from './googleapis';

import React from 'react'



export async function page() {
 const data = await GetGmails();
 console.log(data);

  return (
    <div>
       hi
    </div>
  )
}

export default page;