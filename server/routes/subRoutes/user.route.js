const express = require('express');
const bcrypt = require('bcrypt');
const UserModel = require('../../models/user.model');
const RoleModel = require('../../models/role.model');

let userRoute = express.Router();

let handleResult = {
	// get users
	getUsersSuccess: function(users, res) {
		res.status(200).send(users);
	},
	getUsersHasError: function(error, res) {
		res.status(400).send(error);
	},
	getUserHasException: function(exception, res) {
		res.status(400).send(exception);
	},

	// create user
	createUserSuccess: function(user, res) {
		res.status(200).send(user);
	},
	createUserHasError: function(error, res) {
		res.status(400).send(error);
	},
	createUserHasException: function(exception, res) {
		res.status(400).send(exception);
	},

	// get user by user id
	getUserByUserIdSuccess: function(user, res) {
		res.status(200).send(error);
	},
	getUserByUserIdHasError: function(error, res) {
		res.status(400).send(error);
	},
	getUserByUserIdHasExceprion: function(exception, res) {
		res.status(400).send(exception);
	},

	// update user by user id
	updateUserByUserIdSuccess: function(user, res) {
		res.status(200).send(error);
	},
	updateUserByUserIdHasError: function(error, res) {
		res.status(400).send(error);
	},
	updateUserByUserIdHasExceprion: function(exception, res) {
		res.status(400).send(exception);
	},

	// get role by user id
	getRoleByUserIdSuccess: function(role, res) {
		res.status(200).send(role);
	},
	getRoleByUserIdHasError: function(error, res) {
		res.status(400).send(error);
	},
	getRoleByUserIdHasException: function(exception, res) {
		res.status(400).send(exception);
	},

	// delete user by user id
	deleteUserByUserIdSuccess: function(res) {
		res.status(201).send({
			message: 'Delete user success!'
		});
	},
	deleteUserByUserIdHasError: function(error, res) {
		res.status(400).send(error);
	},
	deleteUserByUserIdHasException: function(exception, res) {
		res.status(400).send(exception);
	}
};

/* Get action for get users*/
userRoute.get('/', function(req, res) {
	try {
		UserModel.find({}, function(error, users) {
			if (error)
				handleResult.getUsersSuccess(users, res);
			else
				handleResult.getUsersHasError(error, res);
		});
	} catch (exception) {
		handleResult.getUserHasException(exception, res);
	}
});

/* Post action for create user*/
userRoute.post('/', function(req, res) {
	try {
		if (req.body.role) {
			RoleModel.findOne({
				_id: req.body.role
			}, function(error, role) {
				if (error) {
					handleResult.getRoleByUserIdHasError(error, res);
				} else {
					let UserNew = new UserModel();
					UserNew.username = req.body.username;
					UserNew.email = req.body.email ? req.body.email : null;
					UserNew.password = req.body.password ? bcrypt.hashSync(req.body.password, 10) : null;
					UserNew.role = role._id;
					UserNew.active = true;
					UserNew.created_at = Date.now();
					UserNew.updated_at = Date.now();
					UserNew.save(function(err, user) {
						if (err)
							handleResult.createUserHasError(err, res);
						else
							handleResult.createUserSuccess(user, res);
					});
				}
			});
		} else {
			handleResult.createUserHasError({
				message: 'Role id not found!'
			}, res);
		}
	} catch (exception) {
		handleResult.createUserHasException(exception, res);
	}
});

/* Get action for get user by user id*/
userRoute.get('/:id', function(req, res) {
	try {
		UserModel.findOne({
			_id: req.params.id
		}, function(error, user) {
			if (error)
				handleResult.getUserByUserIdHasError(error, res);
			else
				handleResult.getUserByUserIdSuccess(user, res);
		});
	} catch (exception) {
		handleResult.getUserByUserIdHasExceprion(exception, res);
	}
});

/* Post action for update user by user id*/
userRoute.put('/:id', function(req, res) {
	try {
		UserModel.findOne({
			_id: req.params.id
		}, function(error, user) {
			if (error) {
				handleResult.getUserByUserIdHasError(error, res);
			} else {
				user.username = req.body.username;
				user.email = req.body.email ? req.body.email : user.email;
				user.password = req.body.password ? bcrypt.hashSync(req.body.password) : user.password;
				user.active = req.body.active ? req.body.active : user.active;
				// should be check role before modify user role
				user.role = req.body.role ? req.body.role : user.role;
				user.updated_at = Date.now();
				user.save(function(err, user_saved) {
					if (err)
						handleResult.updateUserByUserIdHasError(err, res);
					else
						handleResult.updateUserByUserIdSuccess(user_saved, res);
				});
			}
		});
	} catch (exception) {
		handleResult.updateUserByUserIdHasExceprion(exception, res);
	}
});

/* Get action or get role by user id*/
userRoute.get('/:id/role', function(req, res) {
	try {
		UserModel.findOne({
			_id: req.params.id
		}, function(error, user) {
			if (error) {
				handleResult.getUserByUserIdHasError(error, res);
			} else {
				RoleModel.findOne({
					_id: user.role
				}, function(err, role) {
					if (err)
						handleResult.getRoleByUserIdHasError(err, res);
					else
						handleResult.getRoleByUserIdSuccess(role, res);
				});
			}
		});
	} catch (exception) {
		handleResult.getRoleByUserIdHasException(exception, res);
	}
});

/* Delete action user by user id*/
userRoute.delete('/:id', function(req, res) {
	try {
		UserModel.findOneAndRemove({
			_id: req.params.id
		}, function(error) {
			if (error)
				handleResult.deleteUserByUserIdHasError(error,res);
			else
				handleResult.deleteUserByUserIdSuccess(res);
		});
	} catch (exception) {
		handleResult.deleteUserByUserIdHasException(exception,res);
	}
});

/* Export user router*/
module.exports = userRoute;