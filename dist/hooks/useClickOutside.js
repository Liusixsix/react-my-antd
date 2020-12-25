import { useEffect } from "react";
export function useClickOutsode(ref, handle) {
    useEffect(function () {
        var listen = function (e) {
            if (!ref.current || ref.current.contains(e.target))
                return;
            handle(e);
        };
        document.addEventListener('click', listen);
        return function () {
            document.removeEventListener('click', listen);
        };
    }, [ref, handle]);
}
