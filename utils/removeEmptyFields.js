// Creates a new object with every key value pair wich value is properly defined
// i.e. {name:'', price:'5', qty:'11'} => {price:'5', qty:'11'}
function removeEmptyValuesFromObject(object) {
  const objectCopy = { ...object };
  const values = Object.values(object);
  const keys = Object.keys(object);

  for (let i = 0; i < values.length; i++) {
    if (values[i] === "" || !values[i]) {
      delete objectCopy[keys[i]];
    }
  }

  return objectCopy;
}

module.exports = removeEmptyValuesFromObject;
