import { useSelector } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";

const Loader = () => {
  const { loader } = useSelector((store) => store.user);
  return (
    <div className="w-full h-full fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-[rgba(0,0,0,0.90)]">
      <FadeLoader
        lsize={100}
        color="#FFA3BE"
        loading={loader}
        speedMultiplier={1.5}
      />
      <h1 className="text-[20px] text-[#F9E6E6] font-serif font-semibold mt-4">
        Please Wait...
      </h1>
    </div>
  );
};

export default Loader;
