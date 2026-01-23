


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

interface UserData {
  id?: number;
  first_name: string;
  middle_name?: string;
  last_name?: string;
  username: string;
  password?: string;
  admin: boolean;
  prof_pic_id?: number;
  companyId?: number;
}


const UserPage = () => {
    const { id } = useParams();
    const [image, setImage] = useState<File | null>(null)
    const [existingImage, setExistingImage] = useState<any>(null)
    const [user, setUser] = useState<UserData>({
      first_name: "",
      middle_name: "",
      last_name: "",
      username: "",
      admin: false,
    });
    const nav = useNavigate();
    const url = import.meta.env.VITE_SERVER_URL;

    useEffect(()=>{
        const getUserData = async() => {
            if (!id || !url) {
                console.log("Missing id or url");
                return;
            }
            try {
                const res = await axios.get(`${url}/api/user/${id}`);
                const userData = res.data.data;
                
                setUser(userData);
        
                
                if (userData.prof_pic_id) {
                    const pfp = await axios.get(`${url}/api/image/${userData.prof_pic_id}`)
                    setExistingImage(pfp.data.data.imgpath);
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        }
        getUserData();
    }, [id, url])

    const handleUserChange = (e: any) => {
      const { name, value, type, checked } = e.target;
      setUser(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };



    const updateUser = async () => {
      try {
        const res = await axios.put(`${url}/api/user/${user.id}`, user);
        // alert("User updated!");
        setUser(res.data);
        
        nav(`/hires/hire/${id}`)
        console.log("GOT HERE")
      } catch (err) {
        console.error(err);
        alert("Error updating user");
      }

    };

    return (
      <div className="min-h-screen from-gray-900 via-gray-800 to-black py-8 px-4">
        <div className="flex flex-col items-center justify-center">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Employee Profile</h1>
            <p className="text-gray-400">Manage user and hire information</p>
          </div>

          {/* Profile Picture Section */}
          <div className="bg-gray-800 rounded-lg max-w-2xl shadow-lg p-8 mb-8 border border-gray-700">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              {/* Picture Display */}
              <div className="flex flex-col items-center justify-center">
                {existingImage ? (
                  <div className="text-center">
                    <img 
                      src={`${url}${existingImage}`} 
                      alt="Profile" 
                      className="w-48 h-48 rounded-full object-cover border-4 border-indigo-500 shadow-md"
                    />
                    <p className="text-gray-400 mt-2 text-sm">Current Profile Picture</p>
                  </div>
                ) : (
                  <div className="w-48 h-48 rounded-full bg-gray-700 border-4 border-gray-600 flex items-center justify-center">
                    <span className="text-gray-500">No Photo</span>
                  </div>
                )}
              </div>

              {/* Upload Section */}
              <div className="flex flex-col justify-center flex-1">
                <h2 className="text-2xl font-semibold text-white mb-4">Profile Picture</h2>
                <label className="block mb-4">
                  <span className="sr-only">Choose profile photo</span>
                  <input 
                    type="file" 
                    accept="image/jpg, image/jpeg, image/png" 
                    onChange={(e)=> {setImage(e.target.files? e.target.files[0]? e.target.files[0]: null :null)}}
                    className="block w-full text-sm text-gray-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-600 file:text-white
                      hover:file:bg-indigo-700
                      cursor-pointer"
                  />
                </label>
                {image && (
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Preview:</p>
                    <img 
                      src={URL.createObjectURL(image)} 
                      alt="New Profile Preview" 
                      className="w-32 h-32 rounded-lg object-cover border-2 border-indigo-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="max-w-2xl w-full">
            {/* User Information */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-indigo-500 rounded mr-3"></div>
                <h2 className="text-2xl font-bold text-white">User Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                  <input 
                    type="text" 
                    name="first_name" 
                    value={user.first_name || ""} 
                    onChange={handleUserChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Middle Name</label>
                  <input 
                    type="text" 
                    name="middle_name" 
                    value={user.middle_name || ""} 
                    onChange={handleUserChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    name="last_name" 
                    value={user.last_name || ""} 
                    onChange={handleUserChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                  <input 
                    type="text" 
                    name="username" 
                    value={user.username || ""} 
                    onChange={handleUserChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition placeholder-gray-500"
                  />
                </div>

                <div className="flex items-center pt-2">
                  <input 
                    type="checkbox" 
                    id="admin"
                    name="admin" 
                    checked={user.admin || false} 
                    onChange={handleUserChange}
                    className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="admin" className="ml-2 text-sm font-medium text-gray-300 cursor-pointer">Admin User</label>
                </div>

                <button 
                  onClick={updateUser} 
                  className="w-full mt-6 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200 shadow-md"
                >
                  Update User Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default UserPage;

