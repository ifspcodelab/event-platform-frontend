import { EventStatusPipe } from './event-status.pipe';

describe('EventStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new EventStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
