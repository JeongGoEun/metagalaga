using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using System.Collections.Generic;
using System;

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
        public int userScore;
    }

    public User[] rankedUsers = new User[10];
    public int userIndex = 1;
    public List<User> userList = new List<User>();

    #endregion

    #region PRIVATE_VARIABLES
    #endregion

    #region UNITY_CALLBACKS
    void OnEnable()
    {
        
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
        ClearOldElement();
        foreach (User user in userList)
        {
            InitializeNewItem(user.userMetaId, user.userName, user.userScore);
            Debug.Log("After sorting : " + user.userName + ", " + user.userScore);
        }
        SetContentHeight();


    }

    private void InitializeNewItem(string _metaId, string _name, int _score) //Get userName, userScore from Demo.js
    {
        GameObject newItem = Instantiate(item) as GameObject;

        newItem.transform.GetChild(0).name = _name;
        newItem.transform.GetChild(1).name = _metaId;
        newItem.transform.GetChild(2).name = _score.ToString();

        newItem.transform.SetParent(gridLayout.transform);
        newItem.transform.localScale = Vector3.one;
        newItem.SetActive(true);
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
    }
    public void SetUserName(string _name) {
        rankedUsers[userIndex].userName = _name;
    }
    public void SetUserScore(string _score) {
        rankedUsers[userIndex].userScore = int.Parse(_score);
        userList.Add(rankedUsers[userIndex]);
        userIndex++;

        if(userIndex == 11) {
            userList.Sort(delegate (User user1, User user2) {   //sorting with user score
                return user1.userScore.CompareTo(user2.userScore);
            });

            InitializeList();
        }
    }
}
