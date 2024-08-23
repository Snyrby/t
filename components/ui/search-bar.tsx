import { Mic, Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="xl:w-[34rem] w-full rounded-lg h-10 bg-gray-300/30">
      <div className="flex items-center w-full h-full px-4 py-2">
        <input
          type="search"
          className="w-full px-0 py-2 focus:outline-none bg-transparent placeholder:text-gray-600 text-base"
          placeholder="What can we help you find?"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <div className="flex items-center justify-between gap-3">
          <Mic size={20} className="text-gray-600 cursor-pointer" />
          <Search size={20} className="text-gray-600 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
