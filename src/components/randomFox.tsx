import type { JSX } from 'react';
import { random } from '../utils/randomNumber';
export const RandomFox = (): JSX.Element => {
    const image: string = `https://randomfox.ca/images/${random()}.jpg`;
    return (
        <img
            width={320}
            height='auto'
            className='rounded'
            src={image}
        />
    );
};
