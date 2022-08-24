import { CheckOrNotPipe } from './check-or-not.pipe';

describe('CheckOrNotPipe', () => {
  it('create an instance', () => {
    const pipe = new CheckOrNotPipe();
    expect(pipe).toBeTruthy();
  });
});
