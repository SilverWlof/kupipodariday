import {IsString, Min, Max, Matches, IsInt} from 'class-validator';
import { Offer } from 'src/offers/offers.entity';
import { User } from 'src/users/users.entity';
import { URLRegExp, decimalRegExp } from 'src/utils/reg-exps';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from 'typeorm';


@Entity()
export class Wish {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @IsString()
  @Min(1)
  @Max(250)
  name: string;

  @Column()
  @Matches(URLRegExp)
  @IsString()
  link: string;

  @Column()
  @Matches(URLRegExp)
  @IsString()
  image: string;

  @Column({type: 'decimal'})
  @Matches(decimalRegExp)
  price: number;

  @Column({type: 'decimal', default: 0})
  @Matches(decimalRegExp)
  rised: number;

  @ManyToOne(() => User)
  owner: User;

  @Column()
  @IsString()
  @Min(1)
  @Max(1024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column({type: 'decimal', default: 0})
  @IsInt()
  copied: number;
}