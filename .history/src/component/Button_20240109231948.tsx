export function Button(props: React.ComponentPropsWithoutRef<"button">) {
    return (
        <button {...props} className="rounded px-6 py-4 bg-blue-400">
            {props.children}
        </button>
    )
}