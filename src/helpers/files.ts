export function getBase64(file: File) {
  let baseImage = ''
  var reader = new FileReader();
  reader.readAsDataURL(file);;
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
  return reader
}
