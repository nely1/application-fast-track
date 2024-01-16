
import {useState, useEffect, ChangeEvent} from 'react'
import { redirect, useRouter } from "next/navigation";
import { GET } from '../api/auth/[...nextauth]/route';
import { getUserSession } from '@/lib/session';
import { getServerSession } from 'next-auth';
import authOption from '@/lib/auth';
import  {loginIsRequiredClient, loginIsRequiredServer}  from '@/lib/auth';
import { useSession } from 'next-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {PostingTable} from '@/components/PostingTable';


// const checkLogin = () => {
//     return loginIsRequiredClient();
// }
export async function tablepage() {

    const loginCheck = await loginIsRequiredServer();
        
    return (
        <PostingTable/>
    )
}


export default tablepage;