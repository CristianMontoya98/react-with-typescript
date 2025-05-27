import type { JSX } from 'react';
type Props = {
    image: string;
    alt: string;
};
export const RandomFox = ({ image, alt }: Props): JSX.Element => {
    return (
        <img
            width={320}
            height='auto'
            className='rounded'
            src={image}
            alt={alt}
        />
    );
};
