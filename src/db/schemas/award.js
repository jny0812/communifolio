import { Schema, model } from 'mongoose';

const awardSchema = new Schema(
  {
    awardId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: '수상 이력에 대해서 설명해주세요.',
    },
  },
  {
    timestamps: true,
  },
);

const AwardModel = model('Award', awardSchema);

export { AwardModel };
