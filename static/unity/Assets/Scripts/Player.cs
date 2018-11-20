using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using System.Linq;
using UnityEditor;

public class Player : MonoBehaviour {
    
    Spaceship spaceship;
    bool paused = false;
    private int userScore = 0;

	IEnumerator Start () { //시간 걸리는 처리 할 때 Coroutine을 사용한다.
        spaceship = GetComponent<Spaceship>();

        while(true){
            spaceship.Shot(transform);  //탄은 플레이어와 같은 위치
            GetComponent<AudioSource>().Play();
            yield return new WaitForSeconds(spaceship.shotDelay); // 0.05 wating
        }
	}
	
	// Update is called once per frame
	void Update () {

        if(Input.GetKey(KeyCode.Escape)){
            paused = !paused;
            Debug.Log("Paused : " + paused.ToString());

            if (paused==true)
                Time.timeScale = 0;
            else
                Time.timeScale = 1f;
        }

        float x = Input.GetAxisRaw("Horizontal");
        float y = Input.GetAxisRaw("Vertical");

        Vector2 direction = new Vector2(x, y).normalized;

        Move(direction);
	}

    void Move(Vector2 direction){
        Vector2 min = Camera.main.ViewportToWorldPoint(new Vector2(0, 0));
        Vector2 max = Camera.main.ViewportToWorldPoint(new Vector2(1, 1));
        Vector2 pos = transform.position;

        pos += direction * spaceship.speed * Time.deltaTime;

        pos.x = Mathf.Clamp(pos.x, min.x, max.x);
        pos.y = Mathf.Clamp(pos.y, min.y, max.y);

        transform.position = pos;
    }

	void OnTriggerEnter2D(Collider2D collision) //부딪힐 때 호출
	{
        string layerName = LayerMask.LayerToName(collision.gameObject.layer);
        //레이어 이름 가져오기

        if(layerName=="Bullet(Enemy)"){
            Destroy(collision.gameObject);
        }
        if(layerName=="Bullet(Enemy)"||layerName=="Enemy"){ //적을 만나면 폭발
            spaceship.Explosion();  //폭발 후 삭제
            Destroy(gameObject);

            //set userScore in prefs for interaction
            userScore = GameObject.Find("Score GUI").GetComponent<Score>().GetScore();
            Debug.Log("User game score in Player.cs : " + userScore); 
            PlayerPrefs.SetInt("userScore", userScore);

            SceneManager.LoadScene("Ranking");  //convert to the ranking scene
        }
	}
}
