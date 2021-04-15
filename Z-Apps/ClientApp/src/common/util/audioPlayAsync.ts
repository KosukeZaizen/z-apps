export async function audioPlayAsync(audio: HTMLAudioElement) {
    return new Promise(resolve => {
        audio.onended = () => {
            resolve(undefined);
        };
        audio.play();
    });
}
