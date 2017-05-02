//https://www.youtube.com/watch?v=f8hXR_Hvybo

// selection sort progression:

//         [23, 42, 4, 16, 8, 15]
  //      0      2
//         [4, 42, 23, 16, 8, 15]
  //         1          4
//         [4, 8, 23, 16, 42, 15]
  //            2           5
//         [4, 8, 15, 16, 42, 23]
  //               3 3     
//         [4, 8, 15, 16, 42, 23]
  //                    4   5
//         [4, 8, 15, 16, 23, 42]
  //                        5 is the last index we are done

function findNewMin(arr, startIndex, currentMin){
    var minIndex = startIndex;
    var min = currentMin;

    for (var i=startIndex; i<arr.length; i++){
        if (arr[i] < min){
            min = arr[i];
            minIndex = i;
        }
    }
    return [min, minIndex];
}

function selectionSort(arr, minIndex, min){ // arr = [23, 42, 4, 16, 8, 15]; minIndex = 0; min = 23
    var newMinList = findNewMin(arr, minIndex, min); // [23, 42, 4, 16, 8, 15]; 1; 23
    var newMin = newMinList[0]; // 4
    var newMinIndex = newMinList[1]; // 2

    //swap the elements
    if (newMin <= min) { //4 <= 23
        var temp = arr[minIndex]; //23
        arr[minIndex] = arr[newMinIndex]; //4
        arr[newMinIndex] = temp; //23
    }

    minIndex++;
    
    if (minIndex <= (arr.length-1)){
        return selectionSort(arr, minIndex, arr[minIndex])
    }else {
        return arr;
    }
}

selectionSort([23, 42, 4, 16, 8, 15], 0, 23)