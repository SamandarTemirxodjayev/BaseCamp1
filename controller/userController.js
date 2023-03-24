const bcrypt = require("bcrypt")
const BaseCampUser = require("../model/User")
const BaseCampProject = require("../model/Projects")


exports.index = async (req, res) => {
  const { name, email } = req.cookies
  if (!name || !email) {
    res.redirect('/register')
  }
  console.log(email)
  BaseCampProject.find({}) 
  .then(projects => {
    console.log(projects);
    res.render('client/index', {  email: email, projects: projects })
  })
  .catch(err => {
    console.log(err);
  });
}
exports.login = async (req,res) =>{
  const { name, email } = req.cookies
  if(!name || !email){
    res.render('client/login')
  }
  BaseCampProject.find({}) 
  .then(projects => {
    console.log(projects);
    res.render('client/index', {  email: email, projects: projects })
  })
  .catch(err => {
    console.log(err);
  });
}
exports.register = async (req,res) =>{
  const { name, email } = req.cookies
  if(!name || !email){
    res.render('client/register')
  }
  BaseCampProject.find({}) 
  .then(projects => {
    console.log(projects);
    res.render('client/index', {  email: email, projects: projects })
  })
  .catch(err => {
    console.log(err);
  });
}
exports.registerpost = async (req,res) =>{
  const { email, password, name } = req.body
  if ( !name || !password || !email ) {
    return res.render('client/register', { error: "Name, Email and password are required"})
  }
  const user = await BaseCampUser.findOne({ email })
  if(user){
    return res.render('client/register', { error: 'User have in system' })
  }
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10)
    const newUser = new BaseCampUser({
      email: req.body.email, 
      password: hashedPass,
      name: req.body.name
    });
    newUser.save()
    console.log(newUser)
    res.render('client/login')
  } catch (error) {
    console.log(error)
  }
}
exports.loginpost = async (req,res) =>{
  const { email, password } = req.body
  if(!email || !password){
    return res.render('client/login', { error: "Email and Password are required" })
  }
  const user = await BaseCampUser.findOne({ email })
  if(!user){
    return res.render('client/login', { error: 'User not have in system' })
  }
  const match = await bcrypt.compare(password, user.password)
  if(!match){
    return res.render('client/login', { error: 'Password is not right' })
  }
  try {
    res.cookie('email', user.email)
    res.cookie('name', user.name)
    BaseCampProject.find({}) 
  .then(projects => {
    console.log(projects);
    res.render('client/index', {  email: email, projects: projects })
  })
  .catch(err => {
    console.log(err);
  });
  } catch (error) {
    console.log(error)
  }
}
exports.logout = async (req, res) => {
  res.clearCookie('name', {maxAge: 0})
  res.clearCookie('email', {maxAge: 0})
  res.render('client/login')
}
exports.newProject = async (req, res) => {
  const { name, email } = req.cookies
  res.render('client/newProject', { name: name, email: email })
}
exports.newProjectpost = async (req, res) => {
  const { name, email } = req.cookies
  const { ProjectName, ProjectDescription } = req.body
  const newUser = new BaseCampProject({
    email: email, 
    name: ProjectName,
    description: ProjectDescription
  });
  newUser.save()
  BaseCampProject.find({}) 
  .then(projects => {
    console.log(projects);
    res.render('client/index', { name: name, email: email, projects: projects })
  })
  .catch(err => {
    console.log(err);
  });
}
exports.editProjects = async (req, res) => {
  const projectId = req.params.id;
  BaseCampProject.find({ _id: projectId })
    .then(projects => {
      console.log(projects[0].email);
      res.render('client/editProject', { projects: projects, email: projects[0].email });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    await BaseCampProject.deleteOne({ _id: projectId });
    const projects = await BaseCampProject.find({});
    res.render('client/index', { projects: projects, email: projects[0].email });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting project');
  }
};
exports.editProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { ProjectName, ProjectDescription } = req.body;
    await BaseCampProject.updateMany({ _id: projectId }, { $set: { name: ProjectName, description: ProjectDescription } });
    const projects = await BaseCampProject.find({});
    res.render('client/index', { projects: projects, email: projects[0].email });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating project');
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.cookies
    await BaseCampUser.deleteOne({ email: email });
    res.clearCookie('name', {maxAge: 0})
    res.clearCookie('email', {maxAge: 0})
    res.render('client/login')
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating project');
  }
};
