import help from "../assets/images/help.png";
import icon from "../assets/images/icon.png";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-sky-600 text-white">
      <div className="flex items-center mx-auto">
        <div className="text-white flex text-6xl font-bold py-5 w-fit">
          <img src={icon} className="h-20 w-20 bg-sky-600"></img>
          Crisis Connect
        </div>
      </div>
      <div className="flex items-center">
        <button className="mr-2">
          <a href="/newDisaster" className="text-white text-semibold text-xl">
            <img src={help} alt="register" className="w-20 h-15" />
            Register
          </a>
        </button>
      </div>
    </header>
  );
};
export default Header;
