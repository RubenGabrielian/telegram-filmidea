import { useEffect, useState } from 'react';


//@ts-ignore
function useDebounce(value: string | undefined, delay: number): string {
//@ts-ignore

    const [debouncedValue, setDebouncedValue] = useState<string>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
//@ts-ignore

            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
