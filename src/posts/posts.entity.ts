
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("personal")
export class personalEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    @Column()
    resumeId:number
    @Column({length:20,nullable: true})
    userName: string;
    @Column({nullable: true})
    title: string;
    @Column({nullable: true})
    cityYoulived: string;
    @Column({nullable: true})
    degree: string;
    @Column({nullable: true})
    email: string;
    @Column({nullable: true})
    phoneNumber: string;
    @Column({nullable: true})
    cityItent: string;
    @Column({nullable: true})
    currentStatus: string;
    @Column({nullable: true})
    postIntent: string;
    @Column({nullable: true,default: '未命名简历'})
    resumeName: string;
    @Column({nullable: true,default: false})
    editActive: boolean;
}
@Entity("school")
export class schoolEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    @Column({nullable: true})
    resumemodelId: number;
    @Column({nullable: true})
    title: string;
    @Column({nullable: true})
    academy: string;
    @Column({nullable: true})
    degree: string;
    @Column({nullable: true})
    major: string;
    @Column({nullable: true})
    school: string;
    @Column({nullable: true,length:10000})
    richText: string;
    @Column({nullable: true})
    period:string
    @Column({nullable: true})
    sortIndex:number
}

@Entity("work")
export class workEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    @Column({nullable: true})
    resumemodelId: number;
    @Column({nullable: true})
    title: string;
    @Column({nullable: true})
    experienceName: string;
    @Column({nullable: true})
    role: string;
    @Column({nullable: true})
    department: string;
    @Column({nullable: true})
    city: string;
    @Column({nullable: true,length:10000})
    richText: string;
    @Column({nullable: true})
    period:string
    @Column({nullable: true})
    sortIndex:number
}

@Entity("summary")
export class summaryEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    @Column({nullable: true})
    resumemodelId: number;
    @Column({nullable: true})
    title: string;
    @Column({nullable: true,length:10000})
    richText: string;
    @Column({nullable: true})
    sortIndex:number
}

@Entity("project")
export class projectEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    @Column({nullable: true})
    resumemodelId: number;
    @Column({nullable: true})
    projectName: string;
    @Column({nullable: true})
    projectDescription: string;
    @Column({nullable: true})
    city: string;
    @Column({nullable: true})
    period:string
    @Column({nullable: true,length:10000})
    richText: string;
    @Column({nullable: true})
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
    
}





