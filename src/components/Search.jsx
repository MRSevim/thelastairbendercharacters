import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [text, setText] = useState("");

  const onChange = (q) => {
    setText(q);
    onSearch(q);
  };

  return (
    <section className="search">
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="Search characters"
          value={text}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
      </form>
    </section>
  );
};

export default Search;
