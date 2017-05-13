module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    user_name: {
      type: DataTypes.STRING,
      validate:{
        len:[2]
      },
      allowNull: false
    }

    //TODO: Continue to expand User (Robin Si -- LEAD)

  })
};