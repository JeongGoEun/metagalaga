using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Explosion : MonoBehaviour {

	// Use this for initialization
    void onAnimationFinish(){
        Destroy(gameObject);
    }
}
