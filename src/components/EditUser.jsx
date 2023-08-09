import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
	const [inputs, setInputs] = useState({});

	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:8888/react-api/react-and-php/${id}`)
			.then((res) => {
				setInputs(...res.data);
			})
			.catch((e) => console.log('error mesajı', e));
	}, [id]);

	// Güncelleme
	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.put(`http://localhost:8888/react-api/react-and-php/${id}`, inputs)
			.then((res) => {
        console.log(res.data);
				navigate('/');
			});
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setInputs((values) => ({ ...values, [name]: value }));
	};

	return (
		<>
			<h1>Edit User</h1>
			<form onSubmit={handleSubmit}>
				<table cellSpacing="10">
					<tbody>
						<tr>
							<th>
								<label>Name: </label>
							</th>
							<td>
								<input
									value={inputs.name || ''}
									type="text"
									name="name"
									onChange={handleChange}
								/>
							</td>
						</tr>
						<tr>
							<th>
								<label>Email: </label>
							</th>
							<td>
								<input
									type="text"
									name="email"
									onChange={handleChange}
									value={inputs.email  || ''}
								/>
							</td>
						</tr>
						<tr>
							<th>
								<label>Mobile: </label>
							</th>
							<td>
								<input
									type="text"
									name="mobile"
									onChange={handleChange}
									value={inputs.mobile || ''}
								/>
							</td>
						</tr>
						<tr>
							<th></th>
							<td>
								<button type="submit">Save</button>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</>
	);
}
