const env = process.env.NODE_ENV; 

const development = {
    app: {
        port: 3000
    },
    db: {
        host: 'localhost',
        port: 5432,
        database: 'postgres',
        username:'postgres',
        password:'secret',
        dialect: 'postgres'       
    }
};

const production = {
    app: {
      port: 3002
    },
    db: {
      host: 'awsSomething',
      port: 8000,
      database: 'sqlite',
      username:'dm88',
      password:'secretStuff',
      dialect: 'sqlite',
      storage: './sqlite/marydb.db'
    }
};

const config = {
    development,   
    production
};

module.exports = config[env];