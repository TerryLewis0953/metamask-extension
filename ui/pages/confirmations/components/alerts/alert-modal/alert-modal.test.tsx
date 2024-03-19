import React from 'react';
import { fireEvent } from '@testing-library/react';
import { AlertModal } from './alert-modal';
import { Alert } from '../../../../../ducks/confirm-alerts/confirm-alerts';
import { Severity } from '../../../../../helpers/constants/design-system';
import { renderWithProvider } from '../../../../../../test/lib/render-helpers';
import { mock } from 'node:test';
import alerts from '../../../../../components/app/alerts';
import configureMockStore from 'redux-mock-store';

describe('AlertModal', () => {
  const ownerIdMock = '123';
  const handleButtonClick = jest.fn();
  const alertsMock = [
    { key: 'from', severity: Severity.Warning, message: 'Alert 1' },
    { key: 'data', severity: Severity.Danger, message: 'Alert 2' },
  ];

  const mockState = {
    confirmAlerts: {
    alerts: {[ownerIdMock]: alertsMock},
    confirmed: {[ownerIdMock]: {'from': false, 'data': false}}
    }
  }
  const mockStore = configureMockStore([])(mockState);

  it('renders the alert modal', () => {
    const {getByText} = renderWithProvider(
      <AlertModal ownerId={ownerIdMock} handleButtonClick={handleButtonClick} />, mockStore
    );

    expect(getByText('Alerts')).toBeInTheDocument();
  });

  it('renders the alerts', () => {
    const {getByText} = renderWithProvider(
      <AlertModal ownerId={ownerIdMock} handleButtonClick={handleButtonClick} />, mockStore
    );

    alertsMock.forEach((alert) => {
      expect(getByText(alert.message)).toBeInTheDocument();
    });
  });

  it.only('disables button when alerts are not acknowledge', () => {
    const {getByTestId} = renderWithProvider(
      <AlertModal ownerId={ownerIdMock} handleButtonClick={handleButtonClick} />, mockStore
    );

    expect(getByTestId('alert-modal-button')).toBeDisabled();
  });

  it('calls handleButtonClick when the button is clicked', () => {
    const mockStoreAcknowledgeAlerts = configureMockStore([])({...mockState, confirmAlerts: {confirmed: {[ownerIdMock]: {'from': true, 'data': true}}}});
    const {getByTestId} = renderWithProvider(
      <AlertModal ownerId={ownerIdMock} handleButtonClick={handleButtonClick} />, mockStore
    );

    // fireEvent.click(getByTestId('alert-modal-acknowledge-checkbox'));
    fireEvent.click(getByTestId('alert-modal-button'));
    expect(handleButtonClick).toHaveBeenCalledTimes(1);
  });
});
