import {useSideEffects} from "../../services/sideEffects";
import {useLayoutEffect} from "react";

const VariableViewer = () => {
    const mapElemId = 'map'
    const { mapSideEffects } = useSideEffects()

    useLayoutEffect(() => {
        mapSideEffects.createMap(mapElemId)
    }, [])

    return <div id={mapElemId}>
        No Map Rendered
    </div>
}

export default VariableViewer;
