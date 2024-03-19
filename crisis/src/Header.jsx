const Header = () => {
  return (
    <div>
      <div class="bg-sky-500 p-4 flex justify-between items-center">
        <div class="text-white  text-6xl font-bold p-10 w-1/2  font-bold">
          Crisis Connect
        </div>

        <div class="flex space-x-4">
          <button class="text-white bg-pink-500 hover:bg-pink-600 rounded text-white font-bold py-2 px-4 ">
            {" "}
            Donate
          </button>
          <button class="text-white bg-pink-500 hover:bg-pink-600  rounded text-white font-bold py-2 px-4 ">
            Help Now
          </button>
          <button class="text-white bg-pink-500 hover:bg-pink-600 rounded  text-white font-bold py-2 px-4 ">
            {" "}
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
