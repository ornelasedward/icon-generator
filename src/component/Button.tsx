import { FaUserCircle } from "react-icons/fa";
import ShuffleLoader from "./ShuffleLoader";

export function Button(
    props: React.ComponentPropsWithoutRef<"button"> & {
        isLoading?: boolean;
    }
) {
    // Determine the background class based on isLoading
    const backgroundClass = props.isLoading ? 'bg-white' : 'hover:bg-white';

    return (
        <button {...props} className={`flex items-center gap-2 rounded-lg border-2 border-white px-4 py-2 font-semibold text-white transition-colors ${backgroundClass} hover:text-black`}>
            {/* <FaUserCircle /> */}
            {props.isLoading && <ShuffleLoader />}
            {props.children}
        </button>
    );
}
