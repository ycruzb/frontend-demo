/* eslint-disable react/prop-types */
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useQuery } from '@tanstack/react-query';

export default function UsersSelect({user, setUser}) {
	const { isLoading, error, data } = useQuery([`userData`], () =>
		fetch(`http://localhost:3001/users`).then(res =>
			res.json()
		)
  	);

	const handleChange = (event) => {
		setUser(event.target.value);
	};

	if (isLoading) return 'Loading...';

	if (error) return `An error has occurred: ${  error.message}`;

	return (
		<FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="User"
          onChange={handleChange}
		  defaultValue={user}
        >
			{data.map((userD) => <MenuItem value={userD.id}>{userD.fullname}</MenuItem>)}
        </Select>
      </FormControl>
	);
}