import React from "react";

function CreateNoticePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Create New Notice</h1>
      <div className="mt-4 max-w-2xl">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Enter notice title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded-md min-h-[150px]"
              placeholder="Enter notice description"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select className="w-full p-2 border rounded-md">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Publish Notice
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNoticePage;
