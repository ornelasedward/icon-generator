import { FaUserCircle } from "react-icons/fa";
import  ShuffleLoader  from "./ShuffleLoader";

export function Button(
    props: React.ComponentPropsWithoutRef<"button"> & {
        isLoading?: boolean;
    }
    ) {
    return (
        <button {...props} className="flex items-center gap-2 rounded-lg border-2 border-white px-4 py-2 font-semibold text-white transition-colors hover:bg-white hover:text-black">
            {/* <FaUserCircle /> */}
            {props.isLoading && <ShuffleLoader />}
            {props.children}
        </button>
    )
}