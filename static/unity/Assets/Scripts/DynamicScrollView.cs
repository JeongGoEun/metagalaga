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
        ClearOldElement();
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
    }
    public void SetUserName(string _name) {
        rankedUsers[userIndex].userName = _name;
    }
    public void SetUserScore(string _score) {
        rankedUsers[userIndex].userScore = int.Parse(_score);
        userList.Add(rankedUsers[userIndex]);
        userIndex++;

        if(userIndex == 11) {
            
            userList.Sort(delegate (User user1, User user2) {
                return user1.userScore.CompareTo(user2.userScore);
            });

            foreach(User user in userList) {
                Debug.Log("After sorting : " + user.userName + ", " + user.userScore);
            }

            /*RankingSort(rankedUsers, 1, 10);    // sorting user's ranking

            for (int i = 1; i <= 10; i++) { //print ranking
                Debug.Log("After sorting : " + rankedUsers[i].userName + ", " + rankedUsers[i].userScore);
            }*/
        }
    }

   /* public void RankingSort(User[] _users, int start, int end) {
        
        //Sort using Quick sort algorithm
        int pivot = _users[userIndex / 2].userScore;
        int bs = start, be = end;
        User temp = new User();

        while(start < end) {
            while (pivot <= _users[end].userScore && start < end) end--;
            if (start > end) break;
            while (pivot >= _users[start].userScore && start < end) start++;
            if (start > end) break;

            temp = _users[end]; //swap
            _users[end] = _users[start];
            _users[start] = temp;
        }

        temp = _users[start]; //swap
        _users[start] = _users[bs];
        _users[bs] = temp;

        if (bs < start)
            RankingSort(rankedUsers, bs, start - 1);
        if (be > end)
        {
            RankingSort(rankedUsers, start + 1, be);
        }
    }

    public void Swap(User a, User b) {
        User temp = b;
        b = a;
        a = temp;
    }*/
}
