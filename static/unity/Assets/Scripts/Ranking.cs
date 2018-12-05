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
    [DllImport("__Internal")]
    private static extern void StopInterval();
#else
    private static void GameOver(int userScore) {}
    private static void StopInterval() {}
#endif

	private void Start()
	{
        userScore = PlayerPrefs.GetInt("userScore");    //get user score from Player.cs
        Debug.Log("Ranking.cs Start()'s userScore : " + userScore);

        if (userScore != 0) {   //바로 넘어오지 않았을 때 game over event 전달
            replayBtn.GetComponent<Button>().interactable = true;
            GameOver(userScore);
        }
        else {
            replayBtn.GetComponent<Button>().interactable = false; //main에서 바로 넘어올 때 버튼 비활성화
            GameOver(0);
        }
	}

	public void onClick()
    {
        string curButton = EventSystem.current.currentSelectedGameObject.name.ToString();

        //Initialize
        PlayerPrefs.SetInt("userScore", 0);
        DynamicScrollView.registerCheck = false;
        DynamicScrollView.curUserTimestamp = 0;

        switch (curButton)
        {
            case "quitButton":
                StopInterval();
                SceneManager.LoadScene("Main");
                break;

            case "replayButton":
                StopInterval();
                SceneManager.LoadScene("Stage");
                break;
        }
    }
}
