import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import mergeNames from "../../util/mergeNames"

const SearchBar = ({func}) => {
  const [search, setSearch] = useState('')
  return (
    <div className="flex flex-row w-full overflow-hidden rounded-md group bg-slate-200">
      <input
        placeholder="Хайх.."
        className="flex-1 px-4 py-1 bg-transparent outline-none lg:py-2"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="px-4 py-1 transition-all ease-in-out lg:py-2 bg-mainBlossom group-hover:bg-teal-600" onClick={() => func(search)}>
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
