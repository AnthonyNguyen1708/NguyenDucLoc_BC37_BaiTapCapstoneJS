const loadingService = {
  loadingOn: () => {
    document.getElementById("loading").style.display = "flex";
  },

  loadingOff: () => {
    document.getElementById("loading").style.display = "none";
  },
};
