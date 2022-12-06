
let userModel = require("../database").userModel;

let remindersController = {
  list: (req, res) => {
    let id = req.user.id
    let user = userModel.findById(id);
    res.render("reminder/index", { reminders: user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let id = req.user.id
    let user = userModel.findById(id);
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: user.reminders });
    }
  },

  create: (req, res) => {
    let id = req.user.id
    let user = userModel.findById(id);
    let reminder = {
      id: user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let id = req.user.id
    let user = userModel.findById(id);
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let id = req.user.id
    let user = userModel.findById(id);
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    searchResult.title = req.body.title
    searchResult.description = req.body.description
    if(req.body.completed){
      searchResult.completed = true
    }

    res.redirect('/reminders')
  },

  delete: (req, res) => {
    let id = req.user.id
    let user = userModel.findById(id);
    let reminderToFind = req.params.id;
    let searchResult = user.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToFind;
    });
    console.log(user.reminders[searchResult]);
    if(searchResult > -1){
      user.reminders.splice(searchResult, 1);
    }
    res.redirect('/reminders')
  },
};

module.exports = remindersController;
