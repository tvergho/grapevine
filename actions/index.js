export const ActionTypes = {
  FONTS_LOADED: 'FONTS_LOADED',
};

export function setFontsLoaded() {
  return {
    type: ActionTypes.FONTS_LOADED,
    payload: null,
  };
}
