import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    appService = new AppService();
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  it('should be matched value', () => {
    // given
    const key = 1;

    //when
    const item = appService.findOne(key);

    //then
    expect(item.value).toEqual({ id: key, value: 'foo' });

    const optinal = item.map<number>((item) => item.id);
    expect(optinal.value).toBe(key);

    const id = item.flat<number>((item) => item.id);
    expect(id).toBe(key);
  });

  it('should be null value', () => {
    // given
    const key = 2;

    //when
    const item = appService.findOne(key);

    // //then
    expect(item.value).toBeUndefined();

    const optinal = item.map<number>((item) => item.id);
    expect(optinal.value).toBeUndefined();

    const id = item.flat<number>((item) => item.id);
    expect(id).toBeUndefined();
  });
});
