import React, { SFC, useEffect } from "react";

interface Props {
  SomeProp: boolean;
}
// Effects are different from lifecycles in that they are
// are scheduled to run after render and not run
// synchrnonously after a particular lifecyle event. This is
// an important distinction! Unlike class-level lifecycle
// events they aren't blocking.
const TheOneWithEffectfulLifecycles: SFC<Props> = ({ SomeProp }) => {
  // This is like componentDidMount
  useEffect(
    () => {
      console.log("I was scheduled to fire right after the first render! 😀");
    },
    [] // This argument lists the dependencies on this hook. React will only re-reun this effect if any of these dependencies change. Since it doesn't change after the first render (where it's mounted), it's effectively the same as componentDidMount in terms of how often it executes
  );

  // This is like componentDidUpdate
  useEffect(
    () => {
      console.log("I was be scheduled to fire after the component was updated! ✅");
    },
    [SomeProp] //  When this depdendent value changes, this effect will be re-executated. Props updating will also trigger a re-render so this is equivalent to a componentDidUpdate lifecycle hook in terms of what triggers it's execution
  );

  // This is like componentDidUnmount
  useEffect(() => {
    //When a component unmounts, the return function for an
    //effect is executed, so this is equivalent to the
    //componentDidUnmount lifecycle hook regarding when it
    //executes (and when it's returned function executes).
    // someThing.addEventListener(...);
    return () => {
      console.log("I was scheduled to fire after the component was unmounted! 👋");
    // someThing.removeEventListener(...);
    };
  });

  return <div>Rendering me caused some side effects</div>;
};

export default TheOneWithEffectfulLifecycles;
