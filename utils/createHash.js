
const bcrypt = require('bcrypt');


const hashString = async (string) => {
  const saltRounds = 10; 
  try {
    const hashedString = await bcrypt.hash(string, saltRounds);
    return hashedString;
  } catch (error) {
    throw new Error('Error hashing the string');
  }
};

module.exports = hashString;

