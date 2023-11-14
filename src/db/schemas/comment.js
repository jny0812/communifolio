import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    // 댓글 남긴 사람 (loginedUser)
    userId : {
      type: String,
      required: true,
    },
    // 댓글 고유값
    commentId: {
      type: String,
      required: true,
    },
    // 댓글 받은 사람 (portfolioOwner)
    targetUserId: {
      type: String,
      required: true,
    },
    // 댓글
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
