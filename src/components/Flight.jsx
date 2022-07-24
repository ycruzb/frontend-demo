import { Button } from '@mui/material';
import { useState } from 'react';
import { useParams } from "react-router-dom";

import AddCommentModal from './AddCommentModal';
import Comments from './Comments';

export default function Flight() {
	const params = useParams();

	const [showForm, setShowForm] = useState(false);

	const handleOpen = () => {
		setShowForm(true);
	};
	
	const handleClose = () => {
		setShowForm(false);
	};

	return (
		<div className="content">
			<div className="flight-actions-wrapper">
				<Button onClick={handleOpen} variant="contained">Add comment</Button>
			</div>
			<Comments flightId={params.flightId} />
			<AddCommentModal flightId={params.flightId} showForm={showForm} handleClose={handleClose} />
		</div>
	);
}