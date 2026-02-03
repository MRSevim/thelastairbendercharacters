const Search = ({ onSearch }) => {
  const onChange = (q) => {
    onSearch(q);
  };

  return (
    <section className="search">
      <input
        type="text"
        name="search"
        className="form-control"
        placeholder="Search characters"
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
    </section>
  );
};

export default Search;
