const getFileData = (uri) => {
  const re = /(?:\.([^.]+))?$/;
  const extension = re.exec('file.name.with.dots.txt')[1];
  const fileType = extension === 'jpg' || extension === 'jpeg' ? 'image/jpeg' : 'image/png';

  return { extension, fileType };
};

export default getFileData;
