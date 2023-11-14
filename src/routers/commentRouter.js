import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { commentService } from "../services/commentService";
// import { common } from "./common";


const commentRouter = Router();


// 댓글 생성
commentRouter.post("/comment",
login_required,
 async function (req, res, next) {
  try {
    // body 값 비었는지 체크
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req body
    const targetUserId = req.body.targetUserId;  // 댓글 받은 사람 (portfolioOwner)
    const content = req.body.content;

    // 필수값 들어갔는지 확인 (코드리뷰)
    if(!targetUserId || !content){
      throw new Error("값을 제대로 입력했는지 확인해주세요.")
    }

    // 위 데이터를 유저 db에 추가하기
    const newComment = await commentService.addComment({
      userId : req.currentUserId,
      targetUserId,
      content
    });

    if (newComment.errorMessage) {
      throw new Error(newComment.errorMessage);
    }

    res.status(201).json(newComment);

  } catch (error) {
    next(error);
  }
});

// targetUserId => 댓글 받은 사람
// 댓글 받은 사람의 아이디 값으로 조회
commentRouter.get(
  "/comment/:targetUserId",  // 댓글 받은 사람이 아니라 loginedUserId로 구해와야함
  login_required,
  async function (req, res, next) {
    try {      
      const targetUserId = req.params.targetUserId
      const comments = await commentService.getComment({ targetUserId })
      res.status(200).send(comments);
    } catch (error) {
      next(error);
    }
  }
);


// 댓글 수정.
commentRouter.put(
  "/comment/:commentId",
  login_required,
  async function (req, res, next) {
    try {
      // commentId 가 고유 값이니 필요없음
      //const targetUserId = req.body.targetUserId;
      const commentId = req.params.commentId;
      const content = req.body.content;
      
      if(!commentId || !content){
        throw new Error("값을 제대로 입력했는지 확인해주세요.")
      }
      
      const updatedComment = await commentService.setComment({ commentId,content});

      res.status(200).json(updatedComment);
    } catch (error) {
      next(error);
    }
  }
);


// 댓글 삭제. 
commentRouter.delete(
  "/comment/:commentId",
  login_required,
 async function(req,res,next) {
  try{
    const commentId = req.params.commentId;
    const deletedComment = await commentService.delComment({ commentId });
    res.status(200).json(deletedComment);

  }catch(error){
    next(error)
  }
 })




export { commentRouter };
