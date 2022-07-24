'use strict';

import { USER_TABLE } from '../models/user.model';
import { EXPERIMENT_TABLE } from '../models/experiment.model';
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'avatar', {
      allowNull: true,
      type: DataTypes.STRING,
    });

    await queryInterface.addColumn(EXPERIMENT_TABLE, 'image', {
      allowNull: true,
      type: DataTypes.STRING,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'avatar');
    await queryInterface.removeColumn(EXPERIMENT_TABLE, 'image');
  },
};
