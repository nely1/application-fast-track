import  {loginIsRequiredServer}  from '@/lib/auth';
import {ApplicationTable} from '@/components/ApplicationTable';

interface Props {
    params: {id: number}
}

export async function ApplicationPage({params}: any) {

    const loginCheck = await loginIsRequiredServer();

        
    return (
        
        <ApplicationTable params={params}/>
    )
}


export default ApplicationPage;