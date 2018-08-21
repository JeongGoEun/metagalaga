mergeInto(LibraryManager.library, {
  SendId: function(MetaId) {
    ReactUnityWebGL.SendId(MetaId);
  },

  GameOver: function(userScore) {
    ReactUnityWebGL.GameOver(userScore);
  }
});