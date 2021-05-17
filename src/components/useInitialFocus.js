import { useEffect } from "react";

const useInitialfocus = (ref) => {
  useEffect(() => {
    ref.current.focus();

    return () => {};
  }, [ref]);
};
export default useInitialfocus;
