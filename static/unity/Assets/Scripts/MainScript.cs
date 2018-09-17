using System.Collections;
using System.Collections.Generic;
using UnityEngine.EventSystems;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using System.Runtime.InteropServices;

public class MainScript : MonoBehaviour
{

    public Button loginBtn, rankingBtn;
    public GameObject playerText;

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


	public void onClick()
    {
        Button curButton = EventSystem.current.currentSelectedGameObject.GetComponent<Button>();
        string curButtonName = curButton.name.ToString();
        string curText = curButton.GetComponentInChildren<Text>().text;
        Debug.Log("onClick : " + curButton + ", " + curText + ", "+curButtonName);

        switch (curButtonName)
        {
            case "loginButton":
                if(curText == "LOGIN")
                    Login();
                else
                    SceneManager.LoadScene("Stage");    //Change scene
                break;
            case "rankingButton":
                PlayerPrefs.SetInt("userScore", 0); //Setting initialize user's score
                SceneManager.LoadScene("Ranking");
                break;
        }
    }


    public void onRequest(string _userName) {
        this.userName = _userName;

        playerText.GetComponentInChildren<Text>().text = "PLAYER : " + _userName;
        loginBtn.GetComponentInChildren<Text>().text = "PLAY";

        PlayerPrefs.SetString("userName", this.userName);    //store METAID in prefs for interaction
        Debug.Log("user Name in Unity: " + this.userName);

        SendId(this.userName);
    }
}