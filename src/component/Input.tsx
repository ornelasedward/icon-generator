export function Input(props: React.ComponentPropsWithoutRef<"input">) {
    return (
        <input {...props} type="text" className="border border-gray-800 dark:text-gray-800 px-2 py-1 rounded"></input>
    )
}