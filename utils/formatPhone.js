const formatPhone = (newText, prevPhone) => {
  let strippedPhone = newText;
  strippedPhone = strippedPhone.replace(' ', '');
  strippedPhone = strippedPhone.replace('(', '');
  strippedPhone = strippedPhone.replace(')', '');
  strippedPhone = strippedPhone.replace('-', '');
  if (strippedPhone.length > 10) {
    return newText.slice(0, 14);
  }

  let formattedPhone = strippedPhone;
  if (newText.length >= 3 && (newText.length > prevPhone.length || prevPhone.length > 6)) {
    formattedPhone = `(${formattedPhone}`;
    formattedPhone = `${formattedPhone.slice(0, 4)}) ${formattedPhone.slice(4, formattedPhone.length)}`;
  }
  if (newText.length >= 9 && (newText.length > prevPhone.length || prevPhone.length > 10)) {
    formattedPhone = `${formattedPhone.slice(0, 9)}-${formattedPhone.slice(9, formattedPhone.length)}`;
  }
  return formattedPhone;
};

const stripPhone = (phone) => {
  let strippedPhone = phone;
  strippedPhone = strippedPhone.replace(' ', '');
  strippedPhone = strippedPhone.replace('(', '');
  strippedPhone = strippedPhone.replace(')', '');
  strippedPhone = strippedPhone.replace('-', '');
  return `+1${strippedPhone}`;
};

export { formatPhone, stripPhone };
