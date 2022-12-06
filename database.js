let Database = [
    {
        email: "cindy@gmail.com",
        password: "password",
        name:"cindy",
        id: 1,
        reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}]
    },
    {
        email: "jim123@gmail.com",
        password: "jim123",
        name:"jim",
        id:2,
        reminders: []
    } 
]
const userModel = {
    findOne: (email) => {
        console.log(email + "v3")
      const user = Database.find((user) => user.email === email);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with email: ${email}`);
    },
    findById: (id) => {
      const user = Database.find((user) => user.id === id);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with id: ${id}`);
    },
  };
  module.exports = { Database, userModel };