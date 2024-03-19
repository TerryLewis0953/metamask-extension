import useAlerts from './useAlerts';
import { Severity } from '../../../helpers/constants/design-system';
import { renderHookWithProvider } from '../../../../test/lib/render-helpers';


describe('useAlerts', () => {
  const ownerIdMock = '123';
  const alertsMock = [
    { key: 'from', field: 'from', severity: Severity.Danger, message: 'Alert 1' },
    { key: 'data', severity: Severity.Warning, message: 'Alert 2' },
  ];

  const mockState = {
    confirmAlerts: {
    alerts: {[ownerIdMock]: alertsMock},
    confirmed: {[ownerIdMock]: {'from': true, 'data': false}}
  }
  }

  describe('returns the correct', () => {
    const expectedGeneralAlerts = alertsMock.find(alert => alert.key === 'data')
    const expectedFieldAlerts = alertsMock.find(alert => alert.field === 'from')
    const {result} = renderHookWithProvider(() => useAlerts(ownerIdMock), mockState);

    it('alerts', () => {
      expect(result.current.alerts).toEqual(alertsMock);
    });

    it('generalAlerts', () => {
      expect(result.current.generalAlerts).toEqual([expectedGeneralAlerts]);
    });

    it('getFieldAlerts', () => {
      expect(result.current.getFieldAlerts('from')).toEqual([expectedFieldAlerts]);
    });

    it('isAlertConfirmed', () => {
      expect(result.current.isAlertConfirmed('from')).toBe(true);
    });
  });
});
