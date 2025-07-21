import React, { useState } from 'react';
import { Upload, FileText, Download, Trash2, Plus } from 'lucide-react';

const BusinessDocs: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [documents, setDocuments] = useState([
    {
      id: '1',
      name: 'Business License.pdf',
      type: 'Business License',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      status: 'approved'
    },
    {
      id: '2',
      name: 'Tax Certificate.pdf',
      type: 'Tax Certificate',
      size: '1.8 MB',
      uploadDate: '2024-01-10',
      status: 'pending'
    }
  ]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        const newDoc = {
          id: Date.now().toString(),
          name: file.name,
          type: 'Business Document',
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'pending' as const
        };
        setDocuments(prev => [...prev, newDoc]);
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const deleteDocument = (id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Business Documents</h2>
        <p className="text-gray-600 mt-1">Upload and manage your business verification documents</p>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-600 mb-2">
            Drop your documents here, or{' '}
            <label className="text-blue-500 cursor-pointer">
              click to browse
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
              />
            </label>
          </p>
          <p className="text-sm text-gray-500">PDF, JPG, PNG files are allowed (Max 10MB each)</p>
        </div>
      </div>

      {/* Document Types Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Required Documents</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Business License or Registration Certificate</li>
          <li>• Tax Identification Number (TIN) Certificate</li>
          <li>• Bank Account Verification</li>
          <li>• Identity Verification (Government ID)</li>
        </ul>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Uploaded Documents</h3>
        </div>
        
        {documents.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No documents uploaded yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <div key={doc.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FileText className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{doc.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span>{doc.type}</span>
                        <span>{doc.size}</span>
                        <span>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteDocument(doc.id)}
                        className="p-2 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Verification Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-sm font-medium text-green-800">Business License</span>
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              Verified
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <span className="text-sm font-medium text-yellow-800">Tax Certificate</span>
            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
              Under Review
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-800">Bank Verification</span>
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
              Pending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDocs;