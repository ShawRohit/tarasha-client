import React from 'react';
import { ImageProps } from './type';
import './style.css';
import ImageLoader from '../ImageLoaderComponent';

const Image: React.FC<ImageProps> = (props) => {
    const {
        src = '',
        children,
        className
    } = props;
    return (
        <div className={`relative ${className} home-img img`}>
            <ImageLoader src={src} className='absolute background-img' />
            {children}
        </div>
    );
}

export default Image;
