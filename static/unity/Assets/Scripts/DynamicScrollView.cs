using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using System.Collections.Generic;
using UnityEngine.EventSystems;
using System;
using System.Runtime.InteropServices;

public class DynamicScrollView : MonoBehaviour
{
    public GameObject item;
    public GridLayoutGroup gridLayout;
    public RectTransform scrollContent;
    public ScrollRect scrollRect;
    public Button registerRankingBtn;

#if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")] 
    private static extern void RegisterScore();
#else
    private static void RegisterScore(){}
#endif

    public struct User {    //For data from Demo.js
        public string userMetaId;
        public string userName;
        public int userScore;
    }

    public User[] rankedUsers = new User[10];
    public int userIndex = 0;
    public List<User> userList = new List<User>();

	private void ClearOldElement()
    {
        for (int i = 0; i < gridLayout.transform.childCount; i++){
            Destroy(gridLayout.transform.GetChild(i).gameObject);
        }
    }

    private void InitializeList()
    {
        ClearOldElement();
        foreach (User user in userList)
        {
            InitializeNewItem(user.userMetaId, user.userName, user.userScore);
        }
        SetContentHeight();

        userIndex = 0;
        userList.Clear();
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

    private IEnumerator MoveTowardsTarget(float time,float from,float target) {
        float i = 0;
        float rate = 1 / time;
        while(i<1){
            i += rate * Time.deltaTime;
            scrollRect.verticalNormalizedPosition = Mathf.Lerp(from,target,i);
            yield return 0;
        }
    }

    public void SetContentHeight()
    {
        float scrollContentHeight = (10 * gridLayout.cellSize.y) + ((10 - 1) * gridLayout.spacing.y);
        scrollContent.sizeDelta = new Vector2(676, scrollContentHeight);
    }

    //For javascript event
    public void SetUserMetaId(string _metaId) {
        rankedUsers[userIndex].userMetaId = _metaId;
    }
    public void SetUserName(string _name) {
        rankedUsers[userIndex].userName = _name;
    }
    public void SetUserScore(string _score) {   //have problem
        ClearOldElement();

        rankedUsers[userIndex].userScore = int.Parse(_score);
        userList.Add(rankedUsers[userIndex]);
        userIndex++;
        //Debug.Log("Array index : " + userIndex);

        if(userIndex == 10) {
            userList.Sort(delegate (User user1, User user2) {   
                //sorting with user score
                return -1 * (user1.userScore.CompareTo(user2.userScore));
            });

            InitializeList();
            return;
        }
    }
    public void OnRegisterClick() {
        RegisterScore();
    }
}
