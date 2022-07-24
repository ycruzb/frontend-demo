import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header>
			<Link to="/">
				<h1>FlightsDemo App</h1>
			</Link>
		</header>
	);
}