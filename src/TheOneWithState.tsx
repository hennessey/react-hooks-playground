import React, { useState, SFC } from "react";

const Counter: SFC<any> = () => {
  const [count, setCount]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState<number>(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Let's kick this up a notch
      </button>
    </div>
  );
};

export default Counter;
