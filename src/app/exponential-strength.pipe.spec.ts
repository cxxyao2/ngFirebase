import { ExponentialStrengthPipe } from './exponential-strength.pipe';

fdescribe('ExponentialStrengthPipe', () => {
  // This pipe is a pure,stateless function so no need for BeforeEach
  const pipe = new ExponentialStrengthPipe();

  it('calculates exponent of the number', () => {
    expect(pipe.transform(2, 3)).toBe(8);
  });
});
