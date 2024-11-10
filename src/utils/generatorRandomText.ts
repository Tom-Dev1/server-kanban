export const generatorRandomText = (num: number) => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < characters.length; i++) {
    if (result.length <= (num ? num : 10)) {
      const randomIndex =
        characters[Math.floor(Math.random() * characters.length)];
      result += randomIndex;
    }
  }
  return result.toLocaleLowerCase();
};
