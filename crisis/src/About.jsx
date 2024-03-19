const About = () => {
  return (
    <div className="flex mx-10 my-5">
      <img
        className="w-1/3 rounded h-1/2 mx-5 my-3"
        src="https://static.vecteezy.com/system/resources/previews/010/431/518/original/disaster-management-concept-icon-heritage-protection-developmental-activity-abstract-idea-thin-line-illustration-isolated-outline-drawing-editable-stroke-vector.jpg"
        alt="Crisis Connect"
      ></img>
      <div className="w-fit ml-10 my-20 h-1/2">
        <h4 className="text-3xl font-semi-bold text-sky-700 m-10">
          Preparation through education is less costly than learning through
          tragedy.
        </h4>
        <p className="text-center-xl font-sanserif m-10">
          Effective crisis and disaster management require a multidisciplinary
          approach, involving government agencies, non-governmental
          organizations, communities, and individuals. Continuous improvement,
          learning from experiences, and staying adaptable are crucial elements
          in enhancing resilience and minimizing the impact of crises and
          disasters.
        </p>
      </div>
    </div>
  );
};

export default About;
