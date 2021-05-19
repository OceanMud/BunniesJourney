import React, { useEffect } from "react";

import useSound from "use-sound";

const UseMusicFile = (status) => {
  useEffect(() => {
    console.log("mounted");
    playMusic();
    return () => {
      console.log("unmounted");
    };
  }, [status]);

  return <div></div>;
};
export default UseMusicFile;
