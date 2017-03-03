module.exports = {
  getUser: () => JSON.parse(localStorage.getItem('chatteruser')),
}
