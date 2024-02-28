import React from 'react';
import { Box, Text } from '../../../component-library';
import {
  Display,
  TextColor,
  TextVariant,
} from '../../../../helpers/constants/design-system';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import { Asset } from '../../../../ducks/send';
import AssetBalanceText from './AssetBalanceText';

interface AssetBalanceProps {
  error?: string;
  asset: Asset;
}

export default function AssetBalance({ asset, error }: AssetBalanceProps) {
  const t = useI18nContext();

  const balanceColor = error
    ? TextColor.errorDefault
    : TextColor.textAlternative;

  return (
    <Box display={Display.Flex}>
      <Text color={balanceColor} marginRight={1} variant={TextVariant.bodySm}>
        {t('balance')}:
      </Text>

      <AssetBalanceText asset={asset} balanceColor={balanceColor} />
      {error ? (
        <Text variant={TextVariant.bodySm} color={TextColor.errorDefault}>
          . {t(error)}
        </Text>
      ) : null}
    </Box>
  );
}
