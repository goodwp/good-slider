const POSITION_Y_MAP = {
    top: "flex-start",
    center: "center",
    bottom: "flex-end",
};

const POSITION_X_MAP = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
};

const DEFAULT_POSITION = {
    "--content-position-y": "center",
    "--content-position-x": "center",
};

const getContentPositionStyles = ( contentPosition ) => {
    if ( contentPosition === "center" ) {
        return DEFAULT_POSITION;
    }

    const positions = contentPosition.split( " " );
    if ( positions.length < 2 ) {
        return DEFAULT_POSITION;
    }
    const [ yPosition, xPosition ] = positions;

    return {
        "--content-position-y": POSITION_Y_MAP[ yPosition ] || "center",
        "--content-position-x": POSITION_X_MAP[ xPosition ] || "center",
    };
};
export { getContentPositionStyles };
