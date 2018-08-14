using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent (typeof(Rigidbody2D))]
public class Spaceship : MonoBehaviour {

    public float speed; 
    public float shotDelay;
    public bool canShot;
    public GameObject explosion;
    public GameObject bullet;

    private Animator animator;

	private void Start()
	{
        animator = GetComponent<Animator>();
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
