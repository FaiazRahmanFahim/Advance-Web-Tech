import { HALogIn } from "src/hoteladmin-login/Entities/login.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('PostHotel_Info')
export class PostHotelInfo {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column({ type: 'varchar' })
    HotelName: string;

    @Column({ type: 'varchar' })
    roomType: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    Price: number;

    @Column({ type: 'varchar', default: 'Available' })
    Availability: string;

    @Column({ type: 'int' })
    NumberOfRoom: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    adminID: number;
    @ManyToOne(() => HALogIn, admin => admin.hotels)
   @JoinColumn({ name: 'adminID' })
   admin: HALogIn;
}
