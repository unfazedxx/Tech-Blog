const user = require('./User');
const comment = require('./Comment');
const blog = require('./Blog');

//One user can have many blogs
user.hasMany(blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//the specific blog belongs to one user, linked by their user id
blog.belongsTo(user, {
    foreignKey: 'user_id'
});

//a blog can have multiple comments, so we use blog_id to make the relationship
blog.hasMany(comment, {
    foreignKey: 'blog_id',
});

//each comment is made by a user, thus belongs to their id 
comment.belongsTo(user, {
    foreignKey: 'user_id'
});

module.exports = { user, blog, comment };