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


  async updatePerson(post) {
    const sqlToPerson = `update personal set userName =${post.userName},title=${post.title},
    cityYoulived=${post.cityYoulived},degree=${post.degree},
    email=${post.email},phoneNumber=${post.phoneNumber},
    cityItent=${post.cityItent},currentStatus=${post.currentStatus},
    postIntent=${post.postIntent} where id = ${post.id}`
    const data =  await this.postsRepository.query(sqlToPerson)
      return {
        msg:data
      }
    }

  async updateWork(post) {
    const sqlToWork = `update personal set title=${post.title},
    experienceName=${post.experienceName},role=${post.role},
    department=${post.department},city=${post.city},
    richText=${post.richText},startTime=${post.startTime},
    endTime=${post.endTime}where id = ${post.id}`
    const data =  await this.postsRepository.query(sqlToWork)
      return {
        msg:data
      }
  }
  async updateSchool(post) {
    const sqlToProject = `update project set title=${post.title},
    academy=${post.academy},degree=${post.degree},
    major=${post.major},school=${post.school},
    richText=${post.richText},startTime=${post.startTime},
    endTime=${post.endTime},sortIndex=${post.sortIndex},
    modelIndex=${post.modelIndex} where id = ${post.id}`
    const data =  await this.postsRepository.query(sqlToProject)
      return {
        msg:data
      }
    }
  async updateProject(post) {
    const sqlToProject = `update personal set projectName=${post.projectName},
    projectDescription=${post.projectDescription},city=${post.city},
    startTime=${post.startTime},endTime=${post.endTime},
    richText=${post.richText} where id = ${post.id}`
    const data =  await this.postsRepository.query(sqlToProject)
      return {
        msg:data
      }
    }
  async updateSummary(post) {
    const sqlToSummary = `update summary set title=${post.title},
    richText=${post.richText},startTime=${post.startTime},
    endTime=${post.endTime} where id = ${post.id}`
    const data =  await this.postsRepository.query(sqlToSummary)
      return {
        msg:data
      }
    }
  async setResume(userId:number=10) {
    const sqlToCheck = `select COUNT(*) form resume where userId = ${userId}`
    const sortId =  await this.postsRepository.query(sqlToCheck)+1
    const sqlToPerson = `insert into resume values(${userId},${sortId})`
    const data =  await this.postsRepository.query(sqlToPerson)
      return {
      msg:"插入成功"
      }
    }

  async setPerson(post) {
    const sqlToPerson = `insert into personal
    values(null,${post.resumeId}${post.userName},${post.title},${post.cityYoulived},${post.degree},${post.email},${post.phoneNumber},${post.cityItent},${post.currentStatus},${post.postIntent})`
    const data =  await this.postsRepository.query(sqlToPerson)
      return {
      msg:data
      }
    }
        
  async setProject(post) {
    const sqlToPerson = `insert into project
    values(null,${post.resumemodelId}${post.projectName},${post.projectDescription},${post.city},${post.startTime},${post.endTime},${post.richText},${post.modelIndex},${post.sortIndex})`
    const data =  await this.postsRepository.query(sqlToPerson)
      return {
      msg:data
      }
    }

  async setWork(post) {
  const sqlToWork = `insert into work values(null,${post.resumemodelId},${post.title},${post.experienceName},${post.role},${post.department},${post.city},${post.richText},${post.startTime},${post.endTime},${post.sortIndex})`
  const data =  await this.postsRepository.query(sqlToWork)
    return {
    msg:data
    }
  }

  async setSchool(post) {
    const sqlToPerson = `insert into school values((null,${post.resumemodelId},${post.title},${post.academy},${post.degree},${post.major},${post.school},${post.richText},${post.startTime},${post.endTime},${post.sortIndex},${post.modelIndex})`
    const data =  await this.postsRepository.query(sqlToPerson)
      return {
      msg:"插入成功"
      }
    }

  async setSummary(post) {
    const sqlToWork = `insert into summary values(null,${post.resumemodelId},${post.title},${post.richText},${post.startTime},${post.endTime})`
    const data =  (await this.postsRepository.query(sqlToWork))
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
 

