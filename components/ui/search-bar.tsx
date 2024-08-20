import { Mic, Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="w-auto flexBetween">
      <p className="text-base tracking-tight">What can we help you find?</p>
      <div className="flex">
        <Mic size={20} className="text-gray-400" />
        <Search size={20} className="text-gray-400" />
      </div>
    </div>
  );
};
