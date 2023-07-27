import { userEntity } from "src/logical/user/user.entity";
import { resumeEntity } from "src/posts/posts.entity";
import { Column, Entity, JoinColumn, ManyToOne,  OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("resumemodel")
export class resumemodelEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    
    @Column()
    resumeId:number

    @Column()
    modelIndex:number

    @Column()
    moudleIndex:number
}
// @Entity("schoolmodel")
// export class schoolmodelEntity {
//     @PrimaryGeneratedColumn()
//     id:number; // 标记为主列，值自动生成
    

//     @Column()
//     resumemodelId:number

//     @Column()
//     title:string

//     @Column()
//     expand:boolean

//     @Column()
//     sortIndex:number
//     // @OneToOne(type =>resumeEntity, info => info.user)
//     // @JoinColumn()
//     // info: resumeEntity;

// }
// @Entity("workmodel")
// export class workmodelEntity {
//     @PrimaryGeneratedColumn()
//     id:number; // 标记为主列，值自动生成
    
//     @Column()
//     title:string

//     @Column()
//     expand:boolean

//     @Column()
//     resumemodelId:number

//     @Column()
//     sortIndex:number
//     // @OneToOne(type =>resumeEntity, info => info.user)
//     // @JoinColumn()
//     // info: resumeEntity;

//     // @ManyToOne(() => userEntity, (user) =>user.resume)
//     // @JoinColumn()
//     // user: userEntity;
// }
// @Entity("summarymodel")
// export class summarymodelEntity {
//     @PrimaryGeneratedColumn()
//     id:number; // 标记为主列，值自动生成
    

//     @Column()
//     resumemodelId:number

//     @Column()
//     title:string

//     @Column()
//     expand:boolean

//     @Column()
//     sortIndex:number
//     // @OneToOne(type =>resumeEntity, info => info.user)
//     // @JoinColumn()
//     // info: resumeEntity;

//     // @ManyToOne(() => userEntity, (user) =>user.resume)
//     // @JoinColumn()
//     // user: userEntity;
// }
// @Entity("projectmodel")
// export class projectmodelEntity {
//     @PrimaryGeneratedColumn()
//     id:number; // 标记为主列，值自动生成
    
//     @Column()
//     resumemodelId:number

//     @Column()
//     title:string

//     @Column()
//     expand:boolean

//     @Column()
//     sortIndex:number
//     // @OneToOne(type =>resumeEntity, info => info.user)
//     // @JoinColumn()
//     // info: resumeEntity;

//     // @ManyToOne(() => userEntity, (user) =>user.resume)
//     // @JoinColumn()
//     // user: userEntity;
// }