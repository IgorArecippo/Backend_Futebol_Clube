import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    teamName: {
      type: STRING,
      allowNull: false,
    },
  },

  {
    underscored: true,
    timestamps: false,
    sequelize: db,
    modelName: 'teams',
  },
);

export default Teams;
