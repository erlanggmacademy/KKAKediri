Folder ini untuk gambar yang ingin diproses & dikompresi otomatis oleh Astro:

import { Image } from 'astro:assets';
import myImage from '../assets/images/hero.jpg';

<Image src={myImage} alt="..." format="webp" />
