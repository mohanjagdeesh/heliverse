import Cookies from "js-cookie";
import Header from "../home/Header";
import { useQuery } from "react-query";
import { GetTeamMembers } from "../../api/teamsAPI";

const Teams = () => {
  const userEmail = Cookies.get("userEmail");
  const { data: teamMembers } = useQuery({
    queryKey: ["userTeams"],
    queryFn: async () => {
      const result = await GetTeamMembers(userEmail);
      return result;
    },
  });

  const teamName = teamMembers ? teamMembers[0]?.domain : "";
  return (
    <div className=" bg-[#F9E6E6] h-screen w-full">
      <div className=" w-4/5 mx-auto">
        <Header />
        <div className="flex justify-center gap-5 mb-5">
          <h1 className=" text-[13px] md:text-[20px] font-bold">
            Team :- {teamName}
          </h1>
          <h1 className="text-[13px] md:text-[20px] font-bold">
            Team Length :- {teamMembers?.length}
          </h1>
        </div>
        <div className="w-full flex flex-col md:flex-row md:flex md:flex-wrap h-[70vh] md:h-[60vh] justify-start gap-2 overflow-y-auto">
          {teamMembers?.map((each) => (
            <div
              key={each?.id}
              className=" bg-[#FFA3BE] rounded-md h-[200px] w-full md:w-1/3 lg:w-[350px] flex flex-col gap-1 p-2"
            >
              <img
                className="bg-white rounded-full h-[50px] w-[50px] self-center"
                src={`${each?.avatar}`}
                alt="userPic"
              />
              <h1>Name:-{each?.name}</h1>
              <h1>Gender:-{each?.gender}</h1>
              <h1>Email:-{each?.email}</h1>
              <h1>Domain:-{each?.domain}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
