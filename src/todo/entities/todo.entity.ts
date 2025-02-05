import { User } from "src/user/entities/user.entity";
import { Column, Entity,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    userId: string;

    @ManyToOne(() => User, (user) => user.todo)
    user: User[];
}
