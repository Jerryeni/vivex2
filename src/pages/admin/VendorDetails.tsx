// Update the VendorDetails component to include edit functionality
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Facebook, Instagram, Twitter, Globe, Mail, ChevronRight, Edit, Save, X } from 'lucide-react';

interface VendorDetails {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  reviews: number;
  story: string;
  mission: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  stats: {
    itemStock: number;
    sales: number;
    happyClients: number;
    followers: number;
  };
  revenue: {
    current: number;
    growth: number;
    history: {
      month: string;
      value: number;
    }[];
  };
}

export const VendorDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [vendorData, setVendorData] = useState<VendorDetails>({
    id: '1',
    name: 'ZARA International',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1280px-Zara_Logo.svg.png',
    tagline: 'Most Selling Fashion Brand',
    website: 'www.zarafashion.co',
    email: 'zarafashionworld@zara.com',
    phone: '+243 812-481-9335',
    address: '4654 , PHB Lane Kneza #4 47404',
    rating: 4.5,
    reviews: 3.5,
    story: 'At ZARA, we believe that fashion is more than just clothing—it\'s an expression of individuality and a celebration of diversity. Founded in 2003, our journey began with a simple yet powerful vision: to create high-quality, stylish, and comfortable apparel that resonates with people from all walks of life.',
    mission: 'Our mission is to redefine fashion by merging timeless elegance with contemporary design. We strive to offer clothing that not only looks good but also feels good, making everyday wear an enjoyable experience. At the heart of our brand is a commitment to quality, sustainability, and customer satisfaction.',
    socialMedia: {
      facebook: 'facebook.com/zara',
      instagram: 'instagram.com/zara',
      twitter: 'twitter.com/zara'
    },
    stats: {
      itemStock: 865,
      sales: 4.5,
      happyClients: 2,
      followers: 50
    },
    revenue: {
      current: 5563786,
      growth: 2.45,
      history: [
        { month: 'Jan', value: 4500000 },
        { month: 'Feb', value: 4800000 },
        // ... other months
      ]
    }
  });

  const [editedData, setEditedData] = useState(vendorData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(vendorData);
  };

  const handleSave = () => {
    setVendorData(editedData);
    setIsEditing(false);
    // Here you would typically make an API call to update the vendor data
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(vendorData);
  };

  const handleChange = (field: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar remains the same */}
      
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-6">
                <img
                  src={editedData.logo}
                  alt={editedData.name}
                  className="w-32 h-32 object-contain bg-gray-50 rounded-lg p-4"
                />
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editedData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      <input
                        type="text"
                        value={editedData.tagline}
                        onChange={(e) => handleChange('tagline', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      <input
                        type="text"
                        value={editedData.website}
                        onChange={(e) => handleChange('website', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      <div className="flex gap-4">
                        <input
                          type="text"
                          value={editedData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="flex-1 px-3 py-2 border rounded-md"
                        />
                        <input
                          type="text"
                          value={editedData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className="flex-1 px-3 py-2 border rounded-md"
                        />
                      </div>
                      <input
                        type="text"
                        value={editedData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-4 mb-2">
                        <h2 className="text-xl font-semibold">{vendorData.name}</h2>
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="ml-1">{vendorData.rating}</span>
                          <span className="text-sm text-gray-500 ml-1">
                            (of {vendorData.reviews}k Reviews)
                          </span>
                        </div>
                      </div>
                      <p className="text-blue-600 hover:underline mb-4">
                        {vendorData.website}
                      </p>
                      <div className="text-gray-600 space-y-1">
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {vendorData.email}
                        </p>
                        <p>{vendorData.phone}</p>
                        <p>{vendorData.address}</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        <Save className="h-4 w-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium mb-4">Social Media:</h3>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <input
                      type="text"
                      value={editedData.socialMedia.facebook}
                      onChange={(e) => setEditedData(prev => ({
                        ...prev,
                        socialMedia: {
                          ...prev.socialMedia,
                          facebook: e.target.value
                        }
                      }))}
                      className="flex-1 px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <input
                      type="text"
                      value={editedData.socialMedia.instagram}
                      onChange={(e) => setEditedData(prev => ({
                        ...prev,
                        socialMedia: {
                          ...prev.socialMedia,
                          instagram: e.target.value
                        }
                      }))}
                      className="flex-1 px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Twitter className="h-5 w-5 text-blue-400" />
                    <input
                      type="text"
                      value={editedData.socialMedia.twitter}
                      onChange={(e) => setEditedData(prev => ({
                        ...prev,
                        socialMedia: {
                          ...prev.socialMedia,
                          twitter: e.target.value
                        }
                      }))}
                      className="flex-1 px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <a href={vendorData.socialMedia.facebook} className="text-blue-600">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href={vendorData.socialMedia.instagram} className="text-pink-600">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href={vendorData.socialMedia.twitter} className="text-blue-400">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href={vendorData.website} className="text-gray-600">
                    <Globe className="h-5 w-5" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Story & Mission */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Our Story:</h3>
                {isEditing ? (
                  <textarea
                    value={editedData.story}
                    onChange={(e) => handleChange('story', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                ) : (
                  <p className="text-gray-600">{vendorData.story}</p>
                )}
              </div>
              <div>
                <h3 className="font-medium mb-2">Our Mission:</h3>
                {isEditing ? (
                  <textarea
                    value={editedData.mission}
                    onChange={(e) => handleChange('mission', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                ) : (
                  <p className="text-gray-600">{vendorData.mission}</p>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-xl font-semibold">{vendorData.stats.itemStock}</div>
              <div className="text-sm text-gray-500">Item Stock</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-xl font-semibold text-green-500">
                +{vendorData.stats.sales}k
              </div>
              <div className="text-sm text-gray-500">Sells</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-xl font-semibold text-blue-500">
                +{vendorData.stats.happyClients}k
              </div>
              <div className="text-sm text-gray-500">Happy Client</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-xl font-semibold">
                +{vendorData.stats.followers}k
              </div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold">
                  ${(vendorData.revenue.current / 1000000).toFixed(3)}M
                </h3>
                <p className="text-sm text-green-500">
                  +{vendorData.revenue.growth}% This Month!
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-sm text-gray-500">Revenue</span>
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-500">Growth</span>
              </div>
            </div>
            {/* Add Chart Component Here */}
          </div>
        </div>
      </main>
    </div>
  );
};