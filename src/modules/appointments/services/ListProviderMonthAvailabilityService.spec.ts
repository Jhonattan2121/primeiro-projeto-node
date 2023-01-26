import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the month availability from provider', async () => {
    
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2023, 1, 26, 8, 0, 0 )
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2023, 1, 26, 9, 0, 0 )
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2023, 1, 26, 10, 0, 0 )
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2023, 1, 26, 11, 0, 0 )
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2023, 1, 26, 12, 0, 0 )
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2023, 1, 26, 13, 0, 0 )
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2023, 1, 26, 14, 0, 0 )
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2023, 1, 26, 15, 0, 0 )
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2023, 1, 26, 16, 0, 0 )
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2023, 1, 26, 17, 0, 0 )
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2023, 1, 27, 9, 0, 0 )
    });

   const availability = await listProviderMonthAvailability.execute({
    provider_id: 'user',
    year: 2023,
    month: 1,
   });

   expect(availability).toEqual(expect.arrayContaining([
    {day: 25, available: true},
    {day: 26, available: false},
    {day: 27, available: true},
    {day: 28, available: true},
   ])
   )
  });
});