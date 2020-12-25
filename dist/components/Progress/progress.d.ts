import React from 'react';
import { ThemeProps } from '../Icon';
export interface ProgressProps {
    percent: number;
    storekeHight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}
export declare const Progress: React.FC<ProgressProps>;
