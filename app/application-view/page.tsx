"use client"
import { useState } from 'react';

import Multiselect from 'multiselect-react-dropdown';

// Material UI components
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import VerifiedIcon from '@mui/icons-material/Verified';
import DangerousIcon from '@mui/icons-material/Dangerous';

const qualOptions = [
    { name: "Underqualified", id: "unq" },
    { name: "Misinformation found", id: "mis" },
  ];

const formatOptions = [
    { name: "Too Short", id: "sho" },
    { name: "Too Long", id: "lon" },
    { name: "Poor Formatting", id: "for" },
  ];



export default function MyApp() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <Grid container sx={{ ml: 3, mt:3 }}>
        {/* xs is item spacing, ml is margin spacing */}
        <Grid item xs={5}>
        <iframe src="https://assets.website-files.com/603d0d2db8ec32ba7d44fffe/603d0e327eb2748c8ab1053f_loremipsum.pdf" width="800" height="600"/>
        </Grid>
        <Grid item xs={3} sx={{ ml: 8 }} >
            {/* <input type="checkbox" id="tooshort_id" name="comments" value="too_short"/>
            <label htmlFor="tooshort_id">Too short</label>

            <input type="checkbox" id="underqualified_id" name="comments" value="underqualified"/>
            <label htmlFor="underqualified_id">Not qualified for position</label>

            <input type="checkbox" id="misleading_id" name="comments" value="misleading"/>
            <label htmlFor="misleading_id">Suspicious information presented</label> */}
            <Grid item>
                <Multiselect
                placeholder="Formatting Issues"
                options={formatOptions}
                onSelect={function noRefCheck(){}}
                onRemove={function noRefCheck(){}}
                displayValue="name"
                closeIcon="cancel"
                selectedValues={function noRefCheck(){}}
                className="multiSelectContainer"
                showCheckbox
                />
                <Multiselect
                placeholder="Qualification Issues"
                options={qualOptions}
                onSelect={function noRefCheck(){}}
                onRemove={function noRefCheck(){}}
                displayValue="name"
                closeIcon="cancel"
                selectedValues={function noRefCheck(){}}
                className="multiSelectContainer"
                showCheckbox
                />

                Recruiter Verdict:

                <Button variant="contained" endIcon={<VerifiedIcon />}>
                    Accept
                </Button>
                <Button variant="contained" endIcon={<DangerousIcon />}>
                    Reject
                </Button>

            </Grid>
        </Grid>
    </Grid>
  );
}