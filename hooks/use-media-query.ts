import * as React from "react";

export interface UseMediaQueryOptions {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
}

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (typeof window === "undefined") return defaultValue;
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = React.useState<boolean>(() => {
    if (initializeWithValue) return getMatches(query);
    return defaultValue;
  });

  React.useEffect(() => {
    const matchMedia = window.matchMedia(query);

    const handleChange = () => setMatches(matchMedia.matches);

    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
