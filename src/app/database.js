module.exports = function (mongoose, config) {
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connect(config.database.connection);
};
