import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography,  TextField, Box
} from "@mui/material";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null); // Store token in state

  const inputRef = useRef(null);

  // ✅ Focus input when form is shown
  useEffect(() => {
    if (showForm && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showForm]);


   // ✅ Fetch token once (on mount)
   useEffect(() => {
    const fetchedToken = localStorage.getItem("token");
    //  console.log("Fetched Token: ", fetchedToken); // log token to see if it's fetched correctly
     setToken(fetchedToken);
  }, []);


  // ✅ Fetch all users
  const fetchUsers = async () => {
    if (!token) {
      setMessage("Token not found. Please log in again.");
      return;
    }

    try {
        const res = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
      if (err.response && err.response.status === 401) {
       // console.error("Unauthorized access. Token might be missing or invalid.");
       localStorage.removeItem("token");
       setMessage("Session expired. Please log in again.");
       window.location.href = "/login";  // Redirect to login page
      }
    }
  };

 
  // Trigger fetchUsers when token is set
  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);  // Run fetchUsers when token is set

  // ✅ Promote user to admin
  const handlePromote = async (mobile) => {
    if (!mobile || !token) return;

    setLoading(true);
    setMessage("");
    try {
     
      await axios.put("http://localhost:5000/api/users/promote", { mobile },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("User promoted to admin successfully!");
      // setUsername("");
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      console.error("Promotion failed", err);
      setMessage("Failed to promote user.");
    } finally {
      setLoading(false);
    }
  };

  // Sort users to list admins on top
  const sortedUsers = [...users].sort((a, b) => {
    if (a.role === "admin" && b.role !== "admin") return -1;
    if (b.role === "admin" && a.role !== "admin") return 1;
    return 0;
  });

  return (
    <div className="flex justify-center items-center min-h-screen p-4 ">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          {/* <Typography variant="h6">User Management</Typography> */}
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: "10px" }}
            onClick={() => setShowForm(!showForm)}
          >
            Promote user As Admin
          </Button>
        </div>

        {showForm && (
           <Box sx={{ mb: 2,  p: 2, borderRadius: 2 }}>
           <TextField
             inputRef={inputRef}
             
             label="User Mobile Number"
             variant="outlined"
             value={mobile}
             onChange={(e) => setMobile(e.target.value)}
             sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={()=>handlePromote(mobile)}
              disabled={loading}
              sx={{ margin: "10px" }}
            >
              {loading ? "Promoting..." : "Promote"}
            </Button>
            {message && (
              <Typography variant="body2" color="textSecondary" sx={{ marginTop: "10px" }}>
                {message}
              </Typography>
            )}
         </Box>
        )}

        {/* Table */}
        <div className="flex justify-center bg-red-800"> 
        <TableContainer component={Paper} sx={{ width: '70%', margin: '0 auto'  }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>USERS</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>MOBILE</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>ROLE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user) => (
                  <TableRow key={user._id} hover>
                    <TableCell>{user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}</TableCell>
                    <TableCell>{user.mobile}</TableCell>
                    {/* <TableCell>{user.role}</TableCell> */}
                    <TableCell sx={{ color: user.role === "admin" ? "red" : "inherit" }}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}
                                  </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer></div>
      </div>
    </div>
  );
};

export default UserManagement;
