import React from 'react';
import type { FC, ComponentProps } from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import { useTheme } from '@react-navigation/native';
import type { IconProps } from './MaterialCommunityIcon';
// export type IconProps = ComponentProps<typeof Icon>;

export const FontistoIcon: FC<IconProps> = ({ ...props }) => {
	const { colors } = useTheme();
	return <Icon color={colors.text} {...props} />;
};
