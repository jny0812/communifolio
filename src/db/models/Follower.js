import { FollowerModel } from "../schemas/follower";

class Follower {
  
  // 현재 로그인 중인 User 불러오기
  static async findUser({ currentUserId, portfolioOwnerId }) {
    const followers = await FollowerModel.findOne({ userId: currentUserId, ownerId: portfolioOwnerId });
    return followers;
  };

  // 현재 접속중인 portfolio 주인의 follower 정보 불러오기
  static async findOwnerbyportfolioId({ portfolioOwnerId }) {
    const followers = await FollowerModel.find({ ownerId: portfolioOwnerId });
    return followers;
  };  

  // 새로운 follower 추가 (좋아요 버튼 click 했을 때)
  static async create({ newFollower }) {
    const createdNewFollower = await FollowerModel.create(newFollower);
    return createdNewFollower;
  };

  // follower 삭제 (좋아요 취소 버튼 click 했을 때)
  static async delete({ currentUserId, portfolioOwnerId }) {

    // userId, ownerId 모두 일치하는 데이터 찾은 후 삭제
    const deletedFollower = await FollowerModel.deleteOne({ userId: currentUserId, ownerId: portfolioOwnerId });

    return deletedFollower;
  };
}

export { Follower }