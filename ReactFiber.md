# What is React Fiber?

React Fiber is the internal engine introduced in React 16 to replace the old **stack reconciler**.
The old reconciler was **synchronous** — once rendering started, it couldn’t pause or reprioritize work, leading to UI jank during heavy updates.

Fiber rewrote reconciliation to be **asynchronous and incremental**, allowing React to:

- **Pause, resume, or abort** rendering work,
- **Reuse** completed work instead of starting over,
- **Split rendering into small units (fibers)** and **prioritize** urgent tasks.

This lets React schedule high-priority updates (like user input) first and deliver smoother, more responsive UIs.

`ReactDOM.render(<App />, document.getElementById('root'))`

The ReactDOM module passes the <App/ > to the reconciler, but there are two questions here:

## What is `<App />`?

`<App />` is a **React element**, which is just a **plain JavaScript object** describing what the UI should look like — not the actual DOM node or component instance.

React elements define the structure of the UI tree (type, props, and children), and React’s internal engine uses this description to efficiently create, update, and manage the real DOM.

In essence, React’s power comes from this **abstraction** — developers describe _what_ the UI should be, and React handles _how_ to render and update it.

## **Object-oriented programming in React**

In traditional OOP, developers manually create and manage each DOM element and its lifecycle, which becomes complex as state variables grow.

React simplifies this by introducing **elements** — plain objects that describe what should appear on the screen rather than directly managing the DOM.

There are two kinds of elements in React:

- **DOM elements** (like `<button>`), which describe HTML nodes, and
- **Component elements** (like `<Button />`), which describe user-defined components.

Both are simple descriptions — not real DOM nodes — and React uses them to handle rendering and lifecycle management automatically.

![alt text](button-component-lifecycle.avif)

## **What is React reconciliation?**

When React renders an application, it recursively **traverses the component tree** to figure out what each component outputs.

For example, when React encounters `<App />`, it asks what elements it returns — maybe `<Form />` and `<Button />`. Then it asks `<Form />` and `<Button />` what _they_ render. This continues until React reaches the actual **DOM elements** like `<div>` or `<button>`.

This recursive process of resolving components into their underlying DOM elements is called **reconciliation**.

By the end of reconciliation, React has a complete **virtual DOM tree** that represents the desired UI. A renderer (like **react-dom** or **react-native**) then applies the **minimal set of changes** to the actual DOM to match this tree.

When you call `ReactDOM.render()` or `setState()`, React triggers reconciliation again — it **diffs** the new virtual tree with the previous one, **detects what changed**, and **updates only those parts** of the real DOM.

### What is the React stack reconciler?

The old React reconciler was called the **stack reconciler** because it relied on the **call stack** — a _last-in, first-out (LIFO)_ data structure — to manage rendering.

During reconciliation, React used **recursive function calls** to traverse the component tree. Each component render call was pushed onto the call stack, and React couldn’t pause or control this process until the entire stack finished executing.

In other words, the “stack” name comes from how React used recursion and the JavaScript call stack to process components one after another, making the old reconciler **synchronous and non-interruptible**.

### What is recursion in React?

```js
function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

fib(10);
```

The example of the recursive `fib(n)` function illustrates how the **call stack** works — each recursive call is pushed onto the stack until a base case is reached, and then functions are popped as they return.
![alt text](call-stack-diagram.avif)
React’s old reconciliation algorithm worked in a similar way — it was **purely recursive**, processing the entire component subtree immediately for every update.

While functional, this approach had major drawbacks:

- React couldn’t pause or prioritize updates — every render ran to completion.
- All updates were treated equally, even though some (like animations) should happen faster than others (like data updates).

This lack of flexibility made React’s UI updates **synchronous and potentially wasteful**, often causing frame drops and poor user experience — the very limitations that the **Fiber reconciler** was designed to fix.

### **Dropped frames**

“Dropped frames” occur when the browser takes too long to render updates — exceeding the **16.67 ms per frame** budget required for a smooth **60 FPS** experience. If React’s rendering or reconciliation takes longer than that, the browser can’t paint the next frame in time, resulting in visible stutter or **“jank.”**

The old React reconciler’s **recursive, synchronous** nature caused this problem: every update forced a full traversal and re-render of the component tree, blocking the main thread until completion. That meant React couldn’t prioritize urgent work (like animations) or pause rendering when it exceeded the frame budget.

To fix this, the React team created the **Fiber reconciler**, which breaks rendering work into small, incremental units. Fiber can **pause, resume, or prioritize** tasks across frames, ensuring React stays within the frame budget and maintains a **smooth, responsive UI.**

## How does React Fiber work?

### Features

- Assign priority to different types of work
- Pause work and come back to it later
- Abort work if it’s no longer needed
- Reuse previously completed work

### **The JavaScript execution stack**

**Summary:**

When JavaScript runs, it manages function execution using an **execution stack** — a **stack data structure (LIFO)** that stores **execution contexts**.

1. When the engine starts, it creates a **global execution context** (e.g., `window` in browsers).
2. Each time a function is called, a new **function execution context** is created and **pushed** onto the stack.
3. When the function finishes, its context is **popped** off.

For example:

```js
function a() {
  console.log("i am a");
  b();
}
function b() {
  console.log("i am b");
}
a();
```

Here, the stack first pushes the global context, then `a()`, then `b()`. When `b()` returns, its context is popped, followed by `a()`.

However, asynchronous tasks (like HTTP requests, timers, or user events) don’t block the stack.
Instead, they’re placed in an **event queue**, and the **JavaScript event loop** waits until the **execution stack is empty** before handling queued events.
This means asynchronous tasks execute **only after** synchronous code completes — events are asynchronous in when they _arrive_, not in when they’re _handled_.

Now, relating this to React’s **old stack reconciler**:

- React’s previous reconciliation algorithm used the same **call stack** mechanism to **recursively traverse** the component tree.
- While React was rendering (traversing the tree), it **occupied the stack completely**, meaning no other updates could interrupt the process.
- Any new updates had to “wait in line” — like items in the **event queue** — until the stack cleared.
- This caused React to be **synchronous and non-interruptible**, making UIs lag during heavy updates.

#### ⚛️ How Fiber Solves This

**React Fiber** reimplemented this stack mechanism **in JavaScript itself** — creating a **virtual stack** specifically optimized for React components.

As Andrew Clark (React core team) explained:

> “Fiber is a reimplementation of the stack, specialized for React components. A single fiber is like a virtual stack frame.”

- Each **fiber** represents a **unit of work** — corresponding to one React component.
- Unlike the old immutable React elements, **fiber nodes are mutable** — they can be updated, paused, or resumed without recreating the entire tree.
- React now builds a **tree of fiber nodes** instead of a tree of plain element objects.
- Each fiber holds its **component’s state, props, and a reference to its DOM node**.

This gives React much more control:

- React can **pause, resume, or even abort** rendering work.
- React can **prioritize** updates (e.g., user input over background updates).
- React can **reuse** parts of work already done.

#### 🧵 Traversal in Fiber

Instead of relying on recursion and the JavaScript call stack, Fiber uses a **singly linked list** structure for traversal:

- It performs a **parent-first, depth-first** traversal of the fiber tree.
- This iterative structure allows React to **manually manage stack frames** and schedule work over multiple frames — enabling **asynchronous rendering**, **concurrency**, and **smooth user experiences**.

## **Singly-linked list of fiber nodes:**

In React Fiber, the **fiber tree** is a **singly-linked list** of **fiber nodes**, where each node represents a **React component instance** (or stack frame) and contains essential information for rendering and scheduling.

Each **fiber node** includes several key fields:

### 🧩 **1. Type**

Describes _what_ the component is:

- A **host component** (like `'div'` or `'span'`), or
- A **composite component** (a function or class, e.g., `MyButton`).

### 🔑 **2. Key**

A unique identifier (same as the `key` prop) used during reconciliation to match elements and **avoid unnecessary re-renders** when elements move or update.

### 👶 **3. Child**

Represents the **first child element** returned by the component’s render function.

Example:

```jsx
const Name = (props) => {
  return <div className="name">{props.name}</div>;
};
```

Here, the `<div>` is the **child** of the `<Name>` component.

### 🤝 **4. Sibling**

Used when a component returns **multiple children** (e.g., an array).
These siblings form a **singly-linked list**.

Example:

```jsx
const Name = () => [<CustomDiv1 />, <CustomDiv2 />];
```

`<CustomDiv1>` and `<CustomDiv2>` are **siblings**, linked sequentially.

### 🔙 **5. Return**

A pointer to the **parent fiber node** (the “return address” to go back up the tree).
It represents the **logical return path** in the component hierarchy — similar to returning to the caller in a call stack.

`pendingProps & memoizedProps`

- **pendingProps:** The props passed to the component in the current render.
- **memoizedProps:** The props from the previous render, saved after execution.

If `pendingProps` and `memoizedProps` are **identical**, React knows the output hasn’t changed, allowing it to **skip re-rendering** — this is memoization at the Fiber level.

`pendingWorkPriority`

A **numeric priority level** that helps React’s scheduler decide which fibers to process first.

- Smaller number = higher priority
- `0` (NoWork) = idle / completed

Example utility:

```js
function matchesPriority(fiber, priority) {
  return (
    fiber.pendingWorkPriority !== 0 && fiber.pendingWorkPriority <= priority
  );
}
```

This allows React to **search for the next high-priority unit of work** efficiently.

### 🔁 **6. Alternate**

Each component can have up to **two fibers**:

- The **current fiber** — what’s already rendered.
- The **in-progress fiber** — what’s being worked on now.

These two reference each other via the `alternate` field, enabling **double buffering**.
React can prepare new updates on the in-progress fiber while keeping the current UI stable, then swap them when ready.

### 🧾 **7. Output**

The **final rendered output** — the **leaf nodes** of the component tree (like `<div>` or `<span>`).

- Each fiber’s output represents the **return value** of its component (what it renders).
- These outputs are combined and passed **up the tree** until React reaches the root.
- The renderer (like **react-dom**) then **flushes the final output** to the screen.

In a React app like:

```jsx
const Parent1 = () => [<Child11 />, <Child12 />];
const Parent2 = () => <Child21 />;

class App extends Component {
  render() {
    return (
      <div>
        <Parent1 />
        <Parent2 />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
```

React creates a **fiber tree**:

- `<App>` is the **root fiber**.
- `<Parent1>` and `<Parent2>` are **children** of `<App>`.
- `<Child11>` and `<Child12>` are **siblings** (linked via the `sibling` pointer).
- Each node connects back to its **parent** through `return`.

This structure forms a **singly-linked list of fibers**, allowing React to perform a **depth-first traversal** without relying on recursion or the JavaScript call stack.
![alt text](fiber-tree-diagram.avif)

### 🧩 **1. The Render Phase (Building the Fiber Tree)**

In React Fiber, the **render phase** is when React builds or updates the **fiber tree** — a data structure representing your UI components and their states.

When React starts rendering:

- It begins with the root component (e.g., `<App />`), calling the component’s render function and recursively building the tree down to the deepest DOM nodes.
- Each element is turned into a **fiber node** using `createFiberFromTypeAndProps()` — which records details like type, props, children, etc.

#### **Core functions controlling the render phase:**

1. **`workLoopSync()`** — Starts building the tree synchronously, beginning from the root fiber and walking through its children (like `<div>`, `<button>`, etc.).
2. **`performUnitOfWork()`** — Processes one fiber (unit of work) at a time and determines what to do next.
3. **`beginWork()`** — Creates or updates fiber nodes for each component and moves down to its children.
4. **`completeUnitOfWork()` & `completeWork()`** — After all children are processed, React “returns up” the tree and finalizes the fiber’s work.

This structure gives React **fine-grained control** over each unit of work — something the old stack reconciler couldn’t do (it ran recursion without control).

Each fiber doesn’t finish until its children and siblings complete. This ensures a **parent-first, depth-first traversal** of the fiber tree.
![alt text](fiber-node-diagram.avif)

When React finishes building the new **work-in-progress tree**, this tree represents the **next version of the UI** — a draft that hasn’t yet been shown on the screen.

### ⚙️ **2. The Commit Phase (Applying Changes to the DOM)**

After the render phase completes, React enters the **commit phase**.

Here React:

- **Swaps pointers** between the current and work-in-progress trees — making the new tree the “current” one.
- **Applies minimal DOM updates** (insertions, deletions, attribute changes).
- **Triggers side effects** (like `useEffect` or `componentDidMount`).

React also **reuses the previous fiber tree** by keeping alternate pointers, reducing garbage collection overhead.

![alt text](commit-phase-diagram.avif)

This results in a **smooth and efficient UI transition** — the visual changes from old to new state appear seamlessly.

### ⏱️ **3. Frame Time & Scheduling**

React aims to maintain a **16ms frame budget** for 60 FPS rendering.

During the render phase:

- React monitors elapsed time for each **unit of work**.
- If it approaches the frame limit, React **pauses** work and **yields** control to the browser, allowing it to paint finished updates.
- On the next frame, React **resumes exactly where it left off**, continuing the fiber traversal.

This time-slicing behavior is the foundation for React’s **asynchronous and concurrent rendering**, keeping the UI responsive even under heavy load.

### ⚛️ **4. React Fiber’s Post-v16 Evolution (v18 Features)**

#### **a. Concurrent Rendering (React 18 Core Feature)**

- Allows React to **pause, resume, and reorder** rendering work based on priority.
- Multiple updates can be processed **concurrently**, rather than sequentially.
- Powered by **time slicing**, which spreads large rendering tasks across multiple frames.
- Supports **deferred rendering** and **selective hydration** for performance boosts.

This ensures critical interactions (like typing, scrolling, or animations) happen immediately, while lower-priority updates (like data rendering) happen later.

#### **b. Automatic Batching**

- React can now **combine multiple state updates into one render** — even across asynchronous boundaries.
- Before React 18, batching only worked inside event handlers; now it works in `setTimeout`, `fetch`, or `Promise` callbacks too.

Example:

```jsx
setCount(count + 1);
setCount(count + 2);
```

Both updates happen in a single re-render — improving performance by minimizing DOM updates.

#### **c. Suspense**

Originally introduced for **lazy loading**, Suspense now plays a bigger role in handling **asynchronous data fetching** and **selective hydration**.
It lets you declaratively tell React what to show while waiting for data:

```jsx
<Suspense fallback={<div>Loading...</div>}>
  <Profile />
</Suspense>
```

React can now stream and hydrate server-rendered components **gradually**, allowing the visible parts of the UI to render first while the rest load in the background.

#### **d. Transitions (useTransition Hook)**

The `useTransition` hook marks state updates as **non-urgent**, letting React prioritize them appropriately.
For instance, typing in an input field remains instant while React updates heavy components (like lists) asynchronously.

```jsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  // Low-priority update (like filtering)
  setFilteredItems(filterData());
});
```

This provides **smoother UI updates** and keeps inputs responsive during intensive work.

#### **e. New Rendering APIs (React 18)**

React introduced `createRoot` and `hydrateRoot` as replacements for `ReactDOM.render` and `ReactDOM.hydrate`.

```jsx
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

- `createRoot` enables **concurrent rendering** on the client.
- `hydrateRoot` enables **streaming hydration** for server-rendered content.

These APIs are required to unlock React 18’s modern features (like concurrency and Suspense).

#### **f. New Advanced Hooks**

**1. `useSyncExternalStore`:**
Keeps React state synchronized with **external stores** (e.g., Redux, Zustand) during concurrent rendering.
It prevents race conditions where React might read outdated data mid-render.

**2. `useInsertionEffect`:**
Runs **before** DOM mutations and is used by CSS-in-JS libraries (e.g., Emotion, styled-components) to inject styles early — avoiding flickers or inconsistent styling during hydration.
