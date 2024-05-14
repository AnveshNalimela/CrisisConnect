///////////////////////////////////////Comment Modal////////////////////////


const CommentModal = ({ isOpen, onClose, id }) => {
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
      fetchComments(id);
      // If the request is successful, return the created comment
      console.log(responsec.data);
    } catch (error) {
      // If an error occurs, log the error and return null
      console.error("Error creating comment:", error);
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

export default CommentModal;
