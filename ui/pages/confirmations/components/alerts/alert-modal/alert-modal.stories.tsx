import React from 'react';
import { AlertModal } from './alert-modal';
import { Severity } from '../../../../../helpers/constants/design-system';
import { Meta } from '@storybook/react';
import configureStore from '../../../../../store/store';
import { Provider } from 'react-redux';
import { Alert } from '../../../../../ducks/confirm-alerts/confirm-alerts';

const alertsMock: Alert[] = [
  { key: 'from', severity: Severity.Warning, message: 'Alert 1', reason: 'reason1', alertDetails: ['detail1', 'detail2']},
  { key: 'data', severity: Severity.Danger, message: 'Alert 2' },
];
const ownerIdMock = '123';
const storeMock = configureStore({ confirmAlerts: {
  alerts: {[ownerIdMock]: alertsMock},
  confirmed: {[ownerIdMock]: {'from': false, 'data': false}}
  } });

export default {
  title: 'Confirmations/Components/Alerts/AlertModal',
  component: AlertModal,
  argTypes: {
    ownerId: {
      control: 'text',
      description: 'The ID of the alert owner.',
    },
    handleButtonClick: {
      action: 'onClick',
      description: 'The handler for the alert modal.',
    },
  },
  args: {
    handleButtonClick: () => {},
    ownerId: ownerIdMock,
  },
  decorators: [(story) => <Provider store={storeMock}>{story()}</Provider>],
} as Meta<typeof AlertModal>;

export const DefaultStory = (args) => {
  return <AlertModal ownerId={ownerIdMock} key={'from'} {...args} />;
};

DefaultStory.storyName = 'No Saved Name';
