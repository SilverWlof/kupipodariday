import {Matches} from 'class-validator';
import { User } from 'src/users/users.entity';
import { decimalRegExp } from 'src/utils/reg-exps';
import { Wish } from 'src/wishes/wishes.entity';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column({type: 'decimal'})
  @Matches(decimalRegExp)
  amount: number;

  @Column({type: 'boolean', default: false})
  hidden: boolean;
}