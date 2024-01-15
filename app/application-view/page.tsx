"use client"
import { useState } from 'react';

import { pdfjs, Document, Page } from 'react-pdf';

// Material UI components
import Grid from '@mui/material/Grid';

import Multiselect from 'multiselect-react-dropdown';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const options = [
    { name: "Option 1", id: 1 },
    { name: "Option 2", id: 2 },
    { name: "Option 3", id: 3 },
    { name: "Option 4", id: 4 },
    { name: "Option 5", id: 5 }
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
            <Document file="https://assets.website-files.com/603d0d2db8ec32ba7d44fffe/603d0e327eb2748c8ab1053f_loremipsum.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
        </Grid>
        <Grid item xs={3} sx={{ ml: 8 }} >
            {/* <input type="checkbox" id="tooshort_id" name="comments" value="too_short"/>
            <label htmlFor="tooshort_id">Too short</label>

            <input type="checkbox" id="underqualified_id" name="comments" value="underqualified"/>
            <label htmlFor="underqualified_id">Not qualified for position</label>

            <input type="checkbox" id="misleading_id" name="comments" value="misleading"/>
            <label htmlFor="misleading_id">Suspicious information presented</label> */}

            <Multiselect
            placeholder="Formatting Issues"
            options={options}
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
            options={options}
            onSelect={function noRefCheck(){}}
            onRemove={function noRefCheck(){}}
            displayValue="name"
            closeIcon="cancel"
            selectedValues={function noRefCheck(){}}
            className="multiSelectContainer"
            showCheckbox
            />
        </Grid>
    </Grid>
  );
}