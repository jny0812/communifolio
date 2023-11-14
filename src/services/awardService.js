import { v4 as uuidv4 } from 'uuid';
import { Award } from '../db/models/Award';

class awardService {
  // 수상 이력 추가하기
  static async addAward({ userId, title, description }) {

    try{
    // id는 유니크 값 부여
      const awardId = uuidv4();
      const newAward = { awardId, userId, title, description };

      // db에 저장
      const createdNewAward = await Award.create({ newAward });
      createdNewAward.errorMessage = null;

      return createdNewAward;
    } 
    catch(err) {
      return new Error(err.errorMessage);
    }
  }

  

  static async getAward({userId}) {
    try{

    //해당 award 가져오기
    const award = await Award.findAwardByUserId({ userId });

    if (!award) {
      const errorMessage = '등록된 수상 이력이 없습니다.';
      return { errorMessage };
    }
    return award;
  }
   catch (err){
    return new Error(err.errorMessage);
   }
  }

  // 수상 이력 수정하기
   static async setAward({ awardId, toUpdate }) {
    try{
      let award = await Award.findByAwardId({awardId});

      if (!award) {
        const errorMessage = '수상 내역이 없습니다. 다시 한번 확인해주세요.';
        return { errorMessage };
      }

      for(let [key] of Object.entries(toUpdate)) {
        if(toUpdate[key] !== null){
          const fieldToUpdate = key;
          const newValue =  toUpdate[key];
          award = await Award.update({ awardId, fieldToUpdate, newValue});
        }
      }
      return award
     
    } 
    catch(err){
      return new Error(err.errorMessage);
    }
  }

  //award 삭제하기
  static async deleteAward({ awardId }){
    try{
      const deletedAward = await Award.delete({ awardId });

      return deletedAward;
    } 
    catch(err){
      return new Error(err.errorMessage);
  }
}
}


export { awardService };
