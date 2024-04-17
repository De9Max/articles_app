'use client'
import { Pagination as MuiPagination } from '@mui/material'

export default function Pagination({ totalPages, currentPage, onChange }) {
  return (
    <div className="flex justify-center my-4">
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={onChange}
        color="primary"
      />
    </div>
  )
}
