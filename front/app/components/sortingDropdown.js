import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortingDropdown = ({ value, onChange }) => {
  const handleSortChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className='ml-4 w-full'>
      <FormControl variant='outlined' size='small'>
        <InputLabel id='sorting-label'>Sort By</InputLabel>
        <Select
          labelId='sorting-label'
          id='sorting'
          value={value}
          onChange={handleSortChange}
        >
          <MenuItem value={'-published'}>Desc. Date</MenuItem>
          <MenuItem value={'published'}>Asc. Date</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SortingDropdown;
