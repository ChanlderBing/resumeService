import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("personal")
export class personalEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    @Column()
    userId: number;
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
    userId: number;
    @Column()
    expand: boolean;
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
}

@Entity("work")
export class workEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    @Column()
    userId: number;
    @Column()
    expand: boolean;
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
}

@Entity("summary")
export class summaryEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    @Column()
    userId: number;
    @Column()
    title: string;
    @Column()
    richText: string;
}

@Entity("project")
export class projectEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成
    @Column()
    userId: number;
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
}