import { Schema, model, models, Types } from 'mongoose';

export interface IAgent {
  _id?: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  type: 'support' | 'research' | 'workflow' | 'integration';
  createdBy: Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AgentSchema = new Schema<IAgent>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active', required: true },
    type: {
      type: String,
      enum: ['support', 'research', 'workflow', 'integration'],
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Agent = models.Agent ?? model<IAgent>('Agent', AgentSchema);
export default Agent;

