import axios from "axios";
import React, { useReducer } from "react";

const initialState = {
  crisisType: "",
  location: "",
  severity: "",
  dateTime: "",
  description: "",
  casualties: 0,
  affectedPopulation: 0,
  emergencyResponse: "",
  additionalNotes: "",
  uploaderName: "",
  uploaderEmail: "",
  uploadedPhotos: [""],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.field]: action.value };
    case "UPLOAD_PHOTOS":
      return { ...state, uploadedPhotos: action.photos };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const DisasterForm = () => {
  const [formData, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE", field: name, value });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    dispatch({ type: "UPLOAD_PHOTOS", photos: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData); // eslint-disable-line
    axios
      .post("http://localhost:3001/addDisaster", formData)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

    dispatch({ type: "RESET" });
  };

  return (
    <div className="p-10">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 mx-auto p-4 border border-blue-500 rounded-lg shadow-lg bg-white"
      >
        <h2 className="text-3xl font-bold center ml-20 py-4">
          Registartion of Disaster.
        </h2>
        <h2 className="text-xl font-semibold mt-3 ">Details:</h2>
        <div className="sm:col-span-1 m-4">
          <label className="block mb-4 text-semibold">
            Crisis Type:
            <input
              type="text"
              name="crisisType"
              placeholder="Eg:Flood, Fire etc."
              value={formData.crisisType}
              onChange={handleChange}
              className="block  mt-1 border-gray-700 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 w-1/2 h-8"
            />
          </label>
          <label className="block mb-4 text-semibold">
            Location:
            <input
              type="text"
              name="location"
              placeholder="Eg:kerala"
              value={formData.location}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 w-1/2 h-8"
            />
          </label>
          <label className="block mb-4 text-semibold">
            Severity:
            <input
              type="text"
              name="serverity"
              placeholder="Extreme,moderate etc.."
              value={formData.severity}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
            />
          </label>
          <label className="block mb-4 text-semibold">
            Date and Time of Occurrence:
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
            />
          </label>
          <label className="block mb-4 text-semibold">
            Description:
            <textarea
              name="description"
              placeholder="how is the situation..?"
              value={formData.description}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
            ></textarea>
          </label>
          <label className="block mb-4 text-semibold">
            Number of Casualties:
            <input
              type="number"
              name="casualties"
              value={formData.casualties}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
            />
          </label>
          <label className="block mb-4 text-semibold">
            Affected Population:
            <input
              type="number"
              name="affectedPopulation"
              value={formData.affectedPopulation}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
            />
          </label>
          <label className="block mb-4 text-semibold">
            Emergency Response Needed:
            <input
              type="text"
              name="emergencyResponse"
              value={formData.emergencyResponse}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
            />
          </label>
        </div>

        <label className="block mb-4 text-semibold">
          Additional Notes:
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
          ></textarea>
        </label>
        <label className="block mb-4 text-semibold">
          Uploader Name:
          <input
            type="text"
            name="uploaderName"
            placeholder="Enter your Name"
            value={formData.uploaderName}
            onChange={handleChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block mb-4 text-semibold">
          Uploader Email:
          <input
            type="email"
            name="uploaderEmail"
            placeholder="Enter you Email Address"
            value={formData.uploaderEmail}
            onChange={handleChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
          />
        </label>
        <label className="block mb-4 text-semibold">
          Upload Photos:
          <input
            type="file"
            name="photos"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
          />
        </label>
        <button
          type="submit"
          className="block w-1/2 px-4 py-2 mt-10 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DisasterForm;
