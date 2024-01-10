export function Input(props: React.ComponentPropsWithoutRef<"input">) {
    return (
        <input {...props} type="text" className="border-gray-800"></input>
    )
}