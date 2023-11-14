import { Router } from 'express';
import { login_required } from '../middlewares/login_required';
import { educationService } from '../services/educationService';
import is from "@sindresorhus/is";

const educationRouter = Router();

// 학력 생성
educationRouter.post("/education",
login_required,
 async (req, res, next) => {
  try {
    // body 값 비었는지 체크
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const { schoolName, major, graduationTypeCode } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newEducation = await educationService.addEducation({
      userId : req.currentUserId,
      schoolName,
      major,
      graduationTypeCode
    });

    if (newEducation.errorMessage) {
      throw new Error(newEducation.errorMessage);
    }

    res.status(201).json(newEducation);

  } catch (error) {
    next(error);
  }
});

// 전체 학력 조회
educationRouter.get(
  "/education/:userId",
  login_required,
  async (req, res, next) => {
    try {

      const userId = req.params.userId;
      const educations = await educationService.getEducation({userId});

      // 에러 체크 
      if (educations.errorMessage) {
        throw new Error(educations.errorMessage);
      }

      res.status(200).send(educations);
    } catch (error) {
      next(error);
    }
  }
);


// 학력 수정.
educationRouter.put(
  "/education/:educationId",
  login_required,
  async (req, res, next)=> {
    try {
      const educationId = req.params.educationId;
      const schoolName = req.body.schoolName ?? null;
      const major = req.body.major ?? null;
      const graduationTypeCode = req.body.graduationTypeCode ?? null;
      const toUpdate = { schoolName, major, graduationTypeCode };
      const updatedEducation = await educationService.setEducation({ educationId, toUpdate });
      
      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      if (updatedEducation.errorMessage) {
        throw new Error(updatedEducation.errorMessage);
      }

      res.status(200).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);


// 자격증 삭제. 
educationRouter.delete(
  "/education/:educationId",
  login_required,
 async function(req,res,next) {
  try{
    const educationId = req.params.educationId;
    const deletedEducation = await educationService.delEducation({ educationId });

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    if (deletedEducation.errorMessage) {
      throw new Error(deletedEducation.errorMessage);
    }
    res.status(200).json(deletedEducation);

  }catch(error){
    next(error)
  }
})



export { educationRouter };