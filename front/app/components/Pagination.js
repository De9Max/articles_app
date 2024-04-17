'use client';
import { Pagination as MuiPagination } from '@mui/material';

export default function Pagination({ totalPages, currentPage, onChange }) {
  return (
    <div className='my-4 flex justify-center'>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={onChange}
        color='primary'
      />
    </div>
  );
}
