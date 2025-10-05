// import React, { useState } from 'react';
// import { Upload, FileText, Download, Trash2, Plus } from 'lucide-react';

// const BusinessDocs: React.FC = () => {
//   const [dragActive, setDragActive] = useState(false);
//   const [documents, setDocuments] = useState([
//     {
//       id: '1',
//       name: 'Business License.pdf',
//       type: 'Business License',
//       size: '2.4 MB',
//       uploadDate: '2024-01-15',
//       status: 'approved'
//     },
//     {
//       id: '2',
//       name: 'Tax Certificate.pdf',
//       type: 'Tax Certificate',
//       size: '1.8 MB',
//       uploadDate: '2024-01-10',
//       status: 'pending'
//     }
//   ]);

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(e.type === 'dragenter' || e.type === 'dragover');
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFiles(e.dataTransfer.files);
//     }
//   };

//   const handleFiles = (files: FileList) => {
//     Array.from(files).forEach(file => {
//       if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
//         const newDoc = {
//           id: Date.now().toString(),
//           name: file.name,
//           type: 'Business Document',
//           size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
//           uploadDate: new Date().toISOString().split('T')[0],
//           status: 'pending' as const
//         };
//         setDocuments(prev => [...prev, newDoc]);
//       }
//     });
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'approved':
//         return 'bg-green-100 text-green-800';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'rejected':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const deleteDocument = (id: string) => {
//     if (window.confirm('Are you sure you want to delete this document?')) {
//       setDocuments(prev => prev.filter(doc => doc.id !== id));
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-gray-900">Business Documents</h2>
//         <p className="text-gray-600 mt-1">Upload and manage your business verification documents</p>
//       </div>

//       {/* Upload Area */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>
//         <div
//           className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//             dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
//           }`}
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//         >
//           <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <p className="text-lg text-gray-600 mb-2">
//             Drop your documents here, or{' '}
//             <label className="text-blue-500 cursor-pointer">
//               click to browse
//               <input
//                 type="file"
//                 multiple
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 onChange={(e) => e.target.files && handleFiles(e.target.files)}
//                 className="hidden"
//               />
//             </label>
//           </p>
//           <p className="text-sm text-gray-500">PDF, JPG, PNG files are allowed (Max 10MB each)</p>
//         </div>
//       </div>

//       {/* Document Types Info */}
//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//         <h4 className="font-medium text-blue-900 mb-2">Required Documents</h4>
//         <ul className="text-sm text-blue-800 space-y-1">
//           <li>• Business License or Registration Certificate</li>
//           <li>• Tax Identification Number (TIN) Certificate</li>
//           <li>• Bank Account Verification</li>
//           <li>• Identity Verification (Government ID)</li>
//         </ul>
//       </div>

//       {/* Documents List */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900">Uploaded Documents</h3>
//         </div>

//         {documents.length === 0 ? (
//           <div className="p-8 text-center">
//             <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-500">No documents uploaded yet</p>
//           </div>
//         ) : (
//           <div className="divide-y divide-gray-200">
//             {documents.map((doc) => (
//               <div key={doc.id} className="p-6 hover:bg-gray-50">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <div className="p-2 bg-gray-100 rounded-lg">
//                       <FileText className="h-6 w-6 text-gray-600" />
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-900">{doc.name}</h4>
//                       <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
//                         <span>{doc.type}</span>
//                         <span>{doc.size}</span>
//                         <span>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-4">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
//                       {doc.status}
//                     </span>

//                     <div className="flex items-center space-x-2">
//                       <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
//                         <Download className="h-4 w-4" />
//                       </button>
//                       <button 
//                         onClick={() => deleteDocument(doc.id)}
//                         className="p-2 text-red-400 hover:text-red-600 transition-colors"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Verification Status */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
//         <div className="space-y-3">
//           <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
//             <span className="text-sm font-medium text-green-800">Business License</span>
//             <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
//               Verified
//             </span>
//           </div>
//           <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
//             <span className="text-sm font-medium text-yellow-800">Tax Certificate</span>
//             <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
//               Under Review
//             </span>
//           </div>
//           <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//             <span className="text-sm font-medium text-gray-800">Bank Verification</span>
//             <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
//               Pending
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessDocs;

// import React, { useState } from 'react';
// import { Upload, FileText, Download, Trash2, Plus, AlertCircle } from 'lucide-react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useBusinessDoc, useCreateBusinessDoc, useUpdateBusinessDoc } from '../../lib/hooks/useVendorQueries';

// // Mock API functions - replace with your actual API
// const mockVendorApi = {
//   getBusinessDoc: () => Promise.resolve({ data: [] }),
//   createBusinessDoc: (data: FormData) => Promise.resolve({ data: { id: Date.now(), status: 'pending' } }),
//   updateBusinessDoc: (data: FormData) => Promise.resolve({ data: { status: 'updated' } }),
// };

// // Business document types
// const BUSINESS_DOC_TYPES = [
//   { value: 'CAC', label: 'Certificate of Incorporation (CAC)' },
//   { value: 'cooperative', label: 'Cooperative Registration Certificate' },
//   { value: 'business_license', label: 'Business License' },
//   { value: 'tax_certificate', label: 'Tax Identification Number (TIN)' },
//   { value: 'bank_verification', label: 'Bank Account Verification' },
//   { value: 'identity_verification', label: 'Identity Verification (Government ID)' },
//   { value: 'partnership_deed', label: 'Partnership Deed' },
//   { value: 'memorandum', label: 'Memorandum and Articles of Association' },
//   { value: 'trade_license', label: 'Trade License' },
//   { value: 'vat_certificate', label: 'VAT Registration Certificate' },
// ];



// const BusinessDocs: React.FC = () => {
//   const [dragActive, setDragActive] = useState(false);
//   const [selectedDocType, setSelectedDocType] = useState('');
//   const [isUploading, setIsUploading] = useState(false);

//   // React Query hooks
//   const { data: businessDocsData, isLoading, error } = useBusinessDoc();
//   const createBusinessDoc = useCreateBusinessDoc();
//   const updateBusinessDoc = useUpdateBusinessDoc();

//   // Get documents from backend data
//   const documents = Array.isArray(businessDocsData?.data) ? businessDocsData.data : [];

//   // const [documents, setDocuments] = useState([]); // Use this if you need local state management

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(e.type === 'dragenter' || e.type === 'dragover');
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0] && selectedDocType) {
//       handleFiles(e.dataTransfer.files);
//     }
//   };

//   const handleFiles = async (files: FileList) => {
//     if (!selectedDocType) {
//       alert('Please select a document type before uploading.');
//       return;
//     }

//     setIsUploading(true);

//     try {
//       for (const file of Array.from(files)) {
//         if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
//           const formData = new FormData();
//           formData.append('business_doc_file', file);
//           formData.append('business_id_type', selectedDocType);

//           // Create new document via API
//           const response = await createBusinessDoc.mutateAsync(formData);


//         }
//       }
//     } catch (error) {
//       console.error('Upload failed:', error);
//       alert('Upload failed. Please try again.');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'approved':
//         return 'bg-green-100 text-green-800';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'rejected':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getDocTypeLabel = (type: string) => {
//     const docType = BUSINESS_DOC_TYPES.find(dt => dt.value === type);
//     return docType ? docType.label : type;
//   };

//   const deleteDocument = (id: string) => {
//     if (window.confirm('Are you sure you want to delete this document?')) {
//       // Call delete API here if available
//       // deleteBusinessDoc.mutate(id);

//       // If using local state:
//       // setDocuments(prev => prev.filter(doc => doc.id !== id));

//       console.log('Delete document with ID:', id);
//     }
//   };

//   const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       handleFiles(e.target.files);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-gray-500">Loading business documents...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//         <div className="flex items-center">
//           <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
//           <span className="text-red-800">Error loading business documents. Please try again.</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-gray-900">Business Documents</h2>
//         <p className="text-gray-600 mt-1">Upload and manage your business verification documents</p>
//       </div>

//       {/* Upload Area */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>

//         {/* Document Type Selector */}
//         <div className="mb-4">
//           <label htmlFor="doc-type" className="block text-sm font-medium text-gray-700 mb-2">
//             Document Type *
//           </label>
//           <select
//             id="doc-type"
//             value={selectedDocType}
//             onChange={(e) => setSelectedDocType(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">Select document type...</option>
//             {BUSINESS_DOC_TYPES.map((type) => (
//               <option key={type.value} value={type.value}>
//                 {type.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div
//           className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//             dragActive ? 'border-blue-500 bg-blue-50' : 
//             selectedDocType ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
//           } ${!selectedDocType ? 'cursor-not-allowed' : ''}`}
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//         >
//           <Upload className={`h-12 w-12 mx-auto mb-4 ${selectedDocType ? 'text-gray-400' : 'text-gray-300'}`} />
//           {selectedDocType ? (
//             <>
//               <p className="text-lg text-gray-600 mb-2">
//                 Drop your {getDocTypeLabel(selectedDocType)} here, or{' '}
//                 <label className="text-blue-500 cursor-pointer">
//                   click to browse
//                   <input
//                     type="file"
//                     multiple
//                     accept=".pdf,.jpg,.jpeg,.png"
//                     onChange={handleFileInputChange}
//                     disabled={isUploading}
//                     className="hidden"
//                   />
//                 </label>
//               </p>
//               <p className="text-sm text-gray-500">PDF, JPG, PNG files are allowed (Max 10MB each)</p>
//               {isUploading && (
//                 <div className="mt-4">
//                   <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
//                     Uploading...
//                   </div>
//                 </div>
//               )}
//             </>
//           ) : (
//             <>
//               <p className="text-lg text-gray-400 mb-2">Please select a document type first</p>
//               <p className="text-sm text-gray-400">Choose the type of business document you want to upload</p>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Document Types Info */}
//       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//         <h4 className="font-medium text-blue-900 mb-2">Required Documents</h4>
//         <ul className="text-sm text-blue-800 space-y-1">
//           <li>• Certificate of Incorporation (CAC) or Cooperative Registration</li>
//           <li>• Tax Identification Number (TIN) Certificate</li>
//           <li>• Bank Account Verification</li>
//           <li>• Identity Verification (Government ID)</li>
//           <li>• Business License (if applicable)</li>
//         </ul>
//       </div>

//       {/* Documents List */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900">Uploaded Documents</h3>
//         </div>

//         {documents.length === 0 ? (
//           <div className="p-8 text-center">
//             <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-500">No documents uploaded yet</p>
//           </div>
//         ) : (
//           <div className="divide-y divide-gray-200">
//             {documents.map((doc: any) => (
//               <div key={doc.id} className="p-6 hover:bg-gray-50">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <div className="p-2 bg-gray-100 rounded-lg">
//                       <FileText className="h-6 w-6 text-gray-600" />
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-gray-900">{doc.name}</h4>
//                       <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
//                         <span>{getDocTypeLabel(doc.business_id_type || doc.type)}</span>
//                         <span>{doc.size}</span>
//                         <span>Uploaded: {new Date(doc.created_at || doc.uploadDate).toLocaleDateString()}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-4">
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(doc.status)}`}>
//                       {doc.status}
//                     </span>

//                     <div className="flex items-center space-x-2">
//                       <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
//                         <Download className="h-4 w-4" />
//                       </button>
//                       <button 
//                         onClick={() => deleteDocument(doc.id)}
//                         className="p-2 text-red-400 hover:text-red-600 transition-colors"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Verification Status */}
//       {/* Uncomment when verification status data is available from backend */}
//       {/*
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
//         <div className="space-y-3">
//           {documents.map((doc) => (
//             <div key={doc.id} className={`flex items-center justify-between p-3 rounded-lg ${
//               doc.status === 'approved' ? 'bg-green-50' : 
//               doc.status === 'pending' ? 'bg-yellow-50' : 
//               doc.status === 'rejected' ? 'bg-red-50' : 'bg-gray-50'
//             }`}>
//               <span className={`text-sm font-medium ${
//                 doc.status === 'approved' ? 'text-green-800' : 
//                 doc.status === 'pending' ? 'text-yellow-800' : 
//                 doc.status === 'rejected' ? 'text-red-800' : 'text-gray-800'
//               }`}>
//                 {getDocTypeLabel(doc.business_id_type || doc.type)}
//               </span>
//               <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(doc.status)}`}>
//                 {doc.status === 'approved' ? 'Verified' : 
//                  doc.status === 'pending' ? 'Under Review' : 
//                  doc.status === 'rejected' ? 'Rejected' : 'Not Submitted'}
//               </span>
//             </div>
//           ))}

//           {documents.length === 0 && (
//             <div className="text-center py-8">
//               <p className="text-gray-500">No documents to verify</p>
//             </div>
//           )}
//         </div>
//       </div>
//       */}
//     </div>
//   );
// };

// export default BusinessDocs;

import React, { useState } from 'react';
import { Upload, FileText, Download, Trash2, Plus, AlertCircle } from 'lucide-react';
import { useBusinessDoc, useCreateBusinessDoc, useUpdateBusinessDoc } from '../../lib/hooks/useVendorQueries';


const BUSINESS_DOC_TYPES = [
  { value: 'CAC', label: 'Certificate of Incorporation (CAC)' },
  { value: 'cooperative', label: 'Cooperative Registration Certificate' },
  { value: 'business_license', label: 'Business License' },
  { value: 'tax_certificate', label: 'Tax Identification Number (TIN)' },
  { value: 'bank_verification', label: 'Bank Account Verification' },
  { value: 'identity_verification', label: 'Identity Verification (Government ID)' },
  { value: 'partnership_deed', label: 'Partnership Deed' },
  { value: 'memorandum', label: 'Memorandum and Articles of Association' },
  { value: 'trade_license', label: 'Trade License' },
  { value: 'vat_certificate', label: 'VAT Registration Certificate' },
];



const BusinessDocs: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // React Query hooks
  const { data: businessDocsData, isLoading, error } = useBusinessDoc();
  const createBusinessDoc = useCreateBusinessDoc();
  const updateBusinessDoc = useUpdateBusinessDoc();

  // Handle different possible response structures
  const documents = React.useMemo(() => {
    console.log('Raw businessDocsData:', businessDocsData);

    if (!businessDocsData) return [];

    // Handle different response structures
    if (Array.isArray(businessDocsData)) {
      return businessDocsData;
    }

    if (businessDocsData.data) {
      return Array.isArray(businessDocsData.data) ? businessDocsData.data : [];
    }

    // if (businessDocsData.results) {
    //   return Array.isArray(businessDocsData.results) ? businessDocsData.results : [];
    // }

    // If business_doc is null, return empty array
    if (businessDocsData.data?.business_doc === null) {
      console.log('business_doc is null, returning empty array');
      return [];
    }

    return [];
  }, [businessDocsData]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0] && selectedDocType) {
      addFilesToPreview(e.dataTransfer.files);
    }
  };

  const addFilesToPreview = (files: FileList) => {
    if (!selectedDocType) {
      alert('Please select a document type before adding files.');
      return;
    }

    const validFiles = Array.from(files).filter(file => {
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          alert(`File ${file.name} is too large. Maximum size is 10MB.`);
          return false;
        }
        return true;
      } else {
        alert(`File ${file.name} has unsupported format. Please use PDF, JPG, or PNG.`);
        return false;
      }
    });

    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFileFromPreview = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
    setSelectedDocType('');
  };

  const uploadAllFiles = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select files to upload.');
      return;
    }

    if (!selectedDocType) {
      alert('Please select a document type.');
      return;
    }

    setIsUploading(true);

    try {
      for (const file of selectedFiles) {
        console.log('Uploading file:', file.name, 'Type:', selectedDocType);

        const formData = new FormData();
        formData.append('business_doc_file', file);
        formData.append('business_id_type', selectedDocType);

        // Debug FormData
        console.log('FormData contents:');
        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }

        // Create new document via API
        const response = await createBusinessDoc.mutateAsync(formData);
        console.log('Upload response:', response);
      }

      // Clear files and selection after successful upload
      setSelectedFiles([]);
      setSelectedDocType('');
      alert('All documents uploaded successfully!');

    } catch (error) {
      console.error('Upload failed:', error);
      alert(`Upload failed: ${error || 'Please try again.'}`);
    } finally {
      setIsUploading(false);
    }
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

  const getDocTypeLabel = (type: string) => {
    const docType = BUSINESS_DOC_TYPES.find(dt => dt.value === type);
    return docType ? docType.label : type;
  };

  const deleteDocument = (id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      // Call delete API here if available
      // deleteBusinessDoc.mutate(id);

      // If using local state:
      // setDocuments(prev => prev.filter(doc => doc.id !== id));

      console.log('Delete document with ID:', id);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFilesToPreview(e.target.files);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-500">Loading business documents...</div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Business docs error:', error);
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <div>
            <span className="text-red-800">Error loading business documents.</span>
            <button
              onClick={() => window.location.reload()}
              className="ml-2 text-red-600 underline hover:text-red-800"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Business Documents</h2>
        <p className="text-gray-600 mt-1">Upload and manage your business verification documents</p>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>

        {/* Document Type Selector */}
        <div className="mb-4">
          <label htmlFor="doc-type" className="block text-sm font-medium text-gray-700 mb-2">
            Document Type *
          </label>
          <select
            id="doc-type"
            value={selectedDocType}
            onChange={(e) => setSelectedDocType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select document type...</option>
            {BUSINESS_DOC_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? 'border-blue-500 bg-blue-50' :
              selectedDocType ? 'border-gray-300' : 'border-gray-200 bg-gray-50'
            } ${!selectedDocType ? 'cursor-not-allowed' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className={`h-12 w-12 mx-auto mb-4 ${selectedDocType ? 'text-gray-400' : 'text-gray-300'}`} />
          {selectedDocType ? (
            <>
              <p className="text-lg text-gray-600 mb-2">
                Drop your {getDocTypeLabel(selectedDocType)} here, or{' '}
                <label className="text-blue-500 cursor-pointer">
                  click to browse
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => e.target.files && addFilesToPreview(e.target.files)}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </p>
              <p className="text-sm text-gray-500">PDF, JPG, PNG files are allowed (Max 10MB each)</p>
            </>
          ) : (
            <>
              <p className="text-lg text-gray-400 mb-2">Please select a document type first</p>
              <p className="text-sm text-gray-400">Choose the type of business document you want to upload</p>
            </>
          )}
        </div>

        {/* File Preview Section */}
        {selectedFiles.length > 0 && (
          <div className="mt-6 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Files to Upload ({selectedFiles.length})</h4>
              <button
                onClick={clearAllFiles}
                disabled={isUploading}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-3">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded border">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="h-8 w-8 object-cover rounded"
                        />
                      ) : (
                        <FileText className="h-8 w-8 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(1)} MB • {getDocTypeLabel(selectedDocType)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFileFromPreview(index)}
                    disabled={isUploading}
                    className="p-1 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          type="button"
          onClick={() => {
            setSelectedDocType('');
            setSelectedFiles([]);
          }}
          className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          disabled={isUploading}
        >
          Clear All
        </button>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => document.querySelector('input[type="file"]')}
            disabled={!selectedDocType || isUploading}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedDocType && !isUploading
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            <Plus className="h-4 w-4 inline-block mr-2" />
            Add Files
          </button>

          <button
            type="button"
            onClick={uploadAllFiles}
            disabled={selectedFiles.length === 0 || isUploading}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${selectedFiles.length > 0 && !isUploading
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 inline-block mr-2" />
                Upload Documents ({selectedFiles.length})
              </>
            )}
          </button>
        </div>
      </div>
    </div>

      {/* Document Types Info */ }
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
    <h4 className="font-medium text-blue-900 mb-2">Required Documents</h4>
    <ul className="text-sm text-blue-800 space-y-1">
      <li>• Certificate of Incorporation (CAC) or Cooperative Registration</li>
      <li>• Tax Identification Number (TIN) Certificate</li>
      <li>• Bank Account Verification</li>
      <li>• Identity Verification (Government ID)</li>
      <li>• Business License (if applicable)</li>
    </ul>
  </div>

  {/* Documents List */ }
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">Uploaded Documents</h3>
    </div>

    {documents.length === 0 ? (
      <div className="p-8 text-center">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <div className="space-y-2">
          <p className="text-gray-500">No documents uploaded yet</p>
          {businessDocsData && (
            <p className="text-xs text-gray-400">
              API Response: {businessDocsData.data?.business_doc === null ? 'business_doc is null' : 'Data structure varies'}
            </p>
          )}
        </div>
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
                    <span>{getDocTypeLabel(doc.business_id_type || doc.type)}</span>
                    <span>{doc.size}</span>
                    <span>Uploaded: {new Date(doc.created_at || doc.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(doc.status)}`}>
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

  {/* Verification Status */ }
  {/* Uncomment when verification status data is available from backend */ }
  {/*
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className={`flex items-center justify-between p-3 rounded-lg ${
              doc.status === 'approved' ? 'bg-green-50' : 
              doc.status === 'pending' ? 'bg-yellow-50' : 
              doc.status === 'rejected' ? 'bg-red-50' : 'bg-gray-50'
            }`}>
              <span className={`text-sm font-medium ${
                doc.status === 'approved' ? 'text-green-800' : 
                doc.status === 'pending' ? 'text-yellow-800' : 
                doc.status === 'rejected' ? 'text-red-800' : 'text-gray-800'
              }`}>
                {getDocTypeLabel(doc.business_id_type || doc.type)}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(doc.status)}`}>
                {doc.status === 'approved' ? 'Verified' : 
                 doc.status === 'pending' ? 'Under Review' : 
                 doc.status === 'rejected' ? 'Rejected' : 'Not Submitted'}
              </span>
            </div>
          ))}
          
          {documents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No documents to verify</p>
            </div>
          )}
        </div>
      </div>
      */}
    </>
  );
};

export default BusinessDocs;