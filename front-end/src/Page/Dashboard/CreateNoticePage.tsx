"use client";
import React, { useState } from "react";

function CreateNoticePage() {
  const [formData, setFormData] = useState({
    targetDepartment: "",
    noticeTitle: "",
    employeeId: "",
    employeeName: "",
    position: "",
    noticeType: "",
    publishDate: "",
    noticeBody: "",
    attachments: [] as File[],
  });

  const [dragActive, setDragActive] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files]
      }));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files]
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => {
      const newAttachments = [...prev.attachments];
      newAttachments.splice(index, 1);
      return { ...prev, attachments: newAttachments };
    });
  };

  const handlePublish = () => {
    console.log("Publishing notice:", formData);
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Notice</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <form className="space-y-6">
          {/* Target Department Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Department(s) or Individual <span className="text-red-500">*</span>
            </label>
            <select
              name="targetDepartment"
              value={formData.targetDepartment}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Department</option>
              <option value="hr">Human Resources</option>
              <option value="finance">Finance</option>
              <option value="it">Information Technology</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="individual">Individual</option>
            </select>
          </div>

          {/* Notice Title Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notice Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="noticeTitle"
              value={formData.noticeTitle}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter notice title"
            />
          </div>

          {/* Employee ID Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Employee ID <span className="text-red-500">*</span>
            </label>
            <select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Employee ID</option>
              <option value="EMP001">EMP001</option>
              <option value="EMP002">EMP002</option>
              <option value="EMP003">EMP003</option>
              <option value="EMP004">EMP004</option>
              <option value="EMP005">EMP005</option>
            </select>
          </div>

          {/* Employee Name Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter employee name"
            />
          </div>

          {/* Position Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter position"
            />
          </div>

          {/* Notice Type Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notice Type <span className="text-red-500">*</span>
            </label>
            <select
              name="noticeType"
              value={formData.noticeType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Notice Type</option>
              <option value="general">General Notice</option>
              <option value="policy">Policy Update</option>
              <option value="event">Event Announcement</option>
              <option value="memo">Internal Memo</option>
              <option value="warning">Warning Notice</option>
              <option value="termination">Termination Notice</option>
              <option value="promotion">Promotion Notice</option>
            </select>
          </div>

          {/* Publish Date Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
            <input
              type="date"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Notice Body Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notice Body
            </label>
            <textarea
              name="noticeBody"
              value={formData.noticeBody}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
              placeholder="Enter notice content"
            ></textarea>
          </div>

          {/* Upload Attachments Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Attachments (optional)
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
              onDragEnter={() => setDragActive(true)}
              onDragLeave={() => setDragActive(false)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                onChange={handleFileInput}
              />
              <div className="flex flex-col items-center justify-center">
                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="text-gray-600">Drag & drop files here, or click to select</p>
                <p className="text-gray-500 text-sm mt-1">Supports PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
              </div>
            </div>

            {/* Display uploaded files */}
            {formData.attachments.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                <ul className="space-y-2">
                  {formData.attachments.map((file, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                      <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeAttachment(index);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => console.log("Close clicked")}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Publish Notice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNoticePage;
