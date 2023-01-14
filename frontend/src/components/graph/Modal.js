import React from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) {
        return null;
    }
    return (
        <div className="z-20 fixed inset-0 flex px-4 py-6 h-2/5 w-full">
            <div className="fixed inset-0" onClick={onClose}>
                <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-1/4 h-full mx-auto">
                <div className="h-4/5 pt-5 px-4">
                    <div className="h-full justify-center mx-auto">
                        <div className='mx-auto w-fit text-green-700 font-bold'>Report an issue</div>
                        <div className='w-5/6 mx-auto h-4/6 items-center'>
                            <textarea className="h-full overflow-y-auto resize-none w-full border border-gray-400 rounded-md px-2 py-2 hover:border-purple text-black text-sm" />
                        </div>
                    </div>
                </div>
                <div className="mx-auto w-fit flex">
                    <span className="w-full rounded-md shadow-sm mx-px w-auto ">
                        <button type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-3 py-2 bg-red-600 text-sm leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150" onClick={() => { onClose(); }}>
                            Close
                        </button>
                    </span>
                    <span className="w-full rounded-md shadow-sm mx-px w-auto ">
                        <button type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-3 py-2 bg-green-600 text-sm leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150" onClick={() => { onSubmit(); }}>
                            Submit
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Modal;