// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './database/webauth1.db3'
    },
    migrations: {
      directory: './database/migrations'
    },
    pool: {
      afterCreate: (connection, done) => {
        connection.run('PRAGMA foreign_keys = ON', done)
      }
    }
  },
};
