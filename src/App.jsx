import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Flight from './components/Flight';
import Header from "./components/Header";
import Home from './components/Home';
import Sidebar from "./components/Sidebar";

const queryClient = new QueryClient();

function App() {
  return (
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<div className="app">
				<Header />
				<main>
					<Sidebar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/flight/:flightId" element={<Flight />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	</QueryClientProvider>
  );
}

export default App;
