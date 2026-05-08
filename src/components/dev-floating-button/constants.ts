/**
 * Minimum finger movement (in dp) before a touch is considered a drag.
 * Keeps accidental micro-movements from triggering drag mode.
 */
export const PAN_ACTIVATION_THRESHOLD = 5;

/**
 * Spring friction for the snap-to-bounds animation.
 * Higher values = quicker settle with less oscillation.
 */
export const SNAP_FRICTION = 8;

/**
 * Distance from screen edges and safe-area insets where the button is allowed to rest.
 */
export const EDGE_MARGIN = 8;
