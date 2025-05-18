document.addEventListener('DOMContentLoaded', () => {
    const questionsListDiv = document.getElementById('questions-list');
    const hintModal = document.getElementById('hint-modal');
    const hintQuestionTitle = document.getElementById('hint-question');
    const hintContentDiv = document.getElementById('hint-content');
    const closeBtn = document.querySelector('.close-btn');

    // Complete list of Fasal coding questions with hints and answers
    const fasalQuestions = [
        // ... (your existing question array remains the same)
        {
    "question": "Check if a Number is a Power of Two",
    "description": "Given an integer n, return true if it is a power of two. Otherwise, return false.",
    "hint": "Consider bitwise operations. A power of two has only one bit set to 1 in its binary representation.",
    "answer": `
        <p><strong>Solution Approach (Bitwise AND):</strong></p>
        <p>A power of two (greater than 0) has the property that n & (n - 1) == 0. For example, 8 (1000) & 7 (0111) == 0. Handle the case where n is 0 separately.</p>

        <pre><code>function isPowerOfTwo(n) {
            if (n <= 0) {
                return false;
            }
            return (n & (n - 1)) === 0;
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(1) - constant time for bitwise operations.</p>
        <p><strong>Space Complexity:</strong> O(1) - constant extra space.</p>
    `
  },
  {
    "question": "Reverse a Linked List",
    "description": "Given the head of a singly linked list, reverse the list.",
    "hint": "Iterate through the list and change the `next` pointer of each node to point to the previous node.",
    "answer": `
        <p><strong>Solution Approach (Iterative):</strong></p>
        <p>Maintain three pointers: <code>prev</code>, <code>current</code>, and <code>next</code>.  Iterate through the list.  For each node, change its <code>next</code> pointer to <code>prev</code>, and then advance the pointers.</p>

        <pre><code>function reverseList(head) {
            let prev = null;
            let current = head;
            while (current) {
                const next = current.next;
                current.next = prev;
                prev = current;
                current = next;
            }
            return prev;
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(n) - where n is the number of nodes in the list.</p>
        <p><strong>Space Complexity:</strong> O(1) - constant extra space.</p>
    `
  },
  {
    "question": "Valid Parentheses",
    "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "hint": "Use a stack to keep track of opening brackets. When a closing bracket is encountered, check if it matches the top of the stack.",
    "answer": `
        <p><strong>Solution Approach (Stack):</strong></p>
        <p>Iterate through the string.  Push opening brackets onto a stack.  When a closing bracket is encountered, pop from the stack and check if it matches.  The string is valid if the stack is empty at the end.</p>

        <pre><code>function isValid(s) {
            const stack = [];
            const map = {
                ')': '(',
                '}': '{',
                ']': '['
            };
            for (let i = 0; i < s.length; i++) {
                const char = s[i];
                if (map[char]) { // Closing bracket
                    const topElement = stack.pop() || '#';  // Use '#' for empty stack
                    if (topElement !== map[char]) {
                        return false;
                    }
                } else { // Opening bracket
                    stack.push(char);
                }
            }
            return stack.length === 0;
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(n) - where n is the length of the string.</p>
        <p><strong>Space Complexity:</strong> O(n) - in the worst case, the stack can contain all opening brackets.</p>
    `
  },
  {
    "question": "Implement Queue using Stacks",
    "description": "Implement a first in first out (FIFO) queue using only two stacks.",
    "hint": "One stack for enqueue, another for dequeue. Transfer elements when dequeue stack is empty.",
    "answer": `
        <p><strong>Solution Approach (Two Stacks):</strong></p>
        <p>Use <code>stack1</code> for enqueue (push). Use <code>stack2</code> for dequeue (pop). If <code>stack2</code> is empty, transfer all elements from <code>stack1</code> to <code>stack2</code>, reversing their order.</p>

        <pre><code>class MyQueue {
            constructor() {
                this.stack1 = [];
                this.stack2 = [];
            }

            push(x) {
                this.stack1.push(x);
            }

            pop() {
                if (this.stack2.length === 0) {
                    while (this.stack1.length > 0) {
                        this.stack2.push(this.stack1.pop());
                    }
                }
                return this.stack2.pop();
            }

            peek() {
                if (this.stack2.length === 0) {
                    while (this.stack1.length > 0) {
                        this.stack2.push(this.stack1.pop());
                    }
                }
                return this.stack2[this.stack2.length - 1];
            }

            empty() {
                return this.stack1.length === 0 && this.stack2.length === 0;
            }
        }</code></pre>

        <p><strong>Time Complexity:</strong> Amortized O(1) for all operations.</p>
        <p><strong>Space Complexity:</strong> O(n) - where n is the number of elements in the queue.</p>
    `
  },
  {
    "question": "Implement a Rate Limiter",
    "description": "Design a rate limiter that allows a maximum of N requests within a time window of T seconds. Implement a function `shouldAllow(userId)` that returns `true` if a request from `userId` should be allowed at the current time, and `false` otherwise.",
    "hint": "Consider using a data structure to store request timestamps for each user. A Map where keys are user IDs and values are queues of timestamps could be useful. You'll need to manage the time window and the request count.",
    "answer": `
        <p><strong>Solution Approach (Sliding Window with Timestamp Queue):</strong></p>
        <p>Maintain a Map where each key is a <code>userId</code> and the value is a queue of timestamps representing their recent requests. When <code>shouldAllow(userId)</code> is called:</p>
        <ol>
            <li>Remove timestamps from the front of the user's queue that are older than the current time minus the time window <code>T</code>.</li>
            <li>Check if the current size of the queue is less than the maximum allowed requests <code>N</code>.</li>
            <li>If it is, add the current timestamp to the queue and return <code>true</code>.</li>
            <li>Otherwise, return <code>false</code>.</li>
        </ol>

        <pre><code>class RateLimiter {
            constructor(N, T) {
                this.maxRequests = N;
                this.timeWindow = T * 1000; // Convert seconds to milliseconds
                this.userRequests = new Map();
            }

            shouldAllow(userId) {
                const currentTime = Date.now();
                if (!this.userRequests.has(userId)) {
                    this.userRequests.set(userId, []);
                }
                const requestTimestamps = this.userRequests.get(userId);

                // Remove outdated timestamps
                while (requestTimestamps.length > 0 && requestTimestamps[0] < currentTime - this.timeWindow) {
                    requestTimestamps.shift();
                }

                if (requestTimestamps.length < this.maxRequests) {
                    requestTimestamps.push(currentTime);
                    return true;
                } else {
                    return false;
                }
            }
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(number of outdated requests to remove + 1) per call to <code>shouldAllow</code>. In the worst case, it can be O(N) if many outdated requests need removal at once, but on average, it's closer to O(1).</p>
        <p><strong>Space Complexity:</strong> O(U * N) where U is the number of unique users and N is the maximum number of requests allowed per user.</p>
    `
  },
  {
    "question": "Find the Intersection of Multiple Sorted Arrays",
    "description": "Given a 2D integer array `nums` where each `nums[i]` is a sorted array, return the list of numbers that are common to all arrays in `nums`. Return an empty list if there is no intersection.",
    "hint": "You can iterate through the elements of the first array and check their presence in all other arrays. To optimize, consider using hash maps to store frequencies or a more efficient comparison method.",
    "answer": `
        <p><strong>Solution Approach (Frequency Counting with Hash Map):</strong></p>
        <p>Iterate through the first array and store the frequency of each element in a hash map. Then, iterate through the remaining arrays. For each element in these arrays, if it exists in the hash map and its count is greater than 0, decrement the count. After iterating through all arrays, the keys in the hash map with a final count equal to the number of input arrays are the elements present in the intersection.</p>

        <pre><code>function intersectionOfArrays(nums) {
            if (!nums || nums.length === 0) {
                return [];
            }
            const counts = new Map();
            const firstArray = nums[0];

            for (const num of firstArray) {
                counts.set(num, (counts.get(num) || 0) + 1);
            }

            for (let i = 1; i < nums.length; i++) {
                const currentArray = nums[i];
                const tempCounts = new Map();
                for (const num of currentArray) {
                    if (counts.has(num) && counts.get(num) > 0) {
                        tempCounts.set(num, (tempCounts.get(num) || 0) + 1);
                    }
                }
                counts.clear();
                for (const [num, count] of tempCounts) {
                    counts.set(num, count);
                }
            }

            const result = [];
            for (const [num, count] of counts) {
                if (count === nums.length - (nums.length > 0 ? 0 : 0)) { // Corrected condition
                    result.push(num);
                }
            }
            return result.sort((a, b) => a - b);
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(N * M) in the worst case, where N is the total number of elements across all arrays and M is the number of arrays. The frequency counting takes O(length of first array), and then for each subsequent array, we iterate through its elements.</p>
        <p><strong>Space Complexity:</strong> O(min(size of arrays)) in the worst case to store the counts of the smaller arrays.</p>
    `
  },
  {
    "question": "Implement a Blocking Queue",
    "description": "Design a blocking queue with a fixed capacity. Implement `enqueue(item)` which blocks if the queue is full until space becomes available, and `dequeue()` which blocks if the queue is empty until an item is available.",
    "hint": "You'll need to use synchronization primitives (like mutexes/locks and condition variables/wait-notify mechanisms) to handle the blocking behavior. JavaScript's `async/await` along with a basic signaling mechanism can be used to simulate this.",
    "answer": `
        <p><strong>Solution Approach (Async/Await with Signaling):</strong></p>
        <p>Use an array to store the queue elements. Implement <code>enqueue</code> as an async function. If the queue is full, make the promise wait until a 'not full' signal is received. Similarly, implement <code>dequeue</code> as an async function. If the queue is empty, make the promise wait until a 'not empty' signal is received. Use separate signaling mechanisms (e.g., resolves of promises) to wake up waiting enqueue and dequeue operations.</p>

        <pre><code>class BlockingQueue {
            constructor(capacity) {
                this.queue = [];
                this.capacity = capacity;
                this.notFull = () => new Promise(resolve => this._notFullResolver = resolve);
                this.notEmpty = () => new Promise(resolve => this._notEmptyResolver = resolve);
            }

            async enqueue(item) {
                while (this.queue.length === this.capacity) {
                    await this.notFull();
                }
                this.queue.push(item);
                if (this._notEmptyResolver) {
                    this._notEmptyResolver();
                    this._notEmptyResolver = null;
                }
            }

            async dequeue() {
                while (this.queue.length === 0) {
                    await this.notEmpty();
                }
                const item = this.queue.shift();
                if (this._notFullResolver) {
                    this._notFullResolver();
                    this._notFullResolver = null;
                }
                return item;
            }

            size() {
                return this.queue.length;
            }
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(1) for both <code>enqueue</code> and <code>dequeue</code> on average, assuming waiting is handled by the asynchronous nature.</p>
        <p><strong>Space Complexity:</strong> O(capacity) to store the elements in the queue.</p>
    `
  },
  {
    "question": "Implement a Circular Buffer",
    "description": "Design a circular buffer (ring buffer) with a fixed capacity. Implement `write(item)` to add an item to the buffer and `read()` to retrieve an item from the buffer. Handle buffer overflow (e.g., overwrite oldest) and underflow (e.g., return null or throw error).",
    "hint": "Use an array and two pointers: one for the head (read position) and one for the tail (write position). Handle the wrap-around behavior using the modulo operator.",
    "answer": `
        <p><strong>Solution Approach (Array with Head and Tail Pointers):</strong></p>
        <p>Use an array of fixed capacity. Maintain a <code>head</code> pointer indicating the next read position and a <code>tail</code> pointer indicating the next write position. When writing, add the item at the <code>tail</code> index and advance <code>tail</code> (with wrap-around). When reading, retrieve the item at the <code>head</code> index and advance <code>head</code> (with wrap-around). Handle overflow by overwriting the element at the <code>head</code> when the buffer is full and a write occurs. Handle underflow by returning a specific value (e.g., <code>null</code>) when reading from an empty buffer.</p>

        <pre><code>class CircularBuffer {
            constructor(capacity) {
                this.buffer = new Array(capacity);
                this.head = 0;
                this.tail = 0;
                this.capacity = capacity;
                this.isFull = false;
            }

            write(item) {
                this.buffer[this.tail] = item;
                this.tail = (this.tail + 1) % this.capacity;
                if (this.tail === this.head) {
                    this.isFull = true;
                }
            }

            read() {
                if (this.head === this.tail && !this.isFull) {
                    return null; // Buffer is empty
                }
                const item = this.buffer[this.head];
                this.buffer[this.head] = undefined; // Clear the read slot
                this.head = (this.head + 1) % this.capacity;
                this.isFull = false;
                return item;
            }

            isEmpty() {
                return this.head === this.tail && !this.isFull;
            }

            isFullBuffer() {
                return this.isFull;
            }

            size() {
                if (this.isFull) {
                    return this.capacity;
                } else if (this.tail >= this.head) {
                    return this.tail - this.head;
                } else {
                    return this.capacity - (this.head - this.tail);
                }
            }
        }</code></pre>

        <p><strong>Time Complexity:</strong> O(1) for both <code>write</code> and <code>read</code> operations.</p>
        <p><strong>Space Complexity:</strong> O(capacity) to store the buffer elements.</p>
    `
  },
  {
    "question": "Implement a Basic Autocomplete System",
    "description": "Design a basic autocomplete system. Given a dictionary of words and a prefix, return a list of up to 5 words from the dictionary that start with the given prefix, ordered by their frequency (if frequency data is available) or lexicographically.",
    "hint": "A Trie (prefix tree) is a suitable data structure for this. You can store word frequencies in the Trie nodes. When a prefix is given, traverse the Trie to the prefix node and then perform a traversal (like DFS) to collect the words in the subtree.",
    "answer": `
        <p><strong>Solution Approach (Trie with Frequency):</strong></p>
        <ol>
            <li><strong>Trie Construction:</strong> Build a Trie from the dictionary of words. Each node in the Trie can store a count (frequency) of the words that pass through it or end at it. A flag can mark the end of a valid word.</li>
            <li><strong>Prefix Traversal:</strong> Given a prefix, traverse the Trie starting from the root. If any character of the prefix is not found, no suggestions exist.</li>
            <li><strong>Suggestion Collection:</strong> Once the Trie node corresponding to the prefix is reached, perform a depth-first search (DFS) or breadth-first search (BFS) in the subtree rooted at this node to find all words that have this prefix. Store these words, possibly along with their frequencies.</li>
            <li><strong>Ranking and Limiting:</strong> Sort the collected words based on their frequency (descending) and then lexicographically (ascending for ties). Return the top 5 words.</li>
        </ol>

        <pre><code>class TrieNode {
            constructor() {
                this.children = new Map();
                this.isEndOfWord = false;
                this.frequency = 0;
            }
        }

        class AutocompleteSystem {
            constructor(dictionary, frequencies) {
                this.root = new TrieNode();
                for (let i = 0; i < dictionary.length; i++) {
                    this.addWord(dictionary[i], frequencies[i]);
                }
            }

            addWord(word, frequency) {
                let current = this.root;
                for (const char of word) {
                    if (!current.children.has(char)) {
                        current.children.set(char, new TrieNode());
                    }
                    current = current.children.get(char);
                }
                current.isEndOfWord = true;
                current.frequency = frequency;
            }

            getSuggestions(prefix) {
                let current = this.root;
                for (const char of prefix) {
                    if (!current.children.has(char)) {
                        return [];
                    }
                    current = current.children.get(char);
                }

                const suggestions = [];
                this.collectWords(current, prefix, suggestions);

                suggestions.sort((a, b) => {
                    if (b.frequency !== a.frequency) {
                        return b.frequency - a.frequency; // Sort by frequency (descending)
                    }
                    return a.word.localeCompare(b.word); // Then lexicographically (ascending)
                });

                return suggestions.slice(0, 5).map(s => s.word);
            }

            collectWords(node, currentWord, suggestions) {
                if (node.isEndOfWord) {
                    suggestions.push({ word: currentWord, frequency: node.frequency });
                }
                for (const [char, child] of node.children) {
                    this.collectWords(child, currentWord + char, suggestions);
                }
            }
        }

        // Example Usage (assuming dictionary and frequencies arrays are available)
        // const autocomplete = new AutocompleteSystem(["apple", "apricot", "banana", "ant", "application"], [10, 5, 7, 12, 8]);
        // console.log(autocomplete.getSuggestions("ap")); // Output: ["apple", "application", "apricot", "ant"] (order based on frequency then lexicographically)
    </code></pre>

        <p><strong>Time Complexity:</strong></p>
        <ul>
            <li><strong>Trie Construction:</strong> O(L * N) where L is the average length of a word and N is the number of words in the dictionary.</li>
            <li><strong>getSuggestions:</strong> O(P + K log K) where P is the length of the prefix and K is the number of words in the Trie with the given prefix (for collecting and sorting).</li>
            <li><strong>collectWords:</strong> In the worst case, can traverse a significant portion of the Trie.</li>
        </ul>
        <p><strong>Space Complexity:</strong> O(L * N) to store the Trie.</p>
    `
  },
  {
    "question": "Design a TinyURL or URL Shortener",
    "description": "Design a system that can shorten long URLs into shorter, unique URLs. Implement two functions: `shortenURL(longURL)` which takes a long URL and returns a short URL, and `getLongURL(shortURL)` which takes a short URL and returns the original long URL.",
    "hint": "You'll need a way to generate unique short keys and a storage mechanism (like a hash map or a database) to map short keys to long URLs and vice-versa. Consider the uniqueness of short keys and the potential for collisions.",
    "answer": `
        <p><strong>Solution Approach (Hash Map with Unique ID Generation):</strong></p>
        <ol>
            <li><strong>ID Generation:</strong> Implement a function to generate unique short keys (strings). This could involve using a counter, encoding it in base-62 (alphanumeric characters), or using a more sophisticated unique ID generation algorithm.</li>
            <li><strong>Storage:</strong> Use two hash maps (JavaScript objects or Maps):
                <ul>
                    <li><code>longToShort</code>: Stores the mapping from long URL to its short key.</li>
                    <li><code>shortToLong</code>: Stores the mapping from short key to its long URL.</li>
                </ul>
            </li>
            <li><strong>shortenURL(longURL):</strong>
                <ul>
                    <li>Check if the <code>longURL</code> already exists in <code>longToShort</code>. If so, return the existing short URL.</li>
                    <li>If not, generate a new unique short key.</li>
                    <li>Store the mapping in both <code>longToShort</code> and <code>shortToLong</code>.</li>
                    <li>Return the newly generated short URL (typically a base URL + the short key).</li>
                </ul>
            </li>
            <li><strong>getLongURL(shortURL):</strong>
                <ul>
                    <li>Extract the short key from the <code>shortURL</code> (e.g., the part after the base URL).</li>
                    <li>Look up the short key in the <code>shortToLong</code> map.</li>
                    <li>Return the corresponding long URL if found, otherwise return an error or <code>null</code>.</li>
                </ul>
            </li>
        </ol>

        <pre><code>class URLShortener {
            constructor() {
                this.longToShort = new Map();
                this.shortToLong = new Map();
                this.counter = 0;
                this.baseURL = "http://tiny.url/"; // Example base URL
            }

            generateShortKey() {
                const base = 62;
                const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                let id = this.counter++;
                let shortKey = "";
                while (id > 0) {
                    shortKey = characters[id % base] + shortKey;
                    id = Math.floor(id / base);
                }
                return shortKey || characters[0]; // Ensure non-empty for initial counter
            }

            shortenURL(longURL) {
                if (this.longToShort.has(longURL)) {
                    return this.baseURL + this.longToShort.get(longURL);
                }
                const shortKey = this.generateShortKey();
                this.longToShort.set(longURL, shortKey);
                this.shortToLong.set(shortKey, longURL);
                return this.baseURL + shortKey;
            }

            getLongURL(shortURL) {
                const shortKey = shortURL.replace(this.baseURL, "");
                return this.shortToLong.get(shortKey) || null;
            }
        }

        // Example Usage
        // const shortener = new URLShortener();
        // const longURL = "https://www.example.com/some/very/long/url";
        // const shortURL = shortener.shortenURL(longURL);
        // console.log("Short URL:", shortURL); // Output: something like "http://tiny.url/A"
        // console.log("Long URL:", shortener.getLongURL(shortURL)); // Output: "https://www.example.com/some/very/long/url"
    </code></pre>

        <p><strong>Time Complexity:</strong> O(1) on average for both <code>shortenURL</code> and <code>getLongURL</code> due to hash map operations.</p>
        <p><strong>Space Complexity:</strong> O(N) where N is the number of URLs stored in the system.</p>
    `
  },
  {
    "question": "Implement a Function to Find the Lowest Common Ancestor (LCA) of Two Nodes in a Binary Tree",
    "description": "Given a binary tree and two nodes (not necessarily present), find the lowest common ancestor (LCA) of these two nodes. The LCA is defined as the deepest node in the tree that has both nodes as descendants (where we allow a node to be a descendant of itself).",
    "hint": "Use a recursive approach. If the current node is one of the target nodes or if one target node is in the left subtree and the other is in the right subtree, then the current node is the LCA.",
    "answer": `
        <p><strong>Solution Approach (Recursive Traversal):</strong></p>
        <ol>
            <li>If the current node is null, return null.</li>
            <li>If the current node is one of the target nodes (p or q), return the current node.</li>
            <li>Recursively find the LCA in the left and right subtrees.</li>
            <li>If both left and right recursive calls return a non-null node, it means p is in one subtree and q is in the other, so the current node is the LCA.</li>
            <li>If only one of the recursive calls returns a non-null node, then the LCA is the non-null node returned by that call (because the other target node must be in that subtree).</li>
        </ol>

        <pre><code>function lowestCommonAncestor(root, p, q) {
            if (!root || root === p || root === q) {
                return root;
            }

            const leftLCA = lowestCommonAncestor(root.left, p, q);
            const rightLCA = lowestCommonAncestor(root.right, p, q);

            if (leftLCA && rightLCA) {
                return root; // p and q are in different subtrees
            }

            return leftLCA || rightLCA; // Either p or q is in one subtree, or both are in the same
        }

        // Definition for a binary tree node (assuming it's available)
        // function TreeNode(val) {
        //     this.val = val;
        //     this.left = this.right = null;
        // }
    </code></pre>

        <p><strong>Time Complexity:</strong> O(n) - where n is the number of nodes in the binary tree, as we might visit all nodes in the worst case.</p>
        <p><strong>Space Complexity:</strong> O(h) - where h is the height of the binary tree due to the recursion stack. In the worst case (skewed tree), h can be n.</p>
    `
  },
    ];

    fasalQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-item');

        const title = document.createElement('h3');
        title.textContent = `${index + 1}. ${question.question}`;

        const description = document.createElement('p');
        description.textContent = question.description;

        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.marginTop = '15px';

        // Hint Button
        const hintButton = document.createElement('button');
        hintButton.textContent = 'Show Hint';
        hintButton.style.padding = '10px 20px';
        hintButton.style.border = 'none';
        hintButton.style.borderRadius = '5px';
        hintButton.style.backgroundColor = '#4CAF50';
        hintButton.style.color = 'white';
        hintButton.style.fontWeight = 'bold';
        hintButton.style.cursor = 'pointer';
        hintButton.style.transition = 'all 0.3s ease';
        hintButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        // Hover effect for hint button
        hintButton.addEventListener('mouseover', () => {
            hintButton.style.backgroundColor = '#45a049';
            hintButton.style.transform = 'translateY(-2px)';
            hintButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        hintButton.addEventListener('mouseout', () => {
            hintButton.style.backgroundColor = '#4CAF50';
            hintButton.style.transform = 'translateY(0)';
            hintButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        });
        
        hintButton.addEventListener('click', () => {
            hintQuestionTitle.textContent = question.question;
            hintContentDiv.innerHTML = `<p>${question.hint}</p>`;
            hintModal.style.display = 'block';
        });

        // Answer Button
        const answerButton = document.createElement('button');
        answerButton.textContent = 'Show Answer';
        answerButton.style.padding = '10px 20px';
        answerButton.style.border = 'none';
        answerButton.style.borderRadius = '5px';
        answerButton.style.backgroundColor = '#2196F3';
        answerButton.style.color = 'white';
        answerButton.style.fontWeight = 'bold';
        answerButton.style.cursor = 'pointer';
        answerButton.style.transition = 'all 0.3s ease';
        answerButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        // Hover effect for answer button
        answerButton.addEventListener('mouseover', () => {
            answerButton.style.backgroundColor = '#0b7dda';
            answerButton.style.transform = 'translateY(-2px)';
            answerButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        answerButton.addEventListener('mouseout', () => {
            answerButton.style.backgroundColor = '#2196F3';
            answerButton.style.transform = 'translateY(0)';
            answerButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        });
        
        answerButton.addEventListener('click', () => {
            hintQuestionTitle.textContent = question.question;
            hintContentDiv.innerHTML = question.answer;
            hintModal.style.display = 'block';
        });

        // Add buttons to container
        buttonContainer.appendChild(hintButton);
        buttonContainer.appendChild(answerButton);

        questionDiv.appendChild(title);
        questionDiv.appendChild(description);
        questionDiv.appendChild(buttonContainer);
        questionsListDiv.appendChild(questionDiv);
    });

    closeBtn.addEventListener('click', () => {
        hintModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === hintModal) {
            hintModal.style.display = 'none';
        }
    });
});