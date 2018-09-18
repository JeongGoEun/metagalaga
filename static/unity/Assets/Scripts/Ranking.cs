using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;
using UnityEditor;
using System.Runtime.InteropServices;

public class Ranking : MonoBehaviour
{
    public Button quitBtn, replayBtn;
    private int userScore = 0;

#if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")] 
    private static extern void GameOver(int userScore);
#else
    private static void GameOver(int userScore) {}
#endif

	private void Awake()
	{
        userScore = PlayerPrefs.GetInt("userScore");    //get user score from Player.cs

        if (userScore != 0) {   //바로 넘어오지 않았을 때 game over event 전달
            replayBtn.GetComponent<Button>().interactable = true;
            GameOver(userScore);
        }
        else {
            replayBtn.GetComponent<Button>().interactable = false; //main에서 바로 넘어올 때 버튼 비활성화
            GameOver(0);
        }
        Debug.Log("Ranking.cs Awake()'s userScore : "+userScore);
	}

	public void onClick()
    {
        string curButton = EventSystem.current.currentSelectedGameObject.name.ToString();
        PlayerPrefs.SetInt("userScore", 0); //Init score

        Debug.Log("onClick : " + curButton);
        switch (curButton)
        {
            case "quitButton":
                SceneManager.LoadScene("Main");
                break;

            case "replayButton":
                SceneManager.LoadScene("Stage");
                Debug.Log("onClick : " + curButton);
                break;
        }
    }
}
