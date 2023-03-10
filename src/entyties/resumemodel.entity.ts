import { userEntity } from "src/logical/user/user.entity";
import { resumeEntity } from "src/posts/posts.entity";
import { Entity, JoinColumn, ManyToOne,  OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("resumemodel")
export class resumemodelEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    
    // @OneToOne(type =>resumeEntity, info => info.user)
    // @JoinColumn()
    // info: resumeEntity;

    // @ManyToOne(() => userEntity, (user) =>user.resume)
    // @JoinColumn()
    // user: userEntity;
}