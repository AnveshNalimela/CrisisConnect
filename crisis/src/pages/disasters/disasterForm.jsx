import axios from "axios";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer.jsx";
import Header from "../../Components/Header.jsx";
import "./form.css"; // Assuming you have a CSS file named form.css

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE", field: name, value });
  };

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
  const sendEmail = async (data) => {
    try {
      console.log(data);
      const res = await axios.post("http://localhost:8080/sendEmail", data);
      console.log(res);
      console.log(res.data); // Output: Email sent successfully!
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData); // Log form data including uploaded images

    // Send formData to backend server
    try {
      const response = await axios.post(
        "http://localhost:3001/addDisaster",
        formData
      );
      sendEmail(formData);
      navigate("/");
      console.log(response.data); // Log response from backend

      dispatch({ type: "RESET" }); // Reset form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div>
      <Header />
      <div className=" main justify-center">
        <form onSubmit={handleSubmit}>
          <h2 className="heading">Registartion of Disaster.</h2>
          <h2 className="subhead  text-semibold">Details:</h2>
          <div className="">
            <label className=" label text-lg  block mb-4 ">
              Crisis Type:
              <input
                type="text"
                name="crisisType"
                placeholder="Eg:Flood, Fire etc."
                value={formData.crisisType}
                onChange={handleChange}
                className=" input ml-10 "
                required
              />
            </label>
            <label className=" label block mb-4 text-semibold">
              Location:
              <input
                type="text"
                name="location"
                placeholder="Eg:kerala"
                value={formData.location}
                onChange={handleChange}
                className=" input block w-full"
                required
              />
            </label>
            <label className=" label block mb-4 text-semibold">
              Severity:
              <input
                type="text"
                name="severity"
                placeholder="Extreme,moderate etc.."
                value={formData.severity}
                onChange={handleChange}
                className=" input block w-full "
              />
            </label>
            <label className=" label block mb-4 text-semibold">
              Date and Time of Occurrence:
              <input
                type="datetime-local"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                className=" input block w-full "
              />
            </label>
            <label className=" label block mb-4 text-semibold">
              Description:
              <textarea
                name="description"
                placeholder="how is the situation..?"
                value={formData.description}
                onChange={handleChange}
                className="input block w-full"
              ></textarea>
            </label>
            <label className=" label block mb-4 text-semibold">
              Number of Casualties:
              <input
                type="number"
                name="casualties"
                min="0"
                value={formData.casualties}
                onChange={handleChange}
                className="input block"
              />
            </label>
            <label className=" label block mb-4 text-semibold">
              Affected Population:
              <input
                type="number"
                name="affectedPopulation"
                min="0"
                value={formData.affectedPopulation}
                onChange={handleChange}
                className="input block "
              />
            </label>
            <label className=" label block mb-4 text-semibold">
              Emergency Response Needed:
              <input
                type="text"
                name="emergencyResponse"
                value={formData.emergencyResponse}
                onChange={handleChange}
                className="input block w-full "
              />
            </label>
          </div>

          <label className=" label block mb-4 text-semibold">
            Additional Notes:
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              className=" input block w-full "
            ></textarea>
          </label>
          <label className=" label block mb-4 text-semibold">
            Uploader Name:
            <input
              type="text"
              name="uploaderName"
              placeholder="Enter your Name"
              value={formData.uploaderName}
              onChange={handleChange}
              className=" input block w-1/3"
              required
            />
          </label>
          <label className=" label block mb-4 text-semibold">
            Uploader Email:
            <input
              type="email"
              name="uploaderEmail"
              placeholder="Enter you Email Address"
              value={formData.uploaderEmail}
              onChange={handleChange}
              className="input block w-1/3"
              required
            />
          </label>
          <label className=" label block mb-4 text-semibold">
            Upload Files
            <input
              type="file"
              lable="Image"
              name="myFile"
              id="file-upload"
              accept=".jpeg, .png, .jpg"
              onChange={handlePhotoUpload}
              multiple
              className="input block 1/3"
            />
          </label>
          <button
            type="submit"
            className="block w-1/3 px-4 py-2 mt-5 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default DisasterForm;
