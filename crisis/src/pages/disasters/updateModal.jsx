import axios from "axios";
import { useState } from "react";

const UpdateModal = ({ isOpen, onClose, onUpdate, disaster }) => {
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
      window.location.reload();
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

export default UpdateModal;
