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
  //const url = "https://dashboard.heroku.com/apps/dry-everglades-93142";
  const url = "https://git.heroku.com/dry-everglades-93142.git";
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
        {notes.length} notes on server {url}
      </div>
    </div>
  );
};

export default App;
