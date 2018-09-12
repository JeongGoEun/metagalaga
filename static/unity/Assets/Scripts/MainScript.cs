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
    public Button panelLoginBtn, cancelBtn;
    public GameObject playerText;
    public InputField IdInputField;
    public GameObject loginPanel;

    public string userName = "";
    private bool idCheck = false;

    #if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")]
    private static extern void SendId(string userMetaId);
    #else
    private static void SendId(string userMetaId) {}
    #endif

    void Start()
    {
        loginPanel.SetActive(false);
    }

	public void onClick()
    {
        string curButton = EventSystem.current.currentSelectedGameObject.name.ToString();

        Debug.Log("onClick : " + curButton);
        switch (curButton)
        {
            case "loginButton":
                if (idCheck == false)
                {  //Can not Play
                    loginPanel.SetActive(true);
                }
                else
                {   //Can Play
                    SceneManager.LoadScene("Stage");    //Change scene
                }

                break;
            case "rankingButton":
                PlayerPrefs.SetInt("userScore", 0); //Setting initialize user's score

                SceneManager.LoadScene("Ranking");
                break;
        }
    }

    public void onRequest(string _userName) {
        this.userName = _userName;
        idCheck = true;

        playerText.GetComponentInChildren<Text>().text = "PLAYER : " + _userName;
        loginBtn.GetComponentInChildren<Text>().text = "PLAY";

        PlayerPrefs.SetString("userName", this.userName);    //store METAID in prefs for interaction
        Debug.Log("user Name in Unity: " + this.userName);

        SendId(this.userName);
    }
}