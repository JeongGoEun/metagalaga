using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Score : MonoBehaviour {
    public Text scoreText;
    public Text highScoreText;
    private int score;
    private int highScore;

    private string highScoreKey = "highScore";

	void Start()
	{
        Initialize();
	}

    void Update(){
        if(highScore<score){
            highScore = score;
        }

        scoreText.text = score.ToString();
        highScoreText.text = "HighScore : " + highScore.ToString();
    }

    private void Initialize(){
        score = 0;
        highScore = PlayerPrefs.GetInt(highScoreKey, 0);
    }

    public void AddPoint(int point){
        score = score + point;
    }

    public void Save(){
        PlayerPrefs.SetInt(highScoreKey, highScore);
        PlayerPrefs.Save();

        Initialize();
    }

    public int GetScore(){
        return score;
    }
}
