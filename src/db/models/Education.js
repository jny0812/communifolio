import { EducationModel } from '../schemas/education.js';

class Education {
  // 자격증 생성
  static async create({ newEducation }) {
    const creatednewEducation = await EducationModel.create(newEducation);
    return creatednewEducation;
  } 
  
  // userid으로 학력 찾기.
  static async findEducationByUserId({ userId }){
    const education =  await EducationModel.find({ userId });
    return education;
  }

  static async findEducationByEducationId({ educationId }){
    const education =  await EducationModel.findOne({ id: educationId });
    return education;
  }

  // 학력 삭제
  static async delete({ educationId }) {
    const deletedEducation = await EducationModel.findOneAndDelete( educationId );
    return deletedEducation;
  }

  // 학력 업데이트
  static async update({ educationId, fieldToUpdate, newValue }) {
    const filter = { educationId: educationId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }
}

export { Education };
