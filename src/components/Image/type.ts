import {ReactNode} from 'react';
import { GlobalProps } from '../../utils/type';

interface ImageProps extends GlobalProps{
    src?: string;
    children?: ReactNode;
}

export type {
    ImageProps
}