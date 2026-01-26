import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';

interface DesignAttributes {
  id: number;
  title: string;
  designerName: string;
  likeCount: number;
  imageUrl: string;
  description?: string;
  tags?: string[]; // Array of strings
  toolsUsed?: string;
  contestId?: number | null; // Allow this to be empty
  status: string;
}

interface DesignCreationAttributes extends Optional<DesignAttributes, 'id'> {}

class Design extends Model<DesignAttributes, DesignCreationAttributes> implements DesignAttributes {
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

Design.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null to be safe
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
      // Postgres supports Arrays directly
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
      allowNull: true, // IMPORTANT: This fixes the "Not Null" error
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    tableName: 'designs',
  }
);

export default Design;
