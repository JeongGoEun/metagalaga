using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;
using UnityEditor;

public class Ranking : MonoBehaviour {
    public Button quitBtn, replayBtn;
    int userScore=0;


	// Use this for initialization
	void Start () {
        userScore = PlayerPrefs.GetInt("userScore");//get user score from Player.cs
        Debug.Log("userScore : " + userScore.ToString());

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
