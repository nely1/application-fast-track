"use client"
import { useEffect, useState } from 'react';
import '../style.css'
import { MultiSelect } from "react-multi-select-component";

// Material UI components
import Button from '@mui/material/Button';
import VerifiedIcon from '@mui/icons-material/Verified';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { Application } from '@/lib/interfaces';

interface Props {
  params: {id: number}
}

const qualOptions = [
    { label: "Underqualified", value: "unq" },
    { label: "Misinformation found", value: "mis" },
  ];

const formatOptions = [
    { label: "Too Short", value: "sho" },
    { label: "Too Long", value: "lon" },
    { label: "Poor Formatting", value: "for" },
  ];
  
export default function MyApp({params}: Props) {
  const [formatting, setFormatting] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [application, setApplication] = useState<Application>();
  

  useEffect(() => {
    const fetchApplication = async () => {
      const response = await fetch(`/api/email/${params.id}`, {method: "GET"});
      const data = await response.json();
      setApplication(data.data);   
     
    }
    if (params.id) {
      fetchApplication();
    }
  },[params.id])
  

  async function handleSubmit() {
    await fetch(`/api/email/${params.id}`, {
      method: 'POST',
      body: JSON.stringify({
        formatting: formatting,
        qualifications: qualifications
      })
    })
   
  }
  
  const str = application?.resumeFile.replace(/_/g, '/').replace(/-/g, '+');
  return (
    <div className="flex h-screen pt-5 pl-5">
        <div>
          <iframe src={`data:application/pdf;base64,${str}`} width="800" height="100%"/>
        </div>
        <div className="pl-28 flex flex-col justify-around">
            <MultiSelect
            options={formatOptions}
            value={formatting}
            onChange={setFormatting}
            labelledBy="Select"
            overrideStrings={{"selectSomeItems": "Formatting Issues..."}}
            hasSelectAll={false}
            />
            <MultiSelect
            options={qualOptions}
            value={qualifications}
            onChange={setQualifications}
            labelledBy="Select"
            overrideStrings={{"selectSomeItems": "Qualification Issues..."}}
            hasSelectAll={false}
            />
            <div>
                Final evaluation:
                <Button variant="contained" endIcon={<VerifiedIcon />} color='success' onClick={handleSubmit}>
                    Accept
                </Button>
                <Button variant="contained" endIcon={<DangerousIcon />} color='error'onClick={handleSubmit}>
                    Reject
                </Button>
            </div>
        </div>
    </div>
  );
}
