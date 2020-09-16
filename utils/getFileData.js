const getFileData = (uri) => {
  const re = /(?:\.([^.]+))?$/;
  const extension = re.exec(uri)[1];
  const fileType = extension === 'jpg' || extension === 'jpeg' ? 'image/jpeg' : 'image/png';

  return { extension, fileType };
};

export default getFileData;
