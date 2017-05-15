module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", 
  {
      googleID: 
      {
          type: DataTypes.STRING
      },
      token:
      {
          type: DataTypes.STRING
      },
      email:
      {
          type: DataTypes.STRING
      },
      name:
      {
          type: DataTypes.STRING
      }
  }
    );
  return User;
};