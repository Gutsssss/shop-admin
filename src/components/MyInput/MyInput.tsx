import Search from "antd/es/transfer/search";
import { useState } from "react";

export const MyInput = () => {
  const [input, setInput] = useState("");
  return (
    <Search
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Start typing the text for the search product"
    />
  );
};
