/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import { TextareaAutosize, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';


import UsersSelect from './UsersSelect';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '100%',
	maxWidth: '600px',
	bgcolor: 'background.paper',
	border: 'none',
	boxShadow: 24,
	p: 4,
  };

export default function AddCommentModal({flightId, showForm, handleClose}) {
	const mutation = useMutation(newComment => axios.post('http://localhost:3001/comment', newComment));
	const queryClient = useQueryClient();
	  
	const [message, setMessage] = useState("");
	const [user, setUser] = useState(0);
	const [tags, setTags] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		const tagsArray = tags.split(",");
		const tagsArrayTrimmed = tagsArray.map(tag => tag.trim());
		// console.log(tagsArrayTrimmed);
		try {
			await mutation.mutateAsync({ flightId, comment: message, userId: user, tags: JSON.stringify(tagsArrayTrimmed) });
			queryClient.invalidateQueries([`flightData${flightId}`]);
		} catch (error) {
			console.error(error);
		} finally {
			console.log('done');
		}
		setSubmitting(false);
		setMessage("");
		setUser(0);
		setTags("");
		handleClose();
	};

	return (
		<Modal
		open={showForm}
		onClose={handleClose}
		aria-labelledby="modal-modal-title"
		aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<form onSubmit={handleSubmit}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Add Comment
					</Typography>
					<TextareaAutosize
					aria-label="Comment"
					placeholder="Comment"
					defaultValue={message}
					style={{ width: '100%', height: '80px', padding: '10px', margin: '20px 0px' }}
					onChange={e => setMessage(e.target.value)}
					/>
					<UsersSelect user={user} setUser={setUser} />
					<TextareaAutosize
					aria-label="Tags"
					placeholder="Tags (separated by commas)"
					style={{ width: '100%', height: '80px', padding: '10px', margin: '20px 0px' }}
					onChange={e => setTags(e.target.value)}
					defaultValue={tags}
					/>
					<Button type="submit" disabled={submitting || message === "" || user === 0} variant="contained">Add</Button>
					<Button style={{marginLeft: "5px"}} onClick={handleClose} variant="outlined">Close</Button>
				</form>
			</Box>
		</Modal>
	);
}