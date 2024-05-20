import { SearchBar } from "@lobehub/ui";

const AgentSearchBar = ({ keyword, setKeyword }) => {
  return (
    <SearchBar
      allowClear
      onChange={(e) => {
        setKeyword(e.target.value);
      }}
      enableShortKey
      placeholder="Search agent name, description, keywords..."
      shortKey={"k"}
      value={keyword}
      className="bg-white rounded-lg"
      spotlight
      type="ghost"
    />
  );
};

export default AgentSearchBar;
