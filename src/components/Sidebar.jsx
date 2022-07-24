import { useQuery } from '@tanstack/react-query';
import { NavLink } from "react-router-dom";

export default function Sidebar() {
	const { isLoading, error, data } = useQuery(['flightsData'], () =>
    fetch('http://localhost:3001/flights').then(res =>
      res.json()
    )
  );

  if (isLoading) return 'Loading...';

  if (error) return `An error has occurred: ${  error.message}`;
  
	return (
		<div className="sidebar">
			<p className="flights-h">Flights</p>
			<ul className="flight-list">
				{data.map(flight => <li key={flight.id}>
					<NavLink className={({ isActive }) => isActive ? 'active' : ''} to={`/flight/${flight.id}`}>{flight.name}</NavLink>
				</li>)}
			</ul>
		</div>
	);
}