export function FormGroup(props: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div {...props} className="flex flex-col gap-3">
            {props.children}
        </div>
    )
}