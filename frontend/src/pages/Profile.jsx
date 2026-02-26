
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { setUser } from "@/redux/userSlice";
// import { setUser } from "@/redux/userSlice";
import { setUser } from "@/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import userLogo from "../assets/userLogo.png";
import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
import MyOrder from "@/pages/MyOrder";

function Profile() {
  const params = useParams();
  const userId = params.userId;
  const dispatch = useDispatch();

  // 1. Ensure you are accessing the correct slice of state
  // If your slice is named 'user', it might be store.user.user
  const user = useSelector((store) => store.user?.user || store.user);

  const [updateUser, setUpdateUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    address: "",
    city: "",
    zipCode: "",
    profilePic: "",
    role: "",
  });

  const [file, setFile] = useState(null);

  // 2. Sync Redux state to local state when data is loaded
  useEffect(() => {
    if (user) {
      setUpdateUser({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNo: user.phoneNo || "",
        address: user.address || "",
        city: user.city || "",
        zipCode: user.zipCode || "",
        profilePic: user.profilePic || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedfile = e.target.files[0];
    if (selectedfile) {
      setFile(selectedfile);
      setUpdateUser({
        ...updateUser,
        profilePic: URL.createObjectURL(selectedfile),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    
    try {
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);

      if (file) {
        formData.append("file", file);
      }
            
      const res = await axios.put(
        `http://localhost:8000/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Profile updated successfully");
        dispatch(setUser(res.data.user)); // Update Redux with fresh data
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };
  const getUserDetails  = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/get-user/${userId}`);
        if (res.data.success) {
          setUpdateUser(res.data.user);
        }
      }
      catch(error){
        console.log(error);
      }
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto px-4">
        <TabsList className="mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="flex flex-col items-center">
            <h1 className="font-bold mb-7 text-2xl text-gray-500">Update Profile</h1>
            
            <div className="flex flex-col md:flex-row gap-10 justify-center items-start w-full max-w-4xl">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
                <img
                  src={updateUser.profilePic || userLogo}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-pink-400"
                />
                <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors">
                  Change Picture
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </Label>
              </div>

              {/* Form Section */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4 shadow-lg p-6 rounded-lg bg-white w-full md:w-2/3"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">First Name</Label>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={updateUser.firstName}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Last Name</Label>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={updateUser.lastName}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Email (Read Only)</Label>
                  <Input
                    type="email"
                    name="email"
                    value={updateUser.email}
                    disabled
                    className="mt-1 bg-gray-50 cursor-not-allowed text-gray-500"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Phone Number</Label>
                  <Input
                    type="text"
                    name="phoneNo"
                    placeholder="Phone Number"
                    value={updateUser.phoneNo}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Address</Label>
                  <Input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={updateUser.address}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">City</Label>
                    <Input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={updateUser.city}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Zip Code</Label>
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="Zip Code"
                      value={updateUser.zipCode}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg">
                  Update Profile
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <MyOrder />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Profile;