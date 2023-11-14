import { CertificateModel } from "../schemas/certificate";

class Certificate {
  // 자격증 생성
  static async create({ newCertificate }) {
    const creatednewCertificate = await CertificateModel.create(newCertificate);
    return creatednewCertificate;
  } 


  
  static async findAll({ userId }) {
    const certificate = await CertificateModel.find({ userId });
    return certificate;
  }

  // 자격증 고유값으로 자격증 찾기.
  static async findCertificateByCertificateId({certificateId}){
    const certificate =  await CertificateModel.findOne({ certificateId });
    return certificate;
  }

  // 자격증 삭제
  static async delete({ userId,certificateId }) {
    const deletedCertificate = await CertificateModel.deleteOne({ userId,certificateId });
    return deletedCertificate;
  }

  // 자격증 업데이트
  static async update({userId,certificateId,title,description,date}) {
    const updatedCertificate = await CertificateModel.updateOne(
      { userId, certificateId },
      { title, description, date }
    );
    return updatedCertificate
  }

}

export { Certificate };
