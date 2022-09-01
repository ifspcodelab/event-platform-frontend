import { AccountStatusPipe } from './account-status.pipe';

describe('AccountStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new AccountStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
