import { AwardModel } from '../schemas/award';

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findAwardByUserId({ userId }) {
    const award = await AwardModel.find({ userId });
    return award;
  }
  
  static async findByAwardId({award_id}) {
    const award = await AwardModel.findOne({id: award_id});
    return award; 
  }

  static async update({ awardId, fieldToUpdate, newValue }) {
    const filter = { awardId: awardId };
    const update = { [fieldToUpdate]: newValue};
    const option = { returnOriginal: false};
    

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option,
    );

    return updatedAward;
  }

  static async delete({ awardId }){
    const deletedAward = await AwardModel.findOneAndDelete(awardId);

    return deletedAward;
  }
}

export { Award };
