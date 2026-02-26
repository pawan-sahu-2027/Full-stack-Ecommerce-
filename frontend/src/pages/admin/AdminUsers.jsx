import { Search } from "lucide-react";
import React from "react";
// import { setUser } from "@/redux/userSlice";
import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Edit, Eye } from "lucide-react";
// import { Button } from "components/ui/button";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [serachTerm , setSearchTerm] = useState("");
  const navigate = useNavigate();
  const getAllUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/all-user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterUsers = users.filter((user) => 
     `${user.firstName} ${user.lastName}`.toLowerCase().includes(serachTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(serachTerm.toLowerCase())
  );  

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="pl-[350px] py-20 pr-20 mx-auto px-4 ">
      <h1 className="font-bold text-2xl ">User Management</h1>
      <p>View and manage registered users</p>
      <div className="flex relative w-[360px] mt-6 ">
        <Search className="absolute left-2 top-1 text-gray-600 w-5"></Search>
        <Input value={serachTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search users..." className="pl-10" />
      </div>
      <div className="grid grid-cols-3 gap-7 mt-7">
        {filterUsers.map((user, index) => (
          <div key={index} className="bg-pink-100 p-5 rounded-lg">
            {user.name}
            <div className="flex item-center gap-2">
              <img src={user.profilePic} alt="Profile"   className="w-16 h-16 rounded-full object-cover border-2 border-pink-600 "/>  
              <div> 
                <h1 className="font-semibold">{user.firstName} {user.lastName}</h1>
                <h3>{user?.email}</h3>
                
                <div className="flex gap-3 mt-3">
                  <Button onClick={() => navigate(`/dashboard/user/${user._id}`)} variant="outline"><Edit/>Edit</Button>
                  <Button  onClick={() => navigate(`/dashboard/users/orders/${user._id}`)}><Eye/>Show Order</Button>
                </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminUsers;
