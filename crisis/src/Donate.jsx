const Donate = () => {
  return (
    <div class="flex p-8 bg-pink-200 rounded ">
      <div class="w-1/2 ">
        <div class="center flex mt-10 mx-20">
          <img
            class="w-20  h-20  inline-block"
            src="	https://cdn-icons-png.flaticon.com/512/2618/2618524.png"
            alt="icon"
          ></img>
          <h2 class="text-5xl inline-block text-black pt-4 mx-4 mt-5 font-bold text-center">
            Donate...!
          </h2>
        </div>
        <div className="min-h-screen flex items-center justify-center bg-sky-blue">
          <form className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4">Donation Form</h2>

            <div className="mb-4">
              <label
                htmlFor="donationType"
                className="block text-sm font-medium text-gray-600"
              >
                Donation Type
              </label>
              <select
                id="donationType"
                name="donationType"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Donation Type</option>
                <option value="money">Money</option>
                <option value="goods">Goods</option>
                <option value="time">Time</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="disasterType"
                className="block text-sm font-medium text-gray-600"
              >
                Disaster Type
              </label>
              <select
                id="disasterType"
                name="disasterType"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Disaster Type</option>
                <option value="earthquake">Earthquake</option>
                <option value="flood">Flood</option>
                <option value="wildfire">Wildfire</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div class="w-1/2 pr-8">
        <div class="text-3xl font-sans text-white mx-20 my-5 bg-sky-400 rounded px-10 h-0.3 py-10 ">
          <img
            class="mb-10"
            src="https://cdn.quotesgram.com/img/9/13/2144453108-Giving_Quote_FreePrintable_2.jpg"
            alt="donate icon"
          ></img>
          Alone we can do little,<br></br>
          Together we can do so much...!!
        </div>
      </div>
    </div>
  );
};

export default Donate;
