


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

interface HiresData {
  id?: number;
  start_date: string;
  email: string;
  phone: string;
  title: string;
  manager_id: number;
  location_id: number;
  coordinator_id: number;
  department_id: number;
  userId?: number;
}

const HirePage = () => {
    const { id } = useParams();
    const [hire, setHire] = useState<HiresData>({
      start_date: "",
      email: "",
      phone: "",
      title: "",
      manager_id: 0,
      location_id: 0,
      coordinator_id: 0,
      department_id: 0
    });

    const url = import.meta.env.VITE_SERVER_URL;
    const nav = useNavigate();

    useEffect(()=>{
        const getHireData = async() => {
            if (!id || !url) {
                console.log("Missing id or url");
                return;
            }
            try {
                const res = await axios.get(`${url}/api/hires/${id}`);

                const hireData = res.data.data;
                
                setHire(hireData);
                
                if (hireData) {
                    setHire({
                        ...hireData,
                        start_date: hireData.start_date?.split('T')[0] || ""
                    });
                }
                console.log(hireData)
            
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        }
        getHireData();
    }, [id, url])

    const handleHireChange = (e: any) => {
      const { name, value, type, checked } = e.target;
      setHire(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : type == "number" ? Number(value) : value
      }));
    };


    const updateHire = async () => {
      try {
        const res = await axios.put(`${url}/api/hires/${hire.id}`, {...hire, id: id} );
        // alert("Hire info updated!");
        setHire(res.data);
        nav("/")
      } catch (err) {
        console.error(err);
        alert("Error updating hire");
      }
    };

    return (
      <div className="min-h-screen flex flex-col items-center from-gray-900 via-gray-800 to-black py-8 px-4">
        <div className="max-w-4xl justify-center mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Employee Profile</h1>
            <p className="text-gray-400">Manage user and hire information</p>
          </div>


          {/* Main Content Grid */}
          <div className="grid justify-center gap-8">
            {/* Hire Information */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-green-500 rounded mr-3"></div>
                <h2 className="text-2xl font-bold text-white">Hire Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                  <input 
                    type="date" 
                    name="start_date" 
                    value={hire.start_date || ""} 
                    onChange={handleHireChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={hire.email || ""} 
                    onChange={handleHireChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={hire.phone || ""} 
                    onChange={handleHireChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                  <input 
                    type="text" 
                    name="title" 
                    value={hire.title || ""} 
                    onChange={handleHireChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition placeholder-gray-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Manager ID</label>
                    <input 
                      type="number" 
                      name="manager_id" 
                      value={hire.manager_id || 0} 
                      onChange={handleHireChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Location ID</label>
                    <input 
                      type="number" 
                      name="location_id" 
                      value={hire.location_id || 0} 
                      onChange={handleHireChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition placeholder-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Coordinator ID</label>
                    <input 
                      type="number" 
                      name="coordinator_id" 
                      value={hire.coordinator_id || 0} 
                      onChange={handleHireChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Department ID</label>
                    <input 
                      type="number" 
                      name="department_id" 
                      value={hire.department_id || 0} 
                      onChange={handleHireChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition placeholder-gray-500"
                    />
                  </div>
                </div>

                <button 
                  onClick={updateHire} 
                  className="w-full mt-6 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200 shadow-md"
                >
                  Update Hire Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default HirePage;

