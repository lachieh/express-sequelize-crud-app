'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.Post);
    Comment.belongsTo(models.User, { as: 'Commenter', constraints: false });
  };
  return Comment;
};
