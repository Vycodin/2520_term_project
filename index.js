const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const session = require("express-session")
const passport = require("./middleware/passport")
const {ensureAuthenticated, forwardAuthenticated} = require("./middleware/checkAuth")

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(ejsLayouts);
app.use(
  session({
    secret:"secret",
    resave: true,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.set("view engine", "ejs");

// Routes start here

app.get("/reminders",ensureAuthenticated, reminderController.list);

app.get("/reminder/new", reminderController.new);

app.get("/reminder/:id", reminderController.listOne);

app.get("/reminder/:id/edit", reminderController.edit);

app.post("/reminder/", reminderController.create);

// Implement this yourself
app.post("/reminder/update/:id", reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id", reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login",forwardAuthenticated, authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", 
    passport.authenticate("local",{
      successRedirect: "/reminders",
      failureRedirect: "/login"
    })
  );
app.get("/logout", (req,res) => {
  req.logout(function(err){
    if(err){console.log(err)}
    res.redirect("/login")
  });
})
app.listen(3002, function () {
  console.log(
    "Server running. Visit: localhost:3002/reminders in your browser 🚀"
  );
});
