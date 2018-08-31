using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class DynamicScrollView : MonoBehaviour
{

    #region PUBLIC_VARIABLES
    public int noOfItems;
    public object[] m_args;

    public GameObject item;
    public GridLayoutGroup gridLayout;
    public RectTransform scrollContent;
    public ScrollRect scrollRect;

    public struct User {    //For data from Demo.js
        public string userMetaId;
        public string userName;
        public int score;
    }
    public User[] rankedUsers = new User[10];
    int userIndex = 1;

    #endregion

    #region PRIVATE_VARIABLES
    #endregion

    #region UNITY_CALLBACKS
    void OnEnable()
    {
        InitializeList();
    }
    #endregion

    #region PUBLIC_METHODS
    #endregion

    #region PRIVATE_METHODS
    private void ClearOldElement()
    {
        for (int i = 0; i < gridLayout.transform.childCount; i++)
        {
            Destroy(gridLayout.transform.GetChild(i).gameObject);
        }
    }



    public void SetContentHeight()
    {
        float scrollContentHeight = (gridLayout.transform.childCount * gridLayout.cellSize.y) + ((gridLayout.transform.childCount - 1) * gridLayout.spacing.y);
        scrollContent.sizeDelta = new Vector2(676, scrollContentHeight);
    }

    private void InitializeList()
    {
       /* userIndex = 1;

        for (int i = 1 ; i <= 10 ; i++) {
            
        }

        ClearOldElement();*/
    }

    private void InitializeNewItem(string _metaId, string _name, int _score) //Get userName, userScore from Demo.js
    {
        GameObject newItem = Instantiate(item) as GameObject;
        newItem.name = _name;


        newItem.transform.SetParent(gridLayout.transform);
        newItem.transform.localScale = Vector3.one;
        newItem.SetActive(true);

        SetContentHeight();
    }
    #endregion

    #region PRIVATE_COROUTINES
    private IEnumerator MoveTowardsTarget(float time,float from,float target) {
        float i = 0;
        float rate = 1 / time;
        while(i<1){
            i += rate * Time.deltaTime;
            scrollRect.verticalNormalizedPosition = Mathf.Lerp(from,target,i);
            yield return 0;
        }
    }
    #endregion

    #region DELEGATES_CALLBACKS
    #endregion

    //For javascript event
    public void SetUserMetaId(string _metaId) {
        rankedUsers[userIndex].userMetaId = _metaId;
        Debug.Log("Unity => " + _metaId);
    }
    public void SetUserName(string _name) {
        rankedUsers[userIndex].userName = _name;
        Debug.Log("Unity => " + _name);
    }
    public void SetUserScore(string _score) {
        Debug.Log("Unity => " + _score + " index : " + userIndex);
        rankedUsers[userIndex++].score = int.Parse(_score);       
    }

}
