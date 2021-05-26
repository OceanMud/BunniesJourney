import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import useSound from "use-sound";
import { getLeaderBoard } from "./utils";

const InitScreen = () => {
  const { setInitScreen } = useContext(UserContext);

  const [door, setDoor] = useState(false);

  const { music, setMusic } = useContext(UserContext);
  const { sound, setSound } = useContext(UserContext);
  const { setActionText } = useContext(UserContext);

  const [playbuttonHover] = useSound("/sounds/buttonhover.mp3", {
    volume: 0.5,
  });
  const [playDoor] = useSound("/sounds/door.mp3", {
    volume: 1,
  });

  useEffect(() => {
    window.mobileCheck = function () {
      let check = false;
      (function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    };

    if (window.mobileCheck() === false) {
      document.body.style.zoom = 1.4;
    }

    getLeaderBoard();
    setActionText("Welcome to Bunnies Journey!");

    return () => {};
  });

  return (
    <div className="relative overflow-hidden">
      <img
        alt="background"
        src="images/intropic.png"
        className="h-72 absolute"
      />
      <div className="flex">
        <img
          alt="background"
          src="images/door.png"
          className={`${
            !door ? "translate-x-0" : "-translate-x-36"
          } transform transition ease-in-out duration-2500 w-36 h-72 `}
        />
        <img
          alt="background"
          src="images/door.png"
          className={`${
            !door ? "translate-x-0" : "translate-x-36"
          } transform transition ease-in-out duration-2500 w-36 h-72 `}
        />
      </div>

      <div id="99" className="flex w-40 absolute right-9 space-x-1 top-2">
        <button
          onMouseEnter={() => {
            if (sound) {
              playbuttonHover();
            }
          }}
          className={`group focus:outline-none ${
            music
              ? "bg-green-500   bg-opacity-30  hover:bg-opacity-60"
              : "bg-red-500    bg-opacity-30  hover:bg-opacity-60"
          }   h-14 w-14  border-black border-2`}
        >
          <img
            alt="title"
            src={music ? "images/music.svg" : "images/musicoff.svg"}
            className=" ml-1 h-10 opacity-75 group-hover:opacity-100"
            onClick={() => {
              setMusic(!music);
            }}
          />
        </button>

        <button
          onMouseEnter={() => {
            if (sound) {
              playbuttonHover();
            }
          }}
          className={` shadow-2xl group focus:outline-none ${
            sound
              ? "bg-green-500   bg-opacity-30  hover:bg-opacity-60"
              : "bg-red-500    bg-opacity-30  hover:bg-opacity-60"
          }   h-14 w-14  border-black border-2`}
        >
          <img
            alt="title"
            src={sound ? "images/sound.svg" : "images/soundoff.svg"}
            className=" ml-1 h-10 opacity-75 group-hover:opacity-100"
            onClick={() => {
              setSound(!sound);
            }}
          />
        </button>
      </div>
      <div
        className="group absolute top-28  cursor-pointer right-24 h-20 w-20   bg-gray-400 border-4 rounded-full border-black    bg-opacity-60  hover:bg-opacity-80 shadow-xl"
        id="100"
      >
        <img
          onMouseEnter={() => {
            if (sound) {
              playbuttonHover();
            }
          }}
          alt="title"
          src="images/settingsplay.svg"
          className="h-16 ml-1 mt-1 opacity-70 group-hover:opacity-100"
          onClick={() => {
            document.getElementById(99).style.visibility = "hidden";
            document.getElementById(100).style.visibility = "hidden";
            if (sound) {
              playDoor();
            }

            setDoor(true);
            setTimeout(() => {
              setInitScreen(false);
            }, 1400);
          }}
        />
      </div>
      {/* 
      <img alt="main" src={hero} className="absolute top-44 left-28  h-16  " /> */}
    </div>
  );
};

export default InitScreen;
