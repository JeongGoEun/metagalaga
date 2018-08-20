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

    private string userMetaId;
    private bool idCheck = false;


    // for event method
    [DllImport("__Internal")]   //event for react script
    private static extern void SendId(string MetaId);

    void Start()
    {
        loginPanel.SetActive(false);
    }

    // Update is called once per frame
    void Update()
    {

    }

    private void Awake()
    {
        Debug.Log("Call Awake()");
        this.panelLoginBtn.onClick.AddListener(() => {
            SendId(this.userMetaId);
        });
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
                    PlayerPrefs.SetString("userMetaId", userMetaId);    //store METAID in prefs for interaction
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
                userMetaId = IdInputField.text.ToString();

                if (userMetaId == "1")
                {
                    //METAID exist in METADIUM
                    loginPanel.SetActive(false);
                    loginBtn.GetComponentInChildren<Text>().text = "PLAY";

                    idCheck = true;

                    Debug.Log("user METAID -- : " + userMetaId);
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