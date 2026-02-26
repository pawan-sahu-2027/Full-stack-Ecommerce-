import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import {Link} from 'react-router-dom'
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();

  const [showPassword , setshowPassword] = useState(false)
  const [loading , setLoading] = useState(false)
  const [formData , setFormData] = useState({
      firstName:"",
      lastName:"",
      email:"",
      password:""
  }
)

const handleChange = (e) => {
    const {name , value} = e.target;
    setFormData((prev) =>({
      ...prev,
      [name]:value
    }))
}
const submitHandler = async (e) =>{
   e.preventDefault()
  //  console.log(formData)
   try {
    setLoading(true) 
      const res = await axios.post(`http://localhost:8000/api/v1/user/register` , formData , {
        headers:{
          "content-type":"application/json"
        }
      })
      if (res.data.success){
        toast.success(res.data.message)
         navigate('/verify')
         
      }
   }
   catch(error){
      console.log(error);
      toast.error(error.response.data.message)
   }
   finally{
    setLoading (false);
   }
}
  return(
    <div className="flex justify-center items-center min-h-screen bg-pink-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your  account</CardTitle>
          <CardDescription>
            Enter given details to create your account 
            </CardDescription>
          
        </CardHeader>
        <form onSubmit={submitHandler}>
        <CardContent>
          
            <div className="flex flex-col gap-3">
              <div className="grid gap-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor='firstName'>First Name</Label>
                  <Input id="firstName" 
                   name="firstName"
                   placeholder="First Name"
                   required
                   value ={formData.firstName}
                   onChange={handleChange}
                  />
                </div>
                 <div className="grid gap-2">
                  <Label htmlFor='lastName'>Last Name</Label>
                  <Input id="lastName" 
                   name="lastName"
                   placeholder="Last Name"
                   value={formData.lastName}
                   onChange={handleChange}
                   required
                  />
                </div>
                </div>
                  <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                </div>
              
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  
                </div>

                <div className="relative">

                <Input 
                id="password"
                name='password'
                placeholder='Create a password'
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                  required />
                  {
                    showPassword ?<EyeOff onClick={() =>setshowPassword(false) } className="w-5 h-5 text-gray-700 absolute right-5 bottom-2"/> : 
                    <Eye onClick={() => setshowPassword(true)} className="w-5 h-5 text-gray-700 absolute right-5 bottom-2"/> 
                  }

                </div>
              </div>
            </div>
          
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button  type="submit" className="w-full cursor-pointer bg-pink-600 hover:bg-pink-500">
            {loading ? <><Loader2 className="h-4 w-4animate-spin mr-2"></Loader2>Loading ... please Wait</>: "Signup"}
          </Button>
          <p>Already have a acount ? 
            <Link to='/login'
             className="hover:underline cursor-pointer text-pink-800"
             >
              Login
              </Link>
              </p>
        </CardFooter>
        </form>
        
      </Card>
    </div>
  );
};

export default Signup;