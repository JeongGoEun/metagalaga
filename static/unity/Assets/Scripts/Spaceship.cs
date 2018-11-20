using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Linq;
#if UNITY_EDITOR
using UnityEditor;
#endif


[RequireComponent (typeof(Rigidbody2D))]
public class Spaceship : MonoBehaviour {

    public float speed; 
    public float shotDelay;
    public bool canShot;
    public GameObject explosion;
    public RuntimeAnimatorController[] controllers;
    public GameObject[] metaBullets;

    private Sprite[] metaSprites;
    private Animator animator;
    private int spaceshipNum = 0;
    private GameObject bullet;


	private void Start()
    {
        #if UNITY_EDITOR
        metaSprites = AssetDatabase.LoadAllAssetRepresentationsAtPath("Assets/Sprites/Spaceship/MetaSpaceship.png").OfType<Sprite>().ToArray();
        #endif
        //randNum = Random.Range(1, 4);

        animator = gameObject.GetComponent<Animator>();
        if(PlayerPrefs.GetString("userAvatar") == "meta") {
            spaceshipNum = 1;
        }

        if (animator.name == "Player") {
            SettingPlayer(spaceshipNum);
        } else {
            // Enemy spaceship
            bullet = metaBullets[3];
        }
	}

    void SettingPlayer(int num)
    {
        switch (num)
        {
            case 1:
                // Alpaca
                gameObject.GetComponent<SpriteRenderer>().sprite = metaSprites[0];
                animator.runtimeAnimatorController = controllers[0] as RuntimeAnimatorController;
                bullet = metaBullets[0];
                break;
            case 2:
                // Panda
                gameObject.GetComponent<SpriteRenderer>().sprite = metaSprites[5];
                animator.runtimeAnimatorController = controllers[1] as RuntimeAnimatorController;
                bullet = metaBullets[1];
                break;
            default:
                // Player
                if (animator.name == "Player") { bullet = metaBullets[2]; }
                break;
        }
    }

	public void Explosion(){
        Instantiate(explosion, transform.position, transform.rotation);
    }

    public void Shot(Transform origin){
        Instantiate(bullet, origin.position, origin.rotation);
    }

    public Animator GetAnimator(){
        return animator;
    }
}
