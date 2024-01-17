import  {loginIsRequiredServer}  from '@/lib/auth';
import {PostingTable} from '@/components/PostingTable';



export async function tablepage() {

    const loginCheck = await loginIsRequiredServer();
        
    return (
        <PostingTable/>
    )
}


export default tablepage;