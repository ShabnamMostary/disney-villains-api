const villains = (connection, Sequelize) => { // defining a function villain, to read data from villains table
  return connection.define('villains', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    movie: { type: Sequelize.STRING },
    slug: { type: Sequelize.STRING },
  }, {
    defaultScope: {
      attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'deletedAt'] }
    }
  }, { paranoid: true })
}

module.exports = villains
