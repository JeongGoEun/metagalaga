mergeInto(LibraryManager.library, {
  SendId: function(userMetaId) {
    var str=Pointer_stringify(userMetaId);
    ReactUnityWebGL.SendId(str);
  },

  GameOver: function(userScore, userMetaId) {
    window.alert(userMetaId);
    ReactUnityWebGL.GameOver(userScore, userMetaId);
  }
});