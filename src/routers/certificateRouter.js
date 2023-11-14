import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";
import { common } from "./common";

const certificateRouter = Router();


// 자격증 생성
certificateRouter.post("/certificate",
login_required,
 async function (req, res, next) {
  try {
    // body 값 비었는지 체크
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.date;

    // 필수값 들어갔는지 확인 (코드리뷰)
    if(!title || !description || !date){
      throw new Error("값을 제대로 입력했는지 확인해주세요.")
    }

    // 공용 함수로 사용
    if(!common.checkDate(date)){
      throw new Error("프로젝트 시작 날짜 혹은 프로젝트 종료 날짜 형식이 맞지 않습니다.")
    }

    // 위 데이터를 유저 db에 추가하기
    const newCertificate = await certificateService.addCertificate({
      userId : req.currentUserId,
      title,
      description,
      date
    });

    if (newCertificate.errorMessage) {
      throw new Error(newCertificate.errorMessage);
    }

    res.status(201).json(newCertificate);

  } catch (error) {
    next(error);
  }
});


certificateRouter.get(
  "/certificate/:userId",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.params.userId
      const currentCertificateInfo = await certificateService.getCertificate({ userId });
      res.status(200).send(currentCertificateInfo);
    } catch (error) {
      next(error);
    }
  }
);


// 자격증 수정.
certificateRouter.put(
  "/certificate/:certificateId",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      const certificateId = req.params.certificateId;
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const date = req.body.date ?? null;
      
      // 필수값 들어갔는지 확인 (코드리뷰)
      if(!title || !description || !date){
        throw new Error("값을 제대로 입력했는지 확인해주세요.")
      }

      // 공용 함수로 사용
      if(!common.checkDate(date)){
        throw new Error("프로젝트 시작 날짜 혹은 프로젝트 종료 날짜 형식이 맞지 않습니다.")
      }

      const updatedCertificate = await certificateService.setCertificate({ userId,certificateId,title,description,date  });
      
      res.status(200).json(updatedCertificate);
    } catch (error) {
      next(error);
    }
  }
);


// 자격증 삭제. 
certificateRouter.delete(
  "/certificate/:certificateId",
  login_required,
 async function(req,res,next) {
  try{
    const userId = req.currentUserId
    const certificateId = req.params.certificateId;
    const deletedCertificate = await certificateService.delCertificate({ userId,certificateId });
    res.status(200).json(deletedCertificate);

  }catch(error){
    next(error)
  }
 })




export { certificateRouter };
