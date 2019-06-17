// Update with your config settings.

module.exports = {
  
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory: './data/migrations'
    },
    pool: {
      afterCreate: (connection, done) => {
        connection.run('PRAGMA foreign_keys = ON', done)
      }
    }
  },
};
