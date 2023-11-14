import { Follower } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";


class followerService {

  static async getFollowerAll({ portfolioOwnerId }) {
    const followers = await Follower.findOwnerbyportfolioId({ portfolioOwnerId });
    return followers;
  }


  static async addFollower({currentUserId, portfolioOwnerId}) {

    // DB 저장
    const newFollower = {
      userId: currentUserId, 
      ownerId: portfolioOwnerId, 
    }
    const createdNewFollower = await Follower.create({newFollower});  
    // 문제 없이 db 저장 완료되었으므로 에러가 없음
    createdNewFollower.errorMessage = null; 

    return createdNewFollower;
  };


  static async delFollower({ currentUserId, portfolioOwnerId }) {

    const deletedFollower = await Follower.delete({ currentUserId, portfolioOwnerId });

    return deletedFollower;
  };

}

export { followerService }