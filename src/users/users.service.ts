import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { FindManyOptions, QueryFailedError, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    try {
      return this.userRepository.save({...createUserDto, password: hashedPassword});
    } catch(err) {
      if (err instanceof QueryFailedError) {
        throw new ConflictException('Пользователь с таким username или email уже сущесвтует');
      }
    }
    
  }

  async find(options: FindManyOptions<User>) {
    return this.userRepository.find(options);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({id});
    if (!user) {
      throw new NotFoundException()
    }

    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOneBy({username});
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async updateOne(username: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({username});

    if (updateUserDto.password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);
      const newUpdateUserDto = {...updateUserDto, password: hashedPassword};

      try {
        return this.userRepository.save({...user, ...newUpdateUserDto});
      } catch(err) {
        if (err instanceof QueryFailedError) {
          throw new ConflictException('Пользователь с таким username или email уже сущесвтует');
        }
      }
      
    }

    try {
      return this.userRepository.save({...user, ...updateUserDto});
    } catch(err) {
      if (err instanceof QueryFailedError) {
        throw new ConflictException('Пользователь с таким username или email уже сущесвтует');
      }
    }
    
  }

  async removeOne(id: number, userId: number) {
    const user = await this.userRepository.findOneBy({id});
    if (id !== userId) {
      throw new ConflictException('Вы не можете удалить другого пользователя')
    }

    return this.userRepository.delete({id});
  }
}