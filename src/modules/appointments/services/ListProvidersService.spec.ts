import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(
      fakeUsersRepository
      );
  });
  it('should be able to list the providers', async () => {
   const  user1 = await fakeUsersRepository.create({
      name: 'Pedro Pascal',
      email: 'pedropascal@test.com',
      password: 'eusou',
    });

   const user2 = await fakeUsersRepository.create({
      name: 'Jhon Ferri',
      email: 'jhonferri@test.com',
      password: 'ruimdemais',
    });

  const loggedUser = await fakeUsersRepository.create({
      name: 'Jhon Ferreira',
      email: 'jhonferreira@example.com',
      password: 'nessacoisa',
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });
    expect(providers).toEqual([user1, user2]);
  });
});