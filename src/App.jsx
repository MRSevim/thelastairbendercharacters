import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Header from "./components/Header";
import Characters from "./components/Characters";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import "./App.css";

const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const requestId = useRef(0); // to prevent stale updates

  const fetchItems = useCallback(async () => {
    setIsLoading(true);

    const result = await axios(
      `https://last-airbender-api.fly.dev/api/v1/characters`,
      {
        params: {
          name: query,
          perPage: 20,
          page,
        },
      },
    );

    setIsLoading(false);

    return result.data;
  }, [query, page]);

  useEffect(() => {
    const id = ++requestId.current;

    const fetch = async () => {
      const data = await fetchItems();
      if (id === requestId.current) {
        setItems((prev) => (page === 1 ? data : [...prev, ...data]));
      }
    };
    fetch();
  }, [query, page, fetchItems]);

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight;

      if (scrolledToBottom) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const queryFunction = (q) => {
    setQuery(q);
    setPage(1);
    setItems([]);
  };

  return (
    <div className="container">
      <Header />
      <Search onSearch={queryFunction} />
      <Characters items={items} />
      {isLoading && <Spinner />}
    </div>
  );
};

export default App;
