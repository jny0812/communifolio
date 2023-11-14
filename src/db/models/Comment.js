import { CommentModel } from "../schemas/comment";
// import { UserModel } from "../schemas/user";


class Comment {
  // 댓글 생성
  static async create({ newComment }) {
    const creatednewComment = await CommentModel.create(newComment);
    return creatednewComment;
  } 


  static async findAll({ targetUserId }) {
    const comment = await CommentModel.find({ targetUserId: targetUserId });
    return comment;
  }

  // 댓글 고유값으로 댓글 찾기.
  static async findCommentByCommentId({commentId}){
    const comment =  await CommentModel.findOne({ commentId });
    return comment;
  }


  // 댓글 삭제
  static async delete({ commentId }) {
    const deletedComment = await CommentModel.deleteOne({ commentId });
    return deletedComment;
  }

  // 댓글 업데이트
  static async update({ commentId, content}) {
    const updatedComment = await CommentModel.updateOne(
      { commentId },
      { content }
    );
    return updatedComment
  }

}

export { Comment };
