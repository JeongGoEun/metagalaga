mergeInto(LibraryManager.library, {
  SendId: function(userMetaId) {
    window.alert(userMetaId+"----");
    ReactUnityWebGL.SendId(userMetaId);
  },

  GameOver: function(userScore, userMetaId) {
    window.alert(userMetaId);
    ReactUnityWebGL.GameOver(userScore, userMetaId);
  }
});