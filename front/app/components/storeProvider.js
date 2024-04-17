'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/store';
import { getUser } from '@/lib/features/user/userActions';

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  if (!storeRef.current) {
    storeRef.current = makeStore();
    if (token) {
      storeRef.current.dispatch(getUser(token));
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
