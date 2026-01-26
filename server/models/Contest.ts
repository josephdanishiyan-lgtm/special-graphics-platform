// server/models/Contest.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Contest extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public author!: string;
  public category!: string;
  public industry!: string;
  public price!: number;
  public isGuaranteed!: boolean;
  public isBlind!: boolean;
  public status!: string; // 'Open', 'Finished'
  public level!: string; // 'Base', 'Gold', 'Platinum'
  public deadline!: Date; // We store the end date to calculate "days left"
}

Contest.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isGuaranteed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isBlind: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Open',
  },
  level: {
    type: DataTypes.STRING,
    defaultValue: 'Base',
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Contest',
});

export default Contest;
