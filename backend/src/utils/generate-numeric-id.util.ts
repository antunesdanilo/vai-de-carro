const generateNumericId = (): number => {
  // Gera um número aleatório dentro do intervalo de 1 a 2,147,483,647
  const maxInt = 2147483647;
  const randomId = Math.floor(Math.random() * maxInt) + 1;

  return randomId;
};

export { generateNumericId };
