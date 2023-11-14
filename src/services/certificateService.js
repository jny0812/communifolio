import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";


class certificateService {
  static async addCertificate({ userId, title, description, date}) {
    // certificateId 는 유니크 값 부여
    const certificateId = uuidv4();
    const newCertificate = { certificateId, userId, title, description, date };
    // db에 저장
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewCertificate;
  }

  
  static async getCertificate({ userId }) {
    // userId, title 값 확인.
    const certificate = await Certificate.findAll({ userId });
    if (!certificate) {
      throw new Error(`${userId} 유저의 자격증 정보가 없습니다.`)
    }
    return certificate;
  }

  
  static async delCertificate({ userId,certificateId  }) {

    const certificate = await Certificate.delete({ userId,certificateId });
    if (!certificate) {
      throw new Error(`해당하는 자격증이 없습니다.`)
    }
    return certificate;
  }

  
  static async setCertificate({ userId,certificateId,title,description,date }) {
    //자격증 아이디가 없을 경우 checking
    let certificate = Certificate.findCertificateByCertificateId({certificateId})
    if (!certificate) {
      throw new Error(`해당하는 자격증이 없습니다.`)
    }

    const updatedCertificate = await Certificate.update({
      userId,
      certificateId,
      title,
      description,
      date
    })
    return updatedCertificate;
    
  }


}

export { certificateService };
