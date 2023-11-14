import { Comment } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";


class commentService {
  static async addComment({ userId, targetUserId, content}) {
    // commentId 는 유니크 값 부여
    const commentId = uuidv4();
    const newComment = { userId, commentId, targetUserId, content};
    // db에 저장
    const createdNewComment = await Comment.create({ newComment });
    createdNewComment.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    return createdNewComment;
  }

  static async getComment({ targetUserId }){
    const comments = await Comment.findAll({ targetUserId });
    if(!comments){
      throw new Error(`${userId} 유저의 댓글의 정보가 없습니다.`)
    }
    return comments;
  }

  
  static async delComment({ commentId  }) {
    const comments = Comment.findCommentByCommentId({commentId})
    if(!comments){
      throw new Error('해당 하는 댓글이 없습니다.')
    }
    const deletedComment = await Comment.delete({ commentId });
    return deletedComment;
  }

  
  static async setComment({ commentId, content }) {
    const comments = Comment.findCommentByCommentId({commentId})
    if(!comments){
      throw new Error('해당 하는 댓글이 없습니다.')
    }
    const updatedComment = await Comment.update({
        commentId,
        content
    })
    return updatedComment;
  }
}

export { commentService };
