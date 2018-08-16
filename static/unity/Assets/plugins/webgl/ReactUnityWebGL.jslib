mergeInto(LibraryManager.library, {
  SendId: function(MetaId) {
    //window.alert("get MetaID");
    //ReactUnityWebGL.SendRotation(MetaId);
  },

  GameOver: function(userScore) {
    window.alert(userScore);
    //ReactUnityWebGL.GameOver(userScore);
  }
});