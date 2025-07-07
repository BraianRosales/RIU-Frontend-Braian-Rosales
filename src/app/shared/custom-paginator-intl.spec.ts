import { getCustomPaginatorIntl } from './custom-paginator-intl';

describe('getCustomPaginatorIntl', () => {
  let customPaginatorIntl: any;

  beforeEach(() => {
    customPaginatorIntl = getCustomPaginatorIntl();
  });

  it('should create getCustomPaginatorIntl ts', () => {
    expect(customPaginatorIntl).toBeTruthy();
  });

  it('hopes to set the labels in Spanish', () => {
    expect(customPaginatorIntl.itemsPerPageLabel).toBe('Héroes por página:');
    expect(customPaginatorIntl.nextPageLabel).toBe('Siguiente');
    expect(customPaginatorIntl.previousPageLabel).toBe('Anterior');
    expect(customPaginatorIntl.firstPageLabel).toBe('Primera página');
    expect(customPaginatorIntl.lastPageLabel).toBe('Última página');
  });

  describe('getRangeLabel', () => {
    it('this return correct range when length is 0', () => {
      const result = customPaginatorIntl.getRangeLabel(0, 10, 0);
      expect(result).toBe('0 de 0');
    });

    it('this return correct range when pageSize is 0', () => {
      const result = customPaginatorIntl.getRangeLabel(0, 0, 100);
      expect(result).toBe('0 de 100');
    });

    it('this return correct range for first page', () => {
      const result = customPaginatorIntl.getRangeLabel(0, 10, 100);
      expect(result).toBe('1 - 10 de 100');
    });

    it('this return correct range for middle page', () => {
      const result = customPaginatorIntl.getRangeLabel(2, 10, 100);
      expect(result).toBe('21 - 30 de 100');
    });

    it('this return correct range for last page', () => {
      const result = customPaginatorIntl.getRangeLabel(9, 10, 100);
      expect(result).toBe('91 - 100 de 100');
    });

    it('this handle case where endIndex exceeds length', () => {
      const result = customPaginatorIntl.getRangeLabel(9, 10, 95);
      expect(result).toBe('91 - 95 de 95');
    });

    it('this handle case where startIndex exceeds length', () => {
      const result = customPaginatorIntl.getRangeLabel(10, 10, 95);
      expect(result).toBe('101 - 110 de 95');
    });
  });
});
