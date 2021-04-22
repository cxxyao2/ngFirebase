import { getCurrencies } from './getCurrencies';
fdescribe('getCurrencies', () => {
  it('should include the supported currencies', () => {
    const result = getCurrencies();
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');
  });
});
