import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Plus, Minus } from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import HeroNav from './layout/HeroNav';

interface FAQItem {
  question: string;
  answer: string | string[];
}

const faqs: FAQItem[] = [
  {
    question: 'Suspendisse ultrices pharetra libero sed interdum.',
    answer: [
      'Vivamus sed est nisi arcu porta aliquet et vitae nulla.',
      'Integer et lacus vitae quam fermentum rutrum. In vel ultrices massa.',
      'Proin blandit nunc nisi, at semper turpis sagittis nec.',
      'Quisque ut dolor erat.'
    ]
  },
  {
    question: 'Fusce molestie condimentum facilisis.',
    answer: 'Nulla malesuada sodales nisi, vitae sagittis lacus laoreet in. Morbi aliquet pulvinar arcu non volutpat. Donec aliquet ullamcorper gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed molestie accumsan leo, non luctus magna mattis ut. Ut consectetur massa et viverra euismod. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent eget sem purus.'
  },
  {
    question: 'Quisque quis nunc quis urna tempor lobortis vel non orci.',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    question: 'Donec rutrum ultrices ante nec malesuada. In accumsan eget nisi a rhoncus.',
    answer: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    question: 'Nulla sed sapien maximus, faucibus massa vitae.',
    answer: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  }
];
const breadcrumbItems = [
  { label: 'Pages', href: '/pages' },
  { label: 'FAQs' }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // Second item open by default
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
       <div className="px-32">
      <HeroNav />

      </div>
      <div className="flex px-32 bg-gray-100  items-center space-x-2 p-4 text-sm">
      <Breadcrumb items={breadcrumbItems} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-medium mb-8">Frequently Asked Questions</h1>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-md overflow-hidden">
                  <button
                    className="w-full flex items-center focus:bg-orange-500 focus:text-white justify-between p-4 text-left hover:bg-gray-50"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="font-medium">{faq.question}</span>
                    {openIndex === index ? (
                      <Minus className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Plus className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="p-4 bg-gray-50 border-t">
                      {Array.isArray(faq.answer) ? (
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                          {faq.answer.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">{faq.answer}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-yellow/20 p-6 rounded-lg">
              <h2 className=" mb-4">Don't find your answer. Ask for support.</h2>
              <p className="text-sm font-light text-gray-600 mb-6">
                Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. 
                Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero 
                malesuada feugiat. Nulla quis lorem ut libero malesuada feugiat.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-2 border  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full px-4 py-2 border  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message (Optional)"
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-fit bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors"
                >
                  SEND MESSAGE →
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};