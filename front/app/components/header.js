'use client';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '@/lib/features/user/userSelectors';

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { logoutUser } from '@/lib/features/user/userActions';

export default function Header() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  return (
    <AppBar position='static'>
      <Toolbar className='justify-between'>
        <Link href='/'>
          <Typography variant='h6'>Articles Site</Typography>
        </Link>
        <div>
          {!isLoggedIn ? (
            <>
              <Link href='?login=true'>
                <Button color='inherit'>Login</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href='/admin'>
                <Button color='inherit'>Admin Panel</Button>
              </Link>
              <Button
                color='inherit'
                onClick={async () => {
                  await dispatch(logoutUser());
                }}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
