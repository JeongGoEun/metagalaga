using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour {

    Spaceship spaceship;
    public int hp = 1;  //hp
    public int point = 100;

    // Use this for initialization
    IEnumerator Start () {
        spaceship = GetComponent<Spaceship>();
        Move(transform.up * -1);

        if(spaceship.canShot==false){
            yield break;
        }

        while(true){
            for (int i = 0; i < transform.childCount;i++){
                Transform shotPosition = transform.GetChild(i); //enemy에서 자식으로 지정한 각도로 발사
                spaceship.Shot(shotPosition);
            }
            yield return new WaitForSeconds(spaceship.shotDelay);
        }
	}

	public void Move(Vector2 direction)
	{
        GetComponent<Rigidbody2D>().velocity = direction * spaceship.speed;
	}

	void OnTriggerEnter2D(Collider2D collision)
	{
        string layerName = LayerMask.LayerToName (collision.gameObject.layer);

       // 레이어 이름이 Bullet (Player) 이외의 경우에는 아무것도 실시하지 않는 
        if (layerName != "Bullet(Player)") return;

        Transform playerBulletTransform = collision.transform.parent;
        Bullet bullet = playerBulletTransform.GetComponent<Bullet>();
        hp = hp - bullet.power;

        // 탄 제거 
        Destroy (collision.gameObject);

        if (hp <= 0)
        {
            FindObjectOfType<Score>().AddPoint(point);
            spaceship.Explosion();
            Destroy(gameObject);
        }
        else{
            spaceship.GetAnimator().SetTrigger("Damage");
        }
	}
}
