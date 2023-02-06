import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider,);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  })
  it('should be able to authenticate', async () => { // Erro de teste
    const user = await createUser.execute({
      name: 'Jhon Ferri',
      email: 'jhonferri@gmail.com',
      password: 'eusou',
    });

    const response = await authenticateUser.execute({
      email: 'jhonferri@gmail.com',
      password: 'eusou',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(authenticateUser.execute({
      email: 'jhonferri@gmail.com',
      password: 'eusou'
    }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with invalid password', async () => {
    await createUser.execute({
      name: 'Jhon Ferri',
      email: 'jhonferri@gmail.com',
      password: 'eusou',
    });

    await expect(authenticateUser.execute({
      email: 'jhonferri@gmail.com',
      password: 'wrong-password',
    }),
    ).rejects.toBeInstanceOf(AppError);
  });
});