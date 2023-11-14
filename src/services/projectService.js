import { Project } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";


class projectService {
  static async addProject({ userId, projectName, description, startDate, endDate}) {
    // projectId 는 유니크 값 부여
    const projectId = uuidv4();
    const newProject = { projectId, userId, projectName, description,startDate, endDate };
    // db에 저장
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewProject;
  }

  static async getProject({ userId }){

    const projects = await Project.findAll({ userId });
    if(!projects){
      throw new Error(`${userId} 유저의 프로젝트의 정보가 없습니다.`)
    }

    return projects;
    
  }

  
  static async delProject({ userId,projectId  }) {
    const project = Project.findProjectByProjectId({projectId})
    if(!project){
      throw new Error('해당 하는 프로젝트가 없습니다.')
    }

    const deletedProject = await Project.delete({ userId,projectId });
    return deletedProject;
  }

  
  static async setProject({ userId,projectId,projectName,description,startDate,endDate }) {

    const project = Project.findProjectByProjectId({projectId})

    if(!project){
      throw new Error('해당 하는 프로젝트가 없습니다.')
    }

    const updatedProject = await Project.update({
        userId,
        projectId,
        projectName,
        description,
        startDate,
        endDate
    })
    return updatedProject;

  }


}

export { projectService };
