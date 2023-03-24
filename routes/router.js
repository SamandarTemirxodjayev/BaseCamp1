const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")

router.get('/',userController.index)
router.get('/login',userController.login)
router.get('/register',userController.register)
router.post('/login',userController.loginpost)
router.post('/register',userController.registerpost)
router.get('/logout',userController.logout)
router.get('/newproject',userController.newProject)
router.post('/newproject',userController.newProjectpost)
router.get('/projects/:id',userController.editProjects)
router.get('/deleteproject/:id',userController.deleteProject)
router.post('/editproject/:id',userController.editProject)
router.get('/deleteuser/',userController.deleteUser)

module.exports = router