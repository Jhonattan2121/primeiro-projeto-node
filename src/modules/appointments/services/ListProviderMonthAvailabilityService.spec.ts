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
      date: new Date(2023, 1, 26 , 19 , 0 , 0 ),
     });
   
    await fakeAppointmentsRepository.create({
    provider_id: 'user',
    date: new Date(2023, 0, 26 , 19 , 0 , 0 ),
   });

   await fakeAppointmentsRepository.create({
    provider_id: 'user',
    date: new Date(2023, 0, 26 , 20 , 0 , 0 ),
   });

   await fakeAppointmentsRepository.create({
    provider_id: 'user',
    date: new Date(2023, 0, 27 , 19 , 0 , 0 ),
   });

   const availability = await listProviderMonthAvailability.execute({
    provider_id: 'user',
    year: 2023,
    month: 1,
   });

   expect(availability).toEqual(expect.arrayContaining([
    {day: 25, available: true},
    {day: 26, available: false},
    {day: 27, available: false},
    {day: 28, available: true},
   ]),
   );
  });
});