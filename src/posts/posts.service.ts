import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from 'src/logical/user/user.entity';
import {  DataSource, Repository } from 'typeorm';
import { inspect } from 'util';
import { env } from '../config';


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
    const sqlToPerson = `update personal set userName ='${post.userName}',title='${post.title}',
    cityYoulived='${post.cityYoulived}',degree='${post.degree}',
    email='${post.email}',phoneNumber='${post.phoneNumber}',
    cityItent='${post.cityItent}',currentStatus='${post.currentStatus}',
    postIntent='${post.postIntent}' where id = ${post.id}`
    const data =  await this.postsRepository.query(sqlToPerson)
      return {
        msg:data
      }
    }

  async updateWork(post) {
    const sqlToWork = `update work set 
    experienceName='${post?.experienceName}',role='${post.role}',
    department='${post.department}',city='${post.city}',
    richText='${post.richText}',period='${post.period}' where id = ${post.id}`
    const data =  await this.postsRepository.query(sqlToWork)
      return {
        msg:data
      }
  }

  async updateSchool(post) {
    const sqlToProject = `update school set 
    academy='${post.academy}',degree='${post.degree}',
    major='${post.major}',school='${post.school}',
    richText='${post.richText}',period='${post.period}' where id = ${post.id}`
    const data =  await this.postsRepository.query(sqlToProject)
      return {
        msg:data
      }
    }
  async updateResumeName(post) {
    const sqlToProject = `update personal set resumeName='${post.resumeName}' where resumeId = ${post.resumeId}`
    const data =  await this.postsRepository.query(sqlToProject)
      return {
        msg:data
      }
  }
  async updateProject(post) {
    Logger.log(`${inspect(post)}`)
    const sqlToProject = `update project set projectName='${post.projectName}',
    projectDescription='${post.projectDescription}',city='${post.city}',
    period='${post.period}',
    richText='${post.richText}' where id = ${post.id}`
    const data =  await this.postsRepository.query(sqlToProject)
      return {
        msg:data
      }
    }

  async updateSummary(post) {
    const sqlToSummary = `update summary set
    richText='${post.richText}' where id = ${post.id}`
    const data =  await this.postsRepository.query(sqlToSummary)
      return {
        msg:data
      }
  }

  async setUserResume(userId:number=10,post) {
    try {
      const addRes = await this.postsRepository.manager.transaction(
        async (transactionRepository) => {
          const sqlToCheck = `select COUNT(*) from resume where userId = ${userId}`
          const sortId =  parseInt((await this.postsRepository.query(sqlToCheck))[0]["COUNT(*)"])+1
          const sqlToPerson = `insert into resume values(null,${userId},${sortId})`
          const insertId =  (await transactionRepository.query(sqlToPerson)).insertId
          const insertId1 = this.setPerson(insertId,post)
          const insertId2 = this.setProject(insertId,null)
          const insertId3 = this.setSchool(insertId,null)
          const insertId4 = this.setSummary(insertId)
          const insertId5 = this.setWork(insertId,null)
          if (!sortId&&!insertId&&!insertId1&&!insertId2&&!insertId3&&!insertId4&&!insertId5) {
            if (insertId) {
              const removeResume = `DELETE FROM resume WHERE id = ${insertId}`
              await this.postsRepository.query(removeResume)
            }
            return {
              code:300,
              msg:'创建失败'
            }
          }else{
          return {
            insertId:insertId,
            code:200,
            msg:'创建成功'
          }
          }
        } 
        );
        return addRes;
    } catch (error) {
        console.log("Transaction failed:", error);
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
   
  }

  async setPerson(resumeId,post) {
    const sqlToPerson = `insert into personal values(null,'${post.userName}','${post.title}','${post.cityYoulived}','${post.degree}','${post.email}','${post.phoneNumber}','${post.cityItent}','${post.currentStatus}','${post.postIntent}',${resumeId})`
    return  await this.postsRepository.query(sqlToPerson)
  }
        
  async setProject(resumeId,post) {
    if (post&&Object.keys(post).length !== 0) {
      const sqlToProject = `insert into project
          values(null,${post.resumemodelId},'${post.projectName}','${post.projectDescription}','${post.city}','${post.startTime}','${post.endTime}','${post.richText}','${post.modelIndex}',${post.sortIndex})`
      return await this.postsRepository.query(sqlToProject)
    }else{
      try {
        const addRes = await this.postsRepository.manager.transaction(
          async (transactionRepository) => {
            const sqlToModel = `insert into resumemodel values(null,${resumeId},2)`
            const resumemodelId =  (await transactionRepository.query(sqlToModel)).insertId 
            const sqlToProject = `insert into project(id,resumemodelId) values(null,${resumemodelId})`
            return  await transactionRepository.query(sqlToProject)
            }   
          );
          return addRes;
      } catch (error) {
          console.log("Transaction failed:", error);
          throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async setWork(resumeId,post) {
    let data;
    if (post&&Object.keys(post).length !== 0) {
      const sqlToWork = `insert into work values(null,${post.resumemodelId},'${post.title}','${post.experienceName}','${post.role}','${post.department}','${post.city}','${post.richText}','${post.startTime}','${post.endTime}',${post.sortIndex})`
      data =  await this.postsRepository.query(sqlToWork)
    }else{
      try {
        const addRes = await this.postsRepository.manager.transaction(
          async (transactionRepository) => {
            const sqlToModel = `insert into resumemodel values(null,${resumeId},1)`
            const  resumemodelId =  (await transactionRepository.query(sqlToModel)).insertId 
            const sqlToWork = `insert into work(id,resumemodelId)values(null,${resumemodelId})`
            return await transactionRepository.query(sqlToWork)
            }   
          );
          return addRes;
      } catch (error) {
        console.log("Transaction failed:", error);
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    
    }
  }
  
  async setSchool(resumeId,post) {
    if (post&&Object.keys(post).length !== 0) {
      try {
        const sqlToSchool = `insert into school values(null,${post.resumemodelId},'${post.title}','${post.academy}','${post.degree}','${post.major}','${post.school}','${post.richText}','${post.startTime}','${post.endTime}',${post.sortIndex})`
        return await this.postsRepository.query(sqlToSchool)
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }else {
      try {
        const addRes = await this.postsRepository.manager.transaction(
          async (transactionRepository) => {
            const sqlToModel = `insert into resumemodel(id,resumeId,modelIndex) values(null,${resumeId},0)`
            const  resumemodelId =  (await transactionRepository.query(sqlToModel)).insertId 
            const sqlToSchool  = `insert into school(id,resumemodelId) values(null,${resumemodelId})`
            return await transactionRepository.query(sqlToSchool)
            }   
          );
        return addRes;
      } catch (error) {
          console.log("Transaction failed:", error);
          throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async setSummary(resumeId) {
    try {
      const addRes = await this.postsRepository.manager.transaction(
        async (transactionRepository) => {
        const sqlToModel = `insert into resumemodel values(null,${resumeId},3)`
        const  resumemodelId =  (await transactionRepository.query(sqlToModel)).insertId 
        const sqlToSummary  = `insert into summary(id,resumemodelId) values(null,${resumemodelId})`
        return  await transactionRepository.query(sqlToSummary)
        }   
        );
        return addRes;
    } catch (error) {
        console.log("Transaction failed:", error);
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async getUserResume(resumeId:number) {
    return {
      resumeId:resumeId,
      personalMoudle:{
        ...await this.getPerson(resumeId)
      },
      resumeMoudle:[{
        ...await this.getProject(resumeId)
      },
        {
        ...await this.getSchool(resumeId)
      }
      ,
        {
        ...await this.getSummary(resumeId)
      }
      ,
        {
        ...await this.getWork(resumeId)
      }
      ]
    }
  }
  async ResumeInit(userId:number) {
    const sqlToPerson = `select * from personal where resumeId in (select id from resume where userId = ${userId}) `
    const data1 =  await this.postsRepository.query(sqlToPerson)
    const data = await this.getUserResume(data1[0].resumeId)
    return data
  
  }
  async getUserResumeAll(userId:number) {
    const sqlToPerson = `select * from personal where resumeId in(select id from resume where userId = ${userId}) `
    const data =  await this.postsRepository.query(sqlToPerson)
    return {
      data,
      code:200,
      msg:'获取成功'
    }
  }
  async getUserResumeOne() {
    const sqlToPerson = `select * from personal where resumeId in(select id from resume where userId = 10) `
    const data =  await this.postsRepository.query(sqlToPerson)
    return {
      data,
      code:200,
      msg:'获取成功'
    }
  }


  // async getPerson(userId:number=10,sortId:number=1) {
  //   const sqlToPerson = `select * from personal where resumeId = (select id from resume where userId = ${userId} and sortId = ${sortId}) `
  //   const data =  (await this.postsRepository.query(sqlToPerson))[0]
  //     return {
  //       inputList:[{
  //         cityYoulived:data.cityYoulived,
  //         degree:data.degree,
  //         email:data.email,
  //         phoneNumber:data.phoneNumber,
  //       },{
  //         cityItent:data.cityItent,
  //         currentStatus:data.currentStatus,
  //         postIntent:data.postIntent
  //       }],
  //       title:"基本信息",
  //       userName:data.userName
  //     }
  //   }
  // async getSchool(userId:number=10,sortId:number=1) {
  //   const sqlToSchool = `select * from project where resumemodelId in (select id from resumemodel where 
  //     resumemodel.resumeId =(select id from resume where userId = ${userId} and sortId = ${sortId})and modelIndex = 0)`
  //     const data =  await this.postsRepository.query(sqlToSchool)
  //     return {
  //       expand:true,
  //       inputList:data,
  //       title:"教育经历",
  //       isShow:true
  //     }
  //   }
  // async getWork(userId:number=10,sortId:number=1) {
  //   const sqlToWork = `select * from project where resumemodelId in (select id from resumemodel where 
  //     resumemodel.resumeId =(select id from resume where userId = ${userId} and sortId = ${sortId}) and modelIndex = 1)`
  //     const data =  await this.postsRepository.query(sqlToWork)
  //     return {
  //       expand:true,
  //       inputList:data,
  //       title:"工作经历",
  //       isShow:true
  //     }
  //   }
  // async getSummary(userId:number=10,sortId:number=1) {
  //   const sqlToSummary = `select * from project where resumemodelId = (select id from resumemodel where 
  //       resumeId =(select id from resume where userId =${userId} and sortId = ${sortId}) and modelIndex = 3)`
  //       const data = await this.postsRepository.query(sqlToSummary)
  //     return {
  //       expand:true,
  //       inputList:data,
  //       title:"个人总结",
  //       isShow:true
  //     }
  //   }
  // async getProject(userId:number=10,sortId:number=1) {
  //   const sqlToProject = `select * from project where resumemodelId in (select id from resumemodel where 
  //       resumeId =(select id from resume where userId =${userId} and sortId = ${sortId}) and modelIndex = 2)`
  //   const data =  await this.postsRepository.query(sqlToProject)
  //     return {
  //       expand:true,
  //       inputList:data,
  //       title:"项目经历",
  //       isShow:true
  //     }
  // }

  async getPerson(resumeId:number) {
    const sqlToPerson = `select * from personal where resumeId = ${resumeId}`
    const data =  (await this.postsRepository.query(sqlToPerson))[0]
      return {
        inputList:[{
          cityYoulived:data?.cityYoulived,
          degree:data?.degree,
          email:data?.email,
          phoneNumber:data?.phoneNumber,
        },{
          cityItent:data?.cityItent,
          currentStatus:data?.currentStatus,
          postIntent:data?.postIntent
        }],
        title:"基本信息",
        userName:data?.userName,
        resumeName:data.resumeName
      }
    }
  async getSchool(resumeId:number) {
    const sqlToSchool = `select id, academy, degree, major, school, period,richText from school where resumemodelId in (select id from resumemodel where 
     resumeId = ${resumeId} and modelIndex = 0)`
      const data =  await this.postsRepository.query(sqlToSchool)
      Logger.log(`${inspect(data)}`)
      return {
        expand:true,
        inputList:data,
        title:"教育经历",
        isShow:true,
        moudleId:0
      }
    }
  async getWork(resumeId:number) {
    const sqlToWork = `select  * from work where resumemodelId in (select id from resumemodel where 
      resumeId = ${resumeId} and modelIndex = 1)`
      const data =  await this.postsRepository.query(sqlToWork)
      return {
        expand:true,
        inputList:data,
        title:"工作经历",
        isShow:true,
        moudleId:1
      }
    }
  async getSummary(resumeId:number) {
    const sqlToSummary = `select * from summary where resumemodelId = (select id from resumemodel where 
        resumeId = ${resumeId} and modelIndex = 3)`
        const data = await this.postsRepository.query(sqlToSummary)
      return {
        expand:true,
        inputList:data,
        title:"个人总结",
        isShow:true,
        moudleId:3
      }
    }
  async getProject(resumeId:number) {
    const sqlToProject = `select * from project where resumemodelId in (select id from resumemodel where 
        resumeId = ${resumeId} and modelIndex = 2 )`
    const data =  await this.postsRepository.query(sqlToProject)
      return {
        expand:true,
        inputList:data,
        title:"项目经历",
        isShow:true,
        moudleId:2
      }
  }
}
 

