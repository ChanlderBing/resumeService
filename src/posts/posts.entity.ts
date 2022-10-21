import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class PostsEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成

    @Column({ length:200,nullable: true, })
    information: string;

    @Column({ length: 10000,nullable: true,})
    resume: string;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    create_time: Date

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    update_time: Date
}
