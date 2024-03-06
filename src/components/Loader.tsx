import './Loader.css';


interface LoaderProps {
    movementElement?: JSX.Element,
}

const defaultMovementElement = (<div className='loader-default-element'></div>)

export default function Loader({ movementElement }: LoaderProps) {


    return (<><div className="loader" aria-hidden>
        {movementElement ?? defaultMovementElement}
    </div>
        {/* TODO: Check this displays for screen readers as expected */}
        <h3 className='screen-reader-only'>Ladataan...</h3>
    </>)
}