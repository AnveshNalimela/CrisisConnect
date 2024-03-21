const Header = () => {
  return (
    <div>
      <div class="bg-sky-600 p-4 flex justify-between items-center">
        <div class="text-white  text-6xl font-bold p-10 w-1/2  font-bold">
          Crisis Connect
        </div>

        <div class="flex space-x-4">
          <button class="text-black bg-sky-200 hover:bg-cyan-600 rounded text-2xl w-100 font-bold py-2 px-4 ">
            {" "}
            Donate
          </button>
          <button class="text-black bg-sky-200 hover:bg-cyan-600 rounded text-2xl  w-100 font-bold py-2 px-4 ">
            Help Now
          </button>
          <button class="text-black bg-sky-200 hover:bg-cyan-600 rounded text-2xl w-100 font-bold py-2 px-4 ">
            {" "}
            Ask For Help..
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
