using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class ScrollItem : MonoBehaviour
{
    
    #region PUBLIC_VARIABLES
    public Text nameText, scoreText, metaIdText, timestampText;

    public DynamicScrollView dynamicScrollView;
    #endregion

    #region PRIVATE_VARIABLES
    #endregion

    #region UNITY_CALLBACKS
    void OnEnable()
    {
        nameText.text = transform.GetChild(0).name;
        scoreText.text = transform.GetChild(2).name;
        metaIdText.text = transform.GetChild(1).name;
        timestampText.text = transform.GetChild(3).name;
    }
    #endregion

    #region PUBLIC_METHODS
    #endregion

    #region PRIVATE_METHODS
    #endregion

    #region PRIVATE_COROUTINES
    #endregion

    #region DELEGATES_CALLBACKS
    #endregion

    #region UI_CALLBACKS
    public void OnRemoveMe()
    {
        DestroyImmediate(gameObject);
        dynamicScrollView.SetContentHeight();
    }
    #endregion


}
