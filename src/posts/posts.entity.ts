
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("personal")
export class personalEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    @Column()
    resumeId:number
    @Column({length:20,nullable: true})
    userName: string;
    @Column()
    title: string;
    @Column()
    cityYoulived: string;
    @Column()
    degree: string;
    @Column()
    email: string;
    @Column()
    phoneNumber: string;
    @Column()
    cityItent: string;
    @Column()
    currentStatus: string;
    @Column()
    postIntent: string;

}
@Entity("school")
export class schoolEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    @Column()
    resumemodelId: number;
    @Column()
    title: string;
    @Column()
    academy: string;
    @Column()
    degree: string;
    @Column()
    major: string;
    @Column()
    school: string;
    @Column()
    richText: string;
    @Column({type: 'timestamp'})
    startTime: Date
    @Column({type: 'timestamp'})
    endTime: Date
    @Column()
    modelIndex:number
    @Column()
    sortIndex:number
}

@Entity("work")
export class workEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    @Column()
    resumemodelId: number;
    @Column()
    title: string;
    @Column()
    experienceName: string;
    @Column()
    role: string;
    @Column()
    department: string;
    @Column()
    city: string;
    @Column()
    richText: string;
    @Column({type: 'timestamp'})
    startTime: Date
    @Column({type: 'timestamp'})
    endTime: Date
    @Column()
    modelIndex:number
    @Column()
    sortIndex:number
}

@Entity("summary")
export class summaryEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    @Column()
    resumemodelId: number;
    @Column()
    title: string;
    @Column()
    richText: string;
    @Column()
    sortIndex:number
}

@Entity("project")
export class projectEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    @Column()
    resumemodelId: number;
    @Column()
    projectName: string;
    @Column()
    projectDescription: string;
    @Column()
    city: string;
    @Column({type: 'timestamp'})
    startTime: Date
    @Column({type: 'timestamp'})
    endTime: Date
    @Column()
    richText: string;
    @Column()
    modelIndex:number
    @Column()
    sortIndex:number
}
@Entity("resume")
export class resumeEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成

    @Column()
    userId: number;

    @Column()
    sortId:number
    
    // @OneToOne(type =>personalmodelEntity, personalmodel =>personalmodel.id)
    // @JoinColumn()
    // personalmodel:personalmodelEntity;

    // @OneToOne(type =>resumemodelEntity, personalmodel =>personalmodel.id)
    // @JoinColumn()
    // resumemodel: personalmodelEntity;

    // @ManyToOne(() => userEntity, (user) =>user.resume)
    // @JoinColumn()
    // user: userEntity;
}





