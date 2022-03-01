import React from 'react';
import type { FC, ComponentProps } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

type IconProps = ComponentProps<typeof Icon>;

export const MaterialIcon: FC<IconProps> = ({ ...props }) => {
	const { colors } = useTheme();
	return <Icon color={colors.text} {...props} />;
};
