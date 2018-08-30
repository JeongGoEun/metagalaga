using System.Collections;
using System.Collections.Generic;
using UnityEngine.EventSystems;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using System.Runtime.InteropServices;

public class MainScript : MonoBehaviour
{

    public Button loginBtn, rankingBtn, quitBtn;
    public Button panelLoginBtn, cancelBtn;
    public InputField IdInputField;
    public GameObject loginPanel;

    public string userMetaId = "";
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

    // Update is called once per frame
    void Update()
    {

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
                SceneManager.LoadScene("Ranking");
                break;
            case "quitButton":
#if UNITY_EDITOR
                UnityEditor.EditorApplication.isPlaying = false;
#else
                        Application.Quit();
#endif
                break;

        }
    }

    public void panelFunction()
    {
        string curButton = EventSystem.current.currentSelectedGameObject.name.ToString();

        Debug.Log("panelFunction : " + curButton);
        switch (curButton)
        {
            case "panelLoginBtn":
                //Modifiy using METAID with smartcontract
                this.userMetaId = IdInputField.text;

                if (this.userMetaId == "x")
                {
                    //METAID exist in METADIUM
                    loginPanel.SetActive(false);
                    loginBtn.GetComponentInChildren<Text>().text = "PLAY";

                    idCheck = true;

                    PlayerPrefs.SetString("userMetaId", this.userMetaId);    //store METAID in prefs for interaction
                    Debug.Log("user METAID -- 00: " + this.userMetaId);

                    SendId(this.userMetaId);
                }
                else
                {
                    //METAID Not exist in METADIUM
                    IdInputField.text = "";
                    IdInputField.GetComponent<InputField>().placeholder.GetComponent<Text>().text = "Not Exist";
                    IdInputField.GetComponent<InputField>().placeholder.GetComponent<Text>().color = Color.red;

                    idCheck = false;
                }

                break;

            case "cancelBtn":
                IdInputField.text = "";
                IdInputField.GetComponent<InputField>().placeholder.GetComponent<Text>().text = "Input METAID";
                IdInputField.GetComponent<InputField>().placeholder.GetComponent<Text>().color = Color.black;

                loginPanel.SetActive(false);
                break;

        }
    }
}