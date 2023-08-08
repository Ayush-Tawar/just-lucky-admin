import { useEffect, useState } from "react";

export const useEffectSkipFirst = (callback, deps) => {
  const [isFirst, setIsFirst] = useState(true);
  useEffect(() => {
    if (!isFirst) {
      callback();
    }
    setIsFirst(false);
  }, deps);
};
