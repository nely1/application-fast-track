"use client"
import { useState } from 'react';
import './style.css'
import { MultiSelect } from "react-multi-select-component";

// Material UI components
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import VerifiedIcon from '@mui/icons-material/Verified';
import DangerousIcon from '@mui/icons-material/Dangerous';

const qualOptions = [
    { label: "Underqualified", value: "unq" },
    { label: "Misinformation found", value: "mis" },
  ];

const formatOptions = [
    { label: "Too Short", value: "sho" },
    { label: "Too Long", value: "lon" },
    { label: "Poor Formatting", value: "for" },
  ];

export default function MyApp() {

  const [selected, setSelected] = useState([]);

  return (
    <div className="flex h-screen pt-5 pl-5">
        <div>
            <iframe src="https://assets.website-files.com/603d0d2db8ec32ba7d44fffe/603d0e327eb2748c8ab1053f_loremipsum.pdf" width="800" height="100%"/>
        </div>
        <div className="pl-28 flex flex-col justify-around">
            <MultiSelect
            options={formatOptions}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
            overrideStrings={{"selectSomeItems": "Formatting Issues..."}}
            hasSelectAll={false}
            />
            <MultiSelect
            options={qualOptions}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
            overrideStrings={{"selectSomeItems": "Qualification Issues..."}}
            hasSelectAll={false}
            />
            <div>
                Final evaluation:
                <Button variant="contained" endIcon={<VerifiedIcon />} color='success'>
                    Accept
                </Button>
                <Button variant="contained" endIcon={<DangerousIcon />} color='error'>
                    Reject
                </Button>
            </div>
        </div>
    </div>
  );
}