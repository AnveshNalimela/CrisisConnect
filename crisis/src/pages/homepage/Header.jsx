import donate from "../../assets/images/donation.png";
import help from "../../assets/images/help.png";
import icon from "../../assets/images/icon.png";
import volunteer from "../../assets/images/volunteer.png";
const Header = () => {
  return (
    <div>
      <div class="bg-sky-600 p-4 flex justify-between items-center">
        <img src={icon} className="h-20 w-20 bg-sky-600 ml-20"></img>
        <div class="text-white  text-6xl font-bold py-5 w-fit  font-bold">
          Crisis Connect
        </div>

        <div class="flex space-x-4">
          <button class="text-black hover:bg-sky-500 rounded text-2xl  font-bold w-20 h-22">
            {" "}
            <img src={donate} className=""></img>
          </button>
          <button class="text-black hover:bg-sky-500  rounded text-2xl  w-100 font-bold  w-20 h-22 ">
            <img src={volunteer} className="h-20 w-20 "></img>
          </button>
          <a href="/disaster">
            <button class="text-black  hover:bg-sky-500 rounded text-lg w-100 font-bold p-2 w-20 h-22 ">
              {" "}
              <img src={help} className="h-20 w-20 "></img>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Header;
