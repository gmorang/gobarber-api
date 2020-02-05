import Sequelize from 'sequelize';

import User from '../app/models/user';
import File from '../app/models/file';
import Appointment from '../app/models/appointment';

import databaseConfig from '../config/database';
import mongoose from 'mongoose';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))

  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true, useFindAndModify: true }
    )
  }
}

export default new Database();
