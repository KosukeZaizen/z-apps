import React from "react";

type AudioControlProps = {
    audioPath: string;
    style?: React.CSSProperties;
};
export class AudioControl extends React.Component<AudioControlProps> {
    refAudio: React.RefObject<HTMLAudioElement>;
    state: { showControl: boolean };

    constructor(props: AudioControlProps) {
        super(props);

        this.state = {
            showControl: false,
        };

        this.refAudio = React.createRef();
    }

    componentDidMount() {
        if (!this.refAudio) return;

        const audio = this.refAudio.current;
        void audio?.load();
    }

    render() {
        const { audioPath, style } = this.props;

        return (
            <audio
                ref={this.refAudio}
                src={audioPath}
                style={{
                    width: "100%",
                    height: "30px",
                    marginTop: "5px",
                    opacity: this.state.showControl ? 1 : 0,
                    transition: "1s",
                    ...style,
                }}
                onCanPlayThrough={() => {
                    this.setState({ showControl: true });
                }}
                controls
            />
        );
    }
}
