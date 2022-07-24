/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import { Chip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from '@tanstack/react-query';

function Tags(tags) {
	const tagsObj = JSON.parse(tags);
	return tagsObj.map((tag, index) => <Chip style={{margin: "0px 3px 3px 0px"}} key={index} label={tag} />);
}

export default function Comments({flightId}) {
	const { isLoading, error, data } = useQuery([`flightData${flightId}`], () =>
		fetch(`http://localhost:3001/flight/${flightId}/comments`).then(res =>
			res.json()
		)
  	);

  if (isLoading) return 'Loading...';

  if (error) return `An error has occurred: ${  error.message}`;

	return (
		<>
		{data.length > 0 &&
			<TableContainer component={Paper}>
				<Table sx={{  }} aria-label="simple table">
					<TableHead>
					<TableRow>
						<TableCell>Comment Id</TableCell>
						<TableCell>Comment</TableCell>
						<TableCell>User</TableCell>
						<TableCell>Tags</TableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{data.map((comment) => (
						<TableRow
						key={comment.id}
						sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
						<TableCell component="th" scope="row">
							{comment.id}
						</TableCell>
						<TableCell>{comment.comment}</TableCell>
						<TableCell>{comment.user.fullname}</TableCell>
						<TableCell>
							{Tags(comment.tags)}
						</TableCell>
						</TableRow>
					))}
					</TableBody>
				</Table>
			</TableContainer>
		}

		{data.length === 0 && <span>No comments found!</span>}
		</>
	);
}