import { Schema, model, models, Types } from 'mongoose';

export interface IAgent {
  _id?: string;
  name: string;
  description?: string;
  type: 'assistant' | 'copilot' | 'custom';
  status: 'idle' | 'running' | 'paused' | 'failed';
  createdBy: Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AgentSchema = new Schema<IAgent>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    type: {
      type: String,
      enum: ['assistant', 'copilot', 'custom'],
      default: 'assistant',
      required: true,
    },
    status: {
      type: String,
      enum: ['idle', 'running', 'paused', 'failed'],
      default: 'idle',
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Agent = models.Agent ?? model<IAgent>('Agent', AgentSchema);
export default Agent;
