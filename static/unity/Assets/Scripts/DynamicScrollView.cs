using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class DynamicScrollView : MonoBehaviour
{

    #region PUBLIC_VARIABLES
    public int noOfItems;

    public GameObject item;

    public GridLayoutGroup gridLayout;

    public RectTransform scrollContent;

    public ScrollRect scrollRect;
    #endregion

    #region PRIVATE_VARIABLES
    #endregion

    #region UNITY_CALLBACKS
    void OnEnable()
    {
        InitializeList();
    }
    #endregion

    #region PUBLIC_METHODS
    #endregion

    #region PRIVATE_METHODS
    private void ClearOldElement()
    {
        for (int i = 0; i < gridLayout.transform.childCount; i++)
        {
            Destroy(gridLayout.transform.GetChild(i).gameObject);
        }
    }



    public void SetContentHeight()
    {
        float scrollContentHeight = (gridLayout.transform.childCount * gridLayout.cellSize.y) + ((gridLayout.transform.childCount - 1) * gridLayout.spacing.y);
        scrollContent.sizeDelta = new Vector2(676, scrollContentHeight);
    }

    private void InitializeList()
    {
        ClearOldElement();
        for (int i = 0; i < noOfItems; i++)
            InitializeNewItem("" + (i + 1));
        SetContentHeight();
    }

    private void InitializeNewItem(string name)
    {
        GameObject newItem = Instantiate(item) as GameObject;
        newItem.name = name;
        newItem.transform.SetParent(gridLayout.transform);
        newItem.transform.localScale = Vector3.one;
        newItem.SetActive(true);
    }
    #endregion

    #region PRIVATE_COROUTINES
    private IEnumerator MoveTowardsTarget(float time,float from,float target) {
        float i = 0;
        float rate = 1 / time;
        while(i<1){
            i += rate * Time.deltaTime;
            scrollRect.verticalNormalizedPosition = Mathf.Lerp(from,target,i);
            yield return 0;
        }
    }
    #endregion

    #region DELEGATES_CALLBACKS
    #endregion

    #region UI_CALLBACKS
    public void AddNewElement()
    {
        InitializeNewItem("" + (gridLayout.transform.childCount + 1));
        SetContentHeight();
        StartCoroutine(MoveTowardsTarget(0.2f, scrollRect.verticalNormalizedPosition, 0));
    }
    #endregion


}
