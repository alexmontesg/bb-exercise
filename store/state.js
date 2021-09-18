module.exports = (db) => ({
  addToState: (userId, variable, value) => {
    const users = db.get('users');
    let user = users.find({ id: userId }).value();
    if (!user) {
      user = { id: userId, state: {} };
      users.push(user).write();
    }
    console.log(user);
    user.state[variable] = value;
    db.write();
  }
});
