'use strict';
const innertext = require('innertext');

module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  },{
    getterMethods: {
      snippet() {
        const text = innertext(this.content);
        const indexOfNextSpace = text.indexOf(' ', 100);
        return text.substr(0, indexOfNextSpace) + '...';
      }
    },
  });
  Post.associate = function(models) {
    Post.belongsTo(models.User);
    Post.hasMany(models.Comment);
  };
  return Post;
};
