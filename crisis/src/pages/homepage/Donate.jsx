import DonationForm from "../donations/DonationForm.jsx";

const Donate = () => {
  return (
    <div className="flex p-8">
      <div className="w-1/2">
        <div className="center flex mt-10 mx-30">
          <img
            className="w-20 h-20 inline-block"
            src="https://cdn-icons-png.flaticon.com/512/2618/2618524.png"
            alt="icon"
          />
          <h2 className="text-5xl inline-block text-black pt-4 mx-4 mt-5 font-bold text-center">
            Donate...!
          </h2>
        </div>
        <DonationForm />
      </div>
      <div className="w-1/2 pr-8">
        <div className="text-3xl font-sans text-white mx-20 my-5 rounded bg-cyan-400 p-2 h-0.3">
          <img
            className=""
            src="https://cdn.quotesgram.com/img/9/13/2144453108-Giving_Quote_FreePrintable_2.jpg"
            alt="donate icon"
          />
        </div>
      </div>
    </div>
  );
};

export default Donate;
