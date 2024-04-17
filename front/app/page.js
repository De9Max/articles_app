'use client';

import { Typography } from '@mui/material';
import { useState } from 'react';
import SearchBar from '@/app/components/search';
import { useDataPaginate } from '@/lib/paginate';
import Pagination from '@/app/components/Pagination';
import SortingDropdown from '@/app/components/sortingDropdown';
import ArticleCard from '@/app/components/articleCard';

export default function Home() {
  const [sortType, setSortType] = useState('-published');
  const [query, setQuery] = useState('');
  const { setPage, data, currentPage, pageCount } = useDataPaginate(
    9,
    sortType,
    query
  );

  return (
    <div className='container mx-auto flex flex-col items-center p-4'>
      <Typography variant='h4' gutterBottom>
        Latest Articles
      </Typography>
      <div className='flex items-center'>
        <SearchBar query={query} setQuery={setQuery} />
        <div>
          <SortingDropdown onChange={setSortType} value={sortType} />
        </div>
      </div>

      <section className='container mx-auto pt-5'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {data.length === 0 ? (
            <div>No data</div>
          ) : (
            <>
              {data.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
            </>
          )}
        </div>
      </section>
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
    </div>
  );
}
