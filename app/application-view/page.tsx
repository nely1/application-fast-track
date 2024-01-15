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
    <Grid container sx={{ pt:3, pl:3 }} spacing={5}>
        {/* xs is item spacing, ml is margin spacing */}
        <Grid item>
            <iframe src="https://assets.website-files.com/603d0d2db8ec32ba7d44fffe/603d0e327eb2748c8ab1053f_loremipsum.pdf" width="800" height="600"/>
        </Grid>
        <Grid item>
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
            </Grid>
            <Grid item >
                Final evaluation:

                <Button variant="contained" endIcon={<VerifiedIcon />} color='success'>
                    Accept
                </Button>
                <Button variant="contained" endIcon={<DangerousIcon />} color='error'>
                    Reject
                </Button>
            </Grid>
        </Grid>
    </Grid>
  );
}