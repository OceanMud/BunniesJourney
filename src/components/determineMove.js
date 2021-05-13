const determineMove = (current, possible) => {
  if (current === 0 && (possible === 1 || possible === 3)) {
    return true;
  }
  if (current === 1 && (possible === 0 || possible === 2 || possible === 4)) {
    return true;
  }

  if (current === 3 && (possible === 0 || possible === 4 || possible === 6)) {
    return true;
  }
  if (
    current === 4 &&
    (possible === 1 || possible === 3 || possible === 5 || possible === 7)
  ) {
    return true;
  }
  if (current === 5 && (possible === 2 || possible === 4 || possible === 8)) {
    return true;
  }
  if (current === 6 && (possible === 3 || possible === 7)) {
    return true;
  }
  if (current === 7 && (possible === 4 || possible === 6 || possible === 8)) {
    return true;
  }
  if (current === 8 && (possible === 7 || possible === 5)) {
    return true;
  }

  return false;
};

export default determineMove;
