import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onLogout }) => {
    if (!isOpen) return null;
    return (
        <>
            <div
                className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"
                onClick={onClose} // Close the modal when clicking the overlay
            />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <div className="bg-white rounded-lg p-6 w-96">
                    <div className="flex flex-col items-center justify-center">
                        <BiErrorCircle size={42} className="text-red-500 m-2" />
                        <h2 className="text-2xl font-semibold">Exit AMS</h2>
                    </div>
                    <div className="mt-4 flex items-center justify-center">
                        <p className="text-gray-700 text-xl">Are you sure you want to logout?</p>
                    </div>
                    <div className="mt-10 flex justify-end">
                        <button
                            className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
                            onClick={() => {
                                onLogout();
                                onClose();
                            }}
                        >
                            Logout
                        </button>
                        <button
                            className="ml-2 px-4 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};