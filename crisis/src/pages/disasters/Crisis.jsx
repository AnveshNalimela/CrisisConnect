import React, { useEffect } from "react";

const Crisis = () => {
  useEffect(() => {
    fetchDisasters;
  }, []);
  const fetchDisasters = () => {
    axios
      .get("http://localhost:3001/getDisaster")
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return <div>Hello world</div>;
};

export default Crisis;
