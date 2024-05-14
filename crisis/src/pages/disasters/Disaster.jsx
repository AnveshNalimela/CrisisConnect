import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Components/Footer.jsx";
import Header from "../../Components/Header.jsx";
import voluntee from "../../assets/images/Volunte.png";
import box from "../../assets/images/box.png";

////////////////////////////////////////////////////////Image Modal/////////////////////
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
const ImageModal = ({ isOpen, onClose, onSubmit, id, getDisasterById }) => {
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
      getDisasterById(id);
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
///////////////////////////////////////Comment Modal////////////////////////

const CommentModal = ({ isOpen, onClose, id, fetchComments }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const createComment = async (disasterId, name, comment) => {
    try {
      // Make a POST request to the create comment API endpoint
      const responsec = await axios.post("http://localhost:3001/comments", {
        disasterId,
        name,
        comment,
      });

      // If the request is successful, return the created comment
      console.log(responsec.data);
      fetchComments(id);
    } catch (error) {
      // If an error occurs, log the error and return null
      console.error("Error creating comment:", error);
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Name:", name);
    console.log("Comment:", comment);
    createComment(id, name, comment);
    // Reset form fields
    setName("");
    setComment("");
    // Close the modal
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Comment</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="comment"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Comment:
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-600"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
//============================================UpdateModal ================================
const UpdateModal = ({
  isOpen,
  onClose,
  onUpdate,
  disaster,
  getDisasterById,
}) => {
  const [casualties, setCasualties] = useState(disaster.casualties);
  const [affectedPopulation, setAffectedPopulation] = useState(
    disaster.affectedPopulation
  );
  const [severity, setSeverity] = useState(disaster.severity);

  const updateDisasterFields = async (id, fieldsToUpdate) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/updateFields/${id}`,
        fieldsToUpdate
      );
      return response.data;
    } catch (error) {
      console.error("Error updating disaster fields:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldsToUpdate = {
      casualties,
      affectedPopulation,
      severity,
    };
    console.log(fieldsToUpdate);

    try {
      await updateDisasterFields(disaster._id, fieldsToUpdate);
      await getDisasterById(disaster._id);
      onUpdate(); // Trigger parent component update
      onClose(); // Close the modal after updating
    } catch (error) {
      console.error("Error updating disaster fields:", error);
    }
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
                      htmlFor="updateField"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Update Casulities:
                    </label>
                    <input
                      type="number"
                      id="updateField"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder={disaster.casualties}
                      min={disaster.casualties}
                      value={casualties} // Set the value of the input field
                      onChange={(e) => setCasualties(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="updateField"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Update affectedPopulation:
                    </label>
                    <input
                      type="number"
                      id="updateField"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder={disaster.affectedPopulation}
                      min={disaster.affectedPopulation}
                      value={affectedPopulation} // Set the value of the input field
                      onChange={(e) => setAffectedPopulation(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="updateField"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Update severity:
                    </label>
                    <input
                      type="text"
                      id="updateField"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder={disaster.severity}
                      value={severity} // Set the value of the input field
                      onChange={(e) => setSeverity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={onClose}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
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
///////////////////////////////////////////Disaster Page///////////////
const DisasterDetails = () => {
  const [disaster, setDisaster] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const openUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const handleUpdate = (updatedValue) => {
    // Your logic to handle the update goes here
    console.log("Updated value:", updatedValue);
    closeUpdateModal(); // Close the modal after updating
  };

  const copenModal = () => {
    setIsModalOpen(true);
  };

  const ccloseModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    getDisasterById(id);
    fetchComments(id);
  }, []);
  const getDisasterById = async (id) => {
    try {
      // Make a GET request to the API endpoint with the provided ID
      const response = await axios.get(
        `http://localhost:3001/getDisaster/${id}`
      );

      // If the request is successful, return the data
      console.log(response.data);
      await setDisaster(response.data);
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
  const fetchComments = async (id) => {
    try {
      // Make a GET request to the API endpoint to fetch comments based on the disaster ID
      const resc = await axios.get(`http://localhost:3001/comments/${id}`);

      // If the request is successful, return the comments

      // Verify that the data is fetched correctly
      const list = resc.data;
      setComments(list); // Verify that comments array is updated
      return resc.data;
    } catch (error) {
      // If an error occurs, log the error and return null
      console.error("Error fetching comments:", error);
      return null;
    }
  };
  const handleSubmit = (imageURL) => {
    // Handle the submission of the image URL
    console.log("Submitted image URL:", imageURL);
  };
  console.log(comments);

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
        <div className="mt-4 mx-10">
          <p className="text-center">{disaster.description}.</p>
        </div>
        <div className="mt-4 mx-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-sky-400 text-center dark:bg-zinc-700 p-4 rounded-lg shadow">
            <h3 className="font-bold text-white text-xl">Casualties</h3>
            <p className="text-center text-bold text-4xl">
              {disaster.casualties}
            </p>
            <button onClick={openUpdateModal}>Update Status</button>

            {/* Update modal component */}
            <UpdateModal
              isOpen={isUpdateModalOpen}
              onClose={closeUpdateModal}
              onUpdate={handleUpdate}
              disaster={disaster}
              getDisasterById={getDisasterById}
            />
          </div>
          <div className="bg-sky-400 text-center dark:bg-zinc-700 p-4 rounded-lg shadow">
            <h3 className="font-bold  text-center text-white text-xl">
              Affected People
            </h3>
            <p className="text-center text-bold text-4xl">
              {disaster.affectedPopulation}
            </p>
            <button onClick={openUpdateModal}>Update Status</button>

            {/* Update modal component */}
            <UpdateModal
              isOpen={isUpdateModalOpen}
              onClose={closeUpdateModal}
              onUpdate={handleUpdate}
              disaster={disaster}
              getDisasterById={getDisasterById}
            />
          </div>
          <div className="bg-sky-400 text-center dark:bg-zinc-700 p-4 rounded-lg shadow">
            <h3 className="font-bold text-center  text-white text-xl">
              Severity
            </h3>
            <p className="text-center text-bold text-4xl">
              {disaster.severity}
            </p>
            <button onClick={openUpdateModal}>Update Status</button>

            {/* Update modal component */}
            <UpdateModal
              isOpen={isUpdateModalOpen}
              onClose={closeUpdateModal}
              onUpdate={handleUpdate}
              disaster={disaster}
              getDisasterById={getDisasterById}
            />
          </div>
        </div>
        <div className="bg-zinc-200 dark:bg-zinc-700  my-2 p-4 rounded-lg shadow mx-10 text-xl">
          <h3 className="font-bold">Additional Details:</h3>
          <p>:{disaster.additionalNotes}</p>
        </div>
        <div className="bg-zinc-200 dark:bg-zinc-700 p-4  my-2 rounded-lg shadow mx-10 text-xl">
          <h3 className="font-bold">Emergency Responses:</h3>
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
                  src={voluntee}
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
            getDisasterById={getDisasterById}
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
              onClick={copenModal}
              id="addCommentBtn"
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Comment
            </button>
            <CommentModal
              isOpen={isModalOpen}
              onClose={ccloseModal}
              id={id}
              fetchComments={fetchComments}
            />
          </div>
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md">
            <ul>
              {comments.map((comment, i) => (
                <li
                  key={comment._id}
                  className="border-b border-zinc-200 dark:border-zinc-600 py-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-zinc-600 dark:text-zinc-400">
                        #{i + 1}
                      </span>
                      <span className="font-bold ml-2">{comment.name}</span>
                    </div>
                    <span
                      className="text-zinc-500 dark:text-zinc-400"
                      id="comment-time-1"
                    >
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 mt-2">
                    {comment.comment}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DisasterDetails;
