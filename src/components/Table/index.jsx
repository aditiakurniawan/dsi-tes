import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";

const TableRows = ({ users }) => {
  return users.map((user, index) => {
    return (
      <>
        <tr
          style={{
            backgroundColor: index % 2 === 0 ? "#212126" : "#28282e",
          }}
        >
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.address.street}</td>
          <td>{user.phone}</td>
        </tr>
      </>
    );
  });
};

export default function Table() {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState(false);
  const [sortBy, setSortBy] = useState("id");
  const [defaultIcon, setDefaultIcon] = useState(true);

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchusers();
  }, []);

  const handleSort = (prop) => {
    const copiedUsers = [...users];

    copiedUsers.sort((a, b) => {
      if (a[prop] > b[prop]) return sortOrder ? 1 : -1;

      if (a[prop] < b[prop]) return sortOrder ? -1 : -1;

      return 0;
    });

    setUsers(copiedUsers);
    setSortBy(prop);
    setSortOrder((prev) => !prev);
    setDefaultIcon(false);
  };

  const handleIcon = () =>
    sortOrder === true ? (
      <FontAwesomeIcon icon={faSortDown} />
    ) : (
      <FontAwesomeIcon icon={faSortUp} />
    );

  const handleIconForName = () => {
    if (sortBy === "name") return handleIcon();
  };

  const handleIconForEmail = () => {
    if (sortBy === "email") return handleIcon();
  };

  const handleIconForAddress = () => {
    if (sortBy === "address") return handleIcon();
  };

  const handleIconForPhone = () => {
    if (sortBy === "phone") return handleIcon();
  };

  return (
    <>
      <h1>Data Table User</h1>
      <table>
        <tr>
          <th>No</th>
          <th onClick={() => handleSort("name")}>
            Name
            {defaultIcon === false ? (
              handleIconForName()
            ) : (
              <FontAwesomeIcon icon={faSort} />
            )}
          </th>
          <th onClick={() => handleSort("email")}>
            Email
            {defaultIcon === false ? (
              handleIconForEmail()
            ) : (
              <FontAwesomeIcon icon={faSort} />
            )}
          </th>
          <th onClick={() => handleSort("address")}>
            Address
            {defaultIcon === false ? (
              handleIconForAddress()
            ) : (
              <FontAwesomeIcon icon={faSort} />
            )}
          </th>
          <th onClick={() => handleSort("phone")}>
            Phone
            {defaultIcon === false ? (
              handleIconForPhone()
            ) : (
              <FontAwesomeIcon icon={faSort} />
            )}
          </th>
        </tr>
        <TableRows users={users} />
      </table>
    </>
  );
}
