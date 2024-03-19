import React from 'react';
import { ButtonVariant } from '@metamask/snaps-sdk';
import {
  Box,
  Button,
  ButtonSize,
  Checkbox,
  Icon,
  IconName,
  IconSize,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '../../../../../components/component-library';
import {
  BlockSize,
  Display,
  FlexDirection,
  JustifyContent,
  Severity,
  TextColor,
  TextVariant,
} from '../../../../../helpers/constants/design-system';
import { useI18nContext } from '../../../../../hooks/useI18nContext';
import useAlerts from '../../../hooks/useAlerts';

export type AlertModalProps = {
  /** The ID of the alert owner */
  ownerId: string;
  /** The handler for the alert modal */
  handleButtonClick: () => void;
  /** The key representing the field */
  key: string;
  // severity: Severity.Danger | Severity.Warning | Severity.Info;
};

export function AlertModal({
  ownerId,
  handleButtonClick,
  key,
}: // severity = Severity.Info,
AlertModalProps) {
  const t = useI18nContext();
  const { alerts, isAlertConfirmed, setAlertConfirmed } = useAlerts(ownerId);

  // const alert = alerts.find((alert) => alert.key === key);
  const alert = alerts[0];
  if (!alert) {
    return null;
  }
  const isConfirmed = isAlertConfirmed(alert.key);

  return (
    <Modal
      isOpen
      onClose={() => {
        // Intentionally empty
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box gap={3}>
            <Icon
              name={
                alert.severity === Severity.Info
                  ? IconName.Info
                  : IconName.Danger
              }
              size={IconSize.Xl}
            />
            <Text variant={TextVariant.headingSm} color={TextColor.inherit}>
              {alert?.reason || t('alerts')}
            </Text>
          </Box>
        </ModalHeader>
        <ModalBody>
          <Box
            key={alert.key}
            display={Display.Flex}
            flexDirection={FlexDirection.Row}
            justifyContent={JustifyContent.spaceBetween}
            paddingBottom={3}
            width={BlockSize.Full}
            gap={3}
          >
            <Text variant={TextVariant.bodyMd}>{alert.message}</Text>
            {alert.alertDetails && alert.alertDetails?.length > 0 ? (
              <Text variant={TextVariant.bodyMdBold}>
                {t('alertModalDetails')}
              </Text>
            ) : null}
            {alert.alertDetails?.map((detail, index) => (
              <Box
                key={`${alert.key}-detail-${index}`}
                // display={Display.Flex}
                // flexDirection={FlexDirection.Row}
                // justifyContent={JustifyContent.spaceBetween}
                // paddingBottom={3}
                // width={BlockSize.Full}
                // gap={3}
              >
                <Text variant={TextVariant.bodyMd}>{'- ' + detail}</Text>
              </Box>
            ))}
          </Box>
          <Box
            // key={alert.key}
            display={Display.Flex}
            flexDirection={FlexDirection.Row}
            justifyContent={JustifyContent.spaceBetween}
            paddingBottom={3}
            width={BlockSize.Full}
            gap={3}
          >
            <Checkbox
              label={t('alertModalAcknowledge')}
              data-testid="alert-modal-acknowledge-checkbox"
              isChecked={isConfirmed}
              onClick={() => setAlertConfirmed(alert.key, !isConfirmed)}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            variant={ButtonVariant.Primary}
            width={BlockSize.Full}
            onClick={handleButtonClick}
            size={ButtonSize.Lg}
            data-testid="alert-modal-button"
            // disabled={alerts.some((alert) => isAlertConfirmed(alert.key))}
          >
            {t('gotIt')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
