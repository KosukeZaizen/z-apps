import { css, CSSProperties, StyleSheet } from "aphrodite";

export function getHoverClassName(hoverStyle: CSSProperties) {
    const styles = StyleSheet.create({
        hover: {
            ":hover": hoverStyle,
        },
    });
    return css(styles.hover);
}
