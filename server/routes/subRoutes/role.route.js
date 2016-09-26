const express = require('express');
const RoleModel = require('../../models/role.model');
const UserModel = require('../../models/user.model');

let roleRoute = express.Router();

let handleResult = {
	// get roles
	getRolesSuccess: function(roles, res) {
		res.status(200).send(roles);
	},
	getRolesHasError: function(error, res) {
		res.status(400).send(error);
	},
	getRolesHasException: function(exception, res) {
		res.status(400).send(exception);
	},

	// create role
	createRoleSuccess: function(role, res) {
		res.status(201).send(role);
	},
	createRoleHasError: function(error, res) {
		res.status(400).send(error);
	},
	createRoleHasException: function(exception, res) {
		res.status(400).send(exception);
	},

	// get role by role id
	getRoleByRoleIdSuccess: function(role, res) {
		res.status(200).send(role);
	},
	getRoleByRoleIdHasError: function(error, res) {
		res.status(400).send(error);
	},
	getRoleByRoleIdHasException: function(exception, res) {
		res.status(400).send(exception);
	},

	// update role by role id
	updateRoleByRoleIdSuccess: function(role, res) {
		res.status(201).send(role);
	},
	updateRoleByRoleIdHasError: function(error, res) {
		res.status(400).send(error);
	},
	updateRoleByRoleIdHasException: function(exception, res) {
		res.status(400).send(exception);
	},

	// get users by role id
	getUsersByRoleIdSuccess: function(users, res) {
		res.status(200).send(users);
	},
	getUsersByRoleIdHasError: function(error, res) {
		res.status(400).send(error);
	},
	getUsersByRoleIdHasException: function(exception, res) {
		res.status(400).send(exception);
	},

	// delete role by role id
	deleteRoleByRoleIdSuccsess: function(res) {
		res.status(201).send({
			message: 'Delete role success!'
		});
	},
	deleteRoleByRoleIdHasError: function(error, res) {
		res.status(400).send(error);
	},
	deleteRoleByRoleIdHasException: function(exception, res) {
		res.status(400).send(exception);
	}
};

/* Get action for get roles*/
roleRoute.get('/', function(req, res) {
	try {
		RoleModel.find({}, function(error, roles) {
			if (error)
				handleResult.getRolesHasError(error, res);
			else
				handleResult.getRolesSuccess(roles, res);
		});
	} catch (exception) {
		handleResult.getRolesHasException(exception, res);
	}
});

/* Post action for create role*/
roleRoute.post('/', function(req, res) {
	try {
		let RoleNew = new RoleModel();
		RoleNew.name = req.body.name;
		RoleNew.description = req.body.description;
		RoleNew.active = true;
		RoleNew.created_at = Date.now();
		RoleNew.updated_at = Date.now();
		RoleNew.save(function(error, role) {
			if (error)
				handleResult.createRoleHasError(error, res);
			else
				handleResult.createRoleSuccess(role, res);
		});
	} catch (exception) {
		handleResult.createRoleHasException(exception, res);
	}
});

/* Get action for get role by role id*/
roleRoute.get('/:id', function(req, res) {
	try {
		RoleModel.findOne({
			_id: req.params._id
		}, function(error, role) {
			if (error)
				handleResult.getRoleByRoleIdHasError(error, res);
			else
				handleResult.getRoleByRoleIdSuccess(role, res);
		});
	} catch (exception) {
		handleResult.getRoleByRoleIdHasException(exception, res);
	}
});

/* Post action for update role by role id*/
roleRoute.put('/:id', function(req, res) {
	try {
		RoleModel.findOne({
			_id: req.params.id
		}, function(error, role) {
			if (error) {
				handleResult.getRoleByIdHasError(error, res);
			} else {
				role.name = req.body.name;
				role.description = req.body.description ? req.body.description : role.description;
				role.active = req.body.active ? req.body.active : role.active;
				role.updated_at = Date.now();
				role.save(function(err, role_updated) {
					if (err)
						handleResult.updateRoleByRoleIdHasError(err, res);
					else
						handleResult.updateRoleByRoleIdSuccess(role_updated, res);
				});
			}
		});
	} catch (exception) {
		handleResult.updateRoleByRoleIdHasException(exception, res);
	}
});

/* Get action for get users by role id*/
roleRoute.get('/:id/users', function(req, res) {
	try {
		RoleModel.findOne({
			_id: req.params._id
		}, function(error, role) {
			if (error) {
				handleResult.getRoleByIdHasError(error, res);
			} else {
				UserModel.find({
					role: role_id
				}).populate('role').exec(function(err, users) {
					if (err)
						handleResult.getUsersByRoleIdHasError(err, res);
					else
						handleResult.getUsersByRoleIdSuccess(users, res);
				});
			}
		});
	} catch (exception) {
		handleResult.getUsersByRoleIdHasException(exception, res);
	}
});

/* Delete action for */
roleRoute.delete('/:id', function(req, res) {
	try {
		RoleModel.findOneAndRemove({
			_id: req.params.id
		}, function(error) {
			if (error)
				handleResult.deleteRoleByRoleIdHasError(error, res);
			else
				handleResult.deleteRoleByRoleIdSuccsess(res);
		});
	} catch (exception) {
		handleResult.deleteRoleByRoleIdHasException(exception, res);
	}
});

/* Export role router*/
module.exports = roleRoute;