const usersRouter = require('express').Router();
const usersController = require('../controllers/users');
const { getUserByIdJoi, updateAvatarJoi, updateUserJoi } = require('../middlewares/validation');

usersRouter.get('/', usersController.getUsers);
usersRouter.get('/me', usersController.findCurrentUser);
usersRouter.get('/:userId', getUserByIdJoi, usersController.getUsersById);
usersRouter.patch('/me', updateUserJoi, usersController.renewUser);
usersRouter.patch('/me/avatar', updateAvatarJoi, usersController.renewUserAvatar);

module.exports = usersRouter;
