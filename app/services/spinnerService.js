export const spinnerService = {
  loadingOn: () => {
    document.getElementById("loading").style.display = "flex";
  },

  loadingOff: () => {
    document.getElementById("loading").style.display = "none";
  },
};
