import comedyBg from './assets/genres/comedyBg.webp';
import thrillerBg from './assets/genres/thrillerBg.webp';
import familyBg from './assets/genres/family.webp';
import animeBg from './assets/genres/anime.webp';
import actionBg from './assets/genres/action.webp';
import dramaBg from './assets/genres/drama.webp';
import melodramaBg from './assets/genres/melodrama.webp';



export const SECRET = "Kl9bPhd1JbWN0BxyP0V9s9qRQJFUQHv22Hjw3pRFQjUmERrmglvHvQPqQt4KamI6";

export const CATEGORIES = [
    {
        "id": 6,
        "background": comedyBg,
        "name": "комедия"
    },
    {
        "id": 3,
        "background": thrillerBg,
        "name": "триллер"
    },
    {
        "id": 7,
        "background": familyBg,
        "name": "семейный"
    },
    {
        "id": 21,
        "background": animeBg,
        "name": "аниме"
    },
    {
        "id": 2,
        "background": actionBg,
        "name": "боевик"
    },
    {
        "id": 9,
        "background": dramaBg,
        "name": "драма"
    },
    {
        "id": 5,
        "background": melodramaBg,
        "name": "мелодрама"
    }
] as const;
