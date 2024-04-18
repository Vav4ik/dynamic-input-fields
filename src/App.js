import { useState } from "react";

import "./dynamic-form-style.css";

//taken from this amazing article
//https://medium.com/@juniormarch48/how-to-build-a-dynamic-controlled-form-with-react-hooks-2023-7a8dcd825e95

function App() {
  //owner
  const [owner, setOwner] = useState({
    owner: "",
    description: "",
  });
  const handleOwnerChange = (e) =>
    setOwner({
      ...owner,
      [e.target.name]: [e.target.value],
    });

  //cats
  const blankCat = { name: "", age: "" };
  const [cats, setCats] = useState([{ ...blankCat }]);

  const addCatHandler = () => {
    setCats([...cats, { ...blankCat }]);
  };

  const removeCatHandler = (idx) => {
    // const updatedCats = cats.filter((_, index) => index !== idx);
    const updatedCats = cats.toSpliced(idx, 1);
    setCats(updatedCats);
  };

  //catChangeHandler uses custom attribut data_idx, accessed by dataset property
  //https://stackoverflow.com/questions/45602877/best-practice-for-retrieving-the-data-attribute-value-in-react
  const catChangeHandler = (e) => {
    const updatedCats = [...cats];
    updatedCats[e.target.dataset.idx][e.target.dataset.field] = e.target.value;
    setCats(updatedCats);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(cats);
  };
  console.log(cats);

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="owner">Owner</label>
      <input
        type="text"
        name="owner"
        id="owner"
        value={owner.owner}
        onChange={handleOwnerChange}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={owner.description}
        onChange={handleOwnerChange}
      />
      <input type="button" value="Add New Cat" onClick={addCatHandler} />
      {cats.map((val, idx) => {
        const catId = `name-${idx}`;
        const ageId = `age-${idx}`;
        return (
          <div key={`cat-${idx}`}>
            <label htmlFor={catId}>{`Cat #${idx + 1}`}</label>
            <input
              type="text"
              name={catId}
              data-idx={idx}
              data-field="name"
              id={catId}
              value={cats[idx].name}
              onChange={catChangeHandler}
            />
            <label htmlFor={ageId}>Age</label>
            <input
              type="text"
              name={ageId}
              data-idx={idx}
              data-field="age"
              id={ageId}
              value={cats[idx].age}
              onChange={catChangeHandler}
            />
            <input
              type="button"
              value="Remove Cat"
              onClick={removeCatHandler.bind(null, idx)}
            />
          </div>
        );
      })}
      <input type="submit" value="Submit" />
    </form>
  );
}

export default App;
