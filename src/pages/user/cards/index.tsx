import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Delete, Edit, X } from 'lucide-react';
import { DashboardSidebar } from '../../../components/user/dashboard/sidebar';
import { Button } from '../../../components/ui/button';
import { formatCurrency } from '../../../lib/utils';
import { Input } from '../../../components/ui/input';


interface Card {
  id: string;
  type: 'visa' | 'mastercard';
  number: string;
  holder: string;
  balance: number;
  expiry: string;
  cvv: string;
}

interface Address {
  id: string;
  type: 'BILLING ADDRESS' | 'SHIPPING ADDRESS';
  name: string;
  address: string;
  phone: string;
  email: string;
}

const cards: Card[] = [
  {
    id: '1',
    type: 'visa',
    number: '•••• •••• •••• 3814',
    holder: 'Kevin Gilbert',
    balance: 95400.00,
    expiry: '12/24',
    cvv: '***',
  },
  {
    id: '2',
    type: 'mastercard',
    number: '•••• •••• •••• 1761',
    holder: 'Kevin Gilbert',
    balance: 87583.00,
    expiry: '09/25',
    cvv: '***',
  },
];

const addresses: Address[] = [
  {
    id: '1',
    type: 'BILLING ADDRESS',
    name: 'Kevin Gilbert',
    address: 'East Town East Word No 54, Road No. 03, Sector DOHS, Plot No. 50, Dhaka-1205, Bangladesh',
    phone: '+1-202-555-0104',
    email: 'kevin.g@gmail.com',
  },
  {
    id: '2',
    type: 'SHIPPING ADDRESS',
    name: 'Kevin Gilbert',
    address: 'East Town East Word No 54, Road No. 03, Sector DOHS, Plot No. 50, Dhaka-1205, Bangladesh',
    phone: '+1-202-555-0104',
    email: 'kevin.g@gmail.com',
  },
];

export function Cards() {
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle card addition logic
    setShowAddCard(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Link to="/" className="hover:text-gray-700">Home</Link>
                  <span>/</span>
                  <Link to="/dashboard" className="hover:text-gray-700">User Account</Link>
                  <span>/</span>
                  <span className="text-gray-900">Cards & Address</span>
                </div>
              </div>

              <div className="p-6">
                {/* Payment Methods */}
                <div className="bg-white  rounded-lg shadow-sm">
                <div className="flex p-6 items-center justify-between">
                  <h3 className="font-semibold">PAYMENT OPTION</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#F86F03]"
                    onClick={() => { }}
                  >
                    Add Card
                  </Button>
                </div>
                <div className="h-px bg-gray-200 w-full"></div>
                <div className="grid md:grid-cols-2 gap-4 p-6 relative">
                {cards.map((card) => (
                    <div
                      key={card.id}
                      className={`p-4 rounded text-white ${card.type === 'visa' ? 'bg-[#1B6B93]' : 'bg-[#2B9348]'
                        }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm opacity-80">Card Number</p>
                          <p className="font-mono">{card.number}</p>
                        </div>
                        <img
                          src={`/${card.type}.svg`}
                          alt={card.type}
                          className="h-8"
                        />
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-sm opacity-80">Card Holder</p>
                          <p>{card.holder}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm opacity-80">Balance</p>
                          <p className="font-semibold">
                            {formatCurrency(card.balance)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex w-fit absolute top-12 bg-gray-100 right-[43%] flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent font-light"
                      onClick={() => { }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Cards
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent font-light text-red-500"
                      onClick={() => { }}
                      >
                      <Delete className="h-4 w-4 mr-2" />
                      Delete Cards
                      </Button>
                  </div>
                </div>
              </div>

              {/* <div className="bg-white rounded-lg shadow-sm">
                  <div className="flex flex-col  justify-start p-4">
                    <h3 className="">BILLING ADDRESS</h3>
                  </div>
                  <div className="h-px bg-gray-200 w-full"></div>
                  <div className="space-y-4 p-4">
                    <div className="flex items-center gap-4 mb-2">

                      <div>
                        <p className="font-semibold">{userInfo.name}</p>
                        <p className="text-sm text-gray-500">{userInfo.address}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email: </span>
                      <span className="text-sm text-gray-700">{userInfo.email}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone Number:</span>
                      <span className="text-sm text-gray-500">{userInfo.phone}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-secondary-100"
                      onClick={() => { }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Address
                    </Button>
                  </div>
                </div> */}

                {/* Addresses */}
                <div className="grid md:grid-cols-2 gap-4 py-10">
                  {addresses.map((address) => (
                    <div key={address.id} className="space-y-4  border">
                      <div className="flex items-center justify-between pt-4 px-4">
                        <h3 className="">{address.type}</h3>
                      </div>
                      <div className="h-px bg-gray-200 w-full"></div>

                      <div className="space-y-2 p-4">
                        <p className="font-medium">{address.name}</p>
                        <p className="text-gray-600">{address.address}</p>
                        <p className="text-gray-600">Phone Number: {address.phone}</p>
                        <p className="text-gray-600">Email: {address.email}</p>
                      </div>
                      <div className="p-4">
                      <Button
                          variant="outline"
                          size="sm"
                          className="text-secondary-100"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Address
                        </Button>
                      </div>
                      
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">ADD NEW CARD</h3>
              <button
                onClick={() => setShowAddCard(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name on Card
                </label>
                <Input
                  value={newCard.name}
                  onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <Input
                  value={newCard.number}
                  onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expire Date
                  </label>
                  <Input
                    value={newCard.expiry}
                    onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <Input
                    value={newCard.cvv}
                    onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                    maxLength={3}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                ADD CARD
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}