import { useEffect } from "react";
import useSound from "use-sound";

const useInitialfocus = (ref) => {
  const [playMusic, { stop }] = useSound("./sounds/Field_loop.mp3");

  useEffect(() => {
    ref.current.focus();

    return () => {};
  }, [ref]);
};
export default useInitialfocus;
