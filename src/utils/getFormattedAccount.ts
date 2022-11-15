const getFormattedAccount = (number: string, format: string) => {
  const account = `**${number.slice(2, -2)}**`;
  const output = [];
  let index = 0;

  for (let i = 0; i < format.length; i++) {
    if (format[i] === '-') {
      output.push('-');
    } else {
      output.push(account[index++]);
    }
  }

  return output.join('');
};

export default getFormattedAccount;
