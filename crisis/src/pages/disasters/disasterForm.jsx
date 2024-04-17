import React, { useReducer } from "react";
import { addDisaster } from "./add";

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
  uploadedPhotos: [],
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
    addDisaster(formData);
    console.log(formData);

    dispatch({ type: "RESET" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-lg"
    >
      <label className="block mb-2">
        Crisis Type:
        <input
          type="text"
          name="crisisType"
          value={formData.crisisType}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
        />
      </label>
      <label className="block mb-2">
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
        />
      </label>
      <label className="block mb-2">
        Severity:
        <input
          type="text"
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
        />
      </label>
      <label className="block mb-2">
        Date and Time of Occurrence:
        <input
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
        />
      </label>
      <label className="block mb-2">
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
        ></textarea>
      </label>
      <label className="block mb-2">
        Number of Casualties:
        <input
          type="number"
          name="casualties"
          value={formData.casualties}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
        />
      </label>
      <label className="block mb-2">
        Affected Population:
        <input
          type="number"
          name="affectedPopulation"
          value={formData.affectedPopulation}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
        />
      </label>
      <label className="block mb-2">
        Emergency Response Needed:
        <input
          type="text"
          name="emergencyResponse"
          value={formData.emergencyResponse}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
        />
      </label>
      <label className="block mb-2">
        Additional Notes:
        <textarea
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
        ></textarea>
      </label>
      <label className="block mb-2">
        Uploader Name:
        <input
          type="text"
          name="uploaderName"
          value={formData.uploaderName}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
        />
      </label>
      <label className="block mb-2">
        Uploader Email:
        <input
          type="email"
          name="uploaderEmail"
          value={formData.uploaderEmail}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
        />
      </label>
      <label className="block mb-2">
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
        className="block w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default DisasterForm;
