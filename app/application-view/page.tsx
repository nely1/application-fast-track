"use client"
import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

// Material UI components
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl } from '@mui/base';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export default function MyApp() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <Grid container>
        <div className="pdf_col">
            <Document file="https://assets.website-files.com/603d0d2db8ec32ba7d44fffe/603d0e327eb2748c8ab1053f_loremipsum.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
        </div>
        <FormControl>
            <FormLabel >Comments:</FormLabel>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Too short" />
                <FormControlLabel control={<Checkbox />} label="Unqualified" />
            </FormGroup>
        </FormControl>
    </Grid>
    
  );
}