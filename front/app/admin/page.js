'use client';

import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { Suspense, useLayoutEffect, useState } from 'react';
import { useDataPaginate } from '@/lib/paginate';
import Pagination from '@/app/components/Pagination';
import Date from '@/app/components/date';
import {
  selectIsLoggedIn,
  selectUser,
} from '@/lib/features/user/userSelectors';
import { useAppSelector } from '@/lib/hooks';
import { redirect, useRouter } from 'next/navigation';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@/app/components/modal';
import EditForm from '@/app/components/editForm';

export default function Home() {
  const isLogged = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const [article, setArticle] = useState({});
  const { push } = useRouter();
  const { setPage, data, currentPage, pageCount, UpdateData } = useDataPaginate(
    9,
    '-published',
    ''
  );

  useLayoutEffect(() => {
    if (!isLogged) {
      redirect('/');
    }
  }, []);

  async function onDelete(row) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${row.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token,
          },
        }
      );

      if (!response.ok) {
        let result = await response.json();
        console.log(result);
      } else {
        UpdateData();
      }
    } catch (error) {
      throw new Error('Error deleting article: ' + error.message);
    }
  }

  async function onEdit(row) {
    push('?edit=true');
    setArticle(row);
  }

  return (
    <div className='container mx-auto flex flex-col items-center p-4'>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Summary</TableCell>
              <TableCell>Published time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow key={0}>
                <TableCell>-</TableCell>
                <TableCell>
                  <div className='w-128 h-128'>No data</div>
                </TableCell>
                <TableCell>No data</TableCell>
                <TableCell>No data</TableCell>
                <TableCell>No data</TableCell>
                <TableCell>----</TableCell>
              </TableRow>
            ) : (
              <>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>
                      <div className='w-128 h-128'>
                        <img src={row.image_href} alt='Article' />
                      </div>
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.summary}</TableCell>
                    <TableCell>
                      <Date dateString={row.published} />
                    </TableCell>
                    <TableCell>
                      <div className='flex gap-2'>
                        <IconButton
                          onClick={() => onEdit(row)}
                          aria-label='edit'
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          onClick={() => onDelete(row)}
                          aria-label='delete'
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length === 0 ? (
        <></>
      ) : (
        <Pagination
          totalPages={pageCount}
          currentPage={currentPage}
          onChange={(e, value) => {
            setPage(value);
          }}
        />
      )}
      <Suspense>
        <Modal
          modal_name='Edit Panel'
          path='edit'
          form={<EditForm article={article} updateData={UpdateData} />}
        />
      </Suspense>
    </div>
  );
}
