import axios from "axios";
import { useEffect, useState } from "react";
import user from "../../assets/images/user.png";

const Volunteers = () => {
  const [volunteers, setVolunteer] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  useEffect(() => {
    const fetchVolunteers = () => {
      axios
        .get("http://localhost:3001/getVolunteer")
        .then((res) => setVolunteer(res.data))
        .catch((err) => console.error(err));
    };
    console.log(volunteers);
    volunteers.map((volunteer) => {
      console.log(volunteer.age);
    });
    fetchVolunteers();
  }, []);
  const handleVolunteerClick = (volunteerId) => {
    axios
      .get(`http://localhost:3001/getVolunteer/${volunteerId}`)
      .then((res) => {
        setSelectedVolunteer(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="grid gap-5 grid-cols-2  px-20 py-10  ">
        {selectedVolunteer && (
          // <div className="popup">
          //   <div className="popup-inner">
          //     <h2>Name:{selectedVolunteer.name}</h2>
          //     <p>Email: {selectedVolunteer.email}</p>
          //     <p>City: {selectedVolunteer.city}</p>
          //     {/* Add more details here as needed */}
          //     <button onClick={() => setSelectedVolunteer(null)}>Close</button>
          //   </div>
          // </div>
          <div class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50 dark:bg-white dark:bg-opacity-50">
            <div class="max-w-xl mx-4 bg-white shadow-lg rounded-lg overflow-hidden dark:bg-zinc-800">
              <div class="px-4 py-2">
                <div class="flex items-center">
                  <div class="mr-4">
                    <img
                      src={user}
                      alt="profile"
                      class="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div>
                    <h2 class="text-lg font-bold">{selectedVolunteer.name}</h2>
                    <p class="text-zinc-600">{selectedVolunteer.email}</p>
                    <p class="text-zinc-600">{selectedVolunteer.phone}</p>
                    <p class="text-zinc-600">{selectedVolunteer.address}</p>
                  </div>
                </div>
                <div class="mt-4">
                  <h3 class="text-lg font-bold">Skills</h3>
                  <p class="text-zinc-600">{selectedVolunteer.skills}</p>
                </div>
                <div class="mt-4">
                  <h3 class="text-lg font-bold">Profession</h3>
                  <p class="text-zinc-600">{selectedVolunteer.profession}</p>
                </div>
              </div>
              <button
                className="ml-5 mb-5 px-3 py-2 bg-blue-400 hover:bg-blue-600 rounded"
                onClick={() => setSelectedVolunteer(null)}
              >
                X Close
              </button>
            </div>
          </div>
        )}
        {volunteers.map((member) => (
          <div
            key={member._id}
            onClick={() => handleVolunteerClick(member._id)}
          >
            <div className="px-4 py-2">
              <div className="flex items-center">
                <div className="mr-4">
                  <img
                    src={user}
                    alt="profile"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-bold">{member.name}</h2>
                  <p className="text-zinc-600">{member.email}</p>
                  <p className="text-zinc-600">{member.city}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Volunteers;
