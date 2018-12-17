using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System;
using System.Text;

using UnityEngine.EventSystems;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;


public class MainScript : MonoBehaviour
{

    public Button loginBtn, rankingBtn, metaBtn, basicBtn;
    public GameObject playerText;
    public GameObject selecAvatarPanel;

    public string userName = "";

#if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")]
    private static extern void SendId(string userMetaId);
    [DllImport("__Internal")]
    private static extern void Login();
#else
    private static void SendId(string userMetaId) {}
    private static void Login(){}
#endif
    
	private void Start()
	{
        selecAvatarPanel.SetActive(false);
    }

    public void OnClick()
    {
        Button curButton = EventSystem.current.currentSelectedGameObject.GetComponent<Button>();
        string curButtonName = curButton.name.ToString();
        string curText = curButton.GetComponentInChildren<Text>().text;
        Debug.Log("curButton: " + curText);

        switch (curButtonName)
        {
            case "loginButton":
                if (curText == "LOGIN") {
                    Login();
                }
                else { 
                    //selecAvatarPanel.SetActive(true);
                    PlayerPrefs.SetString("userAvatar", "basic"); //Setting initialize user's avatar
                    SceneManager.LoadScene("Stage");    //Change scene
                }
                break;
            case "rankingButton":
                PlayerPrefs.SetInt("userScore", 0); //Setting initialize user's score
                SceneManager.LoadScene("Ranking");
                break;
               /* if select avatar at metaID App
            case "metaButton":
                PlayerPrefs.SetString("userAvatar", "meta"); //Setting initialize user's avatar
                SceneManager.LoadScene("Stage");    //Change scene
                break;
            case "basicButton":
                PlayerPrefs.SetString("userAvatar", "basic");
                SceneManager.LoadScene("Stage");
                break;
                */
        }
    }

    public void onRequest(string _userName) {

        byte[] encodeBytes = Encoding.UTF8.GetBytes(_userName);
        string encodeStr = Convert.ToBase64String(encodeBytes);

        byte[] decodeBytes = Convert.FromBase64String(encodeStr);
        userName = Encoding.UTF8.GetString(decodeBytes);

        playerText.GetComponentInChildren<Text>().text = "PLAYER : " + userName;
        loginBtn.GetComponentInChildren<Text>().text = "PLAY";

        PlayerPrefs.SetString("userName", userName);    //store METAID in prefs for interaction
        Debug.Log("OnRequest in unity" + userName + playerText.GetComponentInChildren<Text>().text);

        SendId(userName);
    }

    public void SetHighScore(string _highscore)
    {
        Debug.Log("SetHighScore: " + _highscore);
        PlayerPrefs.SetInt("highScore", int.Parse(_highscore));    //store METAID in prefs for interaction
    }
}