import { DefaultTheme } from 'react-native-paper';

export const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#2196F3',
        accent: '#FFC107',
        background: '#F5F5F5',
        surface: '#FFFFFF',
        text: '#212121',
        error: '#f44336',
    },
    fonts: {
        regular: 'Roboto-Regular',
        medium: 'Roboto-Medium',
        light: 'Roboto-Light',
        thin: 'Roboto-Thin',
    },
    roundness: 8,
};