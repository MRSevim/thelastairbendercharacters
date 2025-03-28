import React, { useState, useEffect, useRef } from "react";
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
  const [scrolledDown, setScrolledDown] = useState(false);
  const page = useRef(1);

  const fetchItems = async () => {
    setIsLoading(true);

    const result = await axios(
      `https://last-airbender-api.fly.dev/api/v1/characters`,
      {
        params: {
          name: query ? query : undefined,
          perPage: query ? undefined : 20,
          page: query ? undefined : page.current,
        },
      }
    );

    setIsLoading(false);
    return result.data;
  };

  useEffect(() => {
    const fetch = async () => {
      setItems([]);
      const data = await fetchItems();
      setItems(data);
    };
    fetch();
  }, [query]);

  useEffect(() => {
    const fetch = async () => {
      page.current += 1;
      const data = await fetchItems();
      setItems((prev) => [...prev, ...data]);
    };

    if (scrolledDown && items.length < 497) {
      fetch();
      setScrolledDown(false);
    }
  }, [scrolledDown]);

  useEffect(() => {
    const onScroll = (e) => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight;

      if (scrolledToBottom) {
        setScrolledDown(true);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const queryFunction = (q) => {
    setQuery(q);
  };

  return (
    <div className="container">
      <Header />
      <Search onSearch={queryFunction} />
      <div className="characters-container">
        {isLoading && !scrolledDown && <Spinner />}
        <Characters isLoading={isLoading} items={items} />
        {isLoading && scrolledDown && <Spinner />}
      </div>
    </div>
  );
};

export default App;
