import type { JSX } from 'react';
import { useRef, useEffect, useState } from 'react';
type Props = {
	image: string;
	alt: string;
};
export const RandomFox = ({ image, alt }: Props): JSX.Element => {
	//Al usar useRef se coloca el tipo del elemento a referenciar y se inicializa en null en caso de no saber que valor por defecto deberia tener
	const node = useRef<HTMLImageElement>(null);
	const [src, setSrc] = useState(
		'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4='
	);
	useEffect(() => {
		// Crear un nuevo observador, para hacer lazy loading de las imagenes
		// Se va a cargar la imagen unicamente cuando sea visible en el viewport de la pantalla
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setSrc(image);
				}
			});
		});
		//Observe node
		if (node.current) {
			observer.observe(node.current);
		}
		//Desconectar
		return () => {
			observer.disconnect();
		};
	}, [image]);

	return (
		<img
			ref={node}
			width={320}
			height='auto'
			className='rounded bg-gray-300'
			src={src}
			alt={alt}
		/>
	);
};
