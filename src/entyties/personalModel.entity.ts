import { userEntity } from "src/logical/user/user.entity";
import { resumeEntity } from "src/posts/posts.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("personalmodel")
export class personalmodelEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    
    @Column()
    resumeId:number

    // @OneToOne(type =>resumeEntity, resume =>resume.user)
    // info: resumeEntity;

    // @ManyToOne(() => userEntity, (user) =>user.resume)
    // @JoinColumn()
    // user: userEntity;
}