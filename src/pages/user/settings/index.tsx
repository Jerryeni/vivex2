import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { DashboardSidebar } from '../../../components/user/dashboard/sidebar';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

export function Settings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar />

          <div className="flex-1">
            <div className="bg-transparent rounded-lg shadow-sm">
              {/* <div className="p-6 border-b">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Link to="/" className="hover:text-gray-700">Home</Link>
                  <span>/</span>
                  <Link to="/dashboard" className="hover:text-gray-700">User Account</Link>
                  <span>/</span>
                  <span className="text-gray-900">Settings</span>
                </div>
              </div> */}

              <div className="p-6x">
                {/* Account Settings */}
                <div className="mb-12 border rounded p-5">
                  <h2 className="font-semibold mb-6">ACCOUNT SETTING</h2>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-32">
                      <img
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400"
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex-col">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Display name
                          </label>
                          <Input defaultValue="Kevin" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                          </label>
                          <Input defaultValue="Display name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <Input defaultValue="Kevin Gilbert" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <Input defaultValue="Kevin.gilbert@gmail.com" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Secondary Email
                          </label>
                          <Input defaultValue="kevin12345@gmail.com" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <Input defaultValue="+1-202-555-0118" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Country/Region
                          </label>
                          <select className="w-full h-10 rounded-md border-gray-300">
                            <option>Bangladesh</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Status
                            </label>
                            <select className="w-full h-10 rounded-md border-gray-300">
                              <option>Dhaka</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Zip Code
                            </label>
                            <Input defaultValue="1207" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button>SAVE CHANGES</Button>
                      </div>
                    </div>

                  </div>

                </div>

                <div className="flex gap-4 items-center justify-start">
                  {/* Billing Address */}

                  <div className="mb-12 border rounded ">
                    <h2 className="font-semibold mb-6 border-b p-5">BILLING ADDRESS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <Input defaultValue="Kevin" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <Input defaultValue="Gilbert" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name (Optional)
                        </label>
                        <Input />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <Input defaultValue="Road No. 03, House no. 1203/C, Plot No. 50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select className="w-full h-10 rounded-md border-gray-300">
                          <option>Bangladesh</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Region/State
                        </label>
                        <select className="w-full h-10 rounded-md border-gray-300">
                          <option>Dhaka</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <select className="w-full h-10 rounded-md border-gray-300">
                          <option>Dhaka</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Zip Code
                        </label>
                        <Input defaultValue="1207" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <Input defaultValue="kevin@gmail.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input defaultValue="+1-202-555-0118" />
                      </div>
                    </div>
                    <div className="mt-6 p-5">
                      <Button>SAVE CHANGES</Button>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-12 border rounded">
                    <h2 className="font-semibold mb-6 border-b p-5">SHIPPING ADDRESS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <Input defaultValue="Kevin" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <Input defaultValue="Gilbert" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name (Optional)
                        </label>
                        <Input />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <Input defaultValue="Road No. 03, House no. 1203/C, Plot No. 50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select className="w-full h-10 rounded-md border-gray-300">
                          <option>Bangladesh</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Region/State
                        </label>
                        <select className="w-full h-10 rounded-md border-gray-300">
                          <option>Dhaka</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <select className="w-full h-10 rounded-md border-gray-300">
                          <option>Dhaka</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Zip Code
                        </label>
                        <Input defaultValue="1207" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <Input defaultValue="kevin@gmail.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input defaultValue="+1-202-555-0118" />
                      </div>
                    </div>
                    <div className="mt-6 p-5">
                      <Button>SAVE CHANGES</Button>
                    </div>
                  </div>
                </div>


                {/* Change Password */}
                <div>
                  <h2 className="font-semibold mb-6">CHANGE PASSWORD</h2>
                  <div className="max-w-md space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showCurrentPassword ? 'text' : 'password'}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? 'text' : 'password'}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Button>CHANGE PASSWORD</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}