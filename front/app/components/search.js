'use client'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton } from '@mui/material'

const SearchBar = ({ query, setQuery }) => {
  const [search, setSearch] = useState('')
  const handleSearch = (e) => {
    e.preventDefault()
    setQuery(search)
  }

  return (
    <form>
      <TextField
        id="search-bar"
        className="text outline-0"
        onInput={(e) => {
          setSearch(e.target.value)
        }}
        label="Search"
        variant="outlined"
        placeholder="Search..."
        size="small"
        defaultValue={query}
      />
      <IconButton type="submit" aria-label="search" onClick={handleSearch}>
        <SearchIcon style={{ fill: 'blue' }} />
      </IconButton>
    </form>
  )
}

export default SearchBar
