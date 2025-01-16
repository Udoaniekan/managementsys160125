import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { userRole } from "../enum/user.role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;
    
    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: userRole,
        default: userRole.user
    })
    role: userRole


}
