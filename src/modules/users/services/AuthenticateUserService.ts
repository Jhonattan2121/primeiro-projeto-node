
  import { sign } from 'jsonwebtoken';
  import User from "../infra/typeorm/entities/User";
  import authConfig from "@config/auth";
  import {inject, injectable} from 'tsyringe';
  import AppError from "@shared/errors/AppError";
  import IhashProvider from '../providers/HashProvider/models/IHashProvider';

  import IUsersRepository from "../repositories/IUsersRepository";


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository') 
    private usersRepository: IUsersRepository,
    
    @inject('HashProvider')
    private BCryptHashProvider: IhashProvider,
    ) {}
  public async execute({email, password}: IRequest): Promise <any> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    const passwordMatched = await this.BCryptHashProvider.compareHash(password, user.password);

    if(!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret , expiresIn } = authConfig.jwt;

    const token = sign({}, secret , {
      subject: user.id, 
      expiresIn,
    });

    return {
     email, password
    };

  }
}

export default AuthenticateUserService;