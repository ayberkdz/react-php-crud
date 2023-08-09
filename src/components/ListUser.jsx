import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ListUser() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = () => {
		axios
			.get('http://localhost:8888/react-api/react-and-php/')
			.then((res) => {
				// console.log(res.data);
				setUsers(res.data);
			});
	};

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8888/react-api/react-and-php/${id}`).then(() => {
      getUsers();
    })
  }

	return (
		<>
			<h1>List user</h1>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Mobile</th>
						<th>Action</th>
					</tr>
				</thead>
        <tbody>
          { Array.isArray(users) && users.map((user, index) =>
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>
                <Link to={`user/edit/${user.id}`} style={{marginRight: '10px'}}>Edit</Link>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ) }
        </tbody>
			</table>
		</>
	);
}

export default ListUser;
