import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { followerService } from "../services/followerService";

const followerRouter = Router();

// portfolioPageOwner의 전체 follower(clicked LikeButton) 조회
followerRouter.get('/follower/:userId', 
  login_required, 
  async function(req, res, next) {
    try {
      const portfolioOwnerId = req.params.userId;
      const followers = await followerService.getFollowerAll({portfolioOwnerId});
      res.status(200).send(followers);
    } catch (error) {
      next(error);
    }
  }
)

// follower 추가
followerRouter.post('/follower/:userId',
  login_required, 
  async function(req, res, next) {
    try {

      // 현재 loginedUserId(currentUserId)를 통해 follower DB에 추가하기
      // loginedUserId(좋아요 누른 사람)와 portfolioPageOwnerId(좋아요 받은 사람) 모두 추가
      const currentUserId = req.currentUserId;
      const portfolioOwnerId = req.params.userId;
      const newFollower = await followerService.addFollower({currentUserId, portfolioOwnerId});

      if (newFollower.errorMessage) {
        throw new Error(newFollower.errorMessage);
      }

      res.status(201).json(newFollower);

    } catch (err) {
      next(err);
    }
  }
);

// follower 삭제
followerRouter.delete('/follower/:userId',
  login_required, 
  async function(req, res, next) {
    try {
      const currentUserId = req.currentUserId;
      const portfolioOwnerId = req.params.userId;
      const deletedFollower = await followerService.delFollower({ currentUserId, portfolioOwnerId });
      res.status(200).json(deletedFollower);
    } catch (err) {
      next(err)
    }
  }
);

export { followerRouter };