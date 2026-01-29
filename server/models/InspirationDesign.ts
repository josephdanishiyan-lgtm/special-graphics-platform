// server/models/InspirationDesign.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';

interface InspirationDesignAttributes {
  id: number;
  title: string;
  designerName: string;
  likeCount: number;
  imageUrl: string;
  description?: string;
  tags?: string[];
  toolsUsed?: string;
  contestId?: number | null;
  status: string;
}

interface InspirationDesignCreationAttributes extends Optional<InspirationDesignAttributes, 'id'> {}

class InspirationDesign extends Model<InspirationDesignAttributes, InspirationDesignCreationAttributes> implements InspirationDesignAttributes {
  public id!: number;
  public title!: string;
  public designerName!: string;
  public likeCount!: number;
  public imageUrl!: string;
  public description!: string;
  public tags!: string[];
  public toolsUsed!: string;
  public contestId!: number | null;
  public status!: string;
}

InspirationDesign.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    designerName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown Designer',
    },
    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: true,
    },
    toolsUsed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contestId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    tableName: 'inspiration_designs', // Specific table name
    modelName: 'InspirationDesign',   // Specific model name
  }
);

export default InspirationDesign;
