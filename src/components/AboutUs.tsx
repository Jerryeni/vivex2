import React from 'react';

import { Check } from 'lucide-react';
import { FlashSale } from './landing_page/FlashSale';
import HeroNav from './layout/HeroNav';

const teamMembers = [
  {
    name: 'Kevin Gilbert',
    role: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
  },
  {
    name: 'Kevin Gilbert',
    role: 'Assistant of CEO',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef'
  },
  {
    name: 'Kevin Gilbert',
    role: 'Head of Designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
  },
  {
    name: 'Kevin Gilbert',
    role: 'UX Designer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
  },
  {
    name: 'Kevin Gilbert',
    role: 'Product Designer',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d'
  },
  {
    name: 'Kevin Gilbert',
    role: 'Head of Development',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef'
  },
  {
    name: 'Kevin Gilbert',
    role: 'Design Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
  },
  {
    name: 'Kevin Gilbert',
    role: 'UI Designer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
  }
];

export const AboutUs = () => {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    console.log('Subscribing email:', email);
  };
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-white relative " >
      <HeroNav />
      <div className=" bg-gray-50 py-20">
      
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-secondary-default text-white px-4 py-2 rounded text-sm mb-6">
                WHO WE ARE
              </div>
              <h1 className="text-5xl font-medium mb-6">
                Kinbo -largest electronics retail shop in the world.
              </h1>
              <p className="text-gray-600 mb-8">
                Pellentesque officies dui vel hendrerit sceleri, ipsum velit vestibulum
                risus, ac tincidunt diam lectus id magna. Praesent maximus lobortis
                neque ut amet rhoncus. Nullam tempus lectus a elit aliquot, non ultricies
                diam facilisis. Donec et orci porta sapien.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="flex">
                  <Check className="text-green-500 w-5 h-5 font-light" />
                  <Check className="text-green-500 -ml-2 w-5 h-5 font-light" />
                  </div>
                  
                  <span>Great 24/7 customer services.</span>
                </li>
                <li className="flex items-center gap-3">
                <div className="flex">
                  <Check className="text-green-500 w-5 h-5 font-light" />
                  <Check className="text-green-500 -ml-2 w-5 h-5 font-light" />
                  </div>
                  <span>600+ Dedicated employe.</span>
                </li>
                <li className="flex items-center gap-3">
                <div className="flex">
                  <Check className="text-green-500 w-5 h-5 font-light" />
                  <Check className="text-green-500 -ml-2 w-5 h-5 font-light" />
                  </div>
                  <span>50+ Branches all over the world.</span>
                </li>
                <li className="flex items-center gap-3">
                <div className="flex">
                  <Check className="text-green-500 w-5 h-5 font-light" />
                  <Check className="text-green-500 -ml-2 w-5 h-5 font-light" />
                  </div>
                  <span>Over 1 Million Electronics Products.</span>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
                alt="Team meeting"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-medium text-center mb-12">Our core team member</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white border p-6 rounded shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-gray-500 text-sm">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gray-50 py-20 bg-about bg-cover bg-center mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Your trusted and reliable retail shop
              </h2>
              <p className="text-gray-600 mb-8">
                Praesent sed semper metus. Nam sit amet dolor dolor,
                mauris, et fringilla elit gravida eget. Nunc
                consequat auctor urna a placerat.
              </p>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-full">
                <span className="sr-only">Play video</span>
                ▶
              </button>
            </div>
            
          </div>
        </div>
      </div>

      <FlashSale />

      {/* Newsletter Section */}
      <div className="bg-[#005792] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to our newsletter</h2>
          <p className="text-gray-300 mb-8 max-w-xl font-light mx-auto">
            Praesent fringilla erat a lacinia egestas. Donec vehicula tempor libero et
            cursus. Donec non quam urna. Quisque vitae porta ipsum.
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-xl mx-auto mb-12">
            <div className="flex gap-2 px-4 py-2  bg-white  overflow-hidden">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="flex-1 bg-transparent  text-gray-900"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                SUBSCRIBE
                <span>→</span>
              </button>
            </div>
          </form>

          {/* Brand Logos */}
          <div className="flex justify-center items-center gap-12 opacity-70">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
              className="h-8 w-auto"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              alt="Amazon"
              className="h-8 w-auto"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/Philips_logo_new.svg"
              alt="Philips"
              className="h-8 w-auto"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/34/Toshiba_logo.svg"
              alt="Toshiba"
              className="h-8 w-auto"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg"
              alt="Samsung"
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};