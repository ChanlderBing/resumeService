// import { userEntity } from "src/logical/user/user.entity";
// import { personalEntity } from "src/posts/posts.entity";
// import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import { personalmodelEntity } from "./personalmodel.entity";

// @Entity("resume")
// export class resumeEntity {
//     @PrimaryGeneratedColumn()
//     id:number; // 标记为主列，值自动生成
    
//     @OneToOne(type =>personalmodelEntity, personalmodel =>personalmodel.id)
//     @JoinColumn()
//     info: personalmodelEntity;

//     @ManyToOne(() => userEntity, (user) =>user.resume)
//     @JoinColumn()
//     user: userEntity;
// }