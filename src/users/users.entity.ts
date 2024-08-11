import {IsString, Min, Max, Matches} from 'class-validator';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable} from 'typeorm';
import { Wish } from 'src/wishes/wishes.entity';
import { URLRegExp, emailRegExp } from 'src/utils/reg-exps';
import { Offer } from 'src/offers/offers.entity';
import { Wishlist } from 'src/wishlists/wishlists.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true})
  @IsString()
  @Min(2)
  @Max(30)
  username: string;

  @Column({type: 'varchar', length: 200, default: 'Пока ничего не рассказал о себе.'})
  @IsString()
  @Min(2)
  @Max(200)
  about: string;

  @Column({default: 'https://i.pravatar.cc/300'})
  @IsString()
  @Matches(URLRegExp)
  avatar: string;

  @Column({unique: true})
  @IsString()
  @Matches(emailRegExp)
  email: string;

  @Column()
  @IsString()
  password: string;

  // Дописать связь
  @ManyToMany(() => Wish)
  @JoinTable()
  wishes: Wish[];

  @ManyToMany(() => Offer, (offer) => offer.item)
  @JoinTable()
  offers: Offer[];

  @ManyToMany(() => Wishlist)
  @JoinTable()
  wishlists: Wishlist[];
}