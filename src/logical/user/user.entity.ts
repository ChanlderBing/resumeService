import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("user")
export class userEntity {
    @PrimaryGeneratedColumn()
    id:number; // 标记为主列，值自动生成

    @Column({ length:20 })
    userName: string;

    @Column({ length: 100})
    password: string;

    @Column()
    passwordSalt: string;

    @Column({ length: 1000})
    photo: string;
    
    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    create_time: Date

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    update_time: Date
}