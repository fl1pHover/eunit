import { BsSearch } from "react-icons/bs";
import mergeNames from "../../util/mergeNames"

const SearchBar = () => {
  return (
    <div className="group bg-slate-200 w-full flex flex-row rounded-md overflow-hidden">
      <input
        placeholder="Хайх.."
        className="outline-none flex-1 bg-transparent lg:py-2 py-1 px-4"
      />
      <button className="lg:py-2 py-1 bg-mainBlossom px-4 group-hover:bg-teal-600 transition-all ease-in-out">
        <BsSearch
          className={mergeNames(
            "white__icon",
            "font-semibold lg:group-hover:scale-125 md:group-hover:scale-110 transition-all ease-in-out"
          )}
          size={20}
        />
      </button>
    </div>
  );
};

export default SearchBar;
