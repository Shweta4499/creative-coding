type StartScreenProps = {
    isLeaving: boolean;
    onExitComplete: () => void;
};

export function StartScreen({ isLeaving, onExitComplete }: StartScreenProps) {
    return (
        <div
            className={`start-screen${isLeaving ? " start-screen--leaving" : ""}`}
            role="dialog"
            aria-label="Start Pixa"
            onAnimationEnd={(event) => {
                if (isLeaving && event.target === event.currentTarget) {
                    onExitComplete();
                }
            }}
        >
            <div className="start-screen-panel">
                <h1>PIXA</h1>
                <p className="start-subtitle">
                    A tiny flight through the night
                </p>
                <p className="start-instruction">PRESS ENTER TO START</p>
            </div>
        </div>
    );
}
