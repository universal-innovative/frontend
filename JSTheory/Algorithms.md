
### **Binary Search in JavaScript: Important Notes and Key Points**

#### **1. What is Binary Search?**
- **Binary Search** is an efficient algorithm for finding a target element in a **sorted array**. It works by repeatedly dividing the search interval in half.
- **Time Complexity**: O(log n)
- **Space Complexity**: O(1) for iterative, O(log n) for recursive (due to call stack)

#### **2. When to Use Binary Search?**
- **Sorted Arrays**: The array must be sorted for binary search to work.
- **Efficiency**: Use when you need an efficient way to search, such as checking if an element exists in a sorted list.
- **Search Problems**: Problems where you're given a condition and need to find the boundary or a specific value satisfying that condition (like in "minimum in rotated sorted array").

#### **3. Binary Search Pseudocode**
- **Iterative Version**:
  ```javascript
  function binarySearch(arr, target) {
      let left = 0;
      let right = arr.length - 1;
      while (left <= right) {
          const mid = Math.floor(left + (right - left) / 2);
          if (arr[mid] === target) {
              return mid;
          } else if (arr[mid] < target) {
              left = mid + 1;
          } else {
              right = mid - 1;
          }
      }
      return -1; // not found
  }
  ```
- **Recursive Version**:
  ```javascript
  function binarySearchRecursive(arr, left, right, target) {
      if (left > right) return -1;
      const mid = Math.floor(left + (right - left) / 2);
      if (arr[mid] === target) return mid;
      if (arr[mid] < target) return binarySearchRecursive(arr, mid + 1, right, target);
      return binarySearchRecursive(arr, left, mid - 1, target);
  }
  ```

#### **4. Key Points**
1. **Initialization**: Start with `left = 0` and `right = arr.length - 1`.
2. **Mid Calculation**: `mid = Math.floor(left + (right - left) / 2)` is used to avoid overflow.
3. **Condition**: While `left <= right`, continue the search.
4. **Update Bounds**: If `arr[mid] < target`, update `left = mid + 1`; if greater, update `right = mid - 1`.

#### **5. Types of Binary Search Problems**
1. **Basic Search**: Find if an element exists in a sorted array.
2. **First/Last Occurrence**: Find the first or last occurrence of a target in a sorted array (common for duplicates).
3. **Search Insert Position**: Determine the position where an element should be inserted to maintain order.
4. **Rotated Sorted Array**: Find a target element in a rotated sorted array.
5. **Finding Peak Element**: Use binary search to find a peak element in an array.

#### **6. Edge Cases to Consider**
- **Empty Array**: Handle `arr.length === 0`.
- **Target at Ends**: Consider if the target is the first or last element.
- **Duplicates**: Consider scenarios where the array contains duplicate elements.

### **Where and Why to Use Binary Search**
- **Efficient Search**: Binary search is much faster (O(log n)) compared to linear search (O(n)) in large datasets.
- **Finding Boundaries**: It’s particularly useful in problems involving boundaries, such as "smallest/largest element greater/less than a value".
- **Optimizing Solutions**: Problems involving "minimization" or "maximization" often utilize binary search on the solution space.

### **Practice Problems**
To become proficient, practice these problems from different categories:

#### **1. Basic Binary Search**
- [Binary Search - LeetCode #704](https://leetcode.com/problems/binary-search/)
- [Search Insert Position - LeetCode #35](https://leetcode.com/problems/search-insert-position/)

#### **2. Finding Boundaries**
- [First and Last Position of Element in Sorted Array - LeetCode #34](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)
- [Find Minimum in Rotated Sorted Array - LeetCode #153](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

#### **3. Rotated Arrays**
- [Search in Rotated Sorted Array - LeetCode #33](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- [Search in Rotated Sorted Array II (with duplicates) - LeetCode #81](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/)

#### **4. Peak Element Problems**
- [Find Peak Element - LeetCode #162](https://leetcode.com/problems/find-peak-element/)

#### **5. Advanced Usage**
- [Median of Two Sorted Arrays - LeetCode #4](https://leetcode.com/problems/median-of-two-sorted-arrays/)
- [Aggressive Cows (Binary Search on Answer) - SPOJ](https://www.spoj.com/problems/AGGRCOW/)

### **Tips for Mastery**
1. **Understand the Template**: Practice writing the basic template for iterative and recursive versions until you’re comfortable.
2. **Boundary Conditions**: Pay attention to boundary conditions (`<=` vs `<`) and mid-calculation to avoid off-by-one errors.
3. **Practice Variants**: Solve different variants of binary search problems, such as finding the first occurrence, last occurrence, and searching in rotated arrays.
4. **Binary Search on Answer**: Learn how to apply binary search to problems involving numerical ranges (e.g., minimizing/maximizing a value).
5. **Visualize**: Draw the array and pointer movements on paper to understand how the bounds change.
6. **Debugging**: Use print statements to trace how `left`, `right`, and `mid` values change in your code.

### **Real-World Application**
- **Databases**: Searching for entries in a sorted database.
- **Libraries**: The `Array.prototype.indexOf()` in JavaScript internally can use a binary search for sorted arrays.
- **Games and Graphics**: Finding values or conditions in an optimized manner for performance.

### **Binary Search Template**
Here’s a generalized template for binary search:
```javascript
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2);
        
        // Check if mid is the target
        if (arr[mid] === target) {
            return mid;
        }
        // If target is greater, ignore left half
        else if (arr[mid] < target) {
            left = mid + 1;
        }
        // If target is smaller, ignore right half
        else {
            right = mid - 1;
        }
    }
    return -1; // Target not found
}
```
### **Summary**
- **Precondition**: Array must be sorted.
- **Efficiency**: O(log n) makes it suitable for large data.
- **Variants**: Practice first/last occurrence, rotated arrays, and binary search on answer.
- **Practice**: LeetCode and SPOJ have many problems that help build strong binary search intuition.

