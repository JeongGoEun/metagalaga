using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Background : MonoBehaviour {

    public float speed = 0.1f;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
        float y = Mathf.Repeat(Time.time * speed, 1); //1 -> 0 -> 1... 계속 반복
        Vector2 offset = new Vector2(0,y); //메모리 초과를 위한 오프셋 작성a
        GetComponent<Renderer>().sharedMaterial.SetTextureOffset("_MainTex", offset);
	}
}
