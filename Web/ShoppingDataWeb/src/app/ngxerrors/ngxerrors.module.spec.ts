import { NgxErrorsModule } from './ngxerrors.module';

describe('NgxerrorsModule', () => {
  let ngxerrorsModule: NgxErrorsModule;

  beforeEach(() => {
    ngxerrorsModule = new NgxErrorsModule();
  });

  it('should create an instance', () => {
    expect(ngxerrorsModule).toBeTruthy();
  });
});
