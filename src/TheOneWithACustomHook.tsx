import React, { SFC } from "react";
import useGithubApi from "./custom-hooks/useGithubApi";

const TheOneWithACustomHook: SFC = () => {
   // Whether or not this hook will trigger a re-render
   // isn't obvious...
  const [isLoading, user] = useGithubApi("hennessey");

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return user && <h2>{user.login} only has {user.followers} followers</h2>;
};

export default TheOneWithACustomHook;
