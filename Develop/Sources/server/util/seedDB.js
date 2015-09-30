var _ = require('lodash');
var logger = require('./logger');

logger.log('Seeding the Database');

var users = [
	{
		Username: "user1",
		Password: "pass1",
		Email: "email1@mail.com",
		Role: "teacher",
		Token: "token1"			
	},
	{
		Username: "user2",
		Password: "pass2",
		Email: "email2@mail.com",
		Role: "student",
		Token: "token2"			
	},
	{
		Username: "user3",
		Password: "pass3",
		Email: "email3@mail.com",
		Role: "student",
		Token: "token3"			
	}
];

var posts = [
	{
		Title: "post 1",
		Content: "content 1",
		UserId: 1,
		Status: "public",
		CommentStatus: "open"				
	},
	{
		Title: "post 2",
		Content: "content 2",
		UserId: 2,
		Status: "public",
		CommentStatus: "closed"
	},
	{
		Title: "post 3",
		Content: "content 3",
		UserId: 1,
		Status: "private",
		CommentStatus: "registered"
	},
	{
		Title: "post 4",
		Content: "content 4",
		UserId: 2,
		Status: "publish",
		CommentStatus: "open"
	},
	{
		Title: "post 5",
		Content: "content 5",
		UserId: 1,
		Status: "draft",
		CommentStatus: "closed"
	}
];

var categories = [
	{
		CategoryName: "Courses"		
	},
	{
		CategoryName: "Activities"
	},
	{
		CategoryName: "Program"	
	}
];


module.exports = function(app) {	
	var db = app.get('models');
	
	var createInstance = function(model, instance) {
		return new Promise(function(resolve, reject) {
			model.build(instance)
				.save()
				.then(resolve, reject);
		});
	};

	var cleanDB = function() {
		logger.log('... cleaning the DB');
		var cleanPromises = [db.PostCategory, db.Post, db.Category, db.User]
			.map(function(model) {				
				return model.destroy({
					where: {}
				});
			});
		return Promise.all(cleanPromises);
	};

	var createUsers = function(data) {			
		var promises = users.map(function(user) {
			return createInstance(db.User, user);
		});

		return Promise.all(promises)
			.then(function(users) {				
				return _.merge({users: users}, data || {});
			});
	};

	var createCategories = function(data) {		
		var promises = categories.map(function(category) {
			return createInstance(db.Category, category);
		});

		return Promise.all(promises)
			.then(function(categories) {				
				return _.merge({categories: categories}, data || {});
			});	
	};

	var createPosts = function(data) {
		var promises = posts.map(function(post) {
			post.UserId = data.users[0].UserId;
			return createInstance(db.Post, post);
		});

		return Promise.all(promises)
			.then(function(posts) {				
				return _.merge({posts: posts}, data || {});
			});
	};

	var createPostCategory = function(data) {				
		var promises = [];
		for (i = 0; i < posts.length; ++i) {
			for (k = 0; k < categories.length; ++k) {				
				promises.push({
					PostId: data.posts[i].PostId,
					CategoryId: data.categories[k].CategoryId
				});
			}
		}		
		promises = promises.map(function(p) {
			return createInstance(db.PostCategory, p);
		})

		return Promise.all(promises)
			.then(function(saved) {
				var result = 'Seeded DB with ' +
					data.users.length + ' Users, ' +
					data.categories.length + ' Categories, ' +
					data.posts.length + ' Posts';

				return result;
			});
	}

	return cleanDB()
		.then(createUsers)
		.then(createCategories)
		.then(createPosts)
		.then(createPostCategory)
		.then(logger.log.bind(logger))		
		.catch(logger.log.bind(logger));
}