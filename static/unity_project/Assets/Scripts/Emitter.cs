using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Emitter : MonoBehaviour {

    public GameObject[] waves;
    private int currentWave;

	IEnumerator Start()
	{
        if(waves.Length==0){    //웨이브 없으면 종료
            yield break;
        }

        while(true){


            GameObject wave = (GameObject)Instantiate(waves[currentWave], transform.position, Quaternion.identity);
            //웨이브 만듬

            wave.transform.parent = transform;
            //웨이브를 에미터의 자식요소

            while(wave.transform.childCount!=0){
                //자식 적들이 모두 제거될 때 까지 대기
                yield return new WaitForEndOfFrame();
            }

            Destroy(wave);

            if(waves.Length <= ++currentWave){
                //끝나면 처음부터 다시
                currentWave = 0;
            }
        }
	}
}
