import React, { SFC, useContext, createContext, useReducer } from "react";

type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "@@initial" }; // Just a 'bottom' value to make setting defaults easier

const counterReducer: React.Reducer<number, CounterAction> = (
  state: number,
  action: CounterAction
) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};

interface ICounterContext {
  counterValue: number;
  dispatch: React.Dispatch<CounterAction>;
}

// Setting up some sane default values. These get
// overwritten later with real values from the useReducer
// hook
// Binding these values to 'initialContext' variable name
// makes it more explicit what's going on when we call `createContext`
const initalContext: ICounterContext = {
  counterValue: 0,
  dispatch: () => ({ type: "@@initial" })
};

// Set up our context to share amongst the subtree...
let CounterContext = createContext<ICounterContext>(initalContext);

// Configure our 'Provider' component
const Grandparent: SFC<any> = ({ children }) => {
  let [state, dispatch] = useReducer(counterReducer, 0);

  // Pass out reducer state and dispatcher into our context
  let injectedContextValue = {
    counterValue: state,
    dispatch
  };

  return (
    <CounterContext.Provider value={injectedContextValue}>
      {children}
    </CounterContext.Provider>
  );
};

const Child: SFC<{}> = () => {
  // Reach out 'sideways' for state from provided by the Grandparent!
  const context = useContext(CounterContext);

  return (
    <section>
      <h2>Behold, a Reduxy Hook pattern</h2>
      <h3>{context.counterValue}</h3>
      <button onClick={() => context.dispatch({ type: "increment" })}>
        Increment
      </button>
      <button onClick={() => context.dispatch({ type: "decrement" })}>
        Decrement
      </button>
    </section>
  );
};

const Parent: SFC<{}> = () => {
  return <Child />;
};

const TheOneThatsReduxy: SFC<{}> = () => {
  return (
    <Grandparent>
      <Parent />
    </Grandparent>
  );
};

export default TheOneThatsReduxy;
