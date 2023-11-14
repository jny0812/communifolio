import { Education } from '../db/models/Education';
import { v4 as uuidv4 } from "uuid";

class educationService {
      static async addEducation({ userId, schoolName, major, graduationTypeCode}) {
        try {
          const educationId = uuidv4();
          const newEducation = { educationId, userId, schoolName, major, graduationTypeCode};
          const createdNewEducation = await Education.create({newEducation}); //이미 객체인데 왜 또 이렇게 하지?
          createdNewEducation.errorMessage = null; 
          return createdNewEducation;
      }
        catch(err) {
          return new Error(err.errorMessage);
      }
    }
    
      

      
    static async getEducation({userId}) {
      try {

      //해당 education 가져오기
        const education = await Education.findEducationByUserId({userId});

        if (!education) {
        const errorMessage = "등록된 학력 이력이 없습니다.";
        return { errorMessage };
      }
        return education;
      }
      catch(err) {
      return new Error(err.errorMessage);
    }
  } 
      
  static async delEducation({ educationId }) {
    try {
      const education = await Education.delete({ educationId });
        return education;
    }
    catch(err){
      return new Error(err.errorMessage);
    }
  }
    
      
  static async setEducation({ educationId, toUpdate }) {
    try { 
        //학력 아이디가 없을 경우 checking
        let education = await Education.findEducationByEducationId({educationId});
        if(!education){
          const errorMessage = "해당 하는 학력이 없습니다."
          return { errorMessage }
        }
    
    
        // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
        if (toUpdate.schoolName) {
          const fieldToUpdate = "schoolName";
          const newValue = toUpdate.schoolName;
          education = await Education.update({ educationId , fieldToUpdate, newValue });
        }
    
        if (toUpdate.major) {
          const fieldToUpdate = "major";
          const newValue = toUpdate.major;
          education = await Education.update({ educationId, fieldToUpdate, newValue });
        }
    
        if (toUpdate.graduationTypeCode) {
          const fieldToUpdate = "graduationTypeCode";
          const newValue = toUpdate.graduationTypeCode;
          education = await Education.update({ educationId, fieldToUpdate, newValue });
        }
    
    
        return education;
      }
    catch(err){
      return new Error(err.errorMessage);
    }
  }
}

export { educationService };