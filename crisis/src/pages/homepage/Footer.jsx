import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white p-8">
        <div className="container w-full flex justify-between">
          <div className="ml-10 w-1/3">
            <ul>
              <li className="text-sm py-1">
                <a href="#">National Disaster Management Authority (NDMA)</a>
              </li>
              <li className="text-sm py-1">
                <a href="#">National Disaster Response Force (NDRF)</a>
              </li>
              <li className="text-sm py-1">
                <a href="#">
                  National Institute for Disaster Management (NIDM)
                </a>
              </li>
              <li className="text-sm py-1">
                <a href="#">Disaster Management Division, MHA</a>
              </li>
              <li className="text-sm py-1">
                <a href="#">
                  National Platform for Disaster Risk Reduction (NPDRR)
                </a>
              </li>
            </ul>
          </div>
          <div className="container ml-20 mt-4 w-1/3 text-sm">
            <p className="text-gray-300">
              Developed By
              <br />
              Dept of Information Technology,
              <br />
              Chaitanya Bharathi Institute of Technology,
              <br />
              Hyderabad
              <br />
              India - 200075.
              <br />
              Reserved for Government of India.
            </p>
          </div>
          <div className="container ml-20 mt-4 w-1/3  text-sm">
            <p className="text-gray-300 mt-2">
              Reach us at
              <br />
              <a
                href="mailto:support@pupilfirst.org"
                className="text-white underline"
              >
                support@crisisconnect.org
              </a>
            </p>
            <p className="text-gray-400 mt-2">
              Privacy Policy
              <br />
              Terms & Conditions
              <br />
              National Disaster Management Authority (NDMA)
              <br />
              2024 Government of India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
