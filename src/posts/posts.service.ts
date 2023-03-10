import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from 'src/logical/user/user.entity';
import { getRepository, Repository } from 'typeorm';


export interface PostsRo {
   // list: userEntity[];
  }
@Injectable()
export class PostsService {
    constructor(
       @InjectRepository(userEntity)
        private readonly postsRepository: Repository<userEntity>,
      ) {}
      // 创建文章
  // async create(post: Partial<userEntity>): Promise<userEntity> {
  //   return await this.postsRepository.save(post);
  // }
  async update(userId) {
  const msg = 'niu'
    return msg
  }

  async setPerson(userId:number=10,sortId:number=1) {
    const sqlToPerson = `select * from personal where resumeId =(select id from resume where userId = ${userId} and sortId = ${sortId})`
    const data =  (await this.postsRepository.query(sqlToPerson))[0]
      return {
       msg:"插入成功"
      }
    }

    async getUserResume(userId:number=10,sortId:number=1) {
      return{
        personalMoudle:{
          ...await this.getPerson(userId,sortId)
        },
        resumeMoudle:[{
          ...await this.getProject(userId,sortId)
        },
          {
          ...await this.getSchool(userId,sortId)
        }
        ,
          {
          ...await this.getSummary(userId,sortId)
        }
        ,
          {
          ...await this.getWork(userId,sortId)
        }
        ]
      }
      }
  async getPerson(userId:number=10,sortId:number=1) {
    const sqlToPerson = `select * from personal where resumeId =(select id from resume where userId = ${userId} and sortId = ${sortId})`
    const data =  (await this.postsRepository.query(sqlToPerson))[0]
      return {
        inputList:[{
          cityYoulived:data.cityYoulived,
          degree:data.degree,
          email:data.email,
          phoneNumber:data.phoneNumber,
        },{
          cityItent:data.cityItent,
          currentStatus:data.currentStatus,
          postIntent:data.postIntent
        }],
        title:"基本信息",
        userName:data.userName
      }
    }
    async getSchool(userId:number=10,sortId:number=1) {
      const sqlToSchool = `select * from project where resumemodelId = (select id from resumemodel where 
        resumemodel.resumeId =(select id from resume where userId = ${userId} and sortId = ${sortId}))`
        const data =  await this.postsRepository.query(sqlToSchool)
        return {
          expand:true,
          inputList:data,
          title:"教育经历"
        }
      }
    async getWork(userId:number=10,sortId:number=1) {
      const sqlToWork = `select * from project where resumemodelId = (select id from resumemodel where 
        resumemodel.resumeId =(select id from resume where userId = ${userId} and sortId = ${sortId}))`
        const data =  await this.postsRepository.query(sqlToWork)
        return {
          expand:true,
          inputList:data,
          title:"工作经历"
        }
      }
    async getSummary(userId:number=10,sortId:number=1) {
      const sqlToSummary = `select * from project where resumemodelId = (select id from resumemodel where 
          resumemodel.resumeId =(select id from resume where userId =${userId} and sortId = ${sortId}))`
          const data = await this.postsRepository.query(sqlToSummary)
        return {
          expand:true,
          inputList:data,
          title:"个人总结"
        }
      }
    async getProject(userId:number=10,sortId:number=1) {
      const sqlToProject = `select * from project where resumemodelId = (select id from resumemodel where 
          resumemodel.resumeId =(select id from resume where userId =${userId} and sortId = ${sortId}))`
      const data =  await this.postsRepository.query(sqlToProject)
        return {
          expand:true,
          inputList:data,
          title:"项目经历"
        }
      }
}
 

