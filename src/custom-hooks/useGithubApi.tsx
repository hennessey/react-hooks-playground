import { useState, useEffect, useDebugValue } from "react";

interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  url: number;
  html_url: number;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: number;
  updated_at: number;
}

type isLoading = Boolean;

// You can compose together Hooks into a custom hook. No
// more clumsy Higher-order components or Render-prop components!
export default function useGithubApi(
  userName: string
): [isLoading, GithubUser | null]{
  const [user, setUser] = useState<GithubUser | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  // Display a label in devtools next to this hook.
  useDebugValue(`IsLoading: ${isLoading}`)
  useEffect(() => {
    typeSafeFetch<GithubUser>(`https://api.github.com/users/${userName}`).then(
      user => {
        setIsLoading(false);
        setUser(user);
      }
    );
  }, []); // Ensure this only gets called on mount

  return [isLoading, user];
}

async function typeSafeFetch<T>(url: string): Promise<T> {
  const response = await fetch(url);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    let deserialized: Promise<T> = response.json();
    return deserialized;
}
