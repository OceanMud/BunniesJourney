import axios from "axios";

export const getLeaderBoard = () => {
  return axios
    .get("https://merchandise-database.herokuapp.com/highscore", {})
    .then(function (response) {
      if (response.status === 200) {
        return response;
      } else {
        throw new Error("Error");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const submitLeaderboard = (owner, score, hero) => {
  return axios
    .post("https://merchandise-database.herokuapp.com/highscore", {
      owner,
      score,
      hero,
    })
    .then(function (response) {
      if (response.status === 200) {
        return response;
      } else {
        throw new Error("Error");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
