import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from 'src/logical/user/user.entity';
import {  DataSource, Repository } from 'typeorm';
import { inspect } from 'util';
import { env } from '../config';
import { unlink } from 'node:fs';
const multiparty = require('multiparty');



export interface PostsRo {
   // list: userEntity[];
  }
@Injectable()
export class PostsService {
    constructor(
       @InjectRepository(userEntity)
        private readonly postsRepository: Repository<userEntity>,
        
      ) {}

  async updatePerson(post) {
    const sqlToPerson = `update personal set userName ='${post.userName}',cityYoulived='${post.cityYoulived}',degree='${post.degree}',
    email='${post.email}',phoneNumber='${post.phoneNumber}',
    cityItent='${post.cityItent}',currentStatus='${post.currentStatus}',
    postIntent='${post.postIntent}' where resumeId = ${post.resumeId}`
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
    const sqlToPerson = `insert into personal values(null,'${post.userName}','${post.title}','${post.cityYoulived}','${post.degree}','${post.email}','${post.phoneNumber}','${post.cityItent}','${post.currentStatus}','${post.postIntent}',${resumeId},'',0,null)`
    return  await this.postsRepository.query(sqlToPerson)
  }
        
  async setProject(resumeId,post) {
    if (post&&Object.keys(post).length !== 0) {
      const sqlToProject = `insert into project values(null,'${post.projectName}','${post.projectDescription}','${post.city}',${post.resumemodelId},0,'${post.period}','${post.richText}')`
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
      const sqlToWork = `insert into work values(null,'0','${post.experienceName}','${post.role}','${post.department}','${post.city}','${post.resumemodelId}',0,'${post.period}','${post.richText}')`
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
        const sqlToSchool = `insert into school values(null,'0','${post.academy}','${post.degree}','${post.major}','${post.school}',${post.resumemodelId},0,'${post.period}','${post.richText}')`
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
        })
        return addRes
    } catch (error) {
        console.log("Transaction failed:", error);
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async updatePic(post,request) {
    var form = new multiparty.Form();
    form.uploadDir='./public/upload_img'; //上传图片保存的地址 目录必须存在
    form.parse(request, async (err, fields, files)=> {
     var originalFileName = files.file[0].originalFilename
      if (originalFileName) {
      let url = files.file[0].path.split('\\')[2]
      const sqlToProject1 = `select avatar from personal where resumeId = ${fields.resumeId[0]}`
      const fileName =  (await this.postsRepository.query(sqlToProject1))[0].avatar
      if (fileName) {
      unlink(`./public/upload_img/${fileName}`,(err)=>{
        if (err) console.log(err);
      })}
      const sqlToProject = `update personal set avatar='${url}' where resumeId = ${fields.resumeId[0]}`
      const data =  await this.postsRepository.query(sqlToProject)
      }
      
    })
  }
  sortab(data){
      return  function(obj1,obj2){
          var value1=obj1[data];
          var value2=obj2[data];
          if(value2<value1){
             return 1
          }else if(value2>value1){
            return -1
          }else{
           return 0
          }
       }
   }
  async getUserResume(resumeId:number) {
    let school = await this.getSchool(resumeId)
    let project = await this.getProject(resumeId)
    let summary = await this.getSummary(resumeId)
    let work = await this.getWork(resumeId)
    let arr = [school,project,summary,work]
    arr.sort(this.sortab("moudleId"))
    return {
      resumeId:resumeId,
      personalMoudle:{
        ...await this.getPerson(resumeId)
      },
      resumeMoudle:arr
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
    const sqlToPerson = `select * from personal where resumeId =49 `
    const data =  await this.postsRepository.query(sqlToPerson)
    return {
      data,
      code:200,
      msg:'获取成功'
    }
  }
  async getUserResumeName(resumeId) {
    const sqlToPerson = `select resumeName from personal where resumeId =${resumeId}`
    const data =  await this.postsRepository.query(sqlToPerson)
    return data
    
  }
  async updateShowStatus(post) {
    let sql
    if (post.moudleId==0) {
       sql = `update school set isShow=${post.status} where id = ${post.id}`
    } else if (post.moudleId==1) {
       sql = `update work set isShow=${post.status} where id = ${post.id}`
    } else if(post.moudleId==2){
       sql = `update project set isShow=${post.status} where id = ${post.id}`
    }else if(post.moudleId==3){
       sql = `update summary set isShow=${post.status} where id = ${post.id}`
    }
    const data =  await this.postsRepository.query(sql)
    return data
  }
  

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
        resumeName:data.resumeName,
        resumeId:resumeId,
        avatar:data?.avatar
      }
    }
  async getSchool(resumeId:number) {
    const sqlToSchool = `select id, academy, degree, major, school, period,richText,resumemodelId,isShow from school where resumemodelId in (select id from resumemodel where 
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
        expand:false,
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
 

