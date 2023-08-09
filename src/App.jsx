import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ListUser from './components/ListUser';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
function App() {
	return (
		<div className="App">
			<h1>React CRUD operations using PHP API and MySQL</h1>

			<BrowserRouter>
				<nav>
					<ul>
						<li>
							<Link to="/">List Users</Link>
						</li>
						<li>
							<Link to="user/create">Create User</Link>
						</li>
					</ul>
				</nav>
				<Routes>
					<Route
						index
						element={<ListUser />}></Route>
					<Route
						path="user/create"
						element={<CreateUser />}></Route>
					<Route
						path="user/edit/:id"
						element={<EditUser />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
