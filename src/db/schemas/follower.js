import { Schema, model } from 'mongoose';

const followerSchema = new Schema(
  {
    userId: {   // loginedUserId
      type: String,
      required: true,
    },
    ownerId: {  // portfolioPageOwnerId
      type: String,
      required: true,
    }
  },{
    timestamps: true,
  }
);

const FollowerModel = model('Follower', followerSchema);

export { FollowerModel };
