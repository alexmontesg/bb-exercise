module.exports = (db) => ({
  addToState: (userId, variable, value) => {
    const users = db.get('users');
    let user = users.find({ id: userId }).value();
    if (!user) {
      user = { id: userId, state: {} };
      users.push(user).write();
    }
    user.state[variable] = value;
    db.write();
  },
  clearState: (userId) => {
    const users = db.get('users');
    let user = users.find({ id: userId }).value();
    if (!user) {
      user = { id: userId, state: {} };
      users.push(user).write();
    } else {
      user.state = {};
      db.write();
    }
  },
  getFromState: (userId, variable) => {
    const users = db.get('users');
    let user = users.find({ id: userId }).value();
    if (!user) {
      user = { id: userId, state: {} };
      users.push(user).write();
    }
    return user.state[variable];
  }
});
