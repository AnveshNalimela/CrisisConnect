import React from "react";

const DisasterDetails = () => {
  return (
    <div className="max-w-full mx-auto bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-2">
        <h2 className="text-lg font-bold text-center mt-2">Disaster Name</h2>
        <div className="flex items-center justify-center mt-4">
          <div className="w-64 h-64 overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://placehold.co/400"
              alt="disaster"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-center">Description of the disaster goes here.</p>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-200 dark:bg-zinc-700 p-4 rounded-lg shadow">
            <h3 className="font-bold">Casualties</h3>
            <p>Number of casualties</p>
          </div>
          <div className="bg-zinc-200 dark:bg-zinc-700 p-4 rounded-lg shadow">
            <h3 className="font-bold">Affected People</h3>
            <p>Number of affected people</p>
          </div>
          <div className="bg-zinc-200 dark:bg-zinc-700 p-4 rounded-lg shadow">
            <h3 className="font-bold">Severity</h3>
            <p>Severity level of the disaster</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Images</h3>
            <button
              id="addImageBtn"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Image
            </button>
          </div>
          <div className="flex items-center mt-2 overflow-x-auto">
            <img
              src="https://placehold.co/150"
              alt="image"
              className="w-32 h-32 object-cover rounded-lg shadow-lg mr-2"
            />
            <img
              src="https://placehold.co/150"
              alt="image"
              className="w-32 h-32 object-cover rounded-lg shadow-lg mr-2"
            />
            <img
              src="https://placehold.co/150"
              alt="image"
              className="w-32 h-32 object-cover rounded-lg shadow-lg mr-2"
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Comments</h3>
            <button
              id="addCommentBtn"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Comment
            </button>
          </div>
          <ul id="commentList" className="mt-2"></ul>
        </div>
      </div>
    </div>
  );
};

export default DisasterDetails;
