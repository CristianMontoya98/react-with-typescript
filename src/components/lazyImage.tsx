import type { ImgHTMLAttributes, JSX } from 'react';
import { useRef, useEffect, useState } from 'react';
type LazyImageProps = {
	src: string;
};
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;

type Props = LazyImageProps & ImageNative;
export const LazyImage = ({ src, alt, ...imgProps }: Props): JSX.Element => {
	//Al usar useRef se coloca el tipo del elemento a referenciar y se inicializa en null en caso de no saber que valor por defecto deberia tener
	const node = useRef<HTMLImageElement>(null);
	const [currentSrc, setCurrentSrc] = useState(
		'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4='
	);
	useEffect(() => {
		// Crear un nuevo observador, para hacer lazy loading de las imagenes
		// Se va a cargar la imagen unicamente cuando sea visible en el viewport de la pantalla
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setCurrentSrc(src);
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
	}, [src]);

	return (
		<img
			ref={node}
			src={currentSrc}
			{...imgProps}
		/>
	);
};
