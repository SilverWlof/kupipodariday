import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToOne} from 'typeorm';
import {IsString, Min, Max, Matches} from 'class-validator';
import { URLRegExp } from 'src/utils/reg-exps';
import { Wish } from 'src/wishes/wishes.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Min(1)
  @Max(250)
  @IsString()
  name: string;

  @Column({default: ''})
  @Max(1500)
  @IsString()
  description: string

  @Column()
  @Matches(URLRegExp)
  image: string;

  @ManyToOne(() => User, (owner) => owner.wishlists)
  owner: User;
  
  @ManyToOne(() => Wish)
  @JoinTable()
  items: Wish[];
}