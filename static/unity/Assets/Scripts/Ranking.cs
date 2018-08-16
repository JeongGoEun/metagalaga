using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;
using UnityEditor;
using System.Runtime.InteropServices;

public class Ranking : MonoBehaviour {
    public Button quitBtn, replayBtn;
    private int userScore=0;

    //for event method
    [DllImport("__Internal")]   //event for react script
    private static extern void GameOver(int userScore);
	
	void Start () {
        userScore = PlayerPrefs.GetInt("userScore");//get user score from Player.cs
        if (userScore != 0)
        {   //바로 넘어오지 않았을 때 game over event 전달
            GameOver(userScore);
        }
        Debug.Log("Game over and userScore : " + userScore.ToString());
	}
	
	// Update is called once per frame
	void Update () {
		
	}

	public void onClick()
    {
        string curButton = EventSystem.current.currentSelectedGameObject.name.ToString();

        Debug.Log("onClick : " + curButton);
        switch (curButton)
        {
            case "quitButton":
                #if UNITY_EDITOR
                UnityEditor.EditorApplication.isPlaying = false;
                #else
                        Application.Quit();
                #endif
                break;
            case "replayButton":
                SceneManager.LoadScene("Stage");
                break;

        }
    }
}
