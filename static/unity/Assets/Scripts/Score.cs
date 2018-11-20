using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Score : MonoBehaviour {
    public Text scoreText;
    public Text highScoreText;
    private int score;
    private int highScore;

	void Start()
	{
        Initialize();
	}

    void Update(){
        if(highScore < score){
            highScoreText.color = Color.yellow;
            highScore = score;
        }
        scoreText.text = score.ToString();
        highScoreText.text = "HighScore : " + highScore.ToString();
    }

    private void Initialize(){
        score = 0;
        highScore = PlayerPrefs.GetInt("highScore", 0);
        Debug.Log("GetHighScore: " + highScore);

    }

    public void AddPoint(int point){
        score = score + point;
    }

    public int GetScore(){
        return score;
    }
}
