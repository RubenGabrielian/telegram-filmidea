import comedyBg from './assets/genres/comedy.webp';
import thrillerBg from './assets/genres/thriller.webp';
import familyBg from './assets/genres/family.webp';
import animeBg from './assets/genres/anime.webp';
import actionBg from './assets/genres/action.webp';
import dramaBg from './assets/genres/drama.webp';
import melodramaBg from './assets/genres/melodrama.webp';

import comedyLogo from './assets/genres/comedy.png';
import thrillerLogo from './assets/genres/thriller.png';
import familyLogo from './assets/genres/family.png';
import animeLogo from './assets/genres/anime.png';
import actionLogo from './assets/genres/action.png';
import dramaLogo from './assets/genres/drama.png';
import melodramaLogo from './assets/genres/melodrama.png';

export const SECRET = "Kl9bPhd1JbWN0BxyP0V9s9qRQJFUQHv22Hjw3pRFQjUmERrmglvHvQPqQt4KamI6";

export const CATEGORIES = [
    {
        "id": 6,
        "logo": comedyLogo,
        "background": comedyBg,
        "name": "комедия"
    },
    {
        "id": 3,
        "logo": thrillerLogo,
        "background": thrillerBg,
        "name": "триллер"
    },
    {
        "id": 7,
        "logo": familyLogo,
        "background": familyBg,
        "name": "семейный"
    },
    {
        "id": 21,
        "logo": animeLogo,
        "background": animeBg,
        "name": "аниме"
    },
    {
        "id": 2,
        "logo": actionLogo,
        "background": actionBg,
        "name": "боевик"
    },
    {
        "id": 9,
        "logo": dramaLogo,
        "background": dramaBg,
        "name": "драма"
    },
    {
        "id": 5,
        "logo": melodramaLogo,
        "background": melodramaBg,
        "name": "мелодрама"
    }
] as const;
