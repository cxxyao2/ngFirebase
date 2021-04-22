import { greet } from './greet';
fdescribe('greet', () => {
  it('should include the name in the message', () => {
    expect(greet('Jane')).toContain('Jane');
  });
});
