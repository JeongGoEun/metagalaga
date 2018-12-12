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
        // Get user score from Player.cs
        userScore = PlayerPrefs.GetInt("userScore");   
        Debug.Log("Ranking.cs Start()'s userScore : " + userScore);

        // Deliver game over event when it is not over
        if (userScore != 0) {
            replayBtn.GetComponent<Button>().interactable = true;
            GameOver(userScore);
        }
        else
        {
            // Disable the button when you go directly from main
            replayBtn.GetComponent<Button>().interactable = false; //main에서 바로 넘어올 때 버튼 비활성화
            GameOver(0);
        }
	}

	public void OnClick()
    {
        string curButton = EventSystem.current.currentSelectedGameObject.name;

        // Initialize for game info
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
