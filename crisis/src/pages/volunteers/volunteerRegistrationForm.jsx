import axios from "axios";
import React, { useReducer } from "react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  profession: "",
  age: "",
  address: "",
  skills: "",
  availability: "",
  // Add more fields as needed
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const VolunteerRegistrationForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/addVolunteer", state)
      .then((res) => {
        console.log(res);
        dispatch({ type: "RESET" });
      })
      .catch((err) => console.error(err));
    console.log("Form submitted:", state);
  };

  return (
    <div className="w-full h-screen bg-sky-300">
      <h2 className="text-5xl border-gary-200 ml-20 py-5 text-white font-bold mb-4">
        Volunteer Registration
      </h2>
      <form className="mb-4 flex" onSubmit={handleSubmit}>
        <div className="col1 w-1/3 h-screen m-10 ">
          <div className="name my-5">
            {" "}
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={state.name}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="my-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="my-4">
            <label htmlFor="phone" className="block mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={state.phone}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="my-4">
            <label htmlFor="age" className="block mb-1">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={state.age}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="my-4">
            <label htmlFor="address" className="block mb-1">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={state.address}
              onChange={handleChange}
              className="w-full border-gray-300 h-20 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              rows="4"
              cols="10"
            />
          </div>
        </div>
        <div className="col2 w-1/3 h-screen m-10 ">
          <div className="my-4">
            <label htmlFor="profession" className="block mb-1">
              Profession
            </label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={state.profession}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="my-4">
            <label htmlFor="skills" className="block mb-1">
              Skills
            </label>
            <textarea
              id="skills"
              name="skills"
              value={state.skills}
              onChange={handleChange}
              className="w-full border-gray-300  rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              rows="5"
              cols="10"
            />
          </div>
          <div className="my-4">
            <label htmlFor="availability" className="block mb-1">
              Availability
            </label>
            <textarea
              id="availability"
              name="availability"
              value={state.availability}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-1/4 my-7 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        </div>

        {/* Add more fields here */}
      </form>
    </div>
  );
};

export default VolunteerRegistrationForm;
