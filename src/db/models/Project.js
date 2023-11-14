import { ProjectModel } from "../schemas/project";
import { UserModel } from "../schemas/user";


class Project {
  // 프로젝트 생성
  static async create({ newProject }) {
    const creatednewProject = await ProjectModel.create(newProject);
    return creatednewProject;
  } 


  static async findAll({ userId }) {
    const project = await ProjectModel.find({ userId });
    return project;
  }

  // 프로젝트 고유값으로 프로젝트 찾기.
  static async findProjectByProjectId({projectId}){
    const project =  await ProjectModel.findOne({ projectId });
    return project
  }


  // 프로젝트 삭제
  static async delete({ userId, projectId }) {
    const deletedProject = await ProjectModel.deleteOne({ userId, projectId });
    return deletedProject;
  }

  // 프로젝트 업데이트
  static async update({userId, projectId, projectName, description, startDate, endDate}) {
    const updatedProject = await ProjectModel.updateOne(
      { userId, projectId },
      { projectName, description, startDate, endDate }
    );
    return updatedProject
  }

}

export { Project };