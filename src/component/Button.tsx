import { FaUserCircle } from "react-icons/fa";

export function Button(props: React.ComponentPropsWithoutRef<"button">) {
    return (
        <button {...props} className="flex items-center gap-2 rounded-lg border-2 border-white px-4 py-2 font-semibold text-white transition-colors hover:bg-white hover:text-black">
            <FaUserCircle />
            {props.children}
        </button>
    )
}