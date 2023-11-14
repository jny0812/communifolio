import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";
import { common } from "./common";


const projectRouter = Router();


// 프로젝트 생성
projectRouter.post("/project",
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
    const projectName = req.body.projectName;
    const description = req.body.description;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    // 필수값 들어갔는지 확인 (코드리뷰)
    if(!projectName || !startDate || !endDate){
      throw new Error("값을 제대로 입력했는지 확인해주세요.")
    }

    // 공용 함수로 사용
    if(!common.checkDate(startDate) || !common.checkDate(endDate)){
      throw new Error("프로젝트 시작 날짜 혹은 프로젝트 종료 날짜 형식이 맞지 않습니다.")
    }


    // 위 데이터를 유저 db에 추가하기
    const newProject = await projectService.addProject({
      userId : req.currentUserId,
      projectName,
      description,
      startDate,
      endDate
    });

    if (newProject.errorMessage) {
      throw new Error(newProject.errorMessage);
    }

    res.status(201).json(newProject);

  } catch (error) {
    next(error);
  }
});


projectRouter.get(
  "/project/:userId",
  login_required,
  async function (req, res, next) {
    try {
      // 현재 로그인된 아이디 => userId 
      // const userId = req.currentUserId;
      const userId = req.params.userId
      const projects = await projectService.getProject({ userId })
      res.status(200).send(projects);
    } catch (error) {
      next(error);
    }
  }
);


// 프로젝트 수정.
projectRouter.put(
  "/project/:projectId",
  login_required,
  async function (req, res, next) {
    try {

      const userId = req.currentUserId;
      const projectId = req.params.projectId;
      const projectName = req.body.projectName ?? null;
      const description = req.body.description ?? null;
      const startDate = req.body.startDate ?? null;
      const endDate = req.body.endDate ?? null;


      // 필수값 들어갔는지 확인 (코드리뷰)
      if(!projectName || !startDate || !endDate || !description){
        throw new Error("값을 제대로 입력했는지 확인해주세요.")
      }
      // 공용 함수로 사용
      if(!common.checkDate(startDate) || !common.checkDate(endDate)){
        throw new Error("프로젝트 시작 날짜 혹은 프로젝트 종료 날짜 형식이 맞지 않습니다.")
      }

      const updatedProject = await projectService.setProject({ userId, projectId, projectName,description,startDate,endDate });

      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);


// 프로젝트 삭제. 
projectRouter.delete(
  "/project/:projectId",
  login_required,
 async function(req,res,next) {
  try{
    const userId = req.currentUserId
    const projectId = req.params.projectId;
    const deletedProject = await projectService.delProject({ userId, projectId });
    res.status(200).json(deletedProject);

  }catch(error){
    next(error)
  }
 })




export { projectRouter };
