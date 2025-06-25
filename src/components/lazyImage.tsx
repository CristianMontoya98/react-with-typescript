import type { ImgHTMLAttributes, JSX } from 'react';
import { useRef, useEffect, useState } from 'react';
type LazyImageProps = {
	src: string;
	onLazyLoad?: (img: HTMLImageElement) => void;
};
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;

type Props = LazyImageProps & ImageNative;
export const LazyImage = ({ src, onLazyLoad, ...imgProps }: Props): JSX.Element => {
	//Al usar useRef se coloca el tipo del elemento a referenciar y se inicializa en null en caso de no saber que valor por defecto deberia tener
	const node = useRef<HTMLImageElement>(null);
	//Se usa este usestate para evita r que se renderize mas de una vez cada imagen al realizar el lazy loading
	const [isLazyLoaded, setIsLazyLoaded] = useState(false);
	const [currentSrc, setCurrentSrc] = useState(
		'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4='
	);
	useEffect(() => {
		if (isLazyLoaded) {
			return;
		}
		// Crear un nuevo observador, para hacer lazy loading de las imagenes
		// Se va a cargar la imagen unicamente cuando sea visible en el viewport de la pantalla
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting || !node.current) {
					return;
				}
				setCurrentSrc(src);
				observer.disconnect();
				setIsLazyLoaded(true);
				if (typeof onLazyLoad === 'function') {
					onLazyLoad(node.current);
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
	}, [src, onLazyLoad, isLazyLoaded]);

	return (
		<img
			ref={node}
			src={currentSrc}
			{...imgProps}
		/>
	);
};
