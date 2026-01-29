// server/models/StudioWork.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class StudioWork extends Model {
  public id!: number;
  public title!: string;
  public category!: string;
  public image!: string; 
  public color!: string;
}

StudioWork.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Branding',
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: 'bg-gray-900',
  }
}, {
  sequelize,
  modelName: 'StudioWork', // Matches the specific page name
});

export default StudioWork;
