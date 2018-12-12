using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using System;

public class ScrollItem : MonoBehaviour
{
    
    #region PUBLIC_VARIABLES
    public Text nameText, scoreText, metaIdText, timestampText;
    public DynamicScrollView dynamicScrollView;
    #endregion

    #region PRIVATE_VARIABLES
    private static readonly DateTime Epoch = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
    #endregion

    #region UNITY_CALLBACKS
    void OnEnable()
    {
        if(DynamicScrollView.registerCheck && transform.GetChild(3).name == DynamicScrollView.curUserTimestamp.ToString()) {
            nameText.color = Color.blue;
            scoreText.color = Color.blue;
            metaIdText.color = Color.blue;
            timestampText.color = Color.blue;
        }
        else {
            nameText.color = Color.white;
            scoreText.color = Color.white;
            metaIdText.color = Color.white;
            timestampText.color = Color.white;
        }
        nameText.text = transform.GetChild(0).name;
        scoreText.text = transform.GetChild(2).name;
        metaIdText.text = transform.GetChild(1).name;
        timestampText.text = TimeToStr(UInt64.Parse(transform.GetChild(3).name));
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

    public string TimeToStr(UInt64 _timestamp)
    {
        string[] months = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
        DateTime dateTime = Epoch.AddSeconds(_timestamp).ToUniversalTime();
        return (dateTime.Day.ToString() + "." + months[dateTime.Month - 1] + "." + dateTime.Year.ToString());
    }
}
