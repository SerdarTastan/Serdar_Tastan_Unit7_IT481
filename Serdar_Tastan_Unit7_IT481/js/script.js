let smallDataSetResult = "";
let mediumDataSetResult = "";
let largeDataSetResult = "";
let smallDataSet = [];
let mediumDataSet = [];
let largeDataSet = [];

function generateDataSet(size) {
    let dataSet = [];
    for (let i = 0; i < size; i++) {
        dataSet.push(Math.floor(Math.random() * 10000));
    }
    // console.log("DataSet is created..");
    return dataSet;
}

smallDataSet = generateDataSet(7000);
mediumDataSet = generateDataSet(70000);
largeDataSet = generateDataSet(700000);

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let pivot = arr[Math.floor(arr.length / 2)];
    let left = [];
    let right = [];

    for (let i = 0; i < arr.length; i++) {
        if (i === Math.floor(arr.length / 2)) continue;
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

function optimizedQuickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        let pivotIndex = partition(arr, low, high);
        optimizedQuickSort(arr, low, pivotIndex - 1);
        optimizedQuickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    let pivot = arr[high];  // Choosing the last element as the pivot
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap elements
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];  // Swap the pivot to its correct position
    return i + 1;
}

function benchmarkSort(sortFunction, dataSet) {
    let startTime = performance.now();
    sortFunction([...dataSet]); // Use a copy of the data set to avoid modifying the original
    let endTime = performance.now();
    return endTime - startTime;
}

function smallDataSetBenchmarkResult(optimized) {
    if(optimized==false) {
        smallDataSetResult = `Small Data Set : ` + smallDataSet.length + ` Arrays \nSorting time   : ${benchmarkSort(quickSort, smallDataSet)} ms\n\n`;
        document.querySelector("#unoptimizedSmallDataSetResult").innerHTML = smallDataSetResult;
    }
    else{
        smallDataSetResult = `Small Data Set : ` + smallDataSet.length + ` Arrays \nSorting time   : ${benchmarkSort(optimizedQuickSort, smallDataSet)} ms\n\n`;
        document.querySelector("#optimizedSmallDataSetResult").innerHTML = smallDataSetResult;
    }    
}

function mediumDataSetBenchmarkResult(optimized) { 
    if(optimized==false) {
        mediumDataSetResult = `Medium Data Set : ` + mediumDataSet.length + ` Arrays \nSorting time    : ${benchmarkSort(quickSort, mediumDataSet)} ms\n\n`; 
        document.querySelector("#unoptimizedMediumDataSetResult").innerHTML = mediumDataSetResult;
    }
    else{
        mediumDataSetResult = `Medium Data Set : ` + mediumDataSet.length + ` Arrays \nSorting time    : ${benchmarkSort(optimizedQuickSort, mediumDataSet)} ms\n\n`; 
        document.querySelector("#optimizedMediumDataSetResult").innerHTML = mediumDataSetResult;
    }    
}

function largeDataSetBenchmarkResult(optimized) {   
    if(optimized==false) { 
        largeDataSetResult = `Large Data Set : ` + largeDataSet.length + ` Arrays \nSorting time   : ${benchmarkSort(quickSort, largeDataSet)} ms\n\n`; 
        document.querySelector("#unoptimizedLargeDataSetResult").innerHTML = largeDataSetResult;
    }
    else{
        largeDataSetResult = `Large Data Set : ` + largeDataSet.length + ` Arrays \nSorting time   : ${benchmarkSort(optimizedQuickSort, largeDataSet)} ms\n\n`; 
        document.querySelector("#optimizedLargeDataSetResult").innerHTML = largeDataSetResult;
    }    
}

function runTests() {       
    smallDataSetBenchmarkResult(true);
    mediumDataSetBenchmarkResult(true);
    largeDataSetBenchmarkResult(true);
    
    smallDataSetBenchmarkResult(false);
    mediumDataSetBenchmarkResult(false);
    largeDataSetBenchmarkResult(false);
}