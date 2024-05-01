import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer.jsx";
import Header from "../../Components/Header.jsx";
import box from "../../assets/images/box.png";
import help from "../../assets/images/help.png";

import { useParams } from "react-router-dom";
const initialState = {
  uploadedPhotos: [""],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "UPLOAD_PHOTOS":
      return { ...state, uploadedPhotos: action.photos };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
const ImageModal = ({ isOpen, onClose, onSubmit, id }) => {
  const [formData, dispatch] = useReducer(reducer, initialState);
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileDataArray = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        fileDataArray.push(reader.result);
        if (fileDataArray.length === files.length) {
          dispatch({ type: "UPLOAD_PHOTOS", photos: fileDataArray });
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataImg = formData.uploadedPhotos[0];
    try {
      // Make a POST request to the API endpoint
      const res = await axios.post(`http://localhost:3001/addImage/${id}`, {
        img: dataImg,
      });
      console.log(res.data);
      dispatch({ type: "RESET" });
      onSubmit("Suceesfully image added");
      // If the request is successful, return the response data
    } catch (error) {
      // If an error occurs, log the error and return null
      console.error("Error adding image to disaster:", error);
      return null;
    } // Close the modal
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <label
                      htmlFor="imageURL"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Image URL:
                    </label>
                    <input
                      type="file"
                      lable="Image"
                      name="myFile"
                      id="file-upload"
                      accept=".jpeg, .png, .jpg"
                      onChange={handlePhotoUpload}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter image URL"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Image
                  </button>
                  <button
                    onClick={onClose}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const DisasterDetails = () => {
  const [disaster, setDisaster] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    getDisasterById(id);
  }, []);
  const getDisasterById = async (id) => {
    try {
      // Make a GET request to the API endpoint with the provided ID
      const response = await axios.get(
        `http://localhost:3001/getDisaster/${id}`
      );

      // If the request is successful, return the data
      console.log(response.data);
      setDisaster(response.data);
      setLoading(false);

      return response.data;
    } catch (error) {
      // If an error occurs, handle it
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error(
          "Request failed with status code:",
          error.response.status
        );
        console.error("Error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something else happened while setting up the request
        console.error("Error setting up request:", error.message);
        setError(error.message);
        setLoading(false);
      }
      // Return null in case of error
      return null;
    }
  };
  const handleSubmit = (imageURL) => {
    // Handle the submission of the image URL
    console.log("Submitted image URL:", imageURL);
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Render an error message if data fetching fails
  }

  return (
    <div className="max-w-full mx-auto bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden">
      <Header />
      <div className="px-4 py-2 ">
        <h2 className="text-3xl font-bold text-center bg-sky-500 mt-2 h-20 py-5 rounded">
          {disaster.crisisType} in {disaster.location}
        </h2>
        <div className="flex items-center justify-center mt-4">
          <div className="w-64 h-64 overflow-hidden rounded-lg shadow-lg">
            {disaster.uploadedPhotos && disaster.uploadedPhotos.length > 0 ? (
              <img
                key={disaster.uploadedPhotos[0]} // Make sure to provide a unique key prop
                src={disaster.uploadedPhotos[0]}
                alt={`${disaster.crisisType} image`}
                className="w-full h-full object-cover rounded-lg shadow-lg mr-2"
              />
            ) : (
              <img
                src="default_image_url_here"
                alt="Default image"
                className="w-full h-full object-cover rounded-lg shadow-lg mr-2"
              />
            )}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-center">{disaster.description}.</p>
        </div>
        <div className="mt-4 mx-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-sky-400 text-center dark:bg-zinc-700 p-4 rounded-lg shadow">
            <h3 className="font-bold text-white text-xl">Casualties</h3>
            <p className="text-center text-bold text-4xl">
              {disaster.casualties}
            </p>
          </div>
          <div className="bg-sky-400 dark:bg-zinc-700 p-4 rounded-lg shadow">
            <h3 className="font-bold  text-center text-white text-xl">
              Affected People
            </h3>
            <p className="text-center text-bold text-4xl">
              {disaster.affectedPopulation}
            </p>
          </div>
          <div className="bg-sky-400 dark:bg-zinc-700 p-4 rounded-lg shadow">
            <h3 className="font-bold text-center  text-white text-xl">
              Severity
            </h3>
            <p className="text-center text-bold text-4xl">
              {disaster.severity}
            </p>
          </div>
        </div>
        <div className="bg-zinc-200 dark:bg-zinc-700  my-2 p-4 rounded-lg shadow mx-10 text-xl">
          <h3 className="font-bold">Additional Details:</h3>
          <p>:{disaster.additionalNotes}</p>
        </div>
        <div className="bg-zinc-200 dark:bg-zinc-700 p-4  my-2 rounded-lg shadow mx-10 text-xl">
          <h3 className="font-bold">Additional Details:</h3>
          <p>:{disaster.emergencyResponse}</p>
        </div>
        <div className="mt-4 w-fit grid grid-cols-1 md:grid-cols-2 gap-4 items-center mx-10">
          <div className="px-4 py-2 flex items-center bg-sky-300 rounded">
            <div>
              <h3 className="text-4xl mb-2 font-bold text-center text-white">
                Donate
              </h3>
              <p className="text-xl font-semibold text-gray-600 text-center  mx-2">
                “Remember that the happiest people are not those getting more,
                but those giving more.” ― H. Jackson Brown Jr.
              </p>
            </div>
            <div className="ml-auto">
              <img
                src={box}
                alt="donate"
                className="w-full h-full object-cover p-3 rounded-lg shadow-lg bg-white"
              />
            </div>
          </div>
          <Link to="/volunteer">
            <div className="px-4 py-2 flex items-center  bg-sky-300 rounded">
              <div>
                <h3 className="text-4xl mb-2 font-bold text-center text-white">
                  Come and Help
                </h3>
                <p className="text-xl font-semibold text-gray-600 text-center mx-2">
                  “Volunteers don’t get paid, not because they’re worthless, but
                  because they’re priceless.” – Sherry Anderson
                </p>
              </div>
              <div className="ml-auto">
                <img
                  src={help}
                  alt="help"
                  className="w-full h-full object-cover p-3  rounded-lg shadow-lg bg-white"
                />
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-4 mx-10">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-center text-3xl">Images</h3>
            <button
              id="addImageBtn"
              onClick={openModal}
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
              + Add Image
            </button>
          </div>
          <ImageModal
            isOpen={isOpen}
            onClose={closeModal}
            onSubmit={handleSubmit}
            id={id} // Pass the id prop here
          />
          <div className="flex items-center border-4 border-sky-600  mt-2 overflow-x-auto">
            {disaster.uploadedPhotos?.map((image) => (
              <img
                key={image} // Make sure to provide a unique key prop
                src={image}
                alt="image"
                className="w-1/5 h-35 object-cover border-3 rounded-lg mx-3 my-3 p-2 rounded-lg shadow-xl mr-2"
              />
            ))}
          </div>
        </div>
        <div className="mt-4 mx-10">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-3xl text-center">Comments</h3>
            <button
              id="addCommentBtn"
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Comment
            </button>
          </div>
          <ul id="commentList" className="mt-2"></ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DisasterDetails;
