import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function CreateUser() {

   const [inputs, setInputs] = useState({})

   const navigate = useNavigate()

   const handleSubmit = (e) => {
      e.preventDefault();

      axios.post('http://localhost:8888/react-api/react-and-php/', inputs).then(res => {
         console.log(res.data)
         navigate('/')

      })
      console.log(inputs);
   }

   const handleChange = (e) => {
      const name = e.target.name
      const value = e.target.value

      setInputs(values => ({ ...values, [name]: value }))
   }

	return (
		<>
			<h1>Create User</h1>
			<form onSubmit={handleSubmit}>
				<table cellSpacing='10'>
					<tbody>
						<tr>
							<th>
								<label>Name: </label>
							</th>
							<td>
								<input
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
