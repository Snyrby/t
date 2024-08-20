import { Mic, Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="w-96 flexBetween rounded-lg h-10 bg-gray-200/30">
      <input
        type="search"
        className="w-full px-4 py-2 focus:outline-none bg-transparent"
        placeholder="Search..."
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
      <div className="flex">
        <Mic size={20} className="text-gray-400" />
        <Search size={20} className="text-gray-400" />
      </div>
    </div>
  );
};
