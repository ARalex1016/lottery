export const generateRandomName = (names, excludedNameList = []) => {
  // Filter out names that are in the excluded list
  const availableNames = names.filter(
    (name) => !excludedNameList.includes(name)
  );

  if (availableNames.length === 0) {
    throw new Error("No names available after exclusion.");
  }

  // Generate a secure random index within the range of availableNames length
  const randomIndexArray = new Uint32Array(1);
  window.crypto.getRandomValues(randomIndexArray);
  const randomIndex = randomIndexArray[0] % availableNames.length;

  return availableNames[randomIndex];
};

export const generateRandomNumber = (min, max) => {
  // Ensure that min is less than max
  if (min >= max) {
    throw new Error("min should be less than max");
  }

  // Calculate the range
  const range = max - min + 1;

  // Create a Uint32Array to hold the random number
  const randomBuffer = new Uint32Array(1);
  // Generate a cryptographically secure random value
  window.crypto.getRandomValues(randomBuffer);

  // Get a random number within the specified range
  const randomNumber = (randomBuffer[0] % range) + min;

  return randomNumber;
};

export const getOrdinal = (n) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const modulo100 = n % 100;

  // Handle special cases for 11, 12, and 13
  if (modulo100 >= 11 && modulo100 <= 13) {
    return n + "th";
  }

  // Get the last digit of the number
  const modulo10 = n % 10;

  // Determine the appropriate suffix
  const suffix = suffixes[modulo10] || "th";

  return n + suffix;
};

export const capitalizeFirstLetter = (str) => {
  return str.trim().charAt(0).toUpperCase() + str.slice(1);
};
