import React from "react";

interface PublishPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PublishPopup: React.FC<PublishPopupProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Confirm Publish</h3>
        <p className="mb-6">Are you sure you want to publish this notice? This action cannot be undone.</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishPopup;
