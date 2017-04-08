module.exports = function(sequelize, DataType) {
  return sequelize.define('users', {
  firstName: {
    type: DataType.STRING
  },
  lastName: {
    type: DataType.STRING
  }

  });

};


