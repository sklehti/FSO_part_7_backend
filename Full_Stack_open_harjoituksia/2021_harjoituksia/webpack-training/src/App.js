import React, { useState } from "react";
import "./index.css";
import axios from "axios";

const useNotes = (url) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      setNotes(response.data);
    });
  }, [url]);
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  const url = "";
  const notes = useNotes(url);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick}>press</button>
      <div>
        {notes.length} noteson server {url}
      </div>
    </div>
  );
};

export default App;
