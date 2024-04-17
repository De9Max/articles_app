import { useCallback, useEffect, useState } from 'react'

export const useDataPaginate = (dataLimit, sortType, query) => {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const fetchData = useCallback(async () => {
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/api/articles?page=${currentPage}&size=${dataLimit}&order_by=${sortType}`
      if (query.length > 1) {
        url += `&query=${query}`
      }
      const response = await fetch(url)
      const data = await response.json()
      setData(data.items)
      setPageCount(data.pages)
    } catch (error) {
      setData([])
      console.log(error)
    }
  }, [currentPage, dataLimit, sortType, query])

  useEffect(() => {
    fetchData()
  }, [currentPage, fetchData])

  const setPage = (page) => {
    setCurrentPage(page)
  }
  const UpdateData = () => {
    fetchData()
  }

  return { setPage, data, currentPage, pageCount, UpdateData }
}
