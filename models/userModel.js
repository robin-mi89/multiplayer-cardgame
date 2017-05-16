module.exports = function(sequelize, DataTypes) 
{
  return sequelize.define('User', 
  {
    user_name: 
    {
      type: DataTypes.STRING,
      validate:
      {
        len:[2]
      },
      allowNull: false
    },
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
    wins:
    {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }

  })
};