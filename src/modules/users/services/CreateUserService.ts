import {inject, injectable} from 'tsyringe';
import IhashProvider from '../providers/HashProvider/models/IHashProvider';
import AppError from "@shared/errors/AppError";
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
  class CreateUserService { 
  constructor( 
  @inject('UsersRepository')
  private usersRepository: IUsersRepository,
  @inject('Hashprovider')
  private hashProvider: IhashProvider,
  ) {}

  public async execute({name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      
    });

    return user;
  }
}

export default CreateUserService;