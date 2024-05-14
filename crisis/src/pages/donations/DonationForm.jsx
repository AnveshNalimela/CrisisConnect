import axios from "axios";
import React, { useReducer, useState } from "react";
import hands from "../../assets/images/hands.png";


const initialState = {
  name: "",
  contactNo: "",
  amount: 0,
  message: "",
  city: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const DonationForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setname] = useState("");
  const [formData, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE", field: name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to backend
    axios
      .post("http://localhost:3001/addDonation", formData)
      .then((res) => {
        console.log(res);
        dispatch({ type: "RESET" });
        countDocuments();
      })
      .catch((err) => console.error(err));
    setname(formData.name);
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="max-w-md pt-10 ">
      {submitted ? (
        <div className="max-w-xl mx-auto flex items-center justify-center  bg-white shadow-lg rounded-lg overflow-hidden dark:bg-zinc-800">
          <div className="px-4 py-2">
            <div className="flex items-center justify-center">
              <img
                src={hands}
                alt="profile"
                className="w-32 h-32 rounded-full"
              />
            </div>

            <h2 className="text-2xl font-bold text-center mb-2">Thank You!</h2>
            <p className="text-center my-3">
              Dear {name}, we appreciate your support.
            </p>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-sky-300  shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contactNo"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contact No
            </label>
            <input
              type="text"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              placeholder="Enter your contact number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Donation Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              min="100" // Set the minimum value
              step="100"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter the amount donated"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Message"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Any Message.
            </label>
            <input
              type="text"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Thanks for helping..!!"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="city"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City.."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DonationForm;
