import UsersDashboard from "./UsersDashboard";

import Header from "./Header";

const Home = () => {
  return (
    <div className=" bg-[#F9E6E6] h-fit w-full">
      <div className=" w-11/12 mx-auto">
        <Header />
        <UsersDashboard />
      </div>
    </div>
  );
};

export default Home;
